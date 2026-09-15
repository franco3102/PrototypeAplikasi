# Tidura — ERP & Kasir Penjualan (Prototype)

Aplikasi kasir + ERP ringan untuk toko springbed "Tidura", dibangun dengan React + Vite.
Semua data adalah data demo di memori (tidak ada backend) — cocok untuk presentasi ke client.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan (biasanya http://localhost:5173).

## Login demo

Password bebas (mode demo). Gunakan salah satu akun di layar login, atau klik tombol "login cepat":

| Username        | Role              | Akses                                     |
|-----------------|-------------------|--------------------------------------------|
| andi.owner      | Pemilik / Admin   | Semua modul, termasuk user & hak akses      |
| maya.manajer    | Manajer Toko      | Semua modul operasional (lihat-only user)   |
| dewi.kasir      | Kasir             | Kasir, kas/shift, pelanggan, lihat produk   |
| fajar.kasir     | Kasir             | Sama seperti Dewi                           |
| joko.gudang     | Staff Gudang      | Produk, barang masuk/keluar, supplier       |

## Fitur utama

- **Login & hak akses (RBAC)** — role Pemilik, Manajer, Kasir, Staff Gudang dengan matriks
  izin per modul (lihat/tambah/ubah/hapus), bisa diatur di menu **Hak akses** dan bisa
  menambah role baru.
- **Kelola pengguna** — tambah/ubah/nonaktifkan akun staff, assign role.
- **Kasir (POS)** — pencarian & kategori produk, keranjang, diskon (nominal/persen), PPN
  otomatis, pilih pelanggan, tahan/lanjutkan transaksi, banyak metode pembayaran termasuk
  **QRIS** (kode QR + simulasi konfirmasi pembayaran), tunai dengan hitung kembalian, cetak
  struk.
- **Kas & shift** — buka/tutup kasir dengan modal awal, rekonsiliasi kas (selisih), riwayat shift.
- **Produk & stok** — tambah/ubah/hapus produk, harga beli vs harga jual, status stok.
- **Barang masuk/keluar** — penerimaan dari supplier, retur/penyesuaian stok, riwayat.
- **Supplier** — data pemasok & termin pembayaran.
- **Pelanggan** — data member/korporat, poin, riwayat belanja per pelanggan.
- **Laporan** — ringkasan penjualan, produk terlaris, nilai stok, estimasi laba rugi.
- **Pengaturan toko** — profil toko, PPN, metode pembayaran aktif, format struk/invoice.
- **Log aktivitas** — audit trail semua aksi penting per pengguna.

## Struktur folder

```
src/
  context/AppContext.jsx   state & aksi global (auth, RBAC, produk, penjualan, dll)
  data/seed.js             data demo awal
  utils/                   helper format & definisi modul/permission
  components/              komponen UI bersama (Sidebar, Topbar, Modal, QRIS, Receipt)
  pages/                   satu file per halaman/menu
```

## Deploy ke Netlify

Konfigurasi sudah disiapkan lewat `netlify.toml` (build command, publish dir, Node 22,
dan SPA redirect). Di dashboard Netlify, kosongkan/biarkan default kolom **Build command**
dan **Publish directory** supaya `netlify.toml` yang dipakai.

**Penting:** jangan meng-commit folder `node_modules` ke repo. Kalau di repo lama sudah
terlanjur ada, hapus dulu:

```bash
git rm -r --cached node_modules
git commit -m "hapus node_modules dari repo"
git push
```

Folder `node_modules` yang ikut ter-commit adalah penyebab error
`sh: 1: vite: Permission denied` (exit code 127) saat build di Netlify.
