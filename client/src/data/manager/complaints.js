export const complaintStats = {
  openGrievances: "2 Tickets",
  openSub: "Requires Manager Review",
  openTrend: "Action Required",
  resolvedToday: "4 Tickets",
  resolvedSub: "Disputes Settled",
  resolvedTrend: "100% SLA",
  moistureRetests: "1 Under Audit",
  retestsSub: "Bay Quality Lab",
  retestsTrend: "Lab Sampled",
  avgResolutionTime: "45 Mins",
  avgSub: "Target under 2 Hours",
  avgTrend: "-15 mins turnaround"
};

export const initialComplaintsList = [
  {
    ticketId: 'TCK-9901',
    farmerName: 'Gurpreet Sharma',
    farmerPhone: '+91 98141 12345',
    category: 'Moisture Dispute',
    priority: 'High',
    date: '2026-09-05',
    status: 'Pending Review',
    description: 'Farmer contested moisture meter reading of 15.2% at Bay 1. Claims grain was stored in sealed moisture-proof tarpaulin.',
    bay: 'Weighbridge Bay 1',
    assignedInspector: 'Balwinder Singh'
  },
  {
    ticketId: 'TCK-9902',
    farmerName: 'Sukhwinder Kaur',
    farmerPhone: '+91 98722 54321',
    category: 'Bank Account Error',
    priority: 'Medium',
    date: '2026-09-04',
    status: 'In Progress',
    description: 'PFMS DBT transfer failed due to IFSC mismatch in Punjab National Bank record. Verified updated passbook scan.',
    bay: 'Helpdesk Counter 2',
    assignedInspector: 'Harpreet Kaur'
  },
  {
    ticketId: 'TCK-9903',
    farmerName: 'Manjit Singh',
    farmerPhone: '+91 94170 88990',
    category: 'Slot Booking Issue',
    priority: 'Low',
    date: '2026-09-03',
    status: 'Resolved',
    description: 'Farmer token missing in gate terminal due to network timeout. Re-issued manual token T-8819.',
    bay: 'Gate 2 Entrance',
    assignedInspector: 'Rajinder Sharma'
  }
];

export default {
  complaintStats,
  initialComplaintsList
};
