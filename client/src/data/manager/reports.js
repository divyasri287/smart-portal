export const executiveReports = [
  {
    id: "daily-procurement",
    title: "Daily Grain Procurement Intake",
    date: "Sep 5, 2026",
    totalTonnage: "1,480 Tons",
    farmersServed: 342,
    dbtDisbursed: "₹ 3.32 Crores",
    moistureAvg: "12.8%"
  },
  {
    id: "weekly-quality",
    title: "Weekly Quality & Moisture Audit",
    date: "Aug 29 - Sep 5",
    totalTonnage: "9,850 Tons",
    farmersServed: 2140,
    dbtDisbursed: "₹ 22.1 Crores",
    moistureAvg: "13.1%"
  },
  {
    id: "dbt-audit",
    title: "DBT Disbursement & PFMS Audit",
    date: "Monthly Summary",
    totalTonnage: "34,200 Tons",
    farmersServed: 7890,
    dbtDisbursed: "₹ 76.8 Crores",
    moistureAvg: "12.6%"
  }
];

export const reportLogsDataset = [
  { reportId: 'REP-PB-901', date: '2026-09-05', procuredTons: '1,480 MT', activeMandis: 'Ludhiana Central (PB-4)', farmersServed: 342, dbtDisbursed: '₹ 3.32 Cr' },
  { reportId: 'REP-PB-902', date: '2026-09-04', procuredTons: '1,320 MT', activeMandis: 'Ludhiana Central (PB-4)', farmersServed: 298, dbtDisbursed: '₹ 2.96 Cr' },
  { reportId: 'REP-PB-903', date: '2026-09-03', procuredTons: '1,610 MT', activeMandis: 'Ludhiana Central (PB-4)', farmersServed: 380, dbtDisbursed: '₹ 3.61 Cr' },
  { reportId: 'REP-PB-904', date: '2026-09-02', procuredTons: '1,250 MT', activeMandis: 'Ludhiana Central (PB-4)', farmersServed: 275, dbtDisbursed: '₹ 2.80 Cr' },
  { reportId: 'REP-PB-905', date: '2026-09-01', procuredTons: '1,540 MT', activeMandis: 'Ludhiana Central (PB-4)', farmersServed: 350, dbtDisbursed: '₹ 3.45 Cr' }
];

export default {
  executiveReports,
  reportLogsDataset
};
