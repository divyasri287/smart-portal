import React from 'react';
import { Search } from 'lucide-react';

const SearchBox = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  return (
    <div className={['relative w-full', className].join(' ')}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </div>
  );
};

export default SearchBox;
