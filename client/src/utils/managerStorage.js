// Smart Procurement Portal - Centre Manager Storage Utility
// LocalStorage based persistent state for Centre Manager Operations

const STORAGE_KEYS = {
  CENTRE_STATUS: 'spp_manager_centre_status',
  PROFILE: 'spp_manager_profile',
  SLOTS: 'spp_manager_slots',
  QUEUE: 'spp_manager_queue',
  OFFICERS: 'spp_manager_officers',
  REPORTS: 'spp_manager_reports',
  ISSUES: 'spp_manager_issues',
  NOTIFICATIONS: 'spp_manager_notifications',
};

const DEFAULT_PROFILE = {
  name: 'Anil Kumar',
  centreName: 'Salem Main Procurement Centre #402',
  centreCode: 'CEN-TN-SLM-402',
  mobile: '+91 98345 67890',
  email: 'anil.kumar.mgr@gov.in',
  district: 'Salem',
  state: 'Tamil Nadu',
};

const DEFAULT_SLOTS = [
  {
    id: 'SLOT-01',
    timeSlot: '08:00 AM - 10:00 AM',
    maxCapacity: 40,
    bookedCount: 38,
    availableCount: 2,
    status: 'Open',
  },
  {
    id: 'SLOT-02',
    timeSlot: '10:00 AM - 12:00 PM',
    maxCapacity: 45,
    bookedCount: 45,
    availableCount: 0,
    status: 'Closed',
  },
  {
    id: 'SLOT-03',
    timeSlot: '12:00 PM - 02:00 PM',
    maxCapacity: 35,
    bookedCount: 28,
    availableCount: 7,
    status: 'Open',
  },
  {
    id: 'SLOT-04',
    timeSlot: '02:00 PM - 04:00 PM',
    maxCapacity: 40,
    bookedCount: 24,
    availableCount: 16,
    status: 'Open',
  },
  {
    id: 'SLOT-05',
    timeSlot: '04:00 PM - 06:00 PM',
    maxCapacity: 30,
    bookedCount: 12,
    availableCount: 18,
    status: 'Open',
  },
];

const DEFAULT_QUEUE = [
  {
    id: 'Q-01',
    tokenNumber: 'TKN-A101',
    farmerName: 'Ramesh Singh',
    farmerId: 'FRM-1001',
    mobile: '+91 98765 43210',
    crop: 'Paddy Grade A',
    timeSlot: '08:00 AM - 10:00 AM',
    status: 'Completed',
    vehicleNo: 'TN-30-AB-1234',
    quantity: '45.50 Qtl',
  },
  {
    id: 'Q-02',
    tokenNumber: 'TKN-A102',
    farmerName: 'Karthik Muthu',
    farmerId: 'FRM-1002',
    mobile: '+91 98456 78901',
    crop: 'Paddy Grade A',
    timeSlot: '08:00 AM - 10:00 AM',
    status: 'Completed',
    vehicleNo: 'TN-30-CD-5678',
    quantity: '38.00 Qtl',
  },
  {
    id: 'Q-03',
    tokenNumber: 'TKN-A103',
    farmerName: 'Murugan Shanmugam',
    farmerId: 'FRM-1003',
    mobile: '+91 97890 12345',
    crop: 'Paddy Common',
    timeSlot: '10:00 AM - 12:00 PM',
    status: 'In Progress',
    vehicleNo: 'TN-30-EF-9012',
    quantity: '52.00 Qtl',
  },
  {
    id: 'Q-04',
    tokenNumber: 'TKN-A104',
    farmerName: 'Senthil Kumar',
    farmerId: 'FRM-1004',
    mobile: '+91 98123 45670',
    crop: 'Wheat',
    timeSlot: '10:00 AM - 12:00 PM',
    status: 'Waiting',
    vehicleNo: 'TN-30-GH-3456',
    quantity: '40.00 Qtl',
  },
  {
    id: 'Q-05',
    tokenNumber: 'TKN-A105',
    farmerName: 'Palani Appan',
    farmerId: 'FRM-1005',
    mobile: '+91 97654 32109',
    crop: 'Paddy Grade A',
    timeSlot: '12:00 PM - 02:00 PM',
    status: 'Waiting',
    vehicleNo: 'TN-30-IJ-7890',
    quantity: '35.50 Qtl',
  },
  {
    id: 'Q-06',
    tokenNumber: 'TKN-A106',
    farmerName: 'Govindasamy R',
    farmerId: 'FRM-1006',
    mobile: '+91 96543 21098',
    crop: 'Mustard',
    timeSlot: '12:00 PM - 02:00 PM',
    status: 'Waiting',
    vehicleNo: 'TN-30-KL-2345',
    quantity: '28.00 Qtl',
  },
];

