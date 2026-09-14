import React, { useState } from "react";
import { ShieldCheck, Plus, Info } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MODULES } from "../utils/permissions";
import { Modal } from "../components/Common";

const ACTION_LABEL = { lihat: "Lihat", tambah: "Tambah", ubah: "Ubah", hapus: "Hapus" };

function AddRoleForm({ onCancel, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Modal title="Tambah role baru" onClose={onCancel}>
      <div className="field-grid field-grid--single">
        <label>Nama role<input value={name} onChange={(e) => setName(e.target.value)} placeholder="cth. Supervisor Shift" /></label>
        <label>Deskripsi<input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ringkasan tanggung jawab role ini" /></label>
      </div>
      <div className="field-actions">
        <button className="btn btn-ghost" onClick={onCancel}>Batal</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (!name) return;
            onSubmit({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "_"), name, description });
          }}
        >
          Simpan role
        </button>
      </div>
    </Modal>
  );
}

export default function HakAkses() {
  const { roles, permissions, updatePermission, addRole, can } = useApp();
  const [activeRole, setActiveRole] = useState(roles[0]?.id);
  const [showAddRole, setShowAddRole] = useState(false);
  const canEdit = can("hak_akses", "ubah");

  const role = roles.find((r) => r.id === activeRole) || roles[0];

  return (
    <div className="view">
      <div className="pos-toolbar pos-toolbar--wide">
        <h2 className="section-title"><ShieldCheck size={17} /> Hak akses per role</h2>
        {canEdit && (
          <button className="btn btn-outline" onClick={() => setShowAddRole(true)}><Plus size={16} /> Tambah role</button>
        )}
      </div>

      <div className="chip-row">
        {roles.map((r) => (
          <button key={r.id} className={`chip ${activeRole === r.id ? "chip--active" : ""}`} onClick={() => setActiveRole(r.id)}>{r.name}</button>
        ))}
      </div>

      {role && (
        <div className="panel">
          <div className="panel__head">
            <h2>{role.name}</h2>
            <p className="field-hint"><Info size={13} /> {role.description}</p>
          </div>

          {!canEdit && (
            <p className="field-hint field-hint--error">Anda hanya dapat melihat matriks hak akses ini. Hanya Pemilik/Admin yang dapat mengubahnya.</p>
          )}
          {role.id === "owner" && (
            <p className="field-hint">Role Pemilik/Admin selalu memiliki akses penuh dan tidak dapat dibatasi, untuk mencegah terkunci dari sistem.</p>
          )}

          <table className="data-table permission-table">
            <thead>
              <tr>
                <th>Modul</th>
                {["lihat", "tambah", "ubah", "hapus"].map((a) => <th key={a} className="ta-center">{ACTION_LABEL[a]}</th>)}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((mod) => (
                <tr key={mod.key}>
                  <td className="table-product__name">{mod.label}</td>
                  {["lihat", "tambah", "ubah", "hapus"].map((a) => {
                    if (!mod.actions.includes(a)) return <td key={a} className="ta-center">—</td>;
                    const checked = Boolean(permissions[role.id]?.[mod.key]?.[a]);
                    return (
                      <td key={a} className="ta-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={!canEdit || role.id === "owner"}
                          onChange={(e) => updatePermission(role.id, mod.key, a, e.target.checked)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddRole && (
        <AddRoleForm onCancel={() => setShowAddRole(false)} onSubmit={(r) => { addRole(r); setActiveRole(r.id); setShowAddRole(false); }} />
      )}
    </div>
  );
}
