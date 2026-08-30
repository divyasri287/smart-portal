import React from 'react';

export const Skeleton = ({ className = 'h-6 w-full' }) => {
  return <div className={`bg-slate-200 animate-pulse rounded-md ${className}`} />;
};

export default Skeleton;
