import { useState } from 'react';
import queueData from '../data/queue.json';

export const useQueue = () => {
  const [queue, setQueue] = useState(queueData);
  const [loading, setLoading] = useState(false);

  const getActiveTokens = () => queue.filter((item) => item.status === 'In Queue');

  return {
    queue,
    loading,
    getActiveTokens,
    setQueue,
  };
};
