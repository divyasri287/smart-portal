// Smart Procurement Portal - Government Admin Storage Utility
// Production-grade LocalStorage utility for SIH 2026 Government Admin Module

const STORAGE_KEYS = {
  CENTRES: 'spp_admin_centres',
  MANAGERS: 'spp_admin_managers',
  OFFICERS: 'spp_admin_officers',
  PAYMENTS: 'spp_admin_payments',
  REPORTS: 'spp_admin_reports',
  NOTIFICATIONS: 'spp_admin_notifications',
  PROFILE: 'spp_admin_profile',
};

const DEFAULT_CENTRES = [
  {
    id: 'CEN-401',
    name: 'Salem Main Procurement Centre #402',
    district: 'Salem',
    state: 'Tamil Nadu',
    manager: 'Anil Kumar',
    managerPhone: '+91 98345 67890',
    managerEmail: 'anil.kumar.mgr@gov.in',
    status: 'Open',
    todayQueue: 12,
    todayProcuredMT: 142.5,
    activeBays: 4,
    capacityMT: 250,
  },
  {
    id: 'CEN-402',
    name: 'Ludhiana Central Mandi Yard #12',
    district: 'Ludhiana',
    state: 'Punjab',
    manager: 'Gurpreet Singh',
    managerPhone: '+91 98765 43211',
    managerEmail: 'gurpreet.s.mgr@gov.in',
    status: 'Open',
    todayQueue: 18,
    todayProcuredMT: 215.0,
    activeBays: 5,
    capacityMT: 300,
  },
  {
    id: 'CEN-403',
    name: 'Karnal Grain Mandi Bay 3',
    district: 'Karnal',
    state: 'Haryana',
    manager: 'Rajesh Sharma',
    managerPhone: '+91 98123 45678',
    managerEmail: 'rajesh.sharma.mgr@gov.in',
    status: 'Open',
    todayQueue: 9,
    todayProcuredMT: 110.8,
    activeBays: 3,
    capacityMT: 200,
  },
  {
    id: 'CEN-404',
    name: 'Erode Regulated Market Yard',
    district: 'Erode',
    state: 'Tamil Nadu',
    manager: 'S. Ramanathan',
    managerPhone: '+91 94432 10987',
    managerEmail: 's.ramanathan.mgr@gov.in',
    status: 'Closed',
    todayQueue: 0,
    todayProcuredMT: 0,
    activeBays: 0,
    capacityMT: 180,
  },
  {
    id: 'CEN-405',
    name: 'Thanjavur Direct Purchase Centre',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    manager: 'K. Murugan',
    managerPhone: '+91 94876 54321',
    managerEmail: 'k.murugan.mgr@gov.in',
    status: 'Open',
    todayQueue: 15,
    todayProcuredMT: 178.4,
    activeBays: 4,
    capacityMT: 220,
  },
  {
    id: 'CEN-406',
    name: 'Sangrur Food Grain Complex',
    district: 'Sangrur',
    state: 'Punjab',
    manager: 'Harjit Sandhu',
    managerPhone: '+91 98456 78901',
    managerEmail: 'harjit.sandhu.mgr@gov.in',
    status: 'Open',
    todayQueue: 8,
    todayProcuredMT: 95.2,
    activeBays: 3,
    capacityMT: 200,
  },
  {
    id: 'CEN-407',
    name: 'Namakkal Agro Terminal',
    district: 'Namakkal',
    state: 'Tamil Nadu',
    manager: 'V. Selvaraj',
    managerPhone: '+91 97890 12345',
    managerEmail: 'v.selvaraj.mgr@gov.in',
    status: 'Closed',
    todayQueue: 0,
    todayProcuredMT: 0,
    activeBays: 0,
    capacityMT: 150,
  },
  {
    id: 'CEN-408',
    name: 'Ambala Cantt Procurement Depot',
    district: 'Ambala',
    state: 'Haryana',
    manager: 'Amit Verma',
    managerPhone: '+91 98111 22334',
    managerEmail: 'amit.verma.mgr@gov.in',
    status: 'Open',
    todayQueue: 6,
    todayProcuredMT: 84.0,
    activeBays: 2,
    capacityMT: 150,
  },
];

