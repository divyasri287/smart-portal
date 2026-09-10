export const dashboardStats = {
  dailyCapacity: "78%",
  capacitySub: "450 / 600 Slots Booked",
  capacityTrend: "+8.2% vs yesterday",
  avgTurnaround: "18 Mins",
  turnaroundSub: "Gate Entry to Exit Flow",
  turnaroundTrend: "-3.2 mins faster",
  officersDeployed: "8 Inspectors",
  officersSub: "Across 4 Mandi Bays",
  officersTrend: "100% Attendance",
  pendingGrievances: "2 Tickets",
  grievancesSub: "Unresolved Disputes",
  grievancesTrend: "Requires Action"
};

export const gateTelemetry = [
  {
    id: "gate-1",
    title: "Gate 1 Intake",
    vehicleCount: 4,
    maxCapacity: 15,
    flowRate: "14 Trucks / hr",
    avgWaitTime: "10 Mins",
    status: "normal",
    assignedInspector: "Balwinder Singh"
  },
  {
    id: "gate-2",
    title: "Gate 2 Intake",
    vehicleCount: 8,
    maxCapacity: 12,
    flowRate: "8 Trucks / hr",
    avgWaitTime: "22 Mins",
    status: "warning",
    assignedInspector: "Harpreet Kaur"
  },
  {
    id: "weighbridge-3",
    title: "Weighbridge Bay 3",
    vehicleCount: 2,
    maxCapacity: 10,
    flowRate: "18 Trucks / hr",
    avgWaitTime: "6 Mins",
    status: "normal",
    assignedInspector: "Rajinder Sharma"
  }
];

export const dailyProcurementSummary = {
  totalTonnage: "1,480 MT",
  farmersServed: 342,
  dbtSettled: "₹ 3.32 Cr",
  batches: [
    { id: 1, name: "Grade-A Wheat Batch #8812", details: "Bay 1 • Moisture avg: 12.4%", tonnage: "420 Tons" },
    { id: 2, name: "Sharbati Wheat Batch #8813", details: "Bay 2 • Moisture avg: 13.1%", tonnage: "580 Tons" },
    { id: 3, name: "Mustard Seed Batch #8814", details: "Bay 3 • Moisture avg: 8.2%", tonnage: "480 Tons" }
  ]
};

export default {
  dashboardStats,
  gateTelemetry,
  dailyProcurementSummary
};