const DEFAULT_OFFICERS = [
  {
    id: 'OFF-001',
    officerName: 'Inspector Vikram Sharma',
    badgeNo: 'INS-TN-8891',
    assignedCounter: 'Counter 1 (Gate & Token Verification)',
    status: 'Available',
    mobile: '+91 98123 45678',
  },
  {
    id: 'OFF-002',
    officerName: 'Officer Priya Sundaram',
    badgeNo: 'OFF-TN-4102',
    assignedCounter: 'Counter 2 (Quality & Moisture Inspection)',
    status: 'Busy',
    mobile: '+91 98450 12349',
  },
  {
    id: 'OFF-003',
    officerName: 'Officer Rajesh Varma',
    badgeNo: 'OFF-TN-7734',
    assignedCounter: 'Counter 3 (Digital Weighbridge Scale)',
    status: 'Available',
    mobile: '+91 97890 88214',
  },
  {
    id: 'OFF-004',
    officerName: 'Officer Suresh Nair',
    badgeNo: 'OFF-TN-9021',
    assignedCounter: 'Counter 4 (Procurement Receipt & DBT)',
    status: 'On Leave',
    mobile: '+91 98675 33410',
  },
  {
    id: 'OFF-005',
    officerName: 'Officer Meenakshi R',
    badgeNo: 'OFF-TN-6319',
    assignedCounter: 'Counter 5 (Gunny Bag Storage & Loading)',
    status: 'Available',
    mobile: '+91 98234 55671',
  },
];

const DEFAULT_REPORTS = {
  today: {
    title: "Today's Procurement Report",
    date: '10 September 2026',
    centre: 'Salem Main Procurement Centre #402',
    totalBookings: 147,
    farmersProcured: 128,
    farmersPending: 19,
    totalQuantityQtl: 3420.50,
    totalAmountRupees: 7867150,
    topCommodity: 'Paddy Grade A (MSP ₹2,300/Qtl)',
    weighmentBatches: 128,
    qualityPassRate: '98.4%',
    rejectedBatches: 2,
    breakdown: [
      { crop: 'Paddy Grade A', farmers: 92, quantityQtl: 2480.00, mspRate: '₹2,300', amount: '₹57,04,000' },
      { crop: 'Paddy Common', farmers: 24, quantityQtl: 620.50, mspRate: '₹2,183', amount: '₹13,54,551' },
      { crop: 'Wheat', farmers: 12, quantityQtl: 320.00, mspRate: '₹2,275', amount: '₹7,28,000' },
    ],
  },
  weekly: {
    title: 'Weekly Summary Report',
    period: '04 September 2026 - 10 September 2026',
    centre: 'Salem Main Procurement Centre #402',
    totalBookings: 890,
    farmersProcured: 812,
    totalQuantityQtl: 21480.00,
    totalAmountRupees: 49404000,
    activeDays: 6,
    avgDailyProcurementQtl: 3580.00,
    qualityPassRate: '97.6%',
    breakdown: [
      { day: '04 Sep (Fri)', farmers: 130, quantityQtl: 3410.00, amount: '₹78,43,000' },
      { day: '05 Sep (Sat)', farmers: 142, quantityQtl: 3750.00, amount: '₹86,25,000' },
      { day: '07 Sep (Mon)', farmers: 138, quantityQtl: 3620.00, amount: '₹83,26,000' },
      { day: '08 Sep (Tue)', farmers: 135, quantityQtl: 3540.00, amount: '₹81,42,000' },
      { day: '09 Sep (Wed)', farmers: 139, quantityQtl: 3740.00, amount: '₹86,01,000' },
      { day: '10 Sep (Thu)', farmers: 128, quantityQtl: 3420.00, amount: '₹78,67,000' },
    ],
  },
  monthly: {
    title: 'Monthly Procurement Consolidation',
    period: 'August 2026 - September 2026',
    centre: 'Salem Main Procurement Centre #402',
    totalBookings: 3720,
    farmersProcured: 3490,
    totalQuantityQtl: 89350.00,
    totalAmountRupees: 205505000,
    qualityPassRate: '98.1%',
    breakdown: [
      { month: 'August 2026', farmers: 2140, quantityQtl: 54800.00, amount: '₹12,60,40,000' },
      { month: 'September 2026 (M-T-D)', farmers: 1350, quantityQtl: 34550.00, amount: '₹7,94,65,000' },
    ],
  },
};