const DEFAULT_MANAGERS = [
  {
    id: 'MGR-001',
    name: 'Anil Kumar',
    employeeId: 'MGR-TN-401',
    assignedCentre: 'Salem Main Procurement Centre #402',
    phone: '+91 98345 67890',
    email: 'anil.kumar.mgr@gov.in',
    status: 'Active',
    district: 'Salem',
    joiningDate: '12 Jan 2022',
  },
  {
    id: 'MGR-002',
    name: 'Gurpreet Singh',
    employeeId: 'MGR-PB-102',
    assignedCentre: 'Ludhiana Central Mandi Yard #12',
    phone: '+91 98765 43211',
    email: 'gurpreet.s.mgr@gov.in',
    status: 'Active',
    district: 'Ludhiana',
    joiningDate: '04 Mar 2021',
  },
  {
    id: 'MGR-003',
    name: 'Rajesh Sharma',
    employeeId: 'MGR-HR-203',
    assignedCentre: 'Karnal Grain Mandi Bay 3',
    phone: '+91 98123 45678',
    email: 'rajesh.sharma.mgr@gov.in',
    status: 'Active',
    district: 'Karnal',
    joiningDate: '18 Nov 2020',
  },
  {
    id: 'MGR-004',
    name: 'S. Ramanathan',
    employeeId: 'MGR-TN-404',
    assignedCentre: 'Erode Regulated Market Yard',
    phone: '+91 94432 10987',
    email: 's.ramanathan.mgr@gov.in',
    status: 'Disabled',
    district: 'Erode',
    joiningDate: '01 Aug 2023',
  },
  {
    id: 'MGR-005',
    name: 'K. Murugan',
    employeeId: 'MGR-TN-405',
    assignedCentre: 'Thanjavur Direct Purchase Centre',
    phone: '+91 94876 54321',
    email: 'k.murugan.mgr@gov.in',
    status: 'Active',
    district: 'Thanjavur',
    joiningDate: '15 May 2022',
  },
  {
    id: 'MGR-006',
    name: 'Harjit Sandhu',
    employeeId: 'MGR-PB-106',
    assignedCentre: 'Sangrur Food Grain Complex',
    phone: '+91 98456 78901',
    email: 'harjit.sandhu.mgr@gov.in',
    status: 'Active',
    district: 'Sangrur',
    joiningDate: '20 Sep 2021',
  },
];

const DEFAULT_OFFICERS = [
  {
    id: 'OFF-101',
    name: 'Vikram Sharma',
    employeeId: 'INS-PB-8891',
    assignedCentre: 'Ludhiana Central Mandi Yard #12',
    phone: '+91 98112 34567',
    email: 'vikram.sharma.ins@gov.in',
    status: 'Active',
    designation: 'Procurement & Weighment Inspector',
    joiningDate: '10 Feb 2023',
  },
  {
    id: 'OFF-102',
    name: 'P. Balasubramanian',
    employeeId: 'INS-TN-2041',
    assignedCentre: 'Salem Main Procurement Centre #402',
    phone: '+91 94421 87654',
    email: 'p.balasubramanian.ins@gov.in',
    status: 'Active',
    designation: 'Quality Assay & Grading Officer',
    joiningDate: '05 Jul 2022',
  },
  {
    id: 'OFF-103',
    name: 'Manpreet Kaur',
    employeeId: 'INS-PB-8894',
    assignedCentre: 'Sangrur Food Grain Complex',
    phone: '+91 98721 54321',
    email: 'manpreet.kaur.ins@gov.in',
    status: 'Active',
    designation: 'Token & Gate Entry Inspector',
    joiningDate: '14 Oct 2023',
  },
  {
    id: 'OFF-104',
    name: 'Suresh Chandra',
    employeeId: 'INS-HR-1092',
    assignedCentre: 'Karnal Grain Mandi Bay 3',
    phone: '+91 98960 11223',
    email: 'suresh.chandra.ins@gov.in',
    status: 'Active',
    designation: 'Moisture & Grain Quality Inspector',
    joiningDate: '22 Jan 2022',
  },
  {
    id: 'OFF-105',
    name: 'M. Senthilkumar',
    employeeId: 'INS-TN-3108',
    assignedCentre: 'Thanjavur Direct Purchase Centre',
    phone: '+91 94861 23456',
    email: 'm.senthil.ins@gov.in',
    status: 'Active',
    designation: 'Weighbridge Operations Officer',
    joiningDate: '08 Nov 2021',
  },
  {
    id: 'OFF-106',
    name: 'Ravi Teja',
    employeeId: 'INS-TN-4112',
    assignedCentre: 'Erode Regulated Market Yard',
    phone: '+91 97891 23450',
    email: 'ravi.teja.ins@gov.in',
    status: 'Disabled',
    designation: 'Verification Officer',
    joiningDate: '19 Jun 2024',
  },
];

