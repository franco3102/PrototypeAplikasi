import React, { useState } from "react";
import { Store, Percent, CreditCard, Receipt as ReceiptIcon, Save } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Pengaturan() {
  const { settings, updateSettings, paymentMethods, togglePaymentMethod, can } = useApp();
  const [form, setForm] = useState(settings);
  const canEdit = can("pengaturan", "ubah");

  const save = () => updateSettings(form);

  return (
    <div className="view">
      <div className="panel">
        <div className="panel__head"><h2><Store size={16} /> Profil toko</h2></div>
        <div className="field-grid">
          <label>Nama toko<input value={form.storeName} disabled={!canEdit} onChange={(e) => setForm({ ...form, storeName: e.target.value })} /></label>
          <label>No. telepon<input value={form.phone} disabled={!canEdit} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
          <label>Alamat<input value={form.address} disabled={!canEdit} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
          <label>NPWP<input value={form.npwp} disabled={!canEdit} onChange={(e) => setForm({ ...form, npwp: e.target.value })} /></label>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head"><h2><Percent size={16} /> Pajak</h2></div>
        <div className="field-grid">
          <label className="toggle-field">
            <input type="checkbox" checked={form.taxEnabled} disabled={!canEdit} onChange={(e) => setForm({ ...form, taxEnabled: e.target.checked })} />
            Aktifkan PPN pada transaksi kasir
          </label>
          <label>Tarif PPN (%)<input type="number" value={form.taxRate} disabled={!canEdit || !form.taxEnabled} onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) || 0 })} /></label>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head"><h2><CreditCard size={16} /> Metode pembayaran</h2></div>
        <p className="field-hint">Aktifkan metode yang tersedia di toko. Metode aktif akan muncul sebagai pilihan pada halaman Kasir.</p>
        <div className="payment-toggle-grid">
          {paymentMethods.map((m) => (
            <label key={m.key} className="toggle-field toggle-field--card">
              <input type="checkbox" checked={m.enabled} disabled={!canEdit} onChange={() => togglePaymentMethod(m.key)} />
              {m.label}
            </label>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel__head"><h2><ReceiptIcon size={16} /> Struk &amp; invoice</h2></div>
        <div className="field-grid">
          <label>Prefix nomor invoice<input value={form.invoicePrefix} disabled={!canEdit} onChange={(e) => setForm({ ...form, invoicePrefix: e.target.value })} /></label>
          <label>Batas stok minimum default<input type="number" value={form.lowStockDefault} disabled={!canEdit} onChange={(e) => setForm({ ...form, lowStockDefault: Number(e.target.value) || 0 })} /></label>
        </div>
        <label>Catatan kaki struk
          <textarea rows={2} value={form.receiptFooter} disabled={!canEdit} onChange={(e) => setForm({ ...form, receiptFooter: e.target.value })} />
        </label>
      </div>

      {canEdit ? (
        <div className="field-actions">
          <button className="btn btn-primary" onClick={save}><Save size={16} /> Simpan pengaturan</button>
        </div>
      ) : (
        <p className="field-hint field-hint--error">Anda hanya dapat melihat pengaturan ini. Hubungi Pemilik/Admin untuk mengubahnya.</p>
      )}
    </div>
  );
}
