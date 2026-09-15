import React, { useState } from "react";
import { Users, Plus, Pencil, Trash2, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatRp } from "../utils/helpers";
import { Modal, EmptyState } from "../components/Common";

const BLANK = { name: "", phone: "", address: "", type: "member" };
const TYPE_LABEL = { umum: "Umum", member: "Member", korporat: "Korporat" };

function CustomerForm({ initial, onCancel, onSubmit }) {
  const [draft, setDraft] = useState(initial);
  const submit = () => {
    if (!draft.name) return;
    onSubmit(draft);
  };
  return (
    <Modal title={initial.id ? `Ubah pelanggan — ${initial.name}` : "Tambah pelanggan"} onClose={onCancel}>
      <div className="field-grid field-grid--single">
        <label>Nama<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Nama pelanggan" /></label>
        <label>No. telepon<input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="0812-xxxx-xxxx" /></label>
        <label>Alamat<input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} placeholder="Alamat pelanggan" /></label>
        <label>Tipe pelanggan
          <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
            <option value="member">Member</option>
            <option value="korporat">Korporat</option>
            <option value="umum">Umum</option>
          </select>
        </label>
      </div>
      <div className="field-actions">
        <button className="btn btn-ghost" onClick={onCancel}>Batal</button>
        <button className="btn btn-primary" onClick={submit}>Simpan</button>
      </div>
    </Modal>
  );
}

export default function Pelanggan() {
  const { customers, addCustomer, updateCustomer, deleteCustomer, sales, can } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [detail, setDetail] = useState(null);

  const historyFor = (id) => sales.filter((s) => s.customerId === id);

  return (
    <div className="view">
      <div className="pos-toolbar pos-toolbar--wide">
        <h2 className="section-title"><Users size={17} /> Data pelanggan</h2>
        {can("pelanggan", "tambah") && (
          <button className="btn btn-outline" onClick={() => setShowAdd(true)}><Plus size={16} /> Tambah pelanggan</button>
        )}
      </div>

      <div className="panel">
        <div className="table-scroll"><table className="data-table">
          <thead><tr><th>Nama</th><th>Tipe</th><th>Telepon</th><th className="ta-right">Total belanja</th><th className="ta-right">Poin</th><th className="ta-right">Aksi</th></tr></thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="table-product__name link-cell" onClick={() => setDetail(c)}>{c.name}</td>
                <td><span className="pill pill--brass pill--sm">{TYPE_LABEL[c.type] || c.type}</span></td>
                <td>{c.phone}</td>
                <td className="ta-right">{formatRp(c.totalBelanja)}</td>
                <td className="ta-right">{c.points > 0 ? <span className="points-badge"><Star size={11} /> {c.points}</span> : "-"}</td>
                <td className="ta-right">
                  <div className="row-actions">
                    {can("pelanggan", "ubah") && <button className="btn-icon" onClick={() => setEditing(c)}><Pencil size={14} /></button>}
                    {can("pelanggan", "hapus") && c.id !== 1 && <button className="btn-icon btn-icon--danger" onClick={() => setConfirmDelete(c)}><Trash2 size={14} /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>

      {showAdd && (
        <CustomerForm initial={BLANK} onCancel={() => setShowAdd(false)} onSubmit={(c) => { addCustomer(c); setShowAdd(false); }} />
      )}
      {editing && (
        <CustomerForm initial={editing} onCancel={() => setEditing(null)} onSubmit={(c) => { updateCustomer(editing.id, c); setEditing(null); }} />
      )}
      {confirmDelete && (
        <Modal title="Hapus pelanggan?" onClose={() => setConfirmDelete(null)} width={420}>
          <p className="field-hint">Yakin ingin menghapus <strong>{confirmDelete.name}</strong>?</p>
          <div className="field-actions">
            <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>Batal</button>
            <button className="btn btn-brick" onClick={() => { deleteCustomer(confirmDelete.id); setConfirmDelete(null); }}>Hapus</button>
          </div>
        </Modal>
      )}
      {detail && (
        <Modal title={`Riwayat belanja — ${detail.name}`} onClose={() => setDetail(null)} width={560}>
          {historyFor(detail.id).length === 0 ? (
            <EmptyState>Belum ada transaksi dari pelanggan ini pada sesi ini.</EmptyState>
          ) : (
            <div className="table-scroll"><table className="data-table">
              <thead><tr><th>Invoice</th><th>Waktu</th><th>Metode</th><th className="ta-right">Total</th></tr></thead>
              <tbody>
                {historyFor(detail.id).slice().reverse().map((s) => (
                  <tr key={s.id}>
                    <td>{s.invoiceNo}</td>
                    <td>{s.time}</td>
                    <td>{s.payment}</td>
                    <td className="ta-right">{formatRp(s.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          )}
        </Modal>
      )}
    </div>
  );
}
