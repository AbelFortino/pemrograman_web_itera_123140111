import React, { useState } from 'react';
import { Book, Trash2, Edit2, CheckCircle, BookOpen, ShoppingCart } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

export const BookList = ({ onEdit }) => {
  const { filteredBooks, deleteBook } = useBooks();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Handle delete dengan konfirmasi
  const handleDelete = (id) => {
    const result = deleteBook(id);
    if (result.success) {
      setDeleteConfirm(null);
    }
  };

  // Generate badge status
  const getStatusBadge = (status) => {
    const badges = {
      milik: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', label: 'Dimiliki', icon: CheckCircle },
      baca: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100', label: 'Sedang Dibaca', icon: BookOpen },
      beli: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100', label: 'Ingin Dibeli', icon: ShoppingCart }
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon size={14} />
        {badge.label}
      </span>
    );
  };

  // Empty state
  if (filteredBooks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md dark:shadow-lg text-center">
        <Book size={64} className="mx-auto text-gray-300 dark:text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Belum Ada Buku</h3>
        <p className="text-gray-500 dark:text-gray-400">Tambahkan buku pertama Anda untuk memulai!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredBooks.map((book) => (
        <div key={book.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md dark:shadow-lg hover:shadow-lg transition">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">oleh {book.author}</p>
              {getStatusBadge(book.status)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(book)}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => setDeleteConfirm(book.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Konfirmasi Delete */}
          {deleteConfirm === book.id && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900 rounded border border-red-200 dark:border-red-700">
              <p className="text-sm text-red-800 dark:text-red-100 mb-2">Yakin ingin menghapus buku ini?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="px-3 py-1 bg-red-600 dark:bg-red-700 text-white rounded text-sm hover:bg-red-700"
                >
                  Hapus
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};