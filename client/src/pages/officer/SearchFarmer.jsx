import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import SearchBox from '../../components/inputs/SearchBox';
import DataTable from '../../components/tables/DataTable';
import farmersData from '../../data/farmers.json';

export const SearchFarmer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader title="Search & Verify Farmer Eligibility" subtitle="Verify Aadhaar registration and land holding caps before weighment" />

      <SearchBox value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <DataTable
        headers={['Farmer ID', 'Farmer Name', 'Aadhaar', 'Mobile', 'Crop Type', 'Acreage', 'Action']}
        data={farmersData}
        renderRow={(farmer, idx) => (
          <tr key={idx} className="hover:bg-slate-50">
            <td className="p-3.5 font-mono text-xs font-semibold text-slate-900">{farmer.id}</td>
            <td className="p-3.5 text-xs text-slate-800">{farmer.name}</td>
            <td className="p-3.5 font-mono text-xs text-slate-600">{farmer.aadhaar}</td>
            <td className="p-3.5 text-xs text-slate-600">{farmer.mobile}</td>
            <td className="p-3.5 text-xs text-slate-800">{farmer.cropType}</td>
            <td className="p-3.5 text-xs text-slate-800">{farmer.acreage} Acres</td>
            <td className="p-3.5 text-xs">
              <button
                onClick={() => navigate(`/officer/farmer-details/${farmer.id}`)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-2.5 py-1 rounded-md"
              >
                View Profile
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default SearchFarmer;
