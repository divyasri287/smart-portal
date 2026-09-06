export const officerStats = {
  totalDeployed: "8 Inspectors",
  totalSub: "Registered Mandi Officers",
  totalTrend: "100% Present",
  onDutyShift: "5 Inspectors",
  shiftSub: "Morning Shift (08:00 - 14:00)",
  shiftTrend: "All Bays Covered",
  assignedBays: "4 Bays",
  baysSub: "Weighbridge & Labs",
  baysTrend: "Full Telemetry",
  avgRating: "4.8 / 5.0",
  ratingSub: "Verified Turnaround",
  ratingTrend: "+0.2 rating"
};

export const initialOfficerRoster = [
  { id: 'OFF-101', name: 'Balwinder Singh', badge: 'INS-PB-401', bay: 'Gate 1 Intake', shift: 'Morning (08:00 - 14:00)', status: 'On Duty', rating: 4.9, verifiedCount: 142 },
  { id: 'OFF-102', name: 'Harpreet Kaur', badge: 'INS-PB-402', bay: 'Weighbridge Bay 2', shift: 'Morning (08:00 - 14:00)', status: 'On Duty', rating: 4.8, verifiedCount: 128 },
  { id: 'OFF-103', name: 'Rajinder Sharma', badge: 'INS-PB-403', bay: 'Moisture Testing Lab 1', shift: 'Morning (08:00 - 14:00)', status: 'On Break', rating: 4.6, verifiedCount: 96 },
  { id: 'OFF-104', name: 'Gurmeet Dhillon', badge: 'INS-PB-404', bay: 'Unloading Yard B', shift: 'Evening (14:00 - 20:00)', status: 'Off Duty', rating: 4.9, verifiedCount: 164 },
  { id: 'OFF-105', name: 'Sandeep Verma', badge: 'INS-PB-405', bay: 'Exit Dispatch Gate', shift: 'Evening (14:00 - 20:00)', status: 'On Duty', rating: 4.7, verifiedCount: 110 },
  { id: 'OFF-106', name: 'Kuldeep Gill', badge: 'INS-PB-406', bay: 'Gate 2 Intake', shift: 'Morning (08:00 - 14:00)', status: 'On Duty', rating: 4.8, verifiedCount: 104 },
  { id: 'OFF-107', name: 'Navneet Kaur', badge: 'INS-PB-407', bay: 'Weighbridge Bay 1', shift: 'Night (20:00 - 02:00)', status: 'Off Duty', rating: 4.7, verifiedCount: 88 }
];

export const bayOptions = [
  "Gate 1 Intake",
  "Gate 2 Intake",
  "Weighbridge Bay 1",
  "Weighbridge Bay 2",
  "Moisture Testing Lab 1",
  "Unloading Yard A",
  "Unloading Yard B",
  "Exit Dispatch Gate"
];

export default {
  officerStats,
  initialOfficerRoster,
  bayOptions
};
