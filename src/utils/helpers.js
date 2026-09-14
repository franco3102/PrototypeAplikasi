export const formatRp = (n) => `Rp${Number(n || 0).toLocaleString("id-ID")}`;

export const formatNumber = (n) => Number(n || 0).toLocaleString("id-ID");

export const nextId = (arr) => (arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1);

export const uid = (prefix = "ID") =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

export const stockStatus = (p) => {
  if (p.stock <= 0) return { label: "Habis", tone: "brick" };
  if (p.stock <= p.minStock) return { label: "Menipis", tone: "rust" };
  return { label: "Aman", tone: "sage" };
};

export const nowTimeID = () =>
  new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

export const nowDateID = () =>
  new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

export const nowDateTimeID = () => `${nowDateID()}, ${nowTimeID()}`;

export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
