import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../context/AppContext";
import { formatRp } from "../utils/helpers";
import { WEEKLY_SALES, TOP_PRODUCTS } from "../data/seed";
import { EmptyState } from "../components/Common";

const TABS = [
  { key: "penjualan", label: "Ringkasan penjualan" },
  { key: "produk", label: "Produk terlaris" },
  { key: "stok", label: "Laporan stok" },
  { key: "laba", label: "Laba rugi sederhana" },
];

export default function Laporan() {
  const { products, sales } = useApp();
  const [tab, setTab] = useState("penjualan");

  const sessionTotal = sales.reduce((sum, s) => sum + s.total, 0);
  const sessionTax = sales.reduce((sum, s) => sum + (s.taxAmount || 0), 0);
  const sessionDiscount = sales.reduce((sum, s) => sum + (s.discountAmount || 0), 0);
  const byMethod = sales.reduce((acc, s) => {
    acc[s.payment] = (acc[s.payment] || 0) + s.total;
    return acc;
  }, {});

  const stockValueByCategory = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.price * p.stock;
    return acc;
  }, {});

  const estimatedProfit = sales.reduce((sum, s) => {
    const cogs = s.items.reduce((c, it) => {
      const p = products.find((pr) => pr.id === it.productId);
      return c + (p ? p.cost * it.qty : 0);
    }, 0);
    return sum + (s.subtotal - s.discountAmount - cogs);
  }, 0);

  return (
    <div className="view">
      <div className="chip-row">
        {TABS.map((t) => (
          <button key={t.key} className={`chip ${tab === t.key ? "chip--active" : ""}`} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === "penjualan" && (
        <>
          <div className="kpi-grid kpi-grid--4">
            <div className="kpi-card kpi-card--brass"><div className="kpi-card__label">Omzet sesi ini</div><div className="kpi-card__value">{formatRp(sessionTotal)}</div></div>
            <div className="kpi-card kpi-card--rust"><div className="kpi-card__label">Total diskon</div><div className="kpi-card__value">{formatRp(sessionDiscount)}</div></div>
            <div className="kpi-card kpi-card--plum"><div className="kpi-card__label">Total PPN dipungut</div><div className="kpi-card__value">{formatRp(sessionTax)}</div></div>
            <div className="kpi-card kpi-card--sage"><div className="kpi-card__label">Jumlah transaksi</div><div className="kpi-card__value">{sales.length}</div></div>
          </div>
          <div className="panel">
            <div className="panel__head"><h2>Tren penjualan mingguan (contoh)</h2></div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={WEEKLY_SALES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E7E2D6" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#6B655C", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} width={64} tick={{ fill: "#6B655C", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
                  <Tooltip formatter={(v) => [formatRp(v), "Penjualan"]} contentStyle={{ borderRadius: 8, border: "1px solid #DAD4C7", fontFamily: "Inter, sans-serif", fontSize: 13 }} />
                  <Bar dataKey="total" fill="#6B2E3A" radius={[5, 5, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="panel">
            <div className="panel__head"><h2>Penjualan per metode pembayaran (sesi ini)</h2></div>
            {Object.keys(byMethod).length === 0 ? (
              <EmptyState>Belum ada transaksi pada sesi ini.</EmptyState>
            ) : (
              <div className="table-scroll"><table className="data-table">
                <thead><tr><th>Metode</th><th className="ta-right">Total</th></tr></thead>
                <tbody>
                  {Object.entries(byMethod).map(([k, v]) => (
                    <tr key={k}><td>{k}</td><td className="ta-right">{formatRp(v)}</td></tr>
                  ))}
                </tbody>
              </table></div>
            )}
          </div>
        </>
      )}

      {tab === "produk" && (
        <div className="panel">
          <div className="panel__head"><h2>Produk terlaris bulan ini (contoh)</h2></div>
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>Produk</th><th className="ta-right">Terjual</th><th className="ta-right">Omzet</th></tr></thead>
            <tbody>
              {TOP_PRODUCTS.map((t) => (
                <tr key={t.name}><td>{t.name}</td><td className="ta-right">{t.terjual} unit</td><td className="ta-right">{formatRp(t.omzet)}</td></tr>
              ))}
            </tbody>
          </table></div>
        </div>
      )}

      {tab === "stok" && (
        <div className="panel">
          <div className="panel__head"><h2>Nilai stok per kategori</h2></div>
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>Kategori</th><th className="ta-right">Nilai stok</th></tr></thead>
            <tbody>
              {Object.entries(stockValueByCategory).map(([k, v]) => (
                <tr key={k}><td>{k}</td><td className="ta-right">{formatRp(v)}</td></tr>
              ))}
            </tbody>
          </table></div>
        </div>
      )}

      {tab === "laba" && (() => {
        const omzetKotor = sales.reduce((s, x) => s + x.subtotal, 0);
        const netAfterDiscount = omzetKotor - sessionDiscount;
        const estimatedHpp = netAfterDiscount - estimatedProfit;
        return (
          <div className="panel">
            <div className="panel__head"><h2>Estimasi laba rugi sesi ini</h2></div>
            <div className="table-scroll"><table className="data-table">
              <tbody>
                <tr><td>Omzet penjualan</td><td className="ta-right">{formatRp(omzetKotor)}</td></tr>
                <tr><td>Diskon diberikan</td><td className="ta-right">-{formatRp(sessionDiscount)}</td></tr>
                <tr><td>Perkiraan HPP (harga pokok penjualan)</td><td className="ta-right">-{formatRp(estimatedHpp)}</td></tr>
                <tr className="data-table__strong"><td>Estimasi laba kotor</td><td className="ta-right">{formatRp(estimatedProfit)}</td></tr>
              </tbody>
            </table></div>
            <p className="field-hint">Perhitungan berdasarkan selisih harga jual dan harga beli (modal) tiap produk yang terjual pada sesi ini. Belum memperhitungkan biaya operasional lain.</p>
          </div>
        );
      })()}
    </div>
  );
}
