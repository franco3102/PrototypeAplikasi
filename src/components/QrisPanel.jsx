import React, { useMemo, useState } from "react";
import { CheckCircle2, Loader2, QrCode } from "lucide-react";
import { formatRp } from "../utils/helpers";

// Menghasilkan pola kotak-kotak mirip QR (bukan QR sungguhan) secara deterministik dari seed,
// hanya untuk kebutuhan tampilan demo QRIS.
function buildFakeQrMatrix(seed, size = 21) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    h = (h * 1103515245 + 12345) >>> 0;
    return (h >>> 8) / 16777216;
  };
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => rand() > 0.55));

  const stampFinder = (r0, c0) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const onBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const onCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[r0 + r][c0 + c] = onBorder || onCore;
      }
    }
  };
  stampFinder(0, 0);
  stampFinder(0, size - 7);
  stampFinder(size - 7, 0);
  return grid;
}

export default function QrisPanel({ total, invoiceNo, onConfirmed, onCancel }) {
  const [status, setStatus] = useState("waiting"); // waiting | checking | paid
  const matrix = useMemo(() => buildFakeQrMatrix(invoiceNo || "TIDURA-QRIS", 21), [invoiceNo]);
  const cell = 8;

  const simulateCheck = () => {
    setStatus("checking");
    setTimeout(() => setStatus("paid"), 900);
  };

  return (
    <div className="qris-panel">
      <div className="qris-panel__code">
        <svg width={cell * 21} height={cell * 21} viewBox={`0 0 ${cell * 21} ${cell * 21}`}>
          <rect width={cell * 21} height={cell * 21} fill="#fff" />
          {matrix.map((row, r) =>
            row.map(
              (on, c) =>
                on && <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#202B3B" />
            )
          )}
        </svg>
        {status === "paid" && (
          <div className="qris-panel__overlay">
            <CheckCircle2 size={34} color="#55735C" />
          </div>
        )}
      </div>
      <div className="qris-panel__info">
        <div className="qris-panel__brand"><QrCode size={14} /> QRIS · Tidura Sleep &amp; Living</div>
        <div className="qris-panel__amount">{formatRp(total)}</div>
        <div className="qris-panel__ref">Ref: {invoiceNo}</div>

        {status === "waiting" && (
          <>
            <p className="qris-panel__hint">Arahkan kamera e-wallet / m-banking pelanggan ke kode QR di atas, lalu tekan tombol di bawah untuk mensimulasikan konfirmasi pembayaran diterima.</p>
            <div className="field-actions field-actions--start">
              <button className="btn btn-ghost" onClick={onCancel}>Batal</button>
              <button className="btn btn-primary" onClick={simulateCheck}>Simulasikan pembayaran diterima</button>
            </div>
          </>
        )}
        {status === "checking" && (
          <p className="qris-panel__hint qris-panel__hint--loading"><Loader2 size={14} className="spin" /> Memeriksa status pembayaran…</p>
        )}
        {status === "paid" && (
          <>
            <p className="qris-panel__hint qris-panel__hint--success">Pembayaran QRIS diterima.</p>
            <div className="field-actions field-actions--start">
              <button className="btn btn-primary btn-block" onClick={onConfirmed}>Lanjutkan cetak struk</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
