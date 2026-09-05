// Enhanced Mock Dataset for Member 4 - Government Admin Module

export const adminProfile = {
  id: "ADM-9081",
  name: "Dr. Sunita Verma",
  email: "sunita.verma@gov.in",
  phone: "+91 98765 43210",
  role: "State Procurement Director",
  department: "Ministry of Food & Public Distribution",
  state: "Tamil Nadu & National Region",
  cadre: "IAS 2011 Batch",
  officeAddress: "Krishi Bhawan, Sector 17, Chandigarh / Chennai HQ",
  lastLogin: "2026-09-05 09:30 AM",
  totalManagedCentres: 250,
  authorizedBudget: "₹ 25,00,000",
  securityClearance: "Level 4 National Admin"
};

export const dashboardOverviewStats = {
  totalStates: 5,
  totalDistricts: 36,
  totalCentres: 250,
  activeCentres: 230,
  inactiveCentres: 20,
  totalPayments: "₹ 25,00,000",
  completedPayments: "₹ 20,00,000",
  pendingPayments: "₹ 4,00,000",
  failedPayments: "₹ 1,00,000"
};

export const stateData = [
  {
    id: "ST-TN",
    state: "Tamil Nadu",
    code: "TN",
    targetTons: 1500000,
    achievedTons: 1420000,
    dbtDisbursedCr: 25.0,
    activeMandis: 65,
    registeredFarmers: 350000,
    completionPercentage: 94.6,
    status: "Top Performer",
    growth: "+8.5%",
    districts: ["Salem", "Namakkal", "Erode", "Coimbatore"]
  },
  {
    id: "ST-PB",
    state: "Punjab",
    code: "PB",
    targetTons: 1250000,
    achievedTons: 1180000,
    dbtDisbursedCr: 27.14,
    activeMandis: 75,
    registeredFarmers: 420000,
    completionPercentage: 94.4,
    status: "Top Performer",
    growth: "+6.8%",
    districts: ["Ludhiana", "Patiala", "Sangrur"]
  },
  {
    id: "ST-HR",
    state: "Haryana",
    code: "HR",
    targetTons: 800000,
    achievedTons: 765000,
    dbtDisbursedCr: 17.59,
    activeMandis: 45,
    registeredFarmers: 285000,
    completionPercentage: 95.6,
    status: "Exceeding Target",
    growth: "+5.2%",
    districts: ["Karnal", "Ambala"]
  },
  {
    id: "ST-MP",
    state: "Madhya Pradesh",
    code: "MP",
    targetTons: 1500000,
    achievedTons: 1390000,
    dbtDisbursedCr: 31.97,
    activeMandis: 50,
    registeredFarmers: 510000,
    completionPercentage: 92.6,
    status: "Steady Flow",
    growth: "+8.4%",
    districts: ["Ujjain", "Indore"]
  },
  {
    id: "ST-UP",
    state: "Uttar Pradesh",
    code: "UP",
    targetTons: 1800000,
    achievedTons: 1520000,
    dbtDisbursedCr: 34.96,
    activeMandis: 15,
    registeredFarmers: 640000,
    completionPercentage: 84.4,
    status: "In Progress",
    growth: "+4.1%",
    districts: ["Varanasi", "Gorakhpur"]
  }
];

