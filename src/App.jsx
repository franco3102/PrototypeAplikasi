import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, ShoppingCart, Boxes, ArrowDownToLine, ArrowUpFromLine,
  BarChart3, BedDouble, Search, Plus, Minus, Trash2, X, CheckCircle2,
  AlertTriangle, PackagePlus,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ---------------------------------- data --------------------------------- */

const CATEGORIES = ["Kasur Springbed", "Divan & Rangka", "Bantal & Guling", "Aksesoris"];

const PRODUCTS_INIT = [
  { id: 1, name: "Tidura Classic Ortho", brand: "Tidura", sizeLabel: "Queen 160x200", category: "Kasur Springbed", price: 4500000, stock: 12, minStock: 5 },
  { id: 2, name: "Tidura Classic Ortho", brand: "Tidura", sizeLabel: "King 180x200", category: "Kasur Springbed", price: 5200000, stock: 3, minStock: 5 },
  { id: 3, name: "CloudRest Pillow Top", brand: "CloudRest", sizeLabel: "Queen 160x200", category: "Kasur Springbed", price: 6800000, stock: 8, minStock: 4 },
  { id: 4, name: "CloudRest Pillow Top", brand: "CloudRest", sizeLabel: "Single 90x200", category: "Kasur Springbed", price: 3200000, stock: 20, minStock: 6 },
  { id: 5, name: "Aurora Sleep Hybrid", brand: "AuroraSleep", sizeLabel: "Super King 200x200", category: "Kasur Springbed", price: 9500000, stock: 2, minStock: 3 },
  { id: 6, name: "Regal Foam Deluxe", brand: "RegalFoam", sizeLabel: "Twin 120x200", category: "Kasur Springbed", price: 3800000, stock: 0, minStock: 4 },
  { id: 7, name: "Nimbus Plus Memory", brand: "NimbusPlus", sizeLabel: "Queen 160x200", category: "Kasur Springbed", price: 5900000, stock: 15, minStock: 5 },
  { id: 8, name: "Divan Rangka Minimalis", brand: "Tidura", sizeLabel: "Queen 160x200", category: "Divan & Rangka", price: 1850000, stock: 9, minStock: 3 },
  { id: 9, name: "Divan Rangka Laci", brand: "Tidura", sizeLabel: "King 180x200", category: "Divan & Rangka", price: 2450000, stock: 4, minStock: 3 },
  { id: 10, name: "Bantal Memory Foam", brand: "CloudRest", sizeLabel: "Standar", category: "Bantal & Guling", price: 285000, stock: 40, minStock: 10 },
  { id: 11, name: "Guling Dakron Premium", brand: "Tidura", sizeLabel: "Standar", category: "Bantal & Guling", price: 165000, stock: 32, minStock: 10 },
  { id: 12, name: "Pelindung Kasur Waterproof", brand: "AuroraSleep", sizeLabel: "Queen 160x200", category: "Aksesoris", price: 245000, stock: 18, minStock: 8 },
  { id: 13, name: "Pelindung Kasur Waterproof", brand: "AuroraSleep", sizeLabel: "King 180x200", category: "Aksesoris", price: 285000, stock: 1, minStock: 6 },
  { id: 14, name: "Topper Latex 5cm", brand: "RegalFoam", sizeLabel: "Queen 160x200", category: "Aksesoris", price: 1250000, stock: 6, minStock: 4 },
];

const MOVEMENTS_INIT = [
  { id: 1, type: "masuk", date: "10 Sep 2026", productName: "Tidura Classic Ortho — Queen 160x200", qty: 10, note: "Kiriman pabrik rutin", by: "Gudang" },
  { id: 2, type: "keluar", date: "10 Sep 2026", productName: "Nimbus Plus Memory — Queen 160x200", qty: 2, note: "Retur ke supplier, cacat jahitan", by: "Gudang" },
  { id: 3, type: "masuk", date: "9 Sep 2026", productName: "CloudRest Pillow Top — Single 90x200", qty: 15, note: "Restock awal bulan", by: "Gudang" },
];

