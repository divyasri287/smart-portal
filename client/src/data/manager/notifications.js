export const initialNotifications = [
  {
    id: 1,
    title: 'Gate 2 Queue Bottleneck Warning',
    message: 'Vehicle throughput delayed at Gate 2. 8 trucks waiting over 25 minutes. Inspector Harpreet Kaur alerted.',
    type: 'urgent',
    timestamp: '10 Mins ago',
    read: false,
  },
  {
    id: 2,
    title: 'Moisture Rejection Dispute Raised',
    message: 'Farmer Gurpreet Sharma (Token #T-1044) contested 15.2% moisture reading at Bay 1. Pending manager audit.',
    type: 'warning',
    timestamp: '25 Mins ago',
    read: false,
  },
  {
    id: 3,
    title: 'Shift Rotation Completed',
    message: 'Morning Shift Inspector Roster (8 Officers) signed on duty at Ludhiana Mandi Bays 1-4.',
    type: 'info',
    timestamp: '1 Hour ago',
    read: true,
  },
  {
    id: 4,
    title: 'Daily Procurement Target Reached',
    message: 'Today\'s 1,400 Tonnage Wheat procurement milestone achieved successfully.',
    type: 'success',
    timestamp: '3 Hours ago',
    read: true,
  },
  {
    id: 5,
    title: 'PFMS Payment Batch Settled',
    message: 'Direct Benefit Transfer of ₹ 48.2 Lakhs disbursed for 42 verified farmer slots.',
    type: 'success',
    timestamp: '5 Hours ago',
    read: true,
  },
];

export default initialNotifications;
