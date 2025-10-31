import { useState, useEffect } from 'react';

/**
 * Custom Hook untuk menghitung statistik buku
 * @param {Array} books - Array buku
 * @returns {Object} - Objek statistik
 */
export const useBookStats = (books) => {
  const [stats, setStats] = useState({
    total: 0,
    milik: 0,
    baca: 0,
    beli: 0
  });

  useEffect(() => {
    const newStats = {
      total: books.length,
      milik: books.filter(b => b.status === 'milik').length,
      baca: books.filter(b => b.status === 'baca').length,
      beli: books.filter(b => b.status === 'beli').length
    };
    setStats(newStats);
  }, [books]);

  return stats;
};