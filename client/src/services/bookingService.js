/**
 * BookingService - Placeholder API service for slot booking logic
 */

import bookingsData from '../data/bookings.json';

export const bookingService = {
  getBookings: async () => {
    console.log('[Placeholder API] bookingService.getBookings called');
    return bookingsData;
  },
  createBooking: async (bookingPayload) => {
    console.log('[Placeholder API] bookingService.createBooking called with:', bookingPayload);
    return { success: true, bookingId: `BK-2026-${Math.floor(100 + Math.random() * 900)}` };
  },
  cancelBooking: async (bookingId) => {
    console.log('[Placeholder API] bookingService.cancelBooking called for:', bookingId);
    return { success: true };
  },
};