const WEEKLY_SALES = [
  { day: "Sen", total: 18500000 }, { day: "Sel", total: 12200000 }, { day: "Rab", total: 21750000 },
  { day: "Kam", total: 9800000 }, { day: "Jum", total: 24300000 }, { day: "Sab", total: 31200000 },
  { day: "Min", total: 27600000 },
];

const TOP_PRODUCTS = [
  { name: "Tidura Classic Ortho, Queen", terjual: 34, omzet: 153000000 },
  { name: "CloudRest Pillow Top, Single", terjual: 29, omzet: 92800000 },
  { name: "Bantal Memory Foam", terjual: 61, omzet: 17385000 },
  { name: "Nimbus Plus Memory, Queen", terjual: 18, omzet: 106200000 },
];

const REASONS_KELUAR = ["Retur ke supplier", "Rusak / cacat produksi", "Sample pajangan showroom", "Penyesuaian stok opname"];

const formatRp = (n) => `Rp${Number(n || 0).toLocaleString("id-ID")}`;

const stockStatus = (p) => {
  if (p.stock <= 0) return { label: "Habis", tone: "brick" };
  if (p.stock <= p.minStock) return { label: "Menipis", tone: "rust" };
  return { label: "Aman", tone: "sage" };
};

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "kasir", label: "Kasir", icon: ShoppingCart },
  { key: "stok", label: "Stok barang", icon: Boxes },
  { key: "masuk", label: "Barang masuk", icon: ArrowDownToLine },
  { key: "keluar", label: "Barang keluar", icon: ArrowUpFromLine },
  { key: "laporan", label: "Laporan", icon: BarChart3 },
];

const PAGE_TITLES = {
  dashboard: ["Dashboard", "Ringkasan toko hari ini"],
  kasir: ["Kasir", "Buat transaksi penjualan baru"],
  stok: ["Stok barang", "Daftar produk dan status persediaan"],
  masuk: ["Barang masuk", "Catat penerimaan barang ke gudang"],
  keluar: ["Barang keluar", "Catat pengeluaran barang di luar penjualan"],
  laporan: ["Laporan", "Performa penjualan dan produk terlaris"],
};

/* --------------------------------- pieces --------------------------------- */

function StockPill({ p }) {
  const s = stockStatus(p);
  return (
    <span className={`pill pill--${s.tone}`}>
      <span className="pill__dot" />
      {s.label} · {p.stock}
    </span>
  );
}

function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark"><BedDouble size={18} strokeWidth={2} /></span>
        <div>
          <div className="brand__name">Tidura</div>
          <div className="brand__tag">Kasir &amp; gudang springbed</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              className={`nav__item ${isActive ? "nav__item--active" : ""}`}
              onClick={() => onNavigate(item.key)}
            >
              <Icon size={17} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar__footer">
        <div className="sidebar__avatar">AD</div>
        <div>
          <div className="sidebar__user">Andi Darmawan</div>
          <div className="sidebar__role">Kasir toko pusat</div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ tabKey }) {
  const [title, sub] = PAGE_TITLES[tabKey];
  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">{title}</h1>
        <p className="topbar__sub">{sub}</p>
      </div>
      <div className="topbar__meta">Kamis, 11 September 2026</div>
    </header>
  );
}

/* -------------------------------- dashboard -------------------------------- */

