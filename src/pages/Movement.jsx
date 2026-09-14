import React, { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useApp } from "../context/AppContext";
import { REASONS_KELUAR } from "../data/seed";
import { EmptyState } from "../components/Common";

export default function Movement({ type }) {
  const { products, suppliers, movements, addMovement } = useApp();
  const isMasuk = type === "masuk";
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || "");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [reason, setReason] = useState(REASONS_KELUAR[0]);

  const selected = products.find((p) => p.id === Number(productId));
  const invalidQty = isMasuk ? false : selected && Number(qty) > selected.stock;

  const submit = () => {
    const q = Number(qty);
    if (!selected || !q || q <= 0 || invalidQty) return;
    const supplier = suppliers.find((s) => s.id === Number(supplierId));
    addMovement({
      type,
      productId: selected.id,
      productName: `${selected.name} — ${selected.sizeLabel}`,
      qty: q,
      supplier: isMasuk ? supplier?.name : undefined,
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
            <>
              <label>Supplier
                <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
                  {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </label>
              <label>Catatan (opsional)
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="cth. kiriman pabrik rutin" />
              </label>
            </>
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
          <thead><tr><th>Tanggal</th><th>Produk</th><th className="ta-right">Jumlah</th>{isMasuk && <th>Supplier</th>}<th>Catatan</th><th>Oleh</th></tr></thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id}>
                <td>{m.date}</td>
                <td>{m.productName}</td>
                <td className="ta-right">{m.qty}</td>
                {isMasuk && <td>{m.supplier || "-"}</td>}
                <td className="table-product__meta">{m.note}</td>
                <td className="table-product__meta">{m.by}</td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={isMasuk ? 6 : 5} className="empty-state">Belum ada riwayat.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
