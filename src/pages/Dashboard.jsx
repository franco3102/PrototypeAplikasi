import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../context/AppContext";
import { formatRp } from "../utils/helpers";
import { WEEKLY_SALES } from "../data/seed";
import { StockPill, EmptyState } from "../components/Common";

export default function Dashboard() {
  const { products, sales, users, currentShift } = useApp();
  const lowStock = products.filter((p) => p.stock <= p.minStock);
  const totalStockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const sessionTotal = sales.reduce((sum, s) => sum + s.total, 0);
  const activeStaff = users.filter((u) => u.status === "aktif").length;

  return (
    <div className="view">
      <div className="kpi-grid">
        <div className="kpi-card kpi-card--brass">
          <div className="kpi-card__label">Penjualan sesi ini</div>
          <div className="kpi-card__value">{formatRp(sessionTotal)}</div>
          <div className="kpi-card__note">{sales.length} transaksi tercatat</div>
        </div>
        <div className="kpi-card kpi-card--plum">
          <div className="kpi-card__label">Nilai stok gudang</div>
          <div className="kpi-card__value">{formatRp(totalStockValue)}</div>
          <div className="kpi-card__note">{products.length} jenis produk</div>
        </div>
        <div className="kpi-card kpi-card--rust">
          <div className="kpi-card__label">Stok menipis</div>
          <div className="kpi-card__value">{lowStock.length}</div>
          <div className="kpi-card__note">Perlu segera direstok</div>
        </div>
        <div className="kpi-card kpi-card--sage">
          <div className="kpi-card__label">Staff aktif</div>
          <div className="kpi-card__value">{activeStaff}</div>
          <div className="kpi-card__note">{currentShift ? "Ada shift kasir berjalan" : "Belum ada shift dibuka"}</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel__head"><h2>Penjualan 7 hari terakhir</h2></div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={WEEKLY_SALES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#E7E2D6" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#6B655C", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} width={64} tick={{ fill: "#6B655C", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
                <Tooltip cursor={{ fill: "#F1EEE6" }} formatter={(v) => [formatRp(v), "Penjualan"]} contentStyle={{ borderRadius: 8, border: "1px solid #DAD4C7", fontFamily: "Inter, sans-serif", fontSize: 13 }} />
                <Bar dataKey="total" fill="#AD7A3F" radius={[5, 5, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel__head"><h2>Perlu direstok</h2></div>
          {lowStock.length === 0 ? (
            <EmptyState>Semua stok dalam kondisi aman.</EmptyState>
          ) : (
            <ul className="low-stock-list">
              {lowStock.map((p) => (
                <li key={p.id} className="low-stock-item">
                  <div>
                    <div className="low-stock-item__name">{p.name}</div>
                    <div className="low-stock-item__meta">{p.brand} · {p.sizeLabel}</div>
                  </div>
                  <StockPill p={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="panel">
        <div className="panel__head"><h2>Transaksi terakhir</h2></div>
        {sales.length === 0 ? (
          <EmptyState>Belum ada transaksi pada sesi ini. Mulai dari menu Kasir.</EmptyState>
        ) : (
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>Waktu</th><th>Kasir</th><th>Item</th><th>Pembayaran</th><th className="ta-right">Total</th></tr></thead>
            <tbody>
              {sales.slice().reverse().slice(0, 8).map((s) => (
                <tr key={s.id}>
                  <td>{s.time}</td>
                  <td>{s.cashier}</td>
                  <td>{s.items.length} produk</td>
                  <td>{s.payment}</td>
                  <td className="ta-right">{formatRp(s.total)}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        )}
      </div>
    </div>
  );
}