function DashboardView({ products, sales }) {
  const lowStock = products.filter((p) => p.stock <= p.minStock);
  const totalStockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const sessionTotal = sales.reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="view">
      <div className="kpi-grid">
        <div className="kpi-card kpi-card--brass">
          <div className="kpi-card__label">Penjualan sesi ini</div>
          <div className="kpi-card__value">{formatRp(sessionTotal)}</div>
          <div className="kpi-card__note">{sales.length} transaksi tercatat</div>
        </div>
        <div className="kpi-card kpi-card--plum">
          <div className="kpi-card__label">Nilai stok gudang</div>
          <div className="kpi-card__value">{formatRp(totalStockValue)}</div>
          <div className="kpi-card__note">{products.length} jenis produk</div>
        </div>
        <div className="kpi-card kpi-card--rust">
          <div className="kpi-card__label">Stok menipis</div>
          <div className="kpi-card__value">{lowStock.length}</div>
          <div className="kpi-card__note">Perlu segera direstok</div>
        </div>
        <div className="kpi-card kpi-card--sage">
          <div className="kpi-card__label">Produk aktif</div>
          <div className="kpi-card__value">{products.filter((p) => p.stock > 0).length}</div>
          <div className="kpi-card__note">Tersedia untuk dijual</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel__head">
            <h2>Penjualan 7 hari terakhir</h2>
          </div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={WEEKLY_SALES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#E7E2D6" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#6B655C", fontSize: 12 }} />
                <YAxis
                  tickLine={false} axisLine={false} width={64}
                  tick={{ fill: "#6B655C", fontSize: 11 }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`}
                />
                <Tooltip
                  cursor={{ fill: "#F1EEE6" }}
                  formatter={(v) => [formatRp(v), "Penjualan"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #DAD4C7", fontFamily: "Inter, sans-serif", fontSize: 13 }}
                />
                <Bar dataKey="total" fill="#AD7A3F" radius={[5, 5, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel__head">
            <h2>Perlu direstok</h2>
          </div>
          {lowStock.length === 0 ? (
            <p className="empty-state">Semua stok dalam kondisi aman.</p>
          ) : (
            <ul className="low-stock-list">
              {lowStock.map((p) => (
                <li key={p.id} className="low-stock-item">
                  <div>
                    <div className="low-stock-item__name">{p.name}</div>
                    <div className="low-stock-item__meta">{p.brand} · {p.sizeLabel}</div>
                  </div>
                  <StockPill p={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="panel">
        <div className="panel__head"><h2>Transaksi terakhir</h2></div>
        {sales.length === 0 ? (
          <p className="empty-state">Belum ada transaksi pada sesi ini. Mulai dari menu Kasir.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Waktu</th><th>Item</th><th>Pembayaran</th><th className="ta-right">Total</th></tr>
            </thead>
            <tbody>
              {sales.slice().reverse().map((s) => (
                <tr key={s.id}>
                  <td>{s.time}</td>
                  <td>{s.items.length} produk</td>
                  <td>{s.payment}</td>
                  <td className="ta-right">{formatRp(s.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- kasir ---------------------------------- */

function KasirView({ products, setProducts, cart, setCart, onCheckout, checkoutDone, onNewSale }) {
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [payMethod, setPayMethod] = useState("Tunai");

  const filtered = products.filter((p) => {
    const matchCat = category === "Semua" || p.category === category;
    const matchSearch = (p.name + p.brand).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartLines = cart.map((c) => {
    const p = products.find((pr) => pr.id === c.productId);
    return { ...c, product: p, lineTotal: p.price * c.qty };
  });
  const total = cartLines.reduce((sum, l) => sum + l.lineTotal, 0);

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
      prev
        .map((c) => {
          if (c.productId !== productId) return c;
          const p = products.find((pr) => pr.id === productId);
          const next = Math.min(p.stock, Math.max(1, c.qty + delta));
          return { ...c, qty: next };
        })
        .filter(Boolean)
    );
  };

  const removeLine = (productId) => setCart((prev) => prev.filter((c) => c.productId !== productId));

  const handleCheckout = () => {
    if (cartLines.length === 0) return;
    setProducts((prev) =>
      prev.map((p) => {
        const line = cartLines.find((l) => l.productId === p.id);
        return line ? { ...p, stock: p.stock - line.qty } : p;
      })
    );
    onCheckout({
      items: cartLines.map((l) => ({ name: l.product.name, sizeLabel: l.product.sizeLabel, qty: l.qty, price: l.product.price })),
      total,
      payment: payMethod,
    });
    setCart([]);
  };

  if (checkoutDone) {
    return (
      <div className="view">
        <div className="receipt-success">
          <CheckCircle2 size={40} strokeWidth={1.6} className="receipt-success__icon" />
          <h2>Pembayaran berhasil</h2>
          <p>Transaksi sebesar {formatRp(checkoutDone.total)} dengan {checkoutDone.payment} sudah tercatat.</p>
          <div className="receipt-mini">
            {checkoutDone.items.map((it, i) => (
              <div key={i} className="receipt-mini__row">
                <span>{it.qty}x {it.name}, {it.sizeLabel}</span>
                <span>{formatRp(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={onNewSale}>Mulai transaksi baru</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pos-layout">
      <div className="pos-products">
        <div className="pos-toolbar">
          <div className="search-box">
            <Search size={16} strokeWidth={2} />
            <input placeholder="Cari produk atau merek…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="chip-row">
            {["Semua", ...CATEGORIES].map((c) => (
              <button key={c} className={`chip ${category === c ? "chip--active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
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
          {filtered.length === 0 && <p className="empty-state">Produk tidak ditemukan.</p>}
        </div>
      </div>

      <aside className="pos-cart">
        <div className="pos-cart__head">
          <h2>Transaksi baru</h2>
          <span className="pos-cart__count">{cartLines.length} produk</span>
        </div>
        <div className="pos-cart__lines">
          {cartLines.length === 0 && <p className="empty-state">Pilih produk di sebelah kiri untuk memulai.</p>}
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
        <div className="pos-cart__pay">
          <div className="chip-row">
            {["Tunai", "Debit", "QRIS"].map((m) => (
              <button key={m} className={`chip ${payMethod === m ? "chip--active" : ""}`} onClick={() => setPayMethod(m)}>{m}</button>
            ))}
          </div>
          <div className="pos-cart__total">
            <span>Total</span>
            <span>{formatRp(total)}</span>
          </div>
          <button className="btn btn-primary btn-block" disabled={cartLines.length === 0} onClick={handleCheckout}>
            Selesaikan pembayaran
          </button>
        </div>
      </aside>
    </div>
  );
}

/* --------------------------------- stok --------------------------------- */

function StokView({ products, onAddProduct }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ name: "", brand: "", sizeLabel: "", category: "Kasur Springbed", price: "", stock: "", minStock: "" });

  const filtered = products.filter((p) => {
    const matchCat = category === "Semua" || p.category === category;
    const matchSearch = (p.name + p.brand).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const submit = () => {
    if (!draft.name || !draft.price) return;
    onAddProduct({
      ...draft,
      price: Number(draft.price) || 0,
      stock: Number(draft.stock) || 0,
      minStock: Number(draft.minStock) || 1,
    });
    setDraft({ name: "", brand: "", sizeLabel: "", category: "Kasur Springbed", price: "", stock: "", minStock: "" });
    setShowAdd(false);
  };

  return (
    <div className="view">
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
        <button className="btn btn-outline" onClick={() => setShowAdd((v) => !v)}>
          <PackagePlus size={16} strokeWidth={2} /> Tambah produk
        </button>
      </div>

      {showAdd && (
        <div className="panel add-product-panel">
          <div className="panel__head"><h2>Produk baru</h2></div>
          <div className="field-grid">
            <label>Nama produk<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="cth. Tidura Classic Ortho" /></label>
            <label>Merek<input value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} placeholder="cth. Tidura" /></label>
            <label>Ukuran<input value={draft.sizeLabel} onChange={(e) => setDraft({ ...draft, sizeLabel: e.target.value })} placeholder="cth. Queen 160x200" /></label>
            <label>Kategori
              <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>Harga jual<input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="4500000" /></label>
            <label>Stok awal<input type="number" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: e.target.value })} placeholder="10" /></label>
            <label>Batas stok minimum<input type="number" value={draft.minStock} onChange={(e) => setDraft({ ...draft, minStock: e.target.value })} placeholder="4" /></label>
          </div>
          <div className="field-actions">
            <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Batal</button>
            <button className="btn btn-primary" onClick={submit}>Simpan produk</button>
          </div>
        </div>
      )}

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr><th>Produk</th><th>Kategori</th><th className="ta-right">Harga</th><th>Stok</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="table-product__name">{p.name}</div>
                  <div className="table-product__meta">{p.brand} · {p.sizeLabel}</div>
                </td>
                <td>{p.category}</td>
                <td className="ta-right">{formatRp(p.price)}</td>
                <td><StockPill p={p} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="empty-state">Produk tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------- barang masuk/keluar ---------------------------- */

