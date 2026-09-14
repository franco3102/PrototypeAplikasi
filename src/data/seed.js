import { buildDefaultPermissions } from "../utils/permissions";

export const CATEGORIES = ["Kasur Springbed", "Divan & Rangka", "Bantal & Guling", "Aksesoris"];

export const PRODUCTS_INIT = [
  { id: 1, name: "Tidura Classic Ortho", brand: "Tidura", sizeLabel: "Queen 160x200", category: "Kasur Springbed", price: 4500000, cost: 3200000, stock: 12, minStock: 5, sku: "TDR-001" },
  { id: 2, name: "Tidura Classic Ortho", brand: "Tidura", sizeLabel: "King 180x200", category: "Kasur Springbed", price: 5200000, cost: 3700000, stock: 3, minStock: 5, sku: "TDR-002" },
  { id: 3, name: "CloudRest Pillow Top", brand: "CloudRest", sizeLabel: "Queen 160x200", category: "Kasur Springbed", price: 6800000, cost: 4900000, stock: 8, minStock: 4, sku: "CLR-001" },
  { id: 4, name: "CloudRest Pillow Top", brand: "CloudRest", sizeLabel: "Single 90x200", category: "Kasur Springbed", price: 3200000, cost: 2250000, stock: 20, minStock: 6, sku: "CLR-002" },
  { id: 5, name: "Aurora Sleep Hybrid", brand: "AuroraSleep", sizeLabel: "Super King 200x200", category: "Kasur Springbed", price: 9500000, cost: 6800000, stock: 2, minStock: 3, sku: "AUS-001" },
  { id: 6, name: "Regal Foam Deluxe", brand: "RegalFoam", sizeLabel: "Twin 120x200", category: "Kasur Springbed", price: 3800000, cost: 2650000, stock: 0, minStock: 4, sku: "RGF-001" },
  { id: 7, name: "Nimbus Plus Memory", brand: "NimbusPlus", sizeLabel: "Queen 160x200", category: "Kasur Springbed", price: 5900000, cost: 4150000, stock: 15, minStock: 5, sku: "NIM-001" },
  { id: 8, name: "Divan Rangka Minimalis", brand: "Tidura", sizeLabel: "Queen 160x200", category: "Divan & Rangka", price: 1850000, cost: 1250000, stock: 9, minStock: 3, sku: "TDR-010" },
  { id: 9, name: "Divan Rangka Laci", brand: "Tidura", sizeLabel: "King 180x200", category: "Divan & Rangka", price: 2450000, cost: 1700000, stock: 4, minStock: 3, sku: "TDR-011" },
  { id: 10, name: "Bantal Memory Foam", brand: "CloudRest", sizeLabel: "Standar", category: "Bantal & Guling", price: 285000, cost: 165000, stock: 40, minStock: 10, sku: "CLR-020" },
  { id: 11, name: "Guling Dakron Premium", brand: "Tidura", sizeLabel: "Standar", category: "Bantal & Guling", price: 165000, cost: 95000, stock: 32, minStock: 10, sku: "TDR-030" },
  { id: 12, name: "Pelindung Kasur Waterproof", brand: "AuroraSleep", sizeLabel: "Queen 160x200", category: "Aksesoris", price: 245000, cost: 140000, stock: 18, minStock: 8, sku: "AUS-040" },
  { id: 13, name: "Pelindung Kasur Waterproof", brand: "AuroraSleep", sizeLabel: "King 180x200", category: "Aksesoris", price: 285000, cost: 165000, stock: 1, minStock: 6, sku: "AUS-041" },
  { id: 14, name: "Topper Latex 5cm", brand: "RegalFoam", sizeLabel: "Queen 160x200", category: "Aksesoris", price: 1250000, cost: 850000, stock: 6, minStock: 4, sku: "RGF-050" },
];

export const MOVEMENTS_INIT = [
  { id: 1, type: "masuk", date: "10 Sep 2026", productName: "Tidura Classic Ortho — Queen 160x200", qty: 10, note: "Kiriman pabrik rutin", by: "Gudang", supplier: "PT Sumber Busa Makmur" },
  { id: 2, type: "keluar", date: "10 Sep 2026", productName: "Nimbus Plus Memory — Queen 160x200", qty: 2, note: "Retur ke supplier, cacat jahitan", by: "Gudang" },
  { id: 3, type: "masuk", date: "9 Sep 2026", productName: "CloudRest Pillow Top — Single 90x200", qty: 15, note: "Restock awal bulan", by: "Gudang", supplier: "CV Cloud Bedding Indonesia" },
];

export const REASONS_KELUAR = ["Retur ke supplier", "Rusak / cacat produksi", "Sample pajangan showroom", "Penyesuaian stok opname"];

export const SUPPLIERS_INIT = [
  { id: 1, name: "PT Sumber Busa Makmur", contact: "Budi Santoso", phone: "0812-3456-7890", address: "Jl. Industri Raya No. 21, Bandung", terms: "Tempo 30 hari" },
  { id: 2, name: "CV Cloud Bedding Indonesia", contact: "Sri Wahyuni", phone: "0813-2211-4455", address: "Jl. Cihampelas No. 88, Bandung", terms: "Tunai" },
  { id: 3, name: "UD Aurora Textile", contact: "Hendra Gunawan", phone: "0857-9988-1122", address: "Jl. Soekarno Hatta No. 5, Bandung", terms: "Tempo 14 hari" },
];

