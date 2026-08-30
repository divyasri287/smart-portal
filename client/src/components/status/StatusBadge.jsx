import React from 'react';
import { getStatusBadgeColor } from '../../utils/helpers';

export const StatusBadge = ({ status }) => {
  const colorClasses = getStatusBadgeColor(status);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClasses}`}>
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
