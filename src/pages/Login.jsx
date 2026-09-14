import React, { useState } from "react";
import { BedDouble, LogIn, AlertTriangle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { ROLE_LABELS } from "../utils/permissions";
import { initials } from "../utils/helpers";

export default function Login() {
  const { users, login } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const attemptLogin = (user) => {
    if (!user) {
      setError("Username tidak ditemukan. Coba salah satu akun demo di bawah.");
      return;
    }
    if (user.status !== "aktif") {
      setError("Akun ini sudah dinonaktifkan. Hubungi admin/pemilik toko.");
      return;
    }
    setError("");
    login({ ...user, roleLabel: ROLE_LABELS[user.role] });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Isi username dan password terlebih dahulu.");
      return;
    }
    const user = users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());
    attemptLogin(user);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand__mark"><BedDouble size={20} strokeWidth={2} /></span>
          <div>
            <div className="login-brand__name">Tidura</div>
            <div className="login-brand__tag">ERP &amp; Kasir Penjualan Springbed</div>
          </div>
        </div>

        <form className="login-form" onSubmit={submit}>
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="cth. andi.owner" autoComplete="username" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          </label>
          {error && (
            <p className="field-hint field-hint--error"><AlertTriangle size={13} /> {error}</p>
          )}
          <button className="btn btn-primary btn-block" type="submit">
            <LogIn size={16} /> Masuk
          </button>
        </form>

        <div className="login-divider"><span>atau login cepat (demo)</span></div>

        <div className="login-quick-list">
          {users.filter((u) => u.status === "aktif").map((u) => (
            <button key={u.id} className="login-quick-item" onClick={() => attemptLogin(u)}>
              <span className="sidebar__avatar login-quick-item__avatar">{initials(u.name)}</span>
              <span>
                <span className="login-quick-item__name">{u.name}</span>
                <span className="login-quick-item__role">{ROLE_LABELS[u.role]}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="login-note">Mode demo: password apa pun akan diterima untuk akun di atas. Setiap role menampilkan menu dan hak akses yang berbeda.</p>
      </div>
    </div>
  );
}
