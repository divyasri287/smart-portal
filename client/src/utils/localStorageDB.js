/**
 * Unified LocalStorage Database for Smart Procurement Portal (SIH 2026)
 * Enables 100% serverless, client-side persistent operation across all portals:
 * - Farmer Portal
 * - Officer Portal
 * - Manager Portal
 * - Admin Portal
 */

import initialFarmers from '../data/farmers.json';
import initialBookings from '../data/bookings.json';
import initialQueue from '../data/queue.json';
import initialHistory from '../data/procurementHistory.json';
import initialReceipts from '../data/receipts.json';
import initialPayments from '../data/payments.json';
import initialOfficers from '../data/officers.json';
import initialAdmins from '../data/admins.json';
import initialManagers from '../data/managers.json';

const DB_KEYS = {
  FARMERS: 'sih_db_farmers',
  BOOKINGS: 'sih_db_bookings',
  QUEUE: 'sih_officer_queue',
  HISTORY: 'sih_officer_history',
  RECEIPTS: 'sih_officer_receipts',
  PAYMENTS: 'sih_db_payments',
  OFFICERS: 'sih_db_officers',
  ADMINS: 'sih_db_admins',
  MANAGERS: 'sih_db_managers',
  ACTIVE_SESSION: 'sih_officer_active_session',
  SHARED_FEED: 'sih_shared_procurement_feed',
  NOTIFICATIONS: 'sih_db_notifications',
  SYSTEM_SETTINGS: 'sih_db_system_settings',
};

const getFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for reactive across-component updates
    window.dispatchEvent(new CustomEvent('sih_storage_update', { detail: { key, value } }));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
};

export const localStorageDB = {
  // --- FARMERS ---
  getFarmers: () => getFromStorage(DB_KEYS.FARMERS, initialFarmers),
  getFarmerById: (id) => {
    const list = localStorageDB.getFarmers();
    return list.find((f) => f.id === id) || list[0];
  },
  updateFarmer: (updated) => {
    const list = localStorageDB.getFarmers();
    const idx = list.findIndex((f) => f.id === updated.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...updated };
    } else {
      list.push(updated);
    }
    setToStorage(DB_KEYS.FARMERS, list);
    return updated;
  },

  // --- BOOKINGS ---
  getBookings: (farmerId) => {
    const list = getFromStorage(DB_KEYS.BOOKINGS, initialBookings);
    return farmerId ? list.filter((b) => b.farmerId === farmerId) : list;
  },
  createBooking: (booking) => {
    const list = localStorageDB.getBookings();
    const newBooking = {
      bookingId: `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      tokenId: `TKN-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(100 + Math.random() * 900)}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...booking,
    };
    const updated = [newBooking, ...list];
    setToStorage(DB_KEYS.BOOKINGS, updated);

    // Also auto-add to Officer Queue
    const queue = localStorageDB.getQueue();
    const queueItem = {
      id: newBooking.farmerId || 'FRM-1001',
      tokenNo: newBooking.tokenId,
      farmerName: newBooking.farmerName || 'Registered Farmer',
      crop: newBooking.crop || 'Paddy Grade A',
      quantityQtl: newBooking.estimatedQuantity || 100,
      slotTime: newBooking.timeSlot || '10:00 AM',
      bayAssigned: `Bay ${Math.floor(1 + Math.random() * 4)}`,
      status: 'Waiting',
    };
    setToStorage(DB_KEYS.QUEUE, [queueItem, ...queue]);

    return newBooking;
  },
  cancelBooking: (bookingId) => {
    const list = localStorageDB.getBookings();
    const updated = list.map((b) => (b.bookingId === bookingId ? { ...b, status: 'Cancelled' } : b));
    setToStorage(DB_KEYS.BOOKINGS, updated);
    return true;
  },

  // --- QUEUE ---
  getQueue: () => getFromStorage(DB_KEYS.QUEUE, initialQueue),
  updateQueueStatus: (idOrToken, status) => {
    const list = localStorageDB.getQueue();
    const updated = list.map((item) => {
      if (item.id === idOrToken || item.tokenNo === idOrToken) {
        return { ...item, status };
      }
      return item;
    });
    setToStorage(DB_KEYS.QUEUE, updated);
    return updated;
  },

  // --- RECEIPTS & HISTORY ---
  getReceipts: () => getFromStorage(DB_KEYS.RECEIPTS, initialReceipts),
  addReceipt: (receipt) => {
    const list = localStorageDB.getReceipts();
    const updated = [receipt, ...list.filter((r) => r.receiptId !== receipt.receiptId)];
    setToStorage(DB_KEYS.RECEIPTS, updated);

    // Add to history
    const history = getFromStorage(DB_KEYS.HISTORY, initialHistory);
    setToStorage(DB_KEYS.HISTORY, [
      {
        id: receipt.receiptId,
        farmerName: receipt.farmerName,
        farmerId: receipt.farmerId,
        date: receipt.date || new Date().toISOString().split('T')[0],
        commodity: receipt.commodity,
        netWeightQtl: receipt.netWeightQtl,
        totalAmount: receipt.totalAmount,
        status: 'Procured',
        paymentStatus: 'Processing',
      },
      ...history,
    ]);

    // Add to payments
    const payments = localStorageDB.getPayments();
    setToStorage(DB_KEYS.PAYMENTS, [
      {
        paymentId: `DBT-${Math.floor(100000 + Math.random() * 900000)}`,
        farmerId: receipt.farmerId,
        farmerName: receipt.farmerName,
        amount: receipt.totalAmount,
        status: 'Pending',
        bankAccount: receipt.bankAccount || 'SBI - XXXX4812',
        date: receipt.date || new Date().toISOString().split('T')[0],
        utrNumber: `UTR2026${Math.floor(10000000 + Math.random() * 90000000)}`,
      },
      ...payments,
    ]);

    return receipt;
  },

  // --- PAYMENTS ---
  getPayments: () => getFromStorage(DB_KEYS.PAYMENTS, initialPayments),
  processPayment: (paymentId) => {
    const list = localStorageDB.getPayments();
    const updated = list.map((p) =>
      p.paymentId === paymentId ? { ...p, status: 'Credited', creditedAt: new Date().toISOString() } : p
    );
    setToStorage(DB_KEYS.PAYMENTS, updated);
    return true;
  },

  // --- RESET ALL ---
  resetAll: () => {
    setToStorage(DB_KEYS.FARMERS, initialFarmers);
    setToStorage(DB_KEYS.BOOKINGS, initialBookings);
    setToStorage(DB_KEYS.QUEUE, initialQueue);
    setToStorage(DB_KEYS.HISTORY, initialHistory);
    setToStorage(DB_KEYS.RECEIPTS, initialReceipts);
    setToStorage(DB_KEYS.PAYMENTS, initialPayments);
    localStorage.removeItem(DB_KEYS.ACTIVE_SESSION);
  },
};

export default localStorageDB;
