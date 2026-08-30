/**
 * QueueService - Placeholder API service for token & queue monitoring
 */

import queueData from '../data/queue.json';

export const queueService = {
  getQueueList: async () => {
    console.log('[Placeholder API] queueService.getQueueList called');
    return queueData;
  },
  updateQueueStatus: async (tokenId, status) => {
    console.log('[Placeholder API] queueService.updateQueueStatus called:', tokenId, status);
    return { success: true };
  },
};
