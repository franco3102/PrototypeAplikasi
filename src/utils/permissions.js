// Daftar modul aplikasi yang bisa diatur hak aksesnya.
// Setiap modul punya aksi: lihat (view), tambah (create), ubah (edit), hapus (delete).
export const MODULES = [
  { key: "dashboard", label: "Dashboard", actions: ["lihat"] },
  { key: "kasir", label: "Kasir / POS", actions: ["lihat", "tambah"] },
  { key: "produk", label: "Produk & Stok", actions: ["lihat", "tambah", "ubah", "hapus"] },
  { key: "pembelian", label: "Barang Masuk & Pembelian", actions: ["lihat", "tambah", "ubah"] },
  { key: "barang_keluar", label: "Barang Keluar", actions: ["lihat", "tambah"] },
  { key: "supplier", label: "Data Supplier", actions: ["lihat", "tambah", "ubah", "hapus"] },
  { key: "pelanggan", label: "Data Pelanggan", actions: ["lihat", "tambah", "ubah", "hapus"] },
  { key: "kas", label: "Kas / Shift Kasir", actions: ["lihat", "tambah"] },
  { key: "laporan", label: "Laporan", actions: ["lihat"] },
  { key: "pengguna", label: "Kelola Pengguna", actions: ["lihat", "tambah", "ubah", "hapus"] },
  { key: "hak_akses", label: "Hak Akses & Role", actions: ["lihat", "ubah"] },
  { key: "pengaturan", label: "Pengaturan Toko", actions: ["lihat", "ubah"] },
  { key: "log_aktivitas", label: "Log Aktivitas", actions: ["lihat"] },
];

const full = (mod) => Object.fromEntries(mod.actions.map((a) => [a, true]));
const none = (mod) => Object.fromEntries(mod.actions.map((a) => [a, false]));
const only = (mod, allowed) =>
  Object.fromEntries(mod.actions.map((a) => [a, allowed.includes(a)]));

// Preset default untuk masing-masing role bawaan. Bisa diubah lewat halaman Hak Akses.
export function buildDefaultPermissions() {
  const perms = {};
  for (const role of ["owner", "manajer", "kasir", "gudang"]) perms[role] = {};

  for (const mod of MODULES) {
    // Owner / Pemilik: akses penuh ke semua modul.
    perms.owner[mod.key] = full(mod);

    // Manajer toko: hampir semua, kecuali kelola pengguna & hak akses (hanya lihat).
    if (["pengguna", "hak_akses"].includes(mod.key)) {
      perms.manajer[mod.key] = only(mod, ["lihat"]);
    } else {
      perms.manajer[mod.key] = full(mod);
    }

    // Kasir: fokus ke kasir, dashboard, pelanggan, dan kas. Tidak bisa ke data master/produk/user.
    if (["dashboard", "kas"].includes(mod.key)) {
      perms.kasir[mod.key] = only(mod, ["lihat", "tambah"]);
    } else if (mod.key === "kasir") {
      perms.kasir[mod.key] = full(mod);
    } else if (mod.key === "pelanggan") {
      perms.kasir[mod.key] = only(mod, ["lihat", "tambah"]);
    } else if (mod.key === "produk" || mod.key === "laporan") {
      perms.kasir[mod.key] = only(mod, ["lihat"]);
    } else {
      perms.kasir[mod.key] = none(mod);
    }

    // Staff gudang: fokus ke produk, stok, barang masuk/keluar, supplier.
    if (["produk", "pembelian", "barang_keluar", "supplier"].includes(mod.key)) {
      perms.gudang[mod.key] = full(mod);
    } else if (["dashboard", "laporan"].includes(mod.key)) {
      perms.gudang[mod.key] = only(mod, ["lihat"]);
    } else {
      perms.gudang[mod.key] = none(mod);
    }
  }
  return perms;
}

export const ROLE_LABELS = {
  owner: "Pemilik / Admin",
  manajer: "Manajer Toko",
  kasir: "Kasir",
  gudang: "Staff Gudang",
};

export function can(permissions, roleId, moduleKey, action = "lihat") {
  return Boolean(permissions?.[roleId]?.[moduleKey]?.[action]);
}
