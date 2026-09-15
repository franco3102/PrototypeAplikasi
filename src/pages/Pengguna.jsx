import React, { useState } from "react";
import { UserPlus, Pencil, Trash2, Power } from "lucide-react";
import { useApp } from "../context/AppContext";
import { initials } from "../utils/helpers";
import { Modal, StatusPill, RoleBadge } from "../components/Common";

const BLANK = { name: "", username: "", phone: "", role: "kasir" };

function UserForm({ initial, roles, onCancel, onSubmit }) {
  const [draft, setDraft] = useState(initial);
  const submit = () => {
    if (!draft.name || !draft.username) return;
    onSubmit(draft);
  };
  return (
    <Modal title={initial.id ? `Ubah pengguna — ${initial.name}` : "Tambah pengguna baru"} onClose={onCancel}>
      <div className="field-grid field-grid--single">
        <label>Nama lengkap<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="cth. Dewi Lestari" /></label>
        <label>Username<input value={draft.username} onChange={(e) => setDraft({ ...draft, username: e.target.value })} placeholder="cth. dewi.kasir" /></label>
        <label>No. telepon<input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="0812-xxxx-xxxx" /></label>
        <label>Role / jabatan
          <select value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}>
            {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </label>
        {!initial.id && (
          <label>Password awal<input type="password" placeholder="Bebas untuk mode demo" /></label>
        )}
      </div>
      <div className="field-actions">
        <button className="btn btn-ghost" onClick={onCancel}>Batal</button>
        <button className="btn btn-primary" onClick={submit}>Simpan</button>
      </div>
    </Modal>
  );
}

export default function Pengguna() {
  const { users, roles, currentUser, addUser, updateUser, deleteUser, toggleUserStatus, can } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const roleName = (id) => roles.find((r) => r.id === id)?.name || id;

  return (
    <div className="view">
      <div className="pos-toolbar pos-toolbar--wide">
        <h2 className="section-title">Daftar pengguna ({users.length})</h2>
        {can("pengguna", "tambah") && (
          <button className="btn btn-outline" onClick={() => setShowAdd(true)}><UserPlus size={16} /> Tambah pengguna</button>
        )}
      </div>

      <div className="panel">
        <div className="table-scroll"><table className="data-table">
          <thead><tr><th>Pengguna</th><th>Role</th><th>Login terakhir</th><th>Status</th><th className="ta-right">Aksi</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="user-cell">
                    <span className="sidebar__avatar user-cell__avatar">{initials(u.name)}</span>
                    <div>
                      <div className="table-product__name">{u.name}{u.id === currentUser?.id && " (Anda)"}</div>
                      <div className="table-product__meta">@{u.username} · {u.phone}</div>
                    </div>
                  </div>
                </td>
                <td><RoleBadge label={roleName(u.role)} /></td>
                <td className="table-product__meta">{u.lastLogin}</td>
                <td><StatusPill status={u.status} /></td>
                <td className="ta-right">
                  <div className="row-actions">
                    {can("pengguna", "ubah") && <button className="btn-icon" title="Ubah" onClick={() => setEditing(u)}><Pencil size={14} /></button>}
                    {can("pengguna", "ubah") && u.id !== currentUser?.id && (
                      <button className="btn-icon" title={u.status === "aktif" ? "Nonaktifkan" : "Aktifkan"} onClick={() => toggleUserStatus(u.id)}><Power size={14} /></button>
                    )}
                    {can("pengguna", "hapus") && u.id !== currentUser?.id && (
                      <button className="btn-icon btn-icon--danger" title="Hapus" onClick={() => setConfirmDelete(u)}><Trash2 size={14} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>

      {showAdd && (
        <UserForm initial={BLANK} roles={roles} onCancel={() => setShowAdd(false)} onSubmit={(u) => { addUser(u); setShowAdd(false); }} />
      )}
      {editing && (
        <UserForm initial={editing} roles={roles} onCancel={() => setEditing(null)} onSubmit={(u) => { updateUser(editing.id, u); setEditing(null); }} />
      )}
      {confirmDelete && (
        <Modal title="Hapus pengguna?" onClose={() => setConfirmDelete(null)} width={420}>
          <p className="field-hint">Yakin ingin menghapus akun <strong>{confirmDelete.name}</strong>? Riwayat transaksi yang sudah tercatat tidak akan terhapus.</p>
          <div className="field-actions">
            <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>Batal</button>
            <button className="btn btn-brick" onClick={() => { deleteUser(confirmDelete.id); setConfirmDelete(null); }}>Hapus</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
