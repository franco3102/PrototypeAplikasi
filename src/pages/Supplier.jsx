import React, { useState } from "react";
import { Truck, Plus, Pencil, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Modal, EmptyState } from "../components/Common";

const BLANK = { name: "", contact: "", phone: "", address: "", terms: "Tunai" };

function SupplierForm({ initial, onCancel, onSubmit }) {
  const [draft, setDraft] = useState(initial);
  const submit = () => {
    if (!draft.name) return;
    onSubmit(draft);
  };
  return (
    <Modal title={initial.id ? `Ubah supplier — ${initial.name}` : "Tambah supplier"} onClose={onCancel}>
      <div className="field-grid field-grid--single">
        <label>Nama perusahaan<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="cth. PT Sumber Busa Makmur" /></label>
        <label>Nama kontak<input value={draft.contact} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} placeholder="cth. Budi Santoso" /></label>
        <label>No. telepon<input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="0812-xxxx-xxxx" /></label>
        <label>Alamat<input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} placeholder="Alamat gudang/kantor" /></label>
        <label>Termin pembayaran<input value={draft.terms} onChange={(e) => setDraft({ ...draft, terms: e.target.value })} placeholder="cth. Tempo 30 hari" /></label>
      </div>
      <div className="field-actions">
        <button className="btn btn-ghost" onClick={onCancel}>Batal</button>
        <button className="btn btn-primary" onClick={submit}>Simpan</button>
      </div>
    </Modal>
  );
}

export default function Supplier() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, can } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  return (
    <div className="view">
      <div className="pos-toolbar pos-toolbar--wide">
        <h2 className="section-title"><Truck size={17} /> Daftar supplier</h2>
        {can("supplier", "tambah") && (
          <button className="btn btn-outline" onClick={() => setShowAdd(true)}><Plus size={16} /> Tambah supplier</button>
        )}
      </div>

      <div className="panel">
        {suppliers.length === 0 ? (
          <EmptyState>Belum ada data supplier.</EmptyState>
        ) : (
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>Supplier</th><th>Kontak</th><th>Telepon</th><th>Termin</th><th className="ta-right">Aksi</th></tr></thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="table-product__name">{s.name}</div>
                    <div className="table-product__meta">{s.address}</div>
                  </td>
                  <td>{s.contact}</td>
                  <td>{s.phone}</td>
                  <td>{s.terms}</td>
                  <td className="ta-right">
                    <div className="row-actions">
                      {can("supplier", "ubah") && <button className="btn-icon" onClick={() => setEditing(s)}><Pencil size={14} /></button>}
                      {can("supplier", "hapus") && <button className="btn-icon btn-icon--danger" onClick={() => setConfirmDelete(s)}><Trash2 size={14} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
        )}
      </div>

      {showAdd && (
        <SupplierForm initial={BLANK} onCancel={() => setShowAdd(false)} onSubmit={(s) => { addSupplier(s); setShowAdd(false); }} />
      )}
      {editing && (
        <SupplierForm initial={editing} onCancel={() => setEditing(null)} onSubmit={(s) => { updateSupplier(editing.id, s); setEditing(null); }} />
      )}
      {confirmDelete && (
        <Modal title="Hapus supplier?" onClose={() => setConfirmDelete(null)} width={420}>
          <p className="field-hint">Yakin ingin menghapus <strong>{confirmDelete.name}</strong>?</p>
          <div className="field-actions">
            <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>Batal</button>
            <button className="btn btn-brick" onClick={() => { deleteSupplier(confirmDelete.id); setConfirmDelete(null); }}>Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
