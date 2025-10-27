import React from 'react';
import { Search } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

const BookFilter = () => {
  const { filterStatus, setFilterStatus, searchQuery, setSearchQuery } = useBooks();

  const statusOptions = [
    { value: 'all', label: 'Semua Buku' },
    { value: 'milik', label: 'Dimiliki' },
    { value: 'baca', label: 'Sedang Dibaca' },
    { value: 'beli', label: 'Ingin Dibeli' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilterStatus(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === option.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookFilter;