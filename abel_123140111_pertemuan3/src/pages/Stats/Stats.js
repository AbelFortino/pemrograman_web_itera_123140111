import React from 'react';
import { BarChart3, Book, CheckCircle, BookOpen, ShoppingCart } from 'lucide-react';
import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';

export const StatsPage = () => {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const statCards = [
    { label: 'Total Buku', value: stats.total, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100', icon: Book },
    { label: 'Dimiliki', value: stats.milik, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', icon: CheckCircle },
    { label: 'Sedang Dibaca', value: stats.baca, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100', icon: BookOpen },
    { label: 'Ingin Dibeli', value: stats.beli, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100', icon: ShoppingCart }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <BarChart3 size={28} />
        Statistik Buku
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg transition-colors duration-300">
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {books.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg transition-colors duration-300">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Daftar Lengkap Buku</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 transition-colors duration-300">Judul</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 transition-colors duration-300">Penulis</th>
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 transition-colors duration-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-100 transition-colors duration-300">{book.title}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-100 transition-colors duration-300">{book.author}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${
                        book.status === 'milik' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                        book.status === 'baca' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}>
                        {book.status === 'milik' ? 'Dimiliki' :
                         book.status === 'baca' ? 'Sedang Dibaca' : 'Ingin Dibeli'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
