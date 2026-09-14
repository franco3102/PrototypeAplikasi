import React from "react";
import { formatRp } from "../utils/helpers";
import { useApp } from "../context/AppContext";

export default function Receipt({ sale }) {
  const { settings } = useApp();
  if (!sale) return null;

  return (
    <div className="receipt-print-area">
      <div className="receipt-paper">
        <div className="receipt-paper__center">
          <div className="receipt-paper__store">{settings.storeName}</div>
          <div>{settings.address}</div>
          <div>{settings.phone}</div>
          {settings.npwp && <div>NPWP: {settings.npwp}</div>}
        </div>
        <div className="receipt-paper__hr" />
        <div className="receipt-paper__row"><span>No. Invoice</span><span>{sale.invoiceNo}</span></div>
        <div className="receipt-paper__row"><span>Tanggal</span><span>{sale.time}</span></div>
        <div className="receipt-paper__row"><span>Kasir</span><span>{sale.cashier}</span></div>
        <div className="receipt-paper__row"><span>Pelanggan</span><span>{sale.customerName || "Umum"}</span></div>
        <div className="receipt-paper__hr" />
        {sale.items.map((it, i) => (
          <div key={i} className="receipt-paper__item">
            <div>{it.name}, {it.sizeLabel}</div>
            <div className="receipt-paper__row">
              <span>{it.qty} x {formatRp(it.price)}</span>
              <span>{formatRp(it.price * it.qty)}</span>
            </div>
          </div>
        ))}
        <div className="receipt-paper__hr" />
        <div className="receipt-paper__row"><span>Subtotal</span><span>{formatRp(sale.subtotal)}</span></div>
        {sale.discountAmount > 0 && (
          <div className="receipt-paper__row"><span>Diskon</span><span>-{formatRp(sale.discountAmount)}</span></div>
        )}
        {sale.taxAmount > 0 && (
          <div className="receipt-paper__row"><span>PPN {sale.taxRate}%</span><span>{formatRp(sale.taxAmount)}</span></div>
        )}
        <div className="receipt-paper__row receipt-paper__row--total"><span>Total</span><span>{formatRp(sale.total)}</span></div>
        <div className="receipt-paper__row"><span>Metode</span><span>{sale.payment}</span></div>
        {sale.payment === "Tunai" && (
          <>
            <div className="receipt-paper__row"><span>Tunai diterima</span><span>{formatRp(sale.cashReceived)}</span></div>
            <div className="receipt-paper__row"><span>Kembalian</span><span>{formatRp(sale.change)}</span></div>
          </>
        )}
        <div className="receipt-paper__hr" />
        <div className="receipt-paper__center receipt-paper__footer">{settings.receiptFooter}</div>
      </div>
    </div>
  );
}
