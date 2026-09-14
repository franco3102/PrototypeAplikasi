import React, { useState } from "react";
import {
  Search, Plus, Minus, Trash2, CheckCircle2, BedDouble, PauseCircle, ListRestart, Printer, Wallet,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatRp, stockStatus, nextId } from "../utils/helpers";
import { CATEGORIES } from "../data/seed";
import { Modal, EmptyState } from "../components/Common";
import QrisPanel from "../components/QrisPanel";
import Receipt from "../components/Receipt";

function OpenShiftGate() {
  const { openShift, can } = useApp();
  const [amount, setAmount] = useState("500000");

  return (
    <div className="view">
      <div className="panel shift-gate">
        <div className="panel__head"><h2>Buka kasir untuk mulai bertransaksi</h2></div>
        <p className="field-hint">Masukkan modal kas awal (uang receh) sebelum melayani pelanggan pertama hari ini.</p>
        <div className="field-grid field-grid--narrow">
          <label>Modal awal kas
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500000" />
          </label>
        </div>
        <div className="field-actions">
          <button
            className="btn btn-primary"
            disabled={!can("kas", "tambah")}
            onClick={() => openShift(Number(amount) || 0)}
          >
            <Wallet size={16} /> Buka kasir &amp; mulai transaksi
          </button>
        </div>
        {!can("kas", "tambah") && (
          <p className="field-hint field-hint--error">Akun Anda tidak memiliki izin untuk membuka shift kas. Minta kasir/manajer lain membuka shift terlebih dahulu.</p>
        )}
      </div>
    </div>
  );
}