function MovementView({ type, products, movements, onSubmit }) {
  const isMasuk = type === "masuk";
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [reason, setReason] = useState(REASONS_KELUAR[0]);

  const selected = products.find((p) => p.id === Number(productId));
  const invalidQty = isMasuk ? false : selected && Number(qty) > selected.stock;

  const submit = () => {
    const q = Number(qty);
    if (!selected || !q || q <= 0 || invalidQty) return;
    onSubmit({
      type,
      productId: selected.id,
      productName: `${selected.name} — ${selected.sizeLabel}`,
      qty: q,
      note: isMasuk ? note || "Restock gudang" : `${reason}${note ? ` — ${note}` : ""}`,
    });
    setQty("");
    setNote("");
  };

  const list = movements.filter((m) => m.type === type);

  return (
    <div className="view">
      <div className="panel">
        <div className="panel__head"><h2>{isMasuk ? "Catat barang masuk" : "Catat barang keluar"}</h2></div>
        <div className="field-grid">
          <label>Produk
            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.sizeLabel}</option>)}
            </select>
          </label>
          <label>Jumlah
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" />
          </label>
          {isMasuk ? (
            <label>Catatan (opsional)
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="cth. kiriman pabrik rutin" />
            </label>
          ) : (
            <>
              <label>Alasan
                <select value={reason} onChange={(e) => setReason(e.target.value)}>
                  {REASONS_KELUAR.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </label>
              <label>Catatan (opsional)
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Detail tambahan" />
              </label>
            </>
          )}
        </div>
        {selected && (
          <p className="field-hint">
            Stok saat ini: <strong>{selected.stock}</strong>
            {invalidQty && <span className="field-hint--error"> · jumlah melebihi stok yang tersedia</span>}
          </p>
        )}
        <div className="field-actions">
          <button className={`btn ${isMasuk ? "btn-primary" : "btn-brick"}`} onClick={submit} disabled={!qty || invalidQty}>
            {isMasuk ? <ArrowDownToLine size={16} /> : <ArrowUpFromLine size={16} />}
            {isMasuk ? "Simpan penerimaan" : "Simpan pengeluaran"}
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head"><h2>Riwayat {isMasuk ? "barang masuk" : "barang keluar"}</h2></div>
        <table className="data-table">
          <thead><tr><th>Tanggal</th><th>Produk</th><th className="ta-right">Jumlah</th><th>Catatan</th></tr></thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id}>
                <td>{m.date}</td>
                <td>{m.productName}</td>
                <td className="ta-right">{m.qty}</td>
                <td className="table-product__meta">{m.note}</td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={4} className="empty-state">Belum ada riwayat.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------- laporan -------------------------------- */