const DEFAULT_ISSUES = [
  {
    id: 'ISS-101',
    issueTitle: 'Digital Weighbridge Scale 2 Calibration Required',
    reportedBy: 'Inspector Vikram Sharma',
    priority: 'High',
    status: 'Open',
    timestamp: 'Today, 09:15 AM',
    counter: 'Counter 1',
  },
  {
    id: 'ISS-102',
    issueTitle: 'Moisture Meter Battery Pack Replaced',
    reportedBy: 'Officer Priya Sundaram',
    priority: 'Medium',
    status: 'Resolved',
    timestamp: 'Today, 11:30 AM',
    counter: 'Counter 2',
  },
  {
    id: 'ISS-103',
    issueTitle: 'Gunny Bag Bundles Delivered & Verified',
    reportedBy: 'Warehouse Incharge',
    priority: 'Low',
    status: 'Closed',
    timestamp: 'Yesterday, 04:45 PM',
    counter: 'Counter 5',
  },
  {
    id: 'ISS-104',
    issueTitle: 'Gate Printer Paper Roll Replaced',
    reportedBy: 'Officer Suresh Nair',
    priority: 'Low',
    status: 'Closed',
    timestamp: '08 Sep 2026',
    counter: 'Counter 4',
  },
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    title: 'Centre Closed Notice - Ayudha Pooja Holiday',
    category: 'Holiday Notice',
    message: 'Salem Procurement Centre will remain closed for all procurement operations on Tuesday due to Ayudha Pooja. Bookings will resume the following day.',
    date: '10 Sep 2026, 02:30 PM',
    status: 'Active',
  },
  {
    id: 'NOTIF-02',
    title: 'Heavy Rain Alert - Covered Unloading In Effect',
    category: 'Heavy Rain Alert',
    message: 'Light to heavy showers expected in Salem district. Unloading only permitted inside covered Shed A and Shed B. Protect grain bags from moisture.',
    date: '09 Sep 2026, 11:00 AM',
    status: 'Active',
  },
  {
    id: 'NOTIF-03',
    title: 'Delay Notice - Morning Token Batch Slowdown',
    category: 'Delay Notice',
    message: 'Routine digital weighbridge recalibration was performed between 08:30 AM and 09:00 AM. Token clearances are now proceeding normally.',
    date: '08 Sep 2026, 09:15 AM',
    status: 'Active',
  },
];