// Rich, multi-district dataset representing large-scale DBT payment processing
const DEFAULT_PAYMENTS = [
  {
    id: 'PAY-1001',
    farmerName: 'Ramanathan G.',
    farmerPhone: '+91 98421 11223',
    aadhaarMasked: '•••• •••• 4128',
    tokenNumber: 'TKN-TN-8821',
    crop: 'Paddy (Grade A)',
    quantityQuintals: 42.5,
    mspPerQuintal: 2320,
    amount: 98600,
    status: 'Pending',
    date: '2026-09-10',
    centreName: 'Salem Main Procurement Centre #402',
    district: 'Salem',
    accountNumber: '•••• 4519',
    ifsc: 'SBIN0001245',
    bankName: 'State Bank of India',
    utrNumber: '',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1002',
    farmerName: 'Harbhajan Singh Sandhu',
    farmerPhone: '+91 98140 22334',
    aadhaarMasked: '•••• •••• 8841',
    tokenNumber: 'TKN-PB-4412',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 65.0,
    mspPerQuintal: 2275,
    amount: 147875,
    status: 'Completed',
    date: '2026-09-10',
    centreName: 'Ludhiana Central Mandi Yard #12',
    district: 'Ludhiana',
    accountNumber: '•••• 8820',
    ifsc: 'PUNB0021400',
    bankName: 'Punjab National Bank',
    utrNumber: 'PFMS20260910008821',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1003',
    farmerName: 'Devinder Kumar',
    farmerPhone: '+91 98961 33445',
    aadhaarMasked: '•••• •••• 9912',
    tokenNumber: 'TKN-HR-1903',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 38.0,
    mspPerQuintal: 2275,
    amount: 86450,
    status: 'Pending',
    date: '2026-09-09',
    centreName: 'Karnal Grain Mandi Bay 3',
    district: 'Karnal',
    accountNumber: '•••• 3192',
    ifsc: 'HDFC0000452',
    bankName: 'HDFC Bank',
    utrNumber: '',
    statutoryDeadline: '11 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1004',
    farmerName: 'K. Palanisamy',
    farmerPhone: '+91 94431 44556',
    aadhaarMasked: '•••• •••• 1042',
    tokenNumber: 'TKN-TN-7714',
    crop: 'Paddy (Common)',
    quantityQuintals: 55.0,
    mspPerQuintal: 2300,
    amount: 126500,
    status: 'Completed',
    date: '2026-09-09',
    centreName: 'Thanjavur Direct Purchase Centre',
    district: 'Thanjavur',
    accountNumber: '•••• 7014',
    ifsc: 'IOBA0000142',
    bankName: 'Indian Overseas Bank',
    utrNumber: 'PFMS20260909007714',
    statutoryDeadline: '11 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1005',
    farmerName: 'Gurmeet Ram',
    farmerPhone: '+91 98150 55667',
    aadhaarMasked: '•••• •••• 6631',
    tokenNumber: 'TKN-PB-9905',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 72.0,
    mspPerQuintal: 2275,
    amount: 163800,
    status: 'Pending',
    date: '2026-09-08',
    centreName: 'Sangrur Food Grain Complex',
    district: 'Sangrur',
    accountNumber: '•••• 1205',
    ifsc: 'PUNB0045100',
    bankName: 'Punjab National Bank',
    utrNumber: '',
    statutoryDeadline: '10 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1006',
    farmerName: 'M. Selvam',
    farmerPhone: '+91 97892 66778',
    aadhaarMasked: '•••• •••• 3055',
    tokenNumber: 'TKN-TN-6602',
    crop: 'Ragi (Finger Millet)',
    quantityQuintals: 24.0,
    mspPerQuintal: 4290,
    amount: 102960,
    status: 'Completed',
    date: '2026-09-08',
    centreName: 'Salem Main Procurement Centre #402',
    district: 'Salem',
    accountNumber: '•••• 6632',
    ifsc: 'SBIN0004112',
    bankName: 'State Bank of India',
    utrNumber: 'PFMS20260908006602',
    statutoryDeadline: '10 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1007',
    farmerName: 'Balwinder Singh',
    farmerPhone: '+91 98721 88990',
    aadhaarMasked: '•••• •••• 7719',
    tokenNumber: 'TKN-PB-5521',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 58.5,
    mspPerQuintal: 2275,
    amount: 133088,
    status: 'In Clearing',
    date: '2026-09-10',
    centreName: 'Ludhiana Central Mandi Yard #12',
    district: 'Ludhiana',
    accountNumber: '•••• 9942',
    ifsc: 'PUNB0031200',
    bankName: 'Punjab National Bank',
    utrNumber: 'BATCH-PFMS-CL-908',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1008',
    farmerName: 'S. Arumugam',
    farmerPhone: '+91 94435 77881',
    aadhaarMasked: '•••• •••• 4420',
    tokenNumber: 'TKN-TN-8843',
    crop: 'Paddy (Grade A)',
    quantityQuintals: 48.0,
    mspPerQuintal: 2320,
    amount: 111360,
    status: 'Pending',
    date: '2026-09-10',
    centreName: 'Thanjavur Direct Purchase Centre',
    district: 'Thanjavur',
    accountNumber: '•••• 2209',
    ifsc: 'CBIN0281045',
    bankName: 'Central Bank of India',
    utrNumber: '',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1009',
    farmerName: 'Kuldeep Yadav',
    farmerPhone: '+91 98124 66778',
    aadhaarMasked: '•••• •••• 1928',
    tokenNumber: 'TKN-HR-2281',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 40.0,
    mspPerQuintal: 2275,
    amount: 91000,
    status: 'Pending',
    date: '2026-09-10',
    centreName: 'Karnal Grain Mandi Bay 3',
    district: 'Karnal',
    accountNumber: '•••• 8812',
    ifsc: 'SBIN0002140',
    bankName: 'State Bank of India',
    utrNumber: '',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1010',
    farmerName: 'P. Muthusamy',
    farmerPhone: '+91 94862 33441',
    aadhaarMasked: '•••• •••• 9011',
    tokenNumber: 'TKN-TN-4409',
    crop: 'Paddy (Grade A)',
    quantityQuintals: 36.5,
    mspPerQuintal: 2320,
    amount: 84680,
    status: 'Discrepancy',
    date: '2026-09-09',
    centreName: 'Salem Main Procurement Centre #402',
    district: 'Salem',
    accountNumber: '•••• 0019',
    ifsc: 'TMBL0000108',
    bankName: 'Tamilnad Mercantile Bank',
    utrNumber: '',
    statutoryDeadline: '11 Sep 2026',
    discrepancyReason: 'NPCI Aadhaar-Bank Account mapping unlinked or dormant',
  },
  {
    id: 'PAY-1011',
    farmerName: 'Manmohan Singh Gill',
    farmerPhone: '+91 98145 99001',
    aadhaarMasked: '•••• •••• 6520',
    tokenNumber: 'TKN-PB-6632',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 80.0,
    mspPerQuintal: 2275,
    amount: 182000,
    status: 'In Clearing',
    date: '2026-09-10',
    centreName: 'Sangrur Food Grain Complex',
    district: 'Sangrur',
    accountNumber: '•••• 7711',
    ifsc: 'HDFC0001240',
    bankName: 'HDFC Bank',
    utrNumber: 'BATCH-PFMS-CL-909',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1012',
    farmerName: 'V. Sundaramurthy',
    farmerPhone: '+91 97890 44552',
    aadhaarMasked: '•••• •••• 8823',
    tokenNumber: 'TKN-TN-9918',
    crop: 'Paddy (Common)',
    quantityQuintals: 52.0,
    mspPerQuintal: 2300,
    amount: 119600,
    status: 'Completed',
    date: '2026-09-07',
    centreName: 'Thanjavur Direct Purchase Centre',
    district: 'Thanjavur',
    accountNumber: '•••• 3390',
    ifsc: 'SBIN0000882',
    bankName: 'State Bank of India',
    utrNumber: 'PFMS20260907009918',
    statutoryDeadline: '09 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1013',
    farmerName: 'Surinder Pal',
    farmerPhone: '+91 98114 22119',
    aadhaarMasked: '•••• •••• 3419',
    tokenNumber: 'TKN-HR-8820',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 44.0,
    mspPerQuintal: 2275,
    amount: 100100,
    status: 'Pending',
    date: '2026-09-10',
    centreName: 'Ambala Cantt Procurement Depot',
    district: 'Ambala',
    accountNumber: '•••• 5521',
    ifsc: 'PUNB0011900',
    bankName: 'Punjab National Bank',
    utrNumber: '',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1014',
    farmerName: 'K. Rajendran',
    farmerPhone: '+91 94420 11994',
    aadhaarMasked: '•••• •••• 5590',
    tokenNumber: 'TKN-TN-2210',
    crop: 'Paddy (Grade A)',
    quantityQuintals: 62.0,
    mspPerQuintal: 2320,
    amount: 143840,
    status: 'Pending',
    date: '2026-09-10',
    centreName: 'Salem Main Procurement Centre #402',
    district: 'Salem',
    accountNumber: '•••• 1184',
    ifsc: 'IOBA0001024',
    bankName: 'Indian Overseas Bank',
    utrNumber: '',
    statutoryDeadline: '12 Sep 2026',
    discrepancyReason: '',
  },
  {
    id: 'PAY-1015',
    farmerName: 'Jagjit Singh Dhillon',
    farmerPhone: '+91 98760 11228',
    aadhaarMasked: '•••• •••• 9940',
    tokenNumber: 'TKN-PB-7741',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 68.0,
    mspPerQuintal: 2275,
    amount: 154700,
    status: 'Completed',
    date: '2026-09-07',
    centreName: 'Ludhiana Central Mandi Yard #12',
    district: 'Ludhiana',
    accountNumber: '•••• 6620',
    ifsc: 'PUNB0054300',
    bankName: 'Punjab National Bank',
    utrNumber: 'PFMS20260907007741',
    statutoryDeadline: '09 Sep 2026',
    discrepancyReason: '',
  },
];

