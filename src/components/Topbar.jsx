import React from "react";
import { Wallet } from "lucide-react";
import { useApp } from "../context/AppContext";

export const PAGE_TITLES = {
  dashboard: ["Dashboard", "Ringkasan toko hari ini"],
  kasir: ["Kasir", "Buat transaksi penjualan baru"],
  stok: ["Produk & stok", "Daftar produk dan status persediaan"],
  masuk: ["Barang masuk", "Catat penerimaan barang dari supplier ke gudang"],
  keluar: ["Barang keluar", "Catat pengeluaran barang di luar penjualan"],
  supplier: ["Supplier", "Data pemasok dan kontak pembelian"],
  pelanggan: ["Pelanggan", "Data pelanggan, member, dan riwayat belanja"],
  kas: ["Kas & shift", "Buka/tutup kasir dan rekonsiliasi kas"],
  laporan: ["Laporan", "Performa penjualan, stok, dan laba rugi"],
  pengguna: ["Kelola pengguna", "Akun staff dan status aktifnya"],
  hak_akses: ["Hak akses", "Atur izin akses tiap role/jabatan"],
  pengaturan: ["Pengaturan toko", "Profil toko, pajak, dan metode pembayaran"],
  log: ["Log aktivitas", "Riwayat aktivitas seluruh pengguna"],
};

export default function Topbar({ tabKey }) {
  const { currentShift } = useApp();
  const [title, sub] = PAGE_TITLES[tabKey] || ["Tidura", ""];
  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">{title}</h1>
        <p className="topbar__sub">{sub}</p>
      </div>
      <div className="topbar__right">
        {currentShift && (
          <span className="shift-indicator">
            <Wallet size={13} /> Shift berjalan · {currentShift.cashier}
          </span>
        )}
        <div className="topbar__meta">Kamis, 11 September 2026</div>
      </div>
    </header>
  );
}
