import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/cards/Card';
import SearchBox from '../../components/inputs/SearchBox';
import { ArrowRight, User, MapPin, Wheat, Phone } from 'lucide-react';
import farmersData from '../../data/farmers.json';

export const SearchFarmer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = farmersData.filter((f) => {
    const q = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q) ||
      f.aadhaar.includes(q) ||
      f.mobile.includes(q) ||
      f.cropType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Search & Verify Farmer Eligibility"
        subtitle="Find a farmer by name, ID, Aadhaar, or mobile to begin the procurement process"
      />

      {/* Search */}
      <div className="max-w-2xl">
        <SearchBox
          placeholder="Search by name, Farmer ID, Aadhaar, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="text-xs text-slate-500">
          Found <span className="font-bold text-slate-700">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for &quot;{searchTerm}&quot;
        </p>
      )}

      {/* Table View */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="px-4 py-3">Farmer ID</th>
                <th className="px-4 py-3">Name & Contact</th>
                <th className="px-4 py-3 hidden md:table-cell">Aadhaar</th>
                <th className="px-4 py-3 hidden sm:table-cell">Crop & Acreage</th>
                <th className="px-4 py-3 hidden lg:table-cell">District</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <User className="w-8 h-8 opacity-40" />
                      <p className="text-sm font-medium">No farmers found</p>
                      <p className="text-xs">Try a different search term</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((farmer, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-900">{farmer.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-green-800">
                            {farmer.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{farmer.name}</p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-0.5">
                            <Phone className="w-2.5 h-2.5" /> {farmer.mobile}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 hidden md:table-cell">{farmer.aadhaar}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="text-xs font-medium text-slate-700 flex items-center gap-1">
                        <Wheat className="w-3 h-3 text-amber-500" /> {farmer.cropType}
                      </div>
                      <div className="text-[11px] text-slate-400">{farmer.acreage} Acres</div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {farmer.district}, {farmer.state}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/officer/farmer-details/${farmer.id}`)}
                        className="inline-flex items-center gap-1.5 text-xs bg-green-800 hover:bg-green-900 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View Profile <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[11px] text-slate-400">
          {filtered.length} of {farmersData.length} registered farmers
        </div>
      </Card>

      {/* Grid Card View (Mobile-friendly alternative) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((farmer, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => navigate(`/officer/farmer-details/${farmer.id}`)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">{farmer.name.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-800 truncate">{farmer.name}</p>
                <p className="text-[11px] font-mono text-slate-400">{farmer.id}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Wheat className="w-3 h-3 text-amber-500 shrink-0" />
                <span>{farmer.cropType} · {farmer.acreage} Acres</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{farmer.district}, {farmer.state}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end text-green-700 text-xs font-semibold group-hover:gap-2 transition-all">
              View Profile <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFarmer;
