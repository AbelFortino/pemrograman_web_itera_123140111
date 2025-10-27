import React from 'react';
import { Edit2, Trash2, Book } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

const BookList = ({ onEdit }) => {
  const { filteredBooks, deleteBook } = useBooks();

  const getStatusBadge = (status) => {
    const badges = {
      milik: 'bg-green-100 text-green-800',
      baca: 'bg-blue-100 text-blue-800',
      beli: 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      milik: 'Dimiliki',
      baca: 'Sedang Dibaca',
      beli: 'Ingin Dibeli'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus buku "${title}"?`)) {
      deleteBook(id);
    }
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Tidak ada buku yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredBooks.map(book => (
        <div key={book.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">oleh {book.author}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            {getStatusBadge(book.status)}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(book)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(book.id, book.title)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;