import React, { useState } from "react";
import { Wallet, LockOpen, Lock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { formatRp } from "../utils/helpers";
import { StatusPill, EmptyState } from "../components/Common";

export default function Kas() {
  const { currentShift, openShift, closeShift, shifts, sales, can } = useApp();
  const [openingAmount, setOpeningAmount] = useState("500000");
  const [actualCash, setActualCash] = useState("");

  const shiftSales = currentShift ? sales.filter((s) => s.shiftId === currentShift.id) : [];
  const cashSales = shiftSales.filter((s) => s.payment === "Tunai").reduce((sum, s) => sum + s.total, 0);
  const nonCashSales = shiftSales.reduce((sum, s) => sum + s.total, 0) - cashSales;
  const expectedCash = currentShift ? currentShift.openingCash + cashSales : 0;
  const previewDifference = currentShift && actualCash !== "" ? Number(actualCash) - expectedCash : null;

  return (
    <div className="view">
      {currentShift ? (
        <div className="panel">
          <div className="panel__head"><h2>Shift berjalan — {currentShift.cashier}</h2></div>
          <div className="kpi-grid kpi-grid--4">
            <div className="kpi-card kpi-card--brass"><div className="kpi-card__label">Modal awal</div><div className="kpi-card__value">{formatRp(currentShift.openingCash)}</div></div>
            <div className="kpi-card kpi-card--sage"><div className="kpi-card__label">Penjualan tunai</div><div className="kpi-card__value">{formatRp(cashSales)}</div></div>
            <div className="kpi-card kpi-card--plum"><div className="kpi-card__label">Penjualan non-tunai</div><div className="kpi-card__value">{formatRp(nonCashSales)}</div></div>
            <div className="kpi-card kpi-card--rust"><div className="kpi-card__label">Kas seharusnya di laci</div><div className="kpi-card__value">{formatRp(expectedCash)}</div></div>
          </div>

          {can("kas", "tambah") ? (
            <>
              <div className="field-grid field-grid--narrow" style={{ marginTop: 18 }}>
                <label>Hitung kas fisik saat ini
                  <input type="number" value={actualCash} onChange={(e) => setActualCash(e.target.value)} placeholder="0" />
                </label>
              </div>
              {previewDifference !== null && (
                <p className={`field-hint ${previewDifference !== 0 ? "field-hint--error" : ""}`}>
                  Selisih: {previewDifference >= 0 ? "+" : ""}{formatRp(previewDifference)} {previewDifference === 0 ? "(pas)" : previewDifference > 0 ? "(lebih)" : "(kurang)"}
                </p>
              )}
              <div className="field-actions">
                <button className="btn btn-brick" disabled={actualCash === ""} onClick={() => { closeShift(Number(actualCash) || 0); setActualCash(""); }}>
                  <Lock size={16} /> Tutup kasir
                </button>
              </div>
            </>
          ) : (
            <p className="field-hint">Hanya kasir yang sedang bertugas atau manajer yang dapat menutup shift ini.</p>
          )}
        </div>
      ) : (
        <div className="panel">
          <div className="panel__head"><h2>Belum ada shift kasir yang berjalan</h2></div>
          {can("kas", "tambah") ? (
            <>
              <div className="field-grid field-grid--narrow">
                <label>Modal awal kas
                  <input type="number" value={openingAmount} onChange={(e) => setOpeningAmount(e.target.value)} placeholder="500000" />
                </label>
              </div>
              <div className="field-actions">
                <button className="btn btn-primary" onClick={() => openShift(Number(openingAmount) || 0)}>
                  <LockOpen size={16} /> Buka kasir
                </button>
              </div>
            </>
          ) : (
            <p className="field-hint">Anda tidak memiliki izin untuk membuka shift kas.</p>
          )}
        </div>
      )}

      <div className="panel">
        <div className="panel__head"><h2>Riwayat shift</h2></div>
        {shifts.length === 0 ? (
          <EmptyState>Belum ada riwayat shift.</EmptyState>
        ) : (
          <table className="data-table">
            <thead><tr><th>Kasir</th><th>Buka</th><th>Tutup</th><th className="ta-right">Penjualan</th><th className="ta-right">Selisih</th><th>Status</th></tr></thead>
            <tbody>
              {shifts.map((s) => (
                <tr key={s.id}>
                  <td>{s.cashier}</td>
                  <td>{s.openTime}</td>
                  <td>{s.closeTime || "-"}</td>
                  <td className="ta-right">{formatRp(s.totalSales)}</td>
                  <td className="ta-right">{s.difference === null ? "-" : `${s.difference >= 0 ? "+" : ""}${formatRp(s.difference)}`}</td>
                  <td><StatusPill status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