const DEFAULT_REPORTS = [
  {
    id: 'REP-DAILY-01',
    type: 'Daily Report',
    period: "Today's Procurement & Payment Audit",
    dateGenerated: '10 Sep 2026, 05:00 PM',
    totalProcuredMT: '826.9 MT',
    totalDisbursedINR: '₹ 1,88,40,000',
    farmersCount: 184,
    centresCovered: '6 Active Centres',
    highlight: 'Normal moisture tolerance observed across all grain lots',
  },
  {
    id: 'REP-WEEKLY-01',
    type: 'Weekly Report',
    period: '04 Sep 2026 - 10 Sep 2026 (Week 36)',
    dateGenerated: '10 Sep 2026, 06:00 PM',
    totalProcuredMT: '5,420.5 MT',
    totalDisbursedINR: '₹ 12,35,80,000',
    farmersCount: 1240,
    centresCovered: '8 Mandi Centres',
    highlight: '96.2% DBT payments cleared within 48-hour statutory window',
  },
  {
    id: 'REP-MONTHLY-01',
    type: 'Monthly Report',
    period: 'Kharif Season Month 1 (August - September 2026)',
    dateGenerated: '01 Sep 2026, 09:00 AM',
    totalProcuredMT: '24,680.0 MT',
    totalDisbursedINR: '₹ 56,12,00,000',
    farmersCount: 5820,
    centresCovered: 'All 250 Registered Centres',
    highlight: 'Season procurement target currently 18.5% ahead of Kharif 2025',
  },
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    title: 'Holiday Notice: Ganesh Chaturthi Mandi Operations',
    category: 'Holiday Notice',
    targetAudience: 'All Centres',
    priority: 'Normal',
    date: '10 Sep 2026',
    message: 'Procurement Centres will observe partial operating hours (08:00 AM - 01:00 PM) on the upcoming public holiday. Slot bookings have been adjusted automatically.',
  },
  {
    id: 'NOTIF-02',
    title: 'Heavy Rain Alert: Mandatory Tarpaulin Yard Covering',
    category: 'Heavy Rain Alert',
    targetAudience: 'All Managers',
    priority: 'Critical',
    date: '09 Sep 2026',
    message: 'IMD has issued rainfall warning across Cauvery Delta and Malwa regions. All Centre Managers must verify covered sheds and ensure 100% moisture protection for grain stacks.',
  },
  {
    id: 'NOTIF-03',
    title: 'Centre Closed Notice: Weighbridge Calibration at Erode Yard',
    category: 'Centre Closed',
    targetAudience: 'All Officers',
    priority: 'High',
    date: '08 Sep 2026',
    message: 'Erode Regulated Market Yard will remain closed on 11 Sep for annual Legal Metrology Department electronic weighbridge stamping and recalibration.',
  },
  {
    id: 'NOTIF-04',
    title: 'Government Circular: Revised MSP Moisture Tolerance Standard',
    category: 'Government Circular',
    targetAudience: 'All Officers',
    priority: 'Normal',
    date: '05 Sep 2026',
    message: 'Food Corporation of India circular No. 44/2026: Maximum permissible moisture for Grade-A Paddy stands confirmed at 17.0% with standard refraction schedule.',
  },
];