function LaporanView() {
  return (
    <div className="view">
      <div className="panel">
        <div className="panel__head"><h2>Produk terlaris bulan ini</h2></div>
        <table className="data-table">
          <thead><tr><th>Produk</th><th className="ta-right">Terjual</th><th className="ta-right">Omzet</th></tr></thead>
          <tbody>
            {TOP_PRODUCTS.map((t) => (
              <tr key={t.name}>
                <td>{t.name}</td>
                <td className="ta-right">{t.terjual} unit</td>
                <td className="ta-right">{formatRp(t.omzet)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <div className="panel__head"><h2>Tren penjualan mingguan</h2></div>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={WEEKLY_SALES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#E7E2D6" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#6B655C", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} width={64} tick={{ fill: "#6B655C", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
              <Tooltip formatter={(v) => [formatRp(v), "Penjualan"]} contentStyle={{ borderRadius: 8, border: "1px solid #DAD4C7", fontFamily: "Inter, sans-serif", fontSize: 13 }} />
              <Bar dataKey="total" fill="#6B2E3A" radius={[5, 5, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState(PRODUCTS_INIT);
  const [movements, setMovements] = useState(MOVEMENTS_INIT);
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkoutDone, setCheckoutDone] = useState(null);

  const nextId = (arr) => (arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1);

  const handleCheckout = (sale) => {
    const record = { id: nextId(sales), time: "Baru saja", ...sale };
    setSales((prev) => [...prev, record]);
    setCheckoutDone(record);
  };

  const handleAddProduct = (p) => setProducts((prev) => [...prev, { id: nextId(prev), ...p }]);

  const handleMovement = (m) => {
    setMovements((prev) => [{ id: nextId(prev), date: "11 Sep 2026", by: "Gudang", ...m }, ...prev]);
    setProducts((prev) =>
      prev.map((p) => (p.id === m.productId ? { ...p, stock: m.type === "masuk" ? p.stock + m.qty : p.stock - m.qty } : p))
    );
  };

  return (
    <div className="app">
      <style>{CSS}</style>
      <Sidebar active={activeTab} onNavigate={(k) => { setActiveTab(k); setCheckoutDone(null); }} />
      <div className="main">
        <Topbar tabKey={activeTab} />
        <div className="main__content">
          {activeTab === "dashboard" && <DashboardView products={products} sales={sales} />}
          {activeTab === "kasir" && (
            <KasirView
              products={products}
              setProducts={setProducts}
              cart={cart}
              setCart={setCart}
              onCheckout={handleCheckout}
              checkoutDone={checkoutDone}
              onNewSale={() => setCheckoutDone(null)}
            />
          )}
          {activeTab === "stok" && <StokView products={products} onAddProduct={handleAddProduct} />}
          {activeTab === "masuk" && <MovementView type="masuk" products={products} movements={movements} onSubmit={handleMovement} />}
          {activeTab === "keluar" && <MovementView type="keluar" products={products} movements={movements} onSubmit={handleMovement} />}
          {activeTab === "laporan" && <LaporanView />}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- styles ---------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

.app {
  --ink: #202B3B;
  --ink-2: #2B3849;
  --paper: #F1EEE6;
  --surface: #FBFAF6;
  --brass: #AD7A3F;
  --brass-dark: #8F6431;
  --plum: #6B2E3A;
  --sage: #55735C;
  --sage-bg: #E4EAE1;
  --rust: #B5502E;
  --rust-bg: #F3E3D8;
  --brick: #9C3B34;
  --brick-bg: #F5E1DE;
  --text: #241F1A;
  --text-muted: #6B655C;
  --border: #DAD4C7;
  --border-soft: #E7E2D6;
  display: flex;
  height: 100vh;
  width: 100%;
  background: var(--paper);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.sidebar { width: 232px; flex-shrink: 0; background: var(--ink); color: #EDEAE2; display: flex; flex-direction: column; }
.brand { display: flex; align-items: center; gap: 10px; padding: 22px 18px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.brand__mark { width: 32px; height: 32px; border-radius: 8px; background: var(--brass); color: var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.brand__name { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; font-style: italic; line-height: 1.1; }
.brand__tag { font-size: 11.5px; color: #A7A091; margin-top: 2px; }

.nav { display: flex; flex-direction: column; padding: 14px 10px; gap: 2px; flex: 1; }
.nav__item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 7px; color: #C7C2B6; background: transparent; border: none; border-left: 2px solid transparent; text-align: left; font-size: 13.5px; font-family: inherit; cursor: pointer; }
.nav__item:hover { background: var(--ink-2); color: #fff; }
.nav__item--active { background: var(--ink-2); color: #fff; border-left: 2px solid var(--brass); font-weight: 600; }

.sidebar__footer { display: flex; align-items: center; gap: 10px; padding: 16px 18px; border-top: 1px solid rgba(255,255,255,0.08); }
.sidebar__avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--plum); color: #F5E9E9; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; }
.sidebar__user { font-size: 12.5px; font-weight: 600; color: #EDEAE2; }
.sidebar__role { font-size: 11px; color: #A7A091; }

.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.topbar { display: flex; align-items: flex-start; justify-content: space-between; padding: 20px 32px; border-bottom: 1px solid var(--border-soft); background: var(--surface); }
.topbar__title { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 600; margin: 0; }
.topbar__sub { margin: 3px 0 0; color: var(--text-muted); font-size: 13px; }
.topbar__meta { color: var(--text-muted); font-size: 12.5px; padding-top: 4px; }

.main__content { flex: 1; overflow-y: auto; padding: 26px 32px 40px; }
.view { display: flex; flex-direction: column; gap: 22px; }

.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.kpi-card { background: var(--surface); border: 1px solid var(--border-soft); border-left: 3px solid var(--border); border-radius: 8px; padding: 16px 18px; }
.kpi-card--brass { border-left-color: var(--brass); }
.kpi-card--plum { border-left-color: var(--plum); }
.kpi-card--rust { border-left-color: var(--rust); }
.kpi-card--sage { border-left-color: var(--sage); }
.kpi-card__label { font-size: 12.5px; color: var(--text-muted); }
.kpi-card__value { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; margin-top: 6px; }
.kpi-card__note { font-size: 11.5px; color: var(--text-muted); margin-top: 5px; }

.dash-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; align-items: start; }

.panel { background: var(--surface); border: 1px solid var(--border-soft); border-radius: 8px; padding: 18px 20px; }
.panel__head h2 { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; margin: 0 0 14px; }

.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { text-align: left; font-weight: 600; color: var(--text-muted); font-size: 11.5px; padding: 0 10px 8px; border-bottom: 1px solid var(--border-soft); }
.data-table td { padding: 10px; border-bottom: 1px solid var(--border-soft); vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.ta-right { text-align: right; }
.table-product__name { font-weight: 600; }
.table-product__meta { color: var(--text-muted); font-size: 12px; margin-top: 2px; }

.pill { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.pill--sm { padding: 2px 8px; font-size: 11px; }
.pill__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.pill--sage { background: var(--sage-bg); color: var(--sage); }
.pill--rust { background: var(--rust-bg); color: var(--rust); }
.pill--brick { background: var(--brick-bg); color: var(--brick); }

.low-stock-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.low-stock-item { display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid var(--border-soft); }
.low-stock-item:last-child { border-bottom: none; padding-bottom: 0; }
.low-stock-item__name { font-weight: 600; font-size: 13px; }
.low-stock-item__meta { color: var(--text-muted); font-size: 11.5px; margin-top: 1px; }

.empty-state { color: var(--text-muted); font-size: 13px; padding: 14px 0; text-align: center; }

.btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 7px; border: 1px solid transparent; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.btn-primary { background: var(--brass); color: #fff; }
.btn-primary:hover { background: var(--brass-dark); }
.btn-primary:disabled { background: #C9BFAE; cursor: not-allowed; }
.btn-outline { background: transparent; border-color: var(--border); color: var(--text); }
.btn-outline:hover { border-color: var(--brass); color: var(--brass-dark); }
.btn-ghost { background: transparent; color: var(--text-muted); }
.btn-brick { background: var(--brick); color: #fff; }
.btn-brick:hover { background: #82302A; }
.btn-brick:disabled { background: #C9BFAE; cursor: not-allowed; }
.btn-block { width: 100%; justify-content: center; }

.pos-toolbar { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 16px; }
.pos-toolbar--wide { justify-content: space-between; }
.search-box { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 7px; padding: 8px 12px; min-width: 220px; color: var(--text-muted); }
.search-box input { border: none; outline: none; background: transparent; font-family: inherit; font-size: 13px; color: var(--text); flex: 1; }
.chip-row { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { padding: 6px 13px; border-radius: 20px; border: 1px solid var(--border); background: var(--surface); font-family: inherit; font-size: 12.5px; color: var(--text-muted); cursor: pointer; }
.chip--active { background: var(--ink); color: #fff; border-color: var(--ink); }

.pos-layout { display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start; height: 100%; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 12px; }
.product-card { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--border-soft); border-radius: 9px; padding: 0; overflow: hidden; text-align: left; cursor: pointer; font-family: inherit; }
.product-card:hover { border-color: var(--brass); }
.product-card--disabled { opacity: 0.45; cursor: not-allowed; }
.product-card__swatch { height: 64px; display: flex; align-items: center; justify-content: center; color: #fff; }
.swatch--1 { background: #6B2E3A; } .swatch--2 { background: #AD7A3F; } .swatch--3 { background: #3E5A63; } .swatch--4 { background: #55735C; } .swatch--5 { background: #7A5C8E; }
.product-card__body { padding: 10px 12px 12px; }
.product-card__name { font-weight: 600; font-size: 13px; line-height: 1.3; }
.product-card__meta { color: var(--text-muted); font-size: 11.5px; margin-top: 2px; }
.product-card__foot { display: flex; align-items: center; justify-content: space-between; margin-top: 9px; }
.product-card__price { font-weight: 700; font-size: 13px; color: var(--brass-dark); }

.pos-cart { background: var(--surface); border: 1px solid var(--border-soft); border-radius: 10px; padding: 18px; display: flex; flex-direction: column; position: sticky; top: 0; clip-path: polygon(0 0,100% 0,100% 97%,96% 100%,92% 97%,88% 100%,84% 97%,80% 100%,76% 97%,72% 100%,68% 97%,64% 100%,60% 97%,56% 100%,52% 97%,48% 100%,44% 97%,40% 100%,36% 97%,32% 100%,28% 97%,24% 100%,20% 97%,16% 100%,12% 97%,8% 100%,4% 97%,0 100%); padding-bottom: 26px; }
.pos-cart__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.pos-cart__head h2 { font-family: 'Fraunces', serif; font-size: 16px; margin: 0; }
.pos-cart__count { font-size: 11.5px; color: var(--text-muted); }
.pos-cart__lines { display: flex; flex-direction: column; gap: 12px; max-height: 320px; overflow-y: auto; padding-right: 2px; }
.cart-item { display: grid; grid-template-columns: 1fr auto auto auto; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 1px dashed var(--border); }
.cart-item__name { font-size: 12.5px; font-weight: 600; }
.cart-item__meta { font-size: 11px; color: var(--text-muted); }
.cart-item__price { font-size: 12.5px; font-weight: 600; white-space: nowrap; }
.cart-item__remove { background: none; border: none; color: var(--brick); cursor: pointer; padding: 4px; }
.qty-stepper { display: flex; align-items: center; gap: 6px; }
.qty-stepper button { width: 20px; height: 20px; border-radius: 5px; border: 1px solid var(--border); background: var(--paper); display: flex; align-items: center; justify-content: center; cursor: pointer; }
.qty-stepper span { font-size: 12.5px; font-weight: 600; min-width: 14px; text-align: center; }

.pos-cart__pay { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 12px; }
.pos-cart__total { display: flex; align-items: center; justify-content: space-between; font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; }

.receipt-success { max-width: 380px; margin: 40px auto; background: var(--surface); border: 1px solid var(--border-soft); border-radius: 10px; padding: 28px; text-align: center; }
.receipt-success__icon { color: var(--sage); margin-bottom: 8px; }
.receipt-success h2 { font-family: 'Fraunces', serif; margin: 4px 0 6px; }
.receipt-success p { color: var(--text-muted); font-size: 13px; margin: 0 0 16px; }
.receipt-mini { text-align: left; border-top: 1px dashed var(--border); padding-top: 12px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 6px; }
.receipt-mini__row { display: flex; justify-content: space-between; font-size: 12.5px; }

.add-product-panel { border-color: var(--brass); }
.field-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.field-grid label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--text-muted); font-weight: 600; }
.field-grid input, .field-grid select { border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; font-family: inherit; font-size: 13px; color: var(--text); background: var(--paper); }
.field-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.field-hint { font-size: 12px; color: var(--text-muted); margin: 12px 0 0; }
.field-hint--error { color: var(--brick); }

@media (max-width: 980px) {
  .sidebar { width: 76px; }
  .brand__name, .brand__tag, .nav__item span, .sidebar__user, .sidebar__role { display: none; }
  .brand { justify-content: center; }
  .sidebar__footer { justify-content: center; }
  .nav__item { justify-content: center; }
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .dash-grid { grid-template-columns: 1fr; }
  .pos-layout { grid-template-columns: 1fr; }
  .field-grid { grid-template-columns: 1fr; }
}
`;
