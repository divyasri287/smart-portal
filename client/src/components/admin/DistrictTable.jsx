import React from 'react';

const DistrictTable = ({ districts = [] }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">District</th>
            <th className="px-4 py-3">State</th>
            <th className="px-4 py-3">Active Mandis</th>
            <th className="px-4 py-3">Procured</th>
            <th className="px-4 py-3">DBT</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district) => (
            <tr key={district.id} className="border-t border-slate-200">
              <td className="px-4 py-3 font-semibold text-slate-900">{district.district}</td>
              <td className="px-4 py-3">{district.state}</td>
              <td className="px-4 py-3">{district.activeCentres}</td>
              <td className="px-4 py-3">{(district.totalProcuredQuintals / 1000).toFixed(0)}K Qtl</td>
              <td className="px-4 py-3">₹{district.dbtTotalCr} Cr</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                  {district.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictTable;
