import React from 'react';
import { Book } from 'lucide-react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';

const StatsPage = () => {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const statCards = [
    { label: 'Total Buku', value: stats.total, color: 'bg-purple-500', icon: Book },
    { label: 'Dimiliki', value: stats.milik, color: 'bg-green-500', icon: Book },
    { label: 'Sedang Dibaca', value: stats.baca, color: 'bg-blue-500', icon: Book },
    { label: 'Ingin Dibeli', value: stats.beli, color: 'bg-yellow-500', icon: Book }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Statistik Buku</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {books.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Buku Terbaru</h2>
          <div className="space-y-3">
            {books.slice(-5).reverse().map(book => (
              <div key={book.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{book.title}</p>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  book.status === 'milik' ? 'bg-green-100 text-green-800' :
                  book.status === 'baca' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {book.status === 'milik' ? 'Dimiliki' :
                   book.status === 'baca' ? 'Sedang Dibaca' :
                   'Ingin Dibeli'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;