const DEFAULT_PROFILE = {
  adminName: 'Dr. Sunita Verma, IAS',
  department: 'Ministry of Consumer Affairs, Food & Public Distribution',
  email: 'sunita.verma@gov.in',
  mobileNumber: '+91 98765 43210',
  office: 'Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi',
  cadre: 'IAS 2011 Batch',
  designation: 'Director General of Procurement & DBT Operations',
  stateCoverage: 'National & Regional Procurement Directorates',
  clearance: 'Level 4 National Admin',
};

const safeGet = (key, fallback) => {
  try {
    const data = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn('[adminStorage] Error loading ' + key + ':', err);
    return fallback;
  }
};

const safeSet = (key, value) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return true;
  } catch (err) {
    console.warn('[adminStorage] Error saving ' + key + ':', err);
    return false;
  }
};

export const adminStorage = {
  // Centres
  getCentres: () => safeGet(STORAGE_KEYS.CENTRES, DEFAULT_CENTRES),
  setCentres: (centres) => safeSet(STORAGE_KEYS.CENTRES, centres),
  toggleCentreStatus: (id) => {
    const centres = adminStorage.getCentres();
    const updated = centres.map((c) => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Open' ? 'Closed' : 'Open' };
      }
      return c;
    });
    adminStorage.setCentres(updated);
    return updated.find((c) => c.id === id);
  },
  addCentre: (centre) => {
    const centres = adminStorage.getCentres();
    const newCentre = { ...centre, id: centre.id || ('CEN-' + Date.now()) };
    const updated = [newCentre, ...centres];
    adminStorage.setCentres(updated);
    return newCentre;
  },

  // Managers
  getManagers: () => safeGet(STORAGE_KEYS.MANAGERS, DEFAULT_MANAGERS),
  setManagers: (managers) => safeSet(STORAGE_KEYS.MANAGERS, managers),
  toggleManagerStatus: (id) => {
    const managers = adminStorage.getManagers();
    const updated = managers.map((m) => {
      if (m.id === id) {
        return { ...m, status: m.status === 'Active' ? 'Disabled' : 'Active' };
      }
      return m;
    });
    adminStorage.setManagers(updated);
    return updated.find((m) => m.id === id);
  },
  addManager: (mgr) => {
    const managers = adminStorage.getManagers();
    const newMgr = { ...mgr, id: mgr.id || ('MGR-' + Date.now()) };
    const updated = [newMgr, ...managers];
    adminStorage.setManagers(updated);
    return newMgr;
  },
  updateManager: (id, data) => {
    const managers = adminStorage.getManagers();
    const updated = managers.map((m) => (m.id === id ? { ...m, ...data } : m));
    adminStorage.setManagers(updated);
    return updated.find((m) => m.id === id);
  },

  // Officers
  getOfficers: () => safeGet(STORAGE_KEYS.OFFICERS, DEFAULT_OFFICERS),
  setOfficers: (officers) => safeSet(STORAGE_KEYS.OFFICERS, officers),
  toggleOfficerStatus: (id) => {
    const officers = adminStorage.getOfficers();
    const updated = officers.map((o) => {
      if (o.id === id) {
        return { ...o, status: o.status === 'Active' ? 'Disabled' : 'Active' };
      }
      return o;
    });
    adminStorage.setOfficers(updated);
    return updated.find((o) => o.id === id);
  },
  addOfficer: (off) => {
    const officers = adminStorage.getOfficers();
    const newOff = { ...off, id: off.id || ('OFF-' + Date.now()) };
    const updated = [newOff, ...officers];
    adminStorage.setOfficers(updated);
    return newOff;
  },
  updateOfficer: (id, data) => {
    const officers = adminStorage.getOfficers();
    const updated = officers.map((o) => (o.id === id ? { ...o, ...data } : o));
    adminStorage.setOfficers(updated);
    return updated.find((o) => o.id === id);
  },

  // Payments (High Capacity DBT Support)
  getPayments: () => safeGet(STORAGE_KEYS.PAYMENTS, DEFAULT_PAYMENTS),
  setPayments: (payments) => safeSet(STORAGE_KEYS.PAYMENTS, payments),
  
  markPaymentPaid: (id) => {
    const payments = adminStorage.getPayments();
    const utr = 'PFMS' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + Math.floor(100000 + Math.random() * 900000);
    const updated = payments.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: 'Completed',
          utrNumber: p.utrNumber || utr,
          paidDate: new Date().toISOString().split('T')[0],
          discrepancyReason: '',
        };
      }
      return p;
    });
    adminStorage.setPayments(updated);
    return updated.find((p) => p.id === id);
  },

  bulkApprovePayments: (paymentIds) => {
    const payments = adminStorage.getPayments();
    const idSet = new Set(paymentIds);
    const today = new Date().toISOString().split('T')[0];
    const prefix = 'PFMS' + today.replace(/-/g, '');
    let counter = 1000;

    const updated = payments.map((p) => {
      if (idSet.has(p.id)) {
        counter += 1;
        return {
          ...p,
          status: 'Completed',
          utrNumber: p.utrNumber || (prefix + counter),
          paidDate: today,
          discrepancyReason: '',
        };
      }
      return p;
    });
    adminStorage.setPayments(updated);
    return updated;
  },

  retryPayment: (id) => {
    const payments = adminStorage.getPayments();
    const updated = payments.map((p) => {
      if (p.id === id) {
        return { ...p, status: 'Pending', discrepancyReason: '' };
      }
      return p;
    });
    adminStorage.setPayments(updated);
    return updated.find((p) => p.id === id);
  },

  getPaymentStats: () => {
    const payments = adminStorage.getPayments();
    const totalAmount = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const pending = payments.filter((p) => p.status === 'Pending');
    const inClearing = payments.filter((p) => p.status === 'In Clearing');
    const completed = payments.filter((p) => p.status === 'Completed');
    const discrepancy = payments.filter((p) => p.status === 'Discrepancy');

    const pendingAmount = pending.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const completedAmount = completed.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    return {
      totalCount: payments.length,
      totalAmount,
      pendingCount: pending.length,
      pendingAmount,
      inClearingCount: inClearing.length,
      completedCount: completed.length,
      completedAmount,
      discrepancyCount: discrepancy.length,
    };
  },

  // Reports
  getReports: () => safeGet(STORAGE_KEYS.REPORTS, DEFAULT_REPORTS),
  setReports: (reports) => safeSet(STORAGE_KEYS.REPORTS, reports),

  // Notifications
  getNotifications: () => safeGet(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
  setNotifications: (notifs) => safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs),
  addNotification: (notif) => {
    const notifs = adminStorage.getNotifications();
    const newNotif = {
      ...notif,
      id: notif.id || ('NOTIF-' + Date.now()),
      date: notif.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    const updated = [newNotif, ...notifs];
    adminStorage.setNotifications(updated);
    return newNotif;
  },
  deleteNotification: (id) => {
    const notifs = adminStorage.getNotifications();
    const updated = notifs.filter((n) => n.id !== id);
    adminStorage.setNotifications(updated);
    return updated;
  },

  // Profile
  getProfile: () => safeGet(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE),
  updateProfile: (data) => {
    const current = adminStorage.getProfile();
    const updated = { ...current, ...data };
    safeSet(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  // Dashboard Stats
  getDashboardStats: () => {
    const centres = adminStorage.getCentres();
    const pStats = adminStorage.getPaymentStats();
    const openCentres = centres.filter((c) => c.status === 'Open').length;
    const closedCentres = centres.filter((c) => c.status === 'Closed').length;

    return {
      totalCentres: centres.length,
      centresOpen: openCentres,
      centresClosed: closedCentres,
      todayFarmers: 4820,
      todayProcurement: '18,450 MT',
      pendingPayments: '₹ ' + pStats.pendingAmount.toLocaleString('en-IN'),
      pendingPaymentCount: pStats.pendingCount,
    };
  },

  resetAll: () => {
    Object.values(STORAGE_KEYS).forEach((k) => {
      try {
        if (typeof window !== 'undefined') localStorage.removeItem(k);
      } catch (e) {}
    });
  },
};

export default adminStorage;
