export const analyticsStats = {
  peakTrafficWindow: "10 AM - 12 PM",
  peakSub: "34 Trucks / hour",
  peakTrend: "Peak Congestion",
  avgTurnaround: "14.2 Mins",
  turnaroundSub: "Gate Entry to Exit",
  turnaroundTrend: "-2.1 mins faster",
  qualityApprovalRate: "96.2%",
  qualitySub: "Moisture < 14% Standard",
  qualityTrend: "+1.4% pass rate",
  monthlyTarget: "84.5%",
  targetSub: "21,125 / 25,000 MT",
  targetTrend: "On Track"
};

export const hourlyArrivalData = [
  { hour: '08:00 AM', trucks: 14, waitMins: 10 },
  { hour: '10:00 AM', trucks: 34, waitMins: 22 },
  { hour: '12:00 PM', trucks: 28, waitMins: 18 },
  { hour: '02:00 PM', trucks: 22, waitMins: 14 },
  { hour: '04:00 PM', trucks: 16, waitMins: 11 },
  { hour: '06:00 PM', trucks: 8, waitMins: 6 }
];

export const moistureAuditBreakdown = {
  passedPercent: 96.2,
  conditionalPercent: 2.8,
  rejectedPercent: 1.0,
  deviceStatus: "Calibrated Today 07:30 AM • Insp. Rajinder Sharma"
};

export default {
  analyticsStats,
  hourlyArrivalData,
  moistureAuditBreakdown
};