export const districtData = [
  {
    id: "DST-TN-01",
    district: "Salem",
    state: "Tamil Nadu",
    activeCentres: 18,
    totalProcuredQuintals: 420000,
    dbtTotalCr: 6.8,
    activeFarmers: 14200,
    moisturePassRate: "98.5%",
    status: "Optimal",
    centresList: ["Centre A (Salem Main Yard)", "Salem South Mandi", "Attur Procurement Hub"]
  },
  {
    id: "DST-TN-02",
    district: "Namakkal",
    state: "Tamil Nadu",
    activeCentres: 15,
    totalProcuredQuintals: 360000,
    dbtTotalCr: 5.5,
    activeFarmers: 11800,
    moisturePassRate: "97.2%",
    status: "Optimal",
    centresList: ["Centre B (Namakkal Main)", "Rasipuram Grain Hub"]
  },
  {
    id: "DST-TN-03",
    district: "Erode",
    state: "Tamil Nadu",
    activeCentres: 16,
    totalProcuredQuintals: 390000,
    dbtTotalCr: 6.2,
    activeFarmers: 12900,
    moisturePassRate: "96.8%",
    status: "Attention Needed",
    centresList: ["Centre C (Erode APMC)", "Perundurai Grain Yard"]
  },
  {
    id: "DST-TN-04",
    district: "Coimbatore",
    state: "Tamil Nadu",
    activeCentres: 16,
    totalProcuredQuintals: 410000,
    dbtTotalCr: 6.5,
    activeFarmers: 13500,
    moisturePassRate: "99.1%",
    status: "Optimal",
    centresList: ["Coimbatore Central Yard", "Pollachi Mandi"]
  },
  {
    id: "DST-PB-01",
    district: "Ludhiana",
    state: "Punjab",
    activeCentres: 14,
    totalProcuredQuintals: 452000,
    dbtTotalCr: 7.2,
    activeFarmers: 14200,
    moisturePassRate: "98.2%",
    status: "Optimal",
    centresList: ["Ludhiana Mandi Centre 4"]
  },
  {
    id: "DST-HR-01",
    district: "Karnal",
    state: "Haryana",
    activeCentres: 9,
    totalProcuredQuintals: 310000,
    dbtTotalCr: 4.8,
    activeFarmers: 9500,
    moisturePassRate: "97.1%",
    status: "Optimal",
    centresList: ["Karnal Grain Hub"]
  }
];

export const centreMonitoringData = [
  {
    centreCode: "MND-TN-001",
    centreName: "Centre A (Salem Main Yard)",
    district: "Salem",
    state: "Tamil Nadu",
    manager: "K. Arumugam",
    phone: "+91 94432 10987",
    activeWeighbridges: 4,
    queueCount: 12,
    procuredTodayTons: 450,
    capacityUtilized: "75%",
    status: "Active",
    lastPing: "1 min ago"
  },
  {
    centreCode: "MND-TN-002",
    centreName: "Centre B (Namakkal Main)",
    district: "Namakkal",
    state: "Tamil Nadu",
    manager: "M. Selvam",
    phone: "+91 94433 21098",
    activeWeighbridges: 3,
    queueCount: 18,
    procuredTodayTons: 380,
    capacityUtilized: "82%",
    status: "Active",
    lastPing: "3 mins ago"
  },
  {
    centreCode: "MND-TN-003",
    centreName: "Centre C (Erode APMC)",
    district: "Erode",
    state: "Tamil Nadu",
    manager: "P. Sundaram",
    phone: "+91 94434 32109",
    activeWeighbridges: 0,
    queueCount: 0,
    procuredTodayTons: 0,
    capacityUtilized: "0%",
    status: "Inactive",
    lastPing: "Offline Maintenance"
  },
  {
    centreCode: "MND-TN-004",
    centreName: "Coimbatore Central Yard",
    district: "Coimbatore",
    state: "Tamil Nadu",
    manager: "R. Venkatesh",
    phone: "+91 94435 43210",
    activeWeighbridges: 5,
    queueCount: 8,
    procuredTodayTons: 520,
    capacityUtilized: "65%",
    status: "Active",
    lastPing: "Just now"
  },
  {
    centreCode: "MND-PB-004",
    centreName: "Ludhiana Mandi Centre 4",
    district: "Ludhiana",
    state: "Punjab",
    manager: "Anil Kumar",
    phone: "+91 98123 45678",
    activeWeighbridges: 4,
    queueCount: 18,
    procuredTodayTons: 420,
    capacityUtilized: "78%",
    status: "Active",
    lastPing: "2 mins ago"
  },
  {
    centreCode: "MND-HR-003",
    centreName: "Ambala APMC Mandi",
    district: "Ambala",
    state: "Haryana",
    manager: "Rajesh Gupta",
    phone: "+91 98345 67890",
    activeWeighbridges: 5,
    queueCount: 12,
    procuredTodayTons: 510,
    capacityUtilized: "62%",
    status: "Active",
    lastPing: "Just now"
  }
];