// Helper functions for safe LocalStorage access
const getStored = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const saveStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Failed to write ${key} to localStorage:`, e);
  }
};

export const managerStorage = {
  // 1. CENTRE STATUS
  getCentreStatus: () => {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.CENTRE_STATUS);
      if (!s) {
        localStorage.setItem(STORAGE_KEYS.CENTRE_STATUS, 'Open');
        return 'Open';
      }
      return s;
    } catch {
      return 'Open';
    }
  },

  setCentreStatus: (status) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CENTRE_STATUS, status);
    } catch (e) {
      console.error(e);
    }
  },

  // 2. PROFILE
  getProfile: () => getStored(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE),
  saveProfile: (p) => saveStored(STORAGE_KEYS.PROFILE, p),

  // 3. SLOTS
  getSlots: () => getStored(STORAGE_KEYS.SLOTS, DEFAULT_SLOTS),
  saveSlots: (slots) => saveStored(STORAGE_KEYS.SLOTS, slots),
  addSlot: (slot) => {
    const slots = managerStorage.getSlots();
    const newSlot = {
      ...slot,
      id: `SLOT-${String(slots.length + 1).padStart(2, '0')}`,
      status: slot.status || 'Open',
    };
    const updated = [...slots, newSlot];
    managerStorage.saveSlots(updated);
    return updated;
  },
  updateSlot: (id, updates) => {
    const slots = managerStorage.getSlots();
    const updated = slots.map((s) => (s.id === id ? { ...s, ...updates } : s));
    managerStorage.saveSlots(updated);
    return updated;
  },
  toggleSlotStatus: (id) => {
    const slots = managerStorage.getSlots();
    const updated = slots.map((s) =>
      s.id === id ? { ...s, status: s.status === 'Open' ? 'Closed' : 'Open' } : s
    );
    managerStorage.saveSlots(updated);
    return updated;
  },

  // 4. QUEUE
  getQueue: () => getStored(STORAGE_KEYS.QUEUE, DEFAULT_QUEUE),
  saveQueue: (q) => saveStored(STORAGE_KEYS.QUEUE, q),
  refreshQueue: () => {
    // Return the freshest queue state
    return managerStorage.getQueue();
  },

  // 5. OFFICERS
  getOfficers: () => getStored(STORAGE_KEYS.OFFICERS, DEFAULT_OFFICERS),
  saveOfficers: (o) => saveStored(STORAGE_KEYS.OFFICERS, o),
  updateOfficerStatus: (id, status) => {
    const list = managerStorage.getOfficers();
    const updated = list.map((o) => (o.id === id ? { ...o, status } : o));
    managerStorage.saveOfficers(updated);
    return updated;
  },
  assignOfficerCounter: (id, assignedCounter) => {
    const list = managerStorage.getOfficers();
    const updated = list.map((o) => (o.id === id ? { ...o, assignedCounter } : o));
    managerStorage.saveOfficers(updated);
    return updated;
  },

  // 6. REPORTS
  getReports: () => getStored(STORAGE_KEYS.REPORTS, DEFAULT_REPORTS),

  // 7. ISSUES
  getIssues: () => getStored(STORAGE_KEYS.ISSUES, DEFAULT_ISSUES),
  saveIssues: (issues) => saveStored(STORAGE_KEYS.ISSUES, issues),
  resolveIssue: (id) => {
    const list = managerStorage.getIssues();
    const updated = list.map((item) =>
      item.id === id ? { ...item, status: 'Resolved' } : item
    );
    managerStorage.saveIssues(updated);
    return updated;
  },
  closeIssue: (id) => {
    const list = managerStorage.getIssues();
    const updated = list.map((item) =>
      item.id === id ? { ...item, status: 'Closed' } : item
    );
    managerStorage.saveIssues(updated);
    return updated;
  },
  addIssue: (issue) => {
    const list = managerStorage.getIssues();
    const newIssue = {
      ...issue,
      id: `ISS-${100 + list.length + 1}`,
      status: 'Open',
      timestamp: 'Just now',
    };
    const updated = [newIssue, ...list];
    managerStorage.saveIssues(updated);
    return updated;
  },

  // 8. NOTIFICATIONS
  getNotifications: () => getStored(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
  saveNotifications: (notifs) => saveStored(STORAGE_KEYS.NOTIFICATIONS, notifs),
  addNotification: (notif) => {
    const list = managerStorage.getNotifications();
    const newNotif = {
      ...notif,
      id: `NOTIF-${String(list.length + 1).padStart(2, '0')}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'Active',
    };
    const updated = [newNotif, ...list];
    managerStorage.saveNotifications(updated);
    return updated;
  },
  deleteNotification: (id) => {
    const list = managerStorage.getNotifications();
    const updated = list.filter((n) => n.id !== id);
    managerStorage.saveNotifications(updated);
    return updated;
  },
};

export default managerStorage;
