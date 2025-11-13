import React from 'react';
import { Search, Filter, Book, CheckCircle, BookOpen, ShoppingCart } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

/**
 * Komponen untuk filter dan pencarian buku
 */
export const BookFilter = () => {
  const { filterStatus, setFilterStatus, searchQuery, setSearchQuery } = useBooks();

  const statusOptions = [
    { value: 'all', label: 'Semua Buku', icon: Book },
    { value: 'milik', label: 'Dimiliki', icon: CheckCircle },
    { value: 'baca', label: 'Sedang Dibaca', icon: BookOpen },
    { value: 'beli', label: 'Ingin Dibeli', icon: ShoppingCart }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {/* Search Box */}
      <div className="mb-4">
        <label className="block text-gray-900 dark:text-gray-100 font-medium mb-2 flex items-center gap-2">
          <Search size={18} />
          Cari Buku
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari berdasarkan judul atau penulis..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Status */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center gap-2">
          <Filter size={18} />
          Filter Status
        </label>
        <div className="grid grid-cols-2 gap-2">
          {statusOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFilterStatus(value)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                filterStatus === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};