export const paymentMonitoringData = [
  {
    paymentId: "PAY-882101",
    farmerName: "Ramesh Singh",
    userRole: "Farmer",
    aadhaarLast4: "4821",
    bankName: "State Bank of India",
    accountNo: "•••• 3921",
    quantityQuintals: 140,
    mspPerQuintal: 2300,
    totalAmount: 322000,
    bankRefNo: "DBT-2026-990123",
    disbursementDate: "2026-08-28",
    status: "Completed",
    clearanceTime: "24 Hours"
  },
  {
    paymentId: "PAY-882102",
    farmerName: "Sukhwinder Kaur",
    userRole: "Farmer",
    aadhaarLast4: "9102",
    bankName: "Punjab National Bank",
    accountNo: "•••• 8812",
    quantityQuintals: 95,
    mspPerQuintal: 2300,
    totalAmount: 218500,
    bankRefNo: "DBT-2026-990124",
    disbursementDate: "2026-08-29",
    status: "Pending",
    clearanceTime: "In Transit"
  },
  {
    paymentId: "PAY-882103",
    farmerName: "K. Ramasamy",
    userRole: "Farmer",
    aadhaarLast4: "3312",
    bankName: "Indian Overseas Bank",
    accountNo: "•••• 4421",
    quantityQuintals: 180,
    mspPerQuintal: 2300,
    totalAmount: 414000,
    bankRefNo: "DBT-2026-990125",
    disbursementDate: "2026-08-29",
    status: "Completed",
    clearanceTime: "12 Hours"
  },
  {
    paymentId: "PAY-882104",
    farmerName: "M. Palanisamy",
    userRole: "Farmer",
    aadhaarLast4: "7723",
    bankName: "Canara Bank",
    accountNo: "•••• 1092",
    quantityQuintals: 165,
    mspPerQuintal: 2300,
    totalAmount: 379500,
    bankRefNo: "DBT-2026-990126",
    disbursementDate: "2026-08-30",
    status: "Failed",
    clearanceTime: "Bank Account Mismatch"
  },
  {
    paymentId: "PAY-882105",
    farmerName: "Rajender Yadav",
    userRole: "Farmer",
    aadhaarLast4: "5534",
    bankName: "HDFC Bank",
    accountNo: "•••• 7741",
    quantityQuintals: 200,
    mspPerQuintal: 2300,
    totalAmount: 460000,
    bankRefNo: "DBT-2026-990127",
    disbursementDate: "2026-08-30",
    status: "Pending",
    clearanceTime: "NPCI Clearing"
  }
];

export const reportsData = [
  {
    reportId: "RPT-STATE-01",
    title: "State Performance Report",
    category: "State Level",
    dateGenerated: "2026-09-01",
    fileSize: "2.4 MB",
    format: "PDF",
    status: "Ready for Download"
  },
  {
    reportId: "RPT-DISTRICT-02",
    title: "District Report",
    category: "District Level",
    dateGenerated: "2026-09-02",
    fileSize: "1.8 MB",
    format: "PDF",
    status: "Ready for Download"
  },
  {
    reportId: "RPT-CENTRE-03",
    title: "Centre Monitoring Report",
    category: "Mandi Operations",
    dateGenerated: "2026-09-03",
    fileSize: "3.2 MB",
    format: "CSV / Excel",
    status: "Ready for Download"
  },
  {
    reportId: "RPT-PAYMENT-04",
    title: "Payment Report",
    category: "Financial Audit",
    dateGenerated: "2026-09-04",
    fileSize: "4.1 MB",
    format: "PDF",
    status: "Ready for Download"
  },
  {
    reportId: "RPT-ANALYTICS-05",
    title: "Analytics Report",
    category: "Macro Analytics",
    dateGenerated: "2026-09-05",
    fileSize: "2.9 MB",
    format: "PDF",
    status: "Ready for Download"
  }
];

export const usersData = [
  {
    userId: "USR-01",
    user: "User 01",
    name: "Dr. Sunita Verma",
    role: "District",
    department: "Food & Civil Supplies",
    location: "Salem District Office",
    email: "sunita.verma@gov.in",
    phone: "+91 98765 43210",
    status: "Active",
    lastActive: "Today, 09:30 AM"
  },
  {
    userId: "USR-02",
    user: "User 02",
    name: "K. Arumugam",
    role: "Centre",
    department: "Centre A (Salem)",
    location: "Salem Mandi Yard",
    email: "arumugam.k@mandi.gov.in",
    phone: "+91 94432 10987",
    status: "Active",
    lastActive: "Today, 09:12 AM"
  },
  {
    userId: "USR-03",
    user: "User 03",
    name: "P. Sundaram",
    role: "Admin",
    department: "State Directorate",
    location: "Chennai Head Office",
    email: "sundaram.p@gov.in",
    phone: "+91 94434 32109",
    status: "Active",
    lastActive: "Today, 08:45 AM"
  },
  {
    userId: "USR-04",
    user: "User 04",
    name: "M. Selvam",
    role: "Centre",
    department: "Centre B (Namakkal)",
    location: "Namakkal Yard",
    email: "selvam.m@mandi.gov.in",
    phone: "+91 94433 21098",
    status: "Active",
    lastActive: "Yesterday"
  },
  {
    userId: "USR-05",
    user: "User 05",
    name: "R. Venkatesh",
    role: "District",
    department: "Coimbatore APMC",
    location: "Coimbatore Office",
    email: "venkatesh.r@gov.in",
    phone: "+91 94435 43210",
    status: "Active",
    lastActive: "Today, 10:05 AM"
  }
];

export const analyticsData = {
  kpis: [
    { title: "Centre Growth Rate", value: "+12.4%", change: "+15 Mandis", trend: "up", subtitle: "250 Total Procurement Mandis" },
    { title: "Payment Settlement Speed", value: "18.4 Hours", change: "92% Cleared", trend: "up", subtitle: "Direct Farmer Account Transfer" },
    { title: "District Performance Score", value: "94.8 / 100", change: "+4.2%", trend: "up", subtitle: "Based on Queue & Quality Compliance" },
    { title: "State Performance Index", value: "95.6%", change: "+3.8%", trend: "up", subtitle: "Target Achievement across 5 States" }
  ],
  monthlyStatistics: [
    { month: "May", volumeMT: 350000, growthRate: "85%", paymentsCr: 3.5 },
    { month: "Jun", volumeMT: 850000, growthRate: "90%", paymentsCr: 8.5 },
    { month: "Jul", volumeMT: 1420000, growthRate: "94%", paymentsCr: 14.2 },
    { month: "Aug", volumeMT: 1850000, growthRate: "98%", paymentsCr: 18.5 },
    { month: "Sep", volumeMT: 380000, growthRate: "95%", paymentsCr: 4.1 }
  ],
  recentActivities: [
    { id: 1, text: "State of Tamil Nadu (Salem & Namakkal) achieved 94.6% procurement target", time: "10 mins ago", type: "success" },
    { id: 2, text: "Payment Batch PAY-882101 of ₹ 20,00,000 completed successfully", time: "25 mins ago", type: "payment" },
    { id: 3, text: "Centre C (Erode APMC) marked as Inactive due to scheduled maintenance", time: "1 hour ago", type: "warning" },
    { id: 4, text: "New District Officer User 01 logged into Salem District Office", time: "2 hours ago", type: "info" }
  ]
};
