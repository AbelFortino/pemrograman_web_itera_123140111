import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleEdit = (book) => {
    setBookToEdit(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setBookToEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Koleksi Buku</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Buku
          </button>
        )}
      </div>

      {showForm && (
        <BookForm bookToEdit={bookToEdit} onClose={handleCloseForm} />
      )}

      <BookFilter />
      <BookList onEdit={handleEdit} />
    </div>
  );
};

export default HomePage;