/**
 * PaymentService - Placeholder API service for DBT payments
 */

import paymentsData from '../data/payments.json';

export const paymentService = {
  getPayments: async () => {
    console.log('[Placeholder API] paymentService.getPayments called');
    return paymentsData;
  },
  processPayment: async (paymentId) => {
    console.log('[Placeholder API] paymentService.processPayment called:', paymentId);
    return { success: true };
  },
};
