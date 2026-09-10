export const queueTelemetryStats = {
  totalQueuedTrucks: "6 Trucks",
  totalQueuedSub: "Across 4 Mandi Entry Gates",
  totalQueuedTrend: "Normal Traffic",
  avgTurnaround: "14 Mins",
  avgTurnaroundSub: "Gate Entry to Exit Dispatch",
  avgTurnaroundTrend: "-2.4 mins improvement",
  activeBays: "4 / 4 Bays",
  activeBaysSub: "100% Operational Capacity",
  activeBaysTrend: "All Inspectors Active",
  flowEfficiency: "94.2%",
  flowEfficiencySub: "Target 15 Trucks / hour",
  flowEfficiencyTrend: "+4.2% vs target"
};

export const initialQueueList = [
  { 
    tokenNo: 'TK-8801', 
    farmerName: 'Gurpreet Singh', 
    vehicleNo: 'PB-10-CZ-4402', 
    commodity: 'Grade-A Wheat', 
    entryTime: '08:15 AM', 
    bayAssigned: 'Gate 1 Intake', 
    status: 'Weighment', 
    waitTime: '8 Mins' 
  },
  { 
    tokenNo: 'TK-8802', 
    farmerName: 'Sukhwinder Kaur', 
    vehicleNo: 'PB-08-AX-9912', 
    commodity: 'Sharbati Wheat', 
    entryTime: '08:22 AM', 
    bayAssigned: 'Weighbridge Bay 2', 
    status: 'Moisture Quality Check', 
    waitTime: '14 Mins' 
  },
  { 
    tokenNo: 'TK-8803', 
    farmerName: 'Harinder Sharma', 
    vehicleNo: 'PB-11-BY-1204', 
    commodity: 'Mustard Seed', 
    entryTime: '08:35 AM', 
    bayAssigned: 'Gate 2 Intake', 
    status: 'In Queue', 
    waitTime: '22 Mins' 
  },
  { 
    tokenNo: 'TK-8804', 
    farmerName: 'Manpreet Singh', 
    vehicleNo: 'PB-10-DQ-5510', 
    commodity: 'Grade-A Wheat', 
    entryTime: '08:40 AM', 
    bayAssigned: 'Gate 1 Intake', 
    status: 'In Queue', 
    waitTime: '12 Mins' 
  },
  { 
    tokenNo: 'TK-8805', 
    farmerName: 'Jagtar Singh', 
    vehicleNo: 'PB-09-EV-3301', 
    commodity: 'Grade-A Wheat', 
    entryTime: '08:50 AM', 
    bayAssigned: 'Unloading Yard B', 
    status: 'Unloading', 
    waitTime: '18 Mins' 
  },
  { 
    tokenNo: 'TK-8806', 
    farmerName: 'Amrik Chand', 
    vehicleNo: 'PB-12-FF-7718', 
    commodity: 'Sharbati Wheat', 
    entryTime: '09:05 AM', 
    bayAssigned: 'Exit Gate Dispatch', 
    status: 'Dispatched', 
    waitTime: '2 Mins' 
  }
];

export default {
  queueTelemetryStats,
  initialQueueList
};
