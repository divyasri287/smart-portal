import React from 'react';

export const SectionHeader = ({ title, description }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
};

export default SectionHeader;
