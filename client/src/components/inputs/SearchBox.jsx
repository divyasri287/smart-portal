import React from 'react';
import { Search } from 'lucide-react';

export const SearchBox = ({ placeholder = 'Search by Token, Farmer ID, or Aadhaar...', value, onChange }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-md text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 shadow-xs"
      />
    </div>
  );
};

export default SearchBox;
