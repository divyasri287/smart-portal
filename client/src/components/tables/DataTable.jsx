import React from 'react';
import StatusBadge from '../status/StatusBadge';

export const DataTable = ({ headers = [], data = [], renderRow }) => {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-lg shadow-xs bg-white">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider">
            {headers.map((head, idx) => (
              <th key={idx} className="p-3.5 whitespace-nowrap">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="p-6 text-center text-slate-500 text-sm">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((item, idx) =>
              renderRow ? (
                renderRow(item, idx)
              ) : (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  {Object.values(item).map((val, i) => (
                    <td key={i} className="p-3.5 text-slate-800 whitespace-nowrap">
                      {typeof val === 'string' && val.includes('Status') ? (
                        <StatusBadge status={val} />
                      ) : (
                        val
                      )}
                    </td>
                  ))}
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
