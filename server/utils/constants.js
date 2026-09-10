module.exports = {
  ROLES: {
    FARMER: 'Farmer',
    OFFICER: 'Procurement Officer',
    MANAGER: 'Centre Manager',
    ADMIN: 'Government Admin'
  },
  BOOKING_STATUS: {
    BOOKED: 'Booked',
    IN_QUEUE: 'In Queue',
    QUALITY_VERIFIED: 'Quality Verified',
    WEIGHT_LOGGED: 'Weight Logged',
    COMPLETED: 'Procurement Completed',
    CANCELLED: 'Cancelled'
  },
  QUEUE_STATUS: {
    IN_QUEUE: 'In Queue',
    QUALITY_VERIFIED: 'Quality Verified',
    WEIGHT_LOGGED: 'Weight Logged',
    COMPLETED: 'Completed'
  },
  PROCUREMENT_STATUS: {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected'
  },
  PAYMENT_STATUS: {
    PENDING: 'Pending Processing',
    PROCESSING: 'Processing',
    CREDITED: 'DBT Credited',
    FAILED: 'Failed'
  },
  MSP_RATES: {
    'Paddy (Grade A)': 2300,
    'Paddy Grade A': 2300,
    'Wheat': 2275,
    'Mustard': 5650,
    'Cotton': 6620,
    'Maize': 2090
  }
};