export const CUSTOMERS_INIT = [
  { id: 1, name: "Pelanggan Umum", phone: "-", address: "-", type: "umum", points: 0, totalBelanja: 0 },
  { id: 2, name: "Siti Aminah", phone: "0821-1234-5678", address: "Jl. Merdeka No. 12, Bandung", type: "member", points: 240, totalBelanja: 12500000 },
  { id: 3, name: "Hotel Kenanga Residence", phone: "022-4567890", address: "Jl. Asia Afrika No. 100, Bandung", type: "korporat", points: 0, totalBelanja: 84500000 },
  { id: 4, name: "Rudi Hartono", phone: "0856-7890-1234", address: "Jl. Dago No. 45, Bandung", type: "member", points: 60, totalBelanja: 5200000 },
];

export const PAYMENT_METHODS_INIT = [
  { key: "tunai", label: "Tunai", enabled: true },
  { key: "debit", label: "Kartu Debit", enabled: true },
  { key: "kredit", label: "Kartu Kredit", enabled: true },
  { key: "qris", label: "QRIS", enabled: true },
  { key: "transfer", label: "Transfer Bank", enabled: true },
  { key: "gopay", label: "GoPay", enabled: true },
  { key: "ovo", label: "OVO", enabled: false },
  { key: "dana", label: "DANA", enabled: false },
];

export const USERS_INIT = [
  { id: 1, name: "Andi Darmawan", username: "andi.owner", role: "owner", status: "aktif", phone: "0811-1111-0001", lastLogin: "11 Sep 2026, 08:02" },
  { id: 2, name: "Maya Puspita", username: "maya.manajer", role: "manajer", status: "aktif", phone: "0811-1111-0002", lastLogin: "11 Sep 2026, 07:45" },
  { id: 3, name: "Dewi Lestari", username: "dewi.kasir", role: "kasir", status: "aktif", phone: "0811-1111-0003", lastLogin: "11 Sep 2026, 08:15" },
  { id: 4, name: "Fajar Nugroho", username: "fajar.kasir", role: "kasir", status: "aktif", phone: "0811-1111-0004", lastLogin: "10 Sep 2026, 16:40" },
  { id: 5, name: "Joko Prasetyo", username: "joko.gudang", role: "gudang", status: "aktif", phone: "0811-1111-0005", lastLogin: "11 Sep 2026, 07:30" },
  { id: 6, name: "Rina Marlina", username: "rina.kasir", role: "kasir", status: "nonaktif", phone: "0811-1111-0006", lastLogin: "2 Sep 2026, 09:10" },
];

export const ROLES_INIT = [
  { id: "owner", name: "Pemilik / Admin", description: "Akses penuh ke seluruh modul, termasuk kelola pengguna dan hak akses.", system: true },
  { id: "manajer", name: "Manajer Toko", description: "Mengelola operasional toko sehari-hari, laporan, dan data master.", system: true },
  { id: "kasir", name: "Kasir", description: "Melayani transaksi penjualan di POS dan mengelola shift kasnya sendiri.", system: true },
  { id: "gudang", name: "Staff Gudang", description: "Mengelola stok, barang masuk/keluar, dan data supplier.", system: true },
];

export const DEFAULT_PERMISSIONS = buildDefaultPermissions();

export const WEEKLY_SALES = [
  { day: "Sen", total: 18500000 }, { day: "Sel", total: 12200000 }, { day: "Rab", total: 21750000 },
  { day: "Kam", total: 9800000 }, { day: "Jum", total: 24300000 }, { day: "Sab", total: 31200000 },
  { day: "Min", total: 27600000 },
];

export const TOP_PRODUCTS = [
  { name: "Tidura Classic Ortho, Queen", terjual: 34, omzet: 153000000 },
  { name: "CloudRest Pillow Top, Single", terjual: 29, omzet: 92800000 },
  { name: "Bantal Memory Foam", terjual: 61, omzet: 17385000 },
  { name: "Nimbus Plus Memory, Queen", terjual: 18, omzet: 106200000 },
];

export const SHIFTS_INIT = [
  { id: 1, cashier: "Dewi Lestari", openTime: "10 Sep 2026, 08:00", closeTime: "10 Sep 2026, 20:05", openingCash: 500000, expectedCash: 8420000, actualCash: 8400000, difference: -20000, totalSales: 7920000, status: "selesai" },
  { id: 2, cashier: "Fajar Nugroho", openTime: "9 Sep 2026, 08:00", closeTime: "9 Sep 2026, 20:00", openingCash: 500000, expectedCash: 6120000, actualCash: 6120000, difference: 0, totalSales: 5620000, status: "selesai" },
];

export const ACTIVITY_LOG_INIT = [
  { id: 1, time: "11 Sep 2026, 08:02", user: "Andi Darmawan", action: "Masuk ke sistem", detail: "Login sebagai Pemilik / Admin" },
  { id: 2, time: "11 Sep 2026, 07:45", user: "Maya Puspita", action: "Ubah pengaturan", detail: "Mengubah tarif PPN menjadi 11%" },
  { id: 3, time: "10 Sep 2026, 20:05", user: "Dewi Lestari", action: "Tutup kasir", detail: "Selisih kas -Rp20.000" },
];

export const SETTINGS_INIT = {
  storeName: "Tidura Sleep & Living",
  address: "Jl. Braga No. 55, Bandung, Jawa Barat",
  phone: "022-4200-1234",
  npwp: "01.234.567.8-423.000",
  taxEnabled: true,
  taxRate: 11,
  receiptFooter: "Terima kasih telah berbelanja di Tidura. Barang yang sudah dibeli tidak dapat ditukar tanpa nota.",
  invoicePrefix: "TDR",
  lowStockDefault: 5,
};
