import React, { useState } from "react";
import { Search, PackagePlus, Pencil, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatRp } from "../utils/helpers";
import { CATEGORIES } from "../data/seed";
import { StockPill, Modal, EmptyState } from "../components/Common";

const BLANK = { name: "", brand: "", sizeLabel: "", category: CATEGORIES[0], price: "", cost: "", stock: "", minStock: "", sku: "" };

function ProductForm({ initial, onCancel, onSubmit, title }) {
  const [draft, setDraft] = useState(initial);
  const submit = () => {
    if (!draft.name || !draft.price) return;
    onSubmit({
      ...draft,
      price: Number(draft.price) || 0,
      cost: Number(draft.cost) || 0,
      stock: Number(draft.stock) || 0,
      minStock: Number(draft.minStock) || 1,
    });
  };
  return (
    <div className="panel add-product-panel">
      <div className="panel__head"><h2>{title}</h2></div>
      <div className="field-grid">
        <label>Nama produk<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="cth. Tidura Classic Ortho" /></label>
        <label>SKU<input value={draft.sku} onChange={(e) => setDraft({ ...draft, sku: e.target.value })} placeholder="cth. TDR-001" /></label>
        <label>Merek<input value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} placeholder="cth. Tidura" /></label>
        <label>Ukuran<input value={draft.sizeLabel} onChange={(e) => setDraft({ ...draft, sizeLabel: e.target.value })} placeholder="cth. Queen 160x200" /></label>
        <label>Kategori
          <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>Harga beli (modal)<input type="number" value={draft.cost} onChange={(e) => setDraft({ ...draft, cost: e.target.value })} placeholder="3200000" /></label>
        <label>Harga jual<input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="4500000" /></label>
        <label>Stok<input type="number" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: e.target.value })} placeholder="10" /></label>
        <label>Batas stok minimum<input type="number" value={draft.minStock} onChange={(e) => setDraft({ ...draft, minStock: e.target.value })} placeholder="4" /></label>
      </div>
      <div className="field-actions">
        <button className="btn btn-ghost" onClick={onCancel}>Batal</button>
        <button className="btn btn-primary" onClick={submit}>Simpan produk</button>
      </div>
    </div>
  );
}

export default function Stok() {
  const { products, addProduct, updateProduct, deleteProduct, can } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const canEdit = can("produk", "ubah");
  const canDelete = can("produk", "hapus");
  const canCreate = can("produk", "tambah");

  const filtered = products.filter((p) => {
    const matchCat = category === "Semua" || p.category === category;
    const matchSearch = (p.name + p.brand + (p.sku || "")).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="view">
      <div className="pos-toolbar pos-toolbar--wide">
        <div className="search-box">
          <Search size={16} strokeWidth={2} />
          <input placeholder="Cari produk, merek, atau SKU…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="chip-row">
          {["Semua", ...CATEGORIES].map((c) => (
            <button key={c} className={`chip ${category === c ? "chip--active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        {canCreate && (
          <button className="btn btn-outline" onClick={() => setShowAdd((v) => !v)}>
            <PackagePlus size={16} strokeWidth={2} /> Tambah produk
          </button>
        )}
      </div>

      {showAdd && (
        <ProductForm
          initial={BLANK}
          title="Produk baru"
          onCancel={() => setShowAdd(false)}
          onSubmit={(p) => { addProduct(p); setShowAdd(false); }}
        />
      )}

      {editing && (
        <ProductForm
          initial={editing}
          title={`Ubah produk — ${editing.name}`}
          onCancel={() => setEditing(null)}
          onSubmit={(p) => { updateProduct(editing.id, p); setEditing(null); }}
        />
      )}

      <div className="panel">
        <div className="table-scroll"><table className="data-table">
          <thead>
            <tr>
              <th>Produk</th><th>Kategori</th><th className="ta-right">Harga beli</th><th className="ta-right">Harga jual</th><th>Stok</th>
              {(canEdit || canDelete) && <th className="ta-right">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="table-product__name">{p.name}</div>
                  <div className="table-product__meta">{p.brand} · {p.sizeLabel} · SKU {p.sku || "-"}</div>
                </td>
                <td>{p.category}</td>
                <td className="ta-right">{formatRp(p.cost)}</td>
                <td className="ta-right">{formatRp(p.price)}</td>
                <td><StockPill p={p} /></td>
                {(canEdit || canDelete) && (
                  <td className="ta-right">
                    <div className="row-actions">
                      {canEdit && <button className="btn-icon" title="Ubah" onClick={() => setEditing(p)}><Pencil size={14} /></button>}
                      {canDelete && <button className="btn-icon btn-icon--danger" title="Hapus" onClick={() => setConfirmDelete(p)}><Trash2 size={14} /></button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="empty-state">Produk tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table></div>
      </div>

      {confirmDelete && (
        <Modal title="Hapus produk?" onClose={() => setConfirmDelete(null)} width={420}>
          <p className="field-hint">Yakin ingin menghapus <strong>{confirmDelete.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
          <div className="field-actions">
            <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>Batal</button>
            <button className="btn btn-brick" onClick={() => { deleteProduct(confirmDelete.id); setConfirmDelete(null); }}>Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
