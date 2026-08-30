export const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'dbt credited':
    case 'approved':
    case 'quality verified':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'in queue':
    case 'pending processing':
    case 'booked':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'rejected':
    case 'failed / on hold':
      return 'bg-rose-100 text-rose-800 border-rose-300';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-300';
  }
};
