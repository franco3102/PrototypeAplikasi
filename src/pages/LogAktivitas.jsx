import React, { useState } from "react";
import { Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { EmptyState } from "../components/Common";

export default function LogAktivitas() {
  const { activityLog } = useApp();
  const [search, setSearch] = useState("");

  const filtered = activityLog.filter((l) =>
    (l.user + l.action + l.detail).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="view">
      <div className="pos-toolbar">
        <div className="search-box">
          <Search size={16} strokeWidth={2} />
          <input placeholder="Cari pengguna atau aktivitas…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="panel">
        {filtered.length === 0 ? (
          <EmptyState>Tidak ada aktivitas yang cocok.</EmptyState>
        ) : (
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>Waktu</th><th>Pengguna</th><th>Aktivitas</th><th>Detail</th></tr></thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td className="table-product__meta">{l.time}</td>
                  <td>{l.user}</td>
                  <td><span className="pill pill--brass pill--sm">{l.action}</span></td>
                  <td className="table-product__meta">{l.detail}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        )}
      </div>
    </div>
  );
}
