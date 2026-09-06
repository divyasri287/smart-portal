export const slotDates = [
  { date: '2026-09-05', label: 'Today (Sep 5)', key: 'today' },
  { date: '2026-09-06', label: 'Tomorrow (Sep 6)', key: 'tomorrow' },
  { date: '2026-09-07', label: 'Mon (Sep 7)', key: 'mon' },
  { date: '2026-09-08', label: 'Tue (Sep 8)', key: 'tue' }
];

export const daySlotData = {
  today: {
    quota: 600,
    booked: 452,
    available: 148,
    status: "Normal Operations",
    slots: [
      { id: 1, timeWindow: '08:00 AM - 10:00 AM', booked: 110, capacity: 120, status: 'Open' },
      { id: 2, timeWindow: '10:00 AM - 12:00 PM', booked: 120, capacity: 120, status: 'Full' },
      { id: 3, timeWindow: '12:00 PM - 02:00 PM', booked: 85, capacity: 120, status: 'Open' },
      { id: 4, timeWindow: '02:00 PM - 04:00 PM', booked: 92, capacity: 120, status: 'Open' },
      { id: 5, timeWindow: '04:00 PM - 06:00 PM', booked: 45, capacity: 100, status: 'Open' },
      { id: 6, timeWindow: '06:00 PM - 08:00 PM', booked: 0, capacity: 60, status: 'Locked' }
    ]
  },
  tomorrow: {
    quota: 600,
    booked: 280,
    available: 320,
    status: "Booking Active",
    slots: [
      { id: 1, timeWindow: '08:00 AM - 10:00 AM', booked: 75, capacity: 120, status: 'Open' },
      { id: 2, timeWindow: '10:00 AM - 12:00 PM', booked: 95, capacity: 120, status: 'Open' },
      { id: 3, timeWindow: '12:00 PM - 02:00 PM', booked: 50, capacity: 120, status: 'Open' },
      { id: 4, timeWindow: '02:00 PM - 04:00 PM', booked: 40, capacity: 120, status: 'Open' },
      { id: 5, timeWindow: '04:00 PM - 06:00 PM', booked: 20, capacity: 100, status: 'Open' },
      { id: 6, timeWindow: '06:00 PM - 08:00 PM', booked: 0, capacity: 60, status: 'Open' }
    ]
  },
  mon: {
    quota: 650,
    booked: 510,
    available: 140,
    status: "High Demand Expected",
    slots: [
      { id: 1, timeWindow: '08:00 AM - 10:00 AM', booked: 115, capacity: 120, status: 'Full' },
      { id: 2, timeWindow: '10:00 AM - 12:00 PM', booked: 125, capacity: 130, status: 'Open' },
      { id: 3, timeWindow: '12:00 PM - 02:00 PM', booked: 110, capacity: 130, status: 'Open' },
      { id: 4, timeWindow: '02:00 PM - 04:00 PM', booked: 90, capacity: 120, status: 'Open' },
      { id: 5, timeWindow: '04:00 PM - 06:00 PM', booked: 70, capacity: 100, status: 'Open' },
      { id: 6, timeWindow: '06:00 PM - 08:00 PM', booked: 0, capacity: 50, status: 'Locked' }
    ]
  },
  tue: {
    quota: 550,
    booked: 140,
    available: 410,
    status: "Early Reservations Open",
    slots: [
      { id: 1, timeWindow: '08:00 AM - 10:00 AM', booked: 40, capacity: 110, status: 'Open' },
      { id: 2, timeWindow: '10:00 AM - 12:00 PM', booked: 50, capacity: 110, status: 'Open' },
      { id: 3, timeWindow: '12:00 PM - 02:00 PM', booked: 30, capacity: 110, status: 'Open' },
      { id: 4, timeWindow: '02:00 PM - 04:00 PM', booked: 15, capacity: 110, status: 'Open' },
      { id: 5, timeWindow: '04:00 PM - 06:00 PM', booked: 5, capacity: 100, status: 'Open' },
      { id: 6, timeWindow: '06:00 PM - 08:00 PM', booked: 0, capacity: 60, status: 'Open' }
    ]
  }
};

export default {
  slotDates,
  daySlotData
};