export default function Kasir() {
  const { products, customers, paymentMethods, settings, checkout, currentShift, sales } = useApp();

  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState(1);
  const [discountType, setDiscountType] = useState("nominal");
  const [discountValue, setDiscountValue] = useState("0");
  const [payMethod, setPayMethod] = useState("Tunai");
  const [cashReceived, setCashReceived] = useState("");
  const [showQris, setShowQris] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(null);
  const [heldOrders, setHeldOrders] = useState([]);
  const [showHeld, setShowHeld] = useState(false);

  if (!currentShift) return <OpenShiftGate />;

  const enabledMethods = paymentMethods.filter((m) => m.enabled);

  const filtered = products.filter((p) => {
    const matchCat = category === "Semua" || p.category === category;
    const matchSearch = (p.name + p.brand).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartLines = cart.map((c) => {
    const p = products.find((pr) => pr.id === c.productId);
    return { ...c, product: p, lineTotal: p.price * c.qty };
  });
  const subtotal = cartLines.reduce((sum, l) => sum + l.lineTotal, 0);
  const discountAmount =
    discountType === "persen"
      ? Math.round((subtotal * (Number(discountValue) || 0)) / 100)
      : Math.min(Number(discountValue) || 0, subtotal);
  const taxable = Math.max(0, subtotal - discountAmount);
  const taxAmount = settings.taxEnabled ? Math.round((taxable * settings.taxRate) / 100) : 0;
  const total = taxable + taxAmount;
  const change = payMethod === "Tunai" ? Math.max(0, (Number(cashReceived) || 0) - total) : 0;
  const cashInsufficient = payMethod === "Tunai" && (Number(cashReceived) || 0) < total && cartLines.length > 0;

  const addToCart = (p) => {
    if (p.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === p.id);
      if (existing) {
        if (existing.qty >= p.stock) return prev;
        return prev.map((c) => (c.productId === p.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { productId: p.id, qty: 1 }];
    });
  };

  const changeQty = (productId, delta) => {
    setCart((prev) =>
      prev.map((c) => {
        if (c.productId !== productId) return c;
        const p = products.find((pr) => pr.id === productId);
        return { ...c, qty: Math.min(p.stock, Math.max(1, c.qty + delta)) };
      })
    );
  };

  const removeLine = (productId) => setCart((prev) => prev.filter((c) => c.productId !== productId));

  const resetPos = () => {
    setCart([]);
    setDiscountValue("0");
    setCashReceived("");
    setPayMethod("Tunai");
    setCustomerId(1);
  };

  const buildInvoiceNo = () => {
    const seq = String(sales.length + 1).padStart(4, "0");
    return `${settings.invoicePrefix}-20260911-${seq}`;
  };

  const finalizeCheckout = () => {
    const customer = customers.find((c) => c.id === customerId);
    const record = checkout({
      invoiceNo: buildInvoiceNo(),
      items: cartLines.map((l) => ({ productId: l.productId, name: l.product.name, sizeLabel: l.product.sizeLabel, qty: l.qty, price: l.product.price })),
      subtotal,
      discountAmount,
      taxAmount,
      taxRate: settings.taxRate,
      total,
      payment: payMethod,
      customerId,
      customerName: customer?.name,
      cashReceived: payMethod === "Tunai" ? Number(cashReceived) || 0 : total,
      change: payMethod === "Tunai" ? change : 0,
    });
    setCheckoutDone(record);
    resetPos();
  };

  const handleCheckout = () => {
    if (cartLines.length === 0) return;
    if (payMethod === "Tunai" && cashInsufficient) return;
    if (payMethod === "QRIS") {
      setShowQris(true);
      return;
    }
    finalizeCheckout();
  };

  const holdOrder = () => {
    if (cartLines.length === 0) return;
    setHeldOrders((prev) => [
      ...prev,
      { id: nextId(prev), label: `Order ${prev.length + 1}`, cart, customerId, discountType, discountValue, time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    resetPos();
  };

  const resumeOrder = (order) => {
    setCart(order.cart);
    setCustomerId(order.customerId);
    setDiscountType(order.discountType);
    setDiscountValue(order.discountValue);
    setHeldOrders((prev) => prev.filter((o) => o.id !== order.id));
    setShowHeld(false);
  };

  if (checkoutDone) {
    return (
      <div className="view">
        <div className="receipt-success">
          <CheckCircle2 size={40} strokeWidth={1.6} className="receipt-success__icon" />
          <h2>Pembayaran berhasil</h2>
          <p>Transaksi {checkoutDone.invoiceNo} sebesar {formatRp(checkoutDone.total)} dengan {checkoutDone.payment} sudah tercatat.</p>
          <div className="receipt-mini">
            {checkoutDone.items.map((it, i) => (
              <div key={i} className="receipt-mini__row">
                <span>{it.qty}x {it.name}, {it.sizeLabel}</span>
                <span>{formatRp(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <div className="field-actions field-actions--center">
            <button className="btn btn-outline" onClick={() => window.print()}><Printer size={15} /> Cetak struk</button>
            <button className="btn btn-primary" onClick={() => setCheckoutDone(null)}>Mulai transaksi baru</button>
          </div>
        </div>
        <Receipt sale={checkoutDone} />
      </div>
    );
  }

  return (
    <div className="pos-layout">
      <div className="pos-products">
        <div className="pos-toolbar pos-toolbar--wide">
          <div className="search-box">
            <Search size={16} strokeWidth={2} />
            <input placeholder="Cari produk atau merek…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="chip-row">
            {["Semua", ...CATEGORIES].map((c) => (
              <button key={c} className={`chip ${category === c ? "chip--active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <button className="btn btn-outline" onClick={() => setShowHeld(true)}>
            <ListRestart size={16} /> Tertahan ({heldOrders.length})
          </button>
        </div>
        <div className="product-grid">
          {filtered.map((p) => {
            const s = stockStatus(p);
            const disabled = p.stock <= 0;
            return (
              <button key={p.id} className={`product-card ${disabled ? "product-card--disabled" : ""}`} onClick={() => addToCart(p)} disabled={disabled}>
                <div className={`product-card__swatch swatch--${(p.id % 5) + 1}`}>
                  <BedDouble size={22} strokeWidth={1.6} />
                </div>
                <div className="product-card__body">
                  <div className="product-card__name">{p.name}</div>
                  <div className="product-card__meta">{p.brand} · {p.sizeLabel}</div>
                  <div className="product-card__foot">
                    <span className="product-card__price">{formatRp(p.price)}</span>
                    <span className={`pill pill--${s.tone} pill--sm`}>{s.label}</span>
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && <EmptyState>Produk tidak ditemukan.</EmptyState>}
        </div>
      </div>

      <aside className="pos-cart">
        <div className="pos-cart__head">
          <h2>Transaksi baru</h2>
          <span className="pos-cart__count">{cartLines.length} produk</span>
        </div>

        <label className="pos-cart__field">
          Pelanggan
          <select value={customerId} onChange={(e) => setCustomerId(Number(e.target.value))}>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name}{c.type === "member" ? ` · ${c.points} poin` : ""}</option>)}
          </select>
        </label>

        <div className="pos-cart__lines">
          {cartLines.length === 0 && <EmptyState>Pilih produk di sebelah kiri untuk memulai.</EmptyState>}
          {cartLines.map((l) => (
            <div key={l.productId} className="cart-item">
              <div className="cart-item__info">
                <div className="cart-item__name">{l.product.name}</div>
                <div className="cart-item__meta">{l.product.sizeLabel}</div>
              </div>
              <div className="qty-stepper">
                <button onClick={() => changeQty(l.productId, -1)}><Minus size={13} /></button>
                <span>{l.qty}</span>
                <button onClick={() => changeQty(l.productId, 1)}><Plus size={13} /></button>
              </div>
              <div className="cart-item__price">{formatRp(l.lineTotal)}</div>
              <button className="cart-item__remove" onClick={() => removeLine(l.productId)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        <div className="pos-cart__discount">
          <label className="pos-cart__field pos-cart__field--sm">
            Diskon
            <div className="discount-input">
              <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                <option value="nominal">Rp</option>
                <option value="persen">%</option>
              </select>
              <input type="number" min="0" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
            </div>
          </label>
        </div>

        <div className="pos-cart__pay">
          <div className="chip-row">
            {enabledMethods.map((m) => (
              <button key={m.key} className={`chip ${payMethod === (m.key === "tunai" ? "Tunai" : m.label) ? "chip--active" : ""}`} onClick={() => setPayMethod(m.key === "tunai" ? "Tunai" : m.label)}>
                {m.label}
              </button>
            ))}
          </div>

          {payMethod === "Tunai" && (
            <label className="pos-cart__field pos-cart__field--sm">
              Tunai diterima
              <input type="number" min="0" value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} placeholder="0" />
            </label>
          )}

          <div className="pos-cart__totals">
            <div className="pos-cart__row"><span>Subtotal</span><span>{formatRp(subtotal)}</span></div>
            {discountAmount > 0 && <div className="pos-cart__row"><span>Diskon</span><span>-{formatRp(discountAmount)}</span></div>}
            {taxAmount > 0 && <div className="pos-cart__row"><span>PPN {settings.taxRate}%</span><span>{formatRp(taxAmount)}</span></div>}
            <div className="pos-cart__total"><span>Total</span><span>{formatRp(total)}</span></div>
            {payMethod === "Tunai" && Number(cashReceived) > 0 && (
              <div className="pos-cart__row"><span>Kembalian</span><span>{formatRp(change)}</span></div>
            )}
          </div>

          <div className="pos-cart__actions">
            <button className="btn btn-outline" disabled={cartLines.length === 0} onClick={holdOrder}>
              <PauseCircle size={15} /> Tahan
            </button>
            <button className="btn btn-primary btn-block" disabled={cartLines.length === 0 || cashInsufficient} onClick={handleCheckout}>
              Selesaikan pembayaran
            </button>
          </div>
          {cashInsufficient && <p className="field-hint field-hint--error">Tunai diterima kurang dari total tagihan.</p>}
        </div>
      </aside>

      {showQris && (
        <Modal title="Pembayaran QRIS" onClose={() => setShowQris(false)}>
          <QrisPanel
            total={total}
            invoiceNo={buildInvoiceNo()}
            onCancel={() => setShowQris(false)}
            onConfirmed={() => { setShowQris(false); finalizeCheckout(); }}
          />
        </Modal>
      )}

      {showHeld && (
        <Modal title="Transaksi tertahan" onClose={() => setShowHeld(false)}>
          {heldOrders.length === 0 ? (
            <EmptyState>Belum ada transaksi yang ditahan.</EmptyState>
          ) : (
            <ul className="held-list">
              {heldOrders.map((o) => (
                <li key={o.id} className="held-list__item">
                  <div>
                    <div className="held-list__label">{o.label} · {o.cart.reduce((s, c) => s + c.qty, 0)} item</div>
                    <div className="held-list__meta">Ditahan pukul {o.time}</div>
                  </div>
                  <button className="btn btn-outline" onClick={() => resumeOrder(o)}>Lanjutkan</button>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </div>
  );
}
