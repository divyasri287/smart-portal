// Smart Procurement Portal - Government Admin Storage Utility
// Persistent LocalStorage utility for SIH 2026 Government Admin Module

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

const DEFAULT_PAYMENTS = [
  {
    id: 'PAY-901',
    farmerName: 'Ramanathan G.',
    farmerPhone: '+91 98421 11223',
    tokenNumber: 'TKN-TN-8821',
    crop: 'Paddy (Grade A)',
    quantityQuintals: 42.5,
    amount: 97070,
    status: 'Pending',
    date: '2026-09-10',
    centreName: 'Salem Main Procurement Centre #402',
    accountNumber: '•••• 4519',
    ifsc: 'SBIN0001245',
    bankName: 'State Bank of India',
  },
  {
    id: 'PAY-902',
    farmerName: 'Harbhajan Singh',
    farmerPhone: '+91 98140 22334',
    tokenNumber: 'TKN-PB-4412',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 65.0,
    amount: 147875,
    status: 'Completed',
    date: '2026-09-10',
    centreName: 'Ludhiana Central Mandi Yard #12',
    accountNumber: '•••• 8820',
    ifsc: 'PUNB0021400',
    bankName: 'Punjab National Bank',
  },
  {
    id: 'PAY-903',
    farmerName: 'Devinder Kumar',
    farmerPhone: '+91 98961 33445',
    tokenNumber: 'TKN-HR-1903',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 38.0,
    amount: 86450,
    status: 'Pending',
    date: '2026-09-09',
    centreName: 'Karnal Grain Mandi Bay 3',
    accountNumber: '•••• 3192',
    ifsc: 'HDFC0000452',
    bankName: 'HDFC Bank',
  },
  {
    id: 'PAY-904',
    farmerName: 'K. Palanisamy',
    farmerPhone: '+91 94431 44556',
    tokenNumber: 'TKN-TN-7714',
    crop: 'Paddy (Common)',
    quantityQuintals: 55.0,
    amount: 121000,
    status: 'Completed',
    date: '2026-09-09',
    centreName: 'Thanjavur Direct Purchase Centre',
    accountNumber: '•••• 7014',
    ifsc: 'IOBA0000142',
    bankName: 'Indian Overseas Bank',
  },
  {
    id: 'PAY-905',
    farmerName: 'Gurmeet Ram',
    farmerPhone: '+91 98150 55667',
    tokenNumber: 'TKN-PB-9905',
    crop: 'Wheat (FAQ Standard)',
    quantityQuintals: 72.0,
    amount: 163800,
    status: 'Pending',
    date: '2026-09-08',
    centreName: 'Sangrur Food Grain Complex',
    accountNumber: '•••• 1205',
    ifsc: 'PUNB0045100',
    bankName: 'Punjab National Bank',
  },
  {
    id: 'PAY-906',
    farmerName: 'M. Selvam',
    farmerPhone: '+91 97892 66778',
    tokenNumber: 'TKN-TN-6602',
    crop: 'Ragi (Finger Millet)',
    quantityQuintals: 24.0,
    amount: 103000,
    status: 'Completed',
    date: '2026-09-08',
    centreName: 'Salem Main Procurement Centre #402',
    accountNumber: '•••• 6632',
    ifsc: 'SBIN0004112',
    bankName: 'State Bank of India',
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

  // Payments
  getPayments: () => safeGet(STORAGE_KEYS.PAYMENTS, DEFAULT_PAYMENTS),
  setPayments: (payments) => safeSet(STORAGE_KEYS.PAYMENTS, payments),
  markPaymentPaid: (id) => {
    const payments = adminStorage.getPayments();
    const updated = payments.map((p) => {
      if (p.id === id) {
        return { ...p, status: 'Completed', paidDate: new Date().toISOString().split('T')[0] };
      }
      return p;
    });
    adminStorage.setPayments(updated);
    return updated.find((p) => p.id === id);
  },
  approvePayment: (id) => {
    return adminStorage.markPaymentPaid(id);
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

  // Dashboard Stats (Exactly 6 stats specified by user)
  getDashboardStats: () => {
    const centres = adminStorage.getCentres();
    const payments = adminStorage.getPayments();
    const openCentres = centres.filter((c) => c.status === 'Open').length;
    const closedCentres = centres.filter((c) => c.status === 'Closed').length;

    const pendingTotal = payments
      .filter((p) => p.status === 'Pending')
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    return {
      totalCentres: centres.length,
      centresOpen: openCentres,
      centresClosed: closedCentres,
      todayFarmers: 4820,
      todayProcurement: '18,450 MT',
      pendingPayments: '₹ ' + pendingTotal.toLocaleString('en-IN'),
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
