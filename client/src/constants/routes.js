export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Farmer Routes (Member 1)
  FARMER: {
    DASHBOARD: '/farmer/dashboard',
    BOOK_SLOT: '/farmer/book-slot',
    TOKEN: '/farmer/token',
    PROCUREMENT_STATUS: '/farmer/procurement-status',
    PAYMENT_STATUS: '/farmer/payment-status',
    HISTORY: '/farmer/history',
    HELP: '/farmer/help',
    PROFILE: '/farmer/profile',
  },

  // Officer Routes (Member 2)
  OFFICER: {
    DASHBOARD: '/officer/dashboard',
    QUEUE: '/officer/queue',
    SCAN_QR: '/officer/scan-qr',
    SEARCH_FARMER: '/officer/search-farmer',
    FARMER_DETAILS: '/officer/farmer-details/:id',
    WEIGHT_CHECK: '/officer/weight-check',
    QUALITY_CHECK: '/officer/quality-check',
    SUBMIT_PROCUREMENT: '/officer/submit-procurement',
    RECEIPT: '/officer/receipt/:id',
    HISTORY: '/officer/history',
  },

  // Manager Routes (Member 3)
  MANAGER: {
    DASHBOARD: '/manager/dashboard',
    QUEUE_MONITORING: '/manager/queue-monitoring',
    SLOT_MANAGEMENT: '/manager/slot-management',
    OFFICER_MANAGEMENT: '/manager/officer-management',
    REPORTS: '/manager/reports',
    ISSUES: '/manager/issues',
    ANALYTICS: '/manager/analytics',
  },

  // Admin Routes (Member 4)
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STATE_ANALYTICS: '/admin/state-analytics',
    DISTRICT_ANALYTICS: '/admin/district-analytics',
    CENTRE_MONITORING: '/admin/centre-monitoring',
    PAYMENTS: '/admin/payments',
    REPORTS: '/admin/reports',
    USERS: '/admin/users',
  },

  // Shared Routes
  SHARED: {
    LOADING: '/loading',
    ERROR: '/error',
    SUCCESS: '/success',
    COMING_SOON: '/coming-soon',
    NOT_FOUND: '*',
  },
};
