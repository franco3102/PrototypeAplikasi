import React, { createContext, useContext, useMemo, useState } from "react";
import {
  PRODUCTS_INIT, MOVEMENTS_INIT, SUPPLIERS_INIT, CUSTOMERS_INIT, PAYMENT_METHODS_INIT,
  USERS_INIT, ROLES_INIT, DEFAULT_PERMISSIONS, SHIFTS_INIT, ACTIVITY_LOG_INIT, SETTINGS_INIT,
} from "../data/seed";
import { nextId, nowDateID, nowDateTimeID } from "../utils/helpers";
import { can as canCheck } from "../utils/permissions";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const [products, setProducts] = useState(PRODUCTS_INIT);
  const [movements, setMovements] = useState(MOVEMENTS_INIT);
  const [suppliers, setSuppliers] = useState(SUPPLIERS_INIT);
  const [customers, setCustomers] = useState(CUSTOMERS_INIT);
  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHODS_INIT);
  const [sales, setSales] = useState([]);

  const [users, setUsers] = useState(USERS_INIT);
  const [roles, setRoles] = useState(ROLES_INIT);
  const [permissions, setPermissions] = useState(DEFAULT_PERMISSIONS);

  const [shifts, setShifts] = useState(SHIFTS_INIT);
  const [currentShift, setCurrentShift] = useState(null);

  const [activityLog, setActivityLog] = useState(ACTIVITY_LOG_INIT);
  const [settings, setSettings] = useState(SETTINGS_INIT);

  const logActivity = (action, detail) => {
    setActivityLog((prev) => [
      { id: nextId(prev), time: nowDateTimeID(), user: currentUser?.name || "Sistem", action, detail },
      ...prev,
    ]);
  };

  const login = (user) => {
    setCurrentUser(user);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, lastLogin: nowDateTimeID() } : u)));
    setActivityLog((prev) => [
      { id: nextId(prev), time: nowDateTimeID(), user: user.name, action: "Masuk ke sistem", detail: `Login sebagai ${user.roleLabel || user.role}` },
      ...prev,
    ]);
  };

  const logout = () => {
    if (currentUser) {
      setActivityLog((prev) => [
        { id: nextId(prev), time: nowDateTimeID(), user: currentUser.name, action: "Keluar dari sistem", detail: "Logout" },
        ...prev,
      ]);
    }
    setCurrentUser(null);
  };

  const can = (moduleKey, action = "lihat") => {
    if (!currentUser) return false;
    return canCheck(permissions, currentUser.role, moduleKey, action);
  };

  // ---- produk & stok ----
  const addProduct = (p) => {
    setProducts((prev) => [...prev, { id: nextId(prev), ...p }]);
    logActivity("Tambah produk", `${p.name} (${p.sizeLabel || "-"})`);
  };

  const updateProduct = (id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    logActivity("Ubah produk", `Perbarui data produk #${id}`);
  };

  const deleteProduct = (id) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    logActivity("Hapus produk", p ? p.name : `#${id}`);
  };

  // ---- barang masuk / keluar ----
  const addMovement = (m) => {
    setMovements((prev) => [{ id: nextId(prev), date: nowDateID(), by: currentUser?.name || "-", ...m }, ...prev]);
    setProducts((prev) =>
      prev.map((p) => (p.id === m.productId ? { ...p, stock: m.type === "masuk" ? p.stock + m.qty : p.stock - m.qty } : p))
    );
    logActivity(m.type === "masuk" ? "Catat barang masuk" : "Catat barang keluar", `${m.productName} — ${m.qty} unit`);
  };

  // ---- supplier ----
  const addSupplier = (s) => {
    setSuppliers((prev) => [...prev, { id: nextId(prev), ...s }]);
    logActivity("Tambah supplier", s.name);
  };
  const updateSupplier = (id, patch) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    logActivity("Ubah supplier", `Perbarui data supplier #${id}`);
  };
  const deleteSupplier = (id) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    logActivity("Hapus supplier", `#${id}`);
  };

  // ---- pelanggan ----
  const addCustomer = (c) => {
    setCustomers((prev) => [...prev, { id: nextId(prev), points: 0, totalBelanja: 0, ...c }]);
    logActivity("Tambah pelanggan", c.name);
  };
  const updateCustomer = (id, patch) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    logActivity("Ubah pelanggan", `Perbarui data pelanggan #${id}`);
  };
  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    logActivity("Hapus pelanggan", `#${id}`);
  };

  // ---- penjualan / kasir ----
  const checkout = (sale) => {
    const record = {
      id: nextId(sales),
      time: nowDateTimeID(),
      cashier: currentUser?.name || "-",
      shiftId: currentShift?.id ?? null,
      ...sale,
    };
    setSales((prev) => [...prev, record]);

    setProducts((prev) =>
      prev.map((p) => {
        const line = sale.items.find((l) => l.productId === p.id);
        return line ? { ...p, stock: p.stock - line.qty } : p;
      })
    );

    if (sale.customerId) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === sale.customerId
            ? { ...c, totalBelanja: (c.totalBelanja || 0) + sale.total, points: (c.points || 0) + Math.floor(sale.total / 100000) }
            : c
        )
      );
    }

    logActivity("Transaksi penjualan", `${sale.invoiceNo} — ${sale.payment} — Rp${sale.total.toLocaleString("id-ID")}`);
    return record;
  };

  // ---- kas / shift ----
  const openShift = (openingCash) => {
    const shift = {
      id: nextId(shifts),
      cashier: currentUser?.name || "-",
      openTime: nowDateTimeID(),
      closeTime: null,
      openingCash,
      expectedCash: openingCash,
      actualCash: null,
      difference: null,
      totalSales: 0,
      status: "berjalan",
    };
    setCurrentShift(shift);
    setShifts((prev) => [shift, ...prev]);
    logActivity("Buka kasir", `Modal awal Rp${Number(openingCash).toLocaleString("id-ID")}`);
    return shift;
  };

  const closeShift = (actualCash) => {
    if (!currentShift) return;
    const shiftSales = sales.filter((s) => s.shiftId === currentShift.id);
    const cashSales = shiftSales.filter((s) => s.payment === "Tunai").reduce((sum, s) => sum + s.total, 0);
    const totalSales = shiftSales.reduce((sum, s) => sum + s.total, 0);
    const expectedCash = currentShift.openingCash + cashSales;
    const difference = actualCash - expectedCash;
    const closed = {
      ...currentShift,
      closeTime: nowDateTimeID(),
      expectedCash,
      actualCash,
      difference,
      totalSales,
      status: "selesai",
    };
    setShifts((prev) => prev.map((s) => (s.id === closed.id ? closed : s)));
    setCurrentShift(null);
    logActivity("Tutup kasir", `Selisih ${difference >= 0 ? "+" : ""}Rp${difference.toLocaleString("id-ID")}`);
    return closed;
  };

  // ---- pengguna ----
  const addUser = (u) => {
    setUsers((prev) => [...prev, { id: nextId(prev), status: "aktif", lastLogin: "-", ...u }]);
    logActivity("Tambah pengguna", `${u.name} (${u.username})`);
  };
  const updateUser = (id, patch) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    logActivity("Ubah pengguna", `Perbarui data pengguna #${id}`);
  };
  const deleteUser = (id) => {
    const u = users.find((x) => x.id === id);
    setUsers((prev) => prev.filter((x) => x.id !== id));
    logActivity("Hapus pengguna", u ? u.name : `#${id}`);
  };
  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "aktif" ? "nonaktif" : "aktif" } : u))
    );
    logActivity("Ubah status pengguna", `#${id}`);
  };

  // ---- roles & permissions ----
  const addRole = (role) => {
    setRoles((prev) => [...prev, { ...role, system: false }]);
    setPermissions((prev) => {
      const blank = {};
      for (const mod of Object.keys(prev.owner || {})) {
        blank[mod] = Object.fromEntries(Object.keys(prev.owner[mod]).map((a) => [a, false]));
      }
      return { ...prev, [role.id]: blank };
    });
    logActivity("Tambah role", role.name);
  };

  const updatePermission = (roleId, moduleKey, action, value) => {
    setPermissions((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [moduleKey]: { ...prev[roleId]?.[moduleKey], [action]: value },
      },
    }));
    logActivity("Ubah hak akses", `${roleId} · ${moduleKey} · ${action} = ${value ? "izinkan" : "tolak"}`);
  };

  // ---- pengaturan ----
  const updateSettings = (patch) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    logActivity("Ubah pengaturan", Object.keys(patch).join(", "));
  };

  const togglePaymentMethod = (key) => {
    setPaymentMethods((prev) => prev.map((m) => (m.key === key ? { ...m, enabled: !m.enabled } : m)));
    logActivity("Ubah metode pembayaran", key);
  };

  const value = useMemo(
    () => ({
      currentUser, login, logout, can,
      products, addProduct, updateProduct, deleteProduct,
      movements, addMovement,
      suppliers, addSupplier, updateSupplier, deleteSupplier,
      customers, addCustomer, updateCustomer, deleteCustomer,
      paymentMethods, togglePaymentMethod,
      sales, checkout,
      users, addUser, updateUser, deleteUser, toggleUserStatus,
      roles, addRole,
      permissions, updatePermission,
      shifts, currentShift, openShift, closeShift,
      activityLog, logActivity,
      settings, updateSettings,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      currentUser, products, movements, suppliers, customers, paymentMethods, sales,
      users, roles, permissions, shifts, currentShift, activityLog, settings,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
