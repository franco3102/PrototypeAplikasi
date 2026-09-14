import React from "react";
import { X, Lock } from "lucide-react";
import { stockStatus } from "../utils/helpers";
import { useApp } from "../context/AppContext";

export function StockPill({ p }) {
  const s = stockStatus(p);
  return (
    <span className={`pill pill--${s.tone}`}>
      <span className="pill__dot" />
      {s.label} · {p.stock}
    </span>
  );
}

const STATUS_TONE = { aktif: "sage", nonaktif: "brick", berjalan: "brass", selesai: "sage" };

export function StatusPill({ status }) {
  return (
    <span className={`pill pill--${STATUS_TONE[status] || "rust"}`}>
      <span className="pill__dot" />
      {status}
    </span>
  );
}

export function RoleBadge({ label }) {
  return <span className="role-badge">{label}</span>;
}

export function Modal({ title, onClose, children, width = 520 }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-box__head">
          <h2>{title}</h2>
          <button className="btn-icon" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-box__body">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ children }) {
  return <p className="empty-state">{children}</p>;
}

// Membungkus sebuah halaman dan menolak akses bila role user tidak memiliki izin "lihat".
export function PermissionGate({ moduleKey, action = "lihat", children }) {
  const { can } = useApp();
  if (!can(moduleKey, action)) {
    return (
      <div className="access-denied">
        <Lock size={30} strokeWidth={1.5} />
        <h2>Akses ditolak</h2>
        <p>Akun Anda tidak memiliki hak akses untuk membuka halaman ini. Hubungi admin/pemilik toko jika ini seharusnya diizinkan.</p>
      </div>
    );
  }
  return children;
}
