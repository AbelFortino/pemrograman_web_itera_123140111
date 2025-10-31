import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BookForm } from '../../components/BookForm/BookForm';
import { BookFilter } from '../../components/BookFilter/BookFilter';
import { BookList } from '../../components/BookList/BookList';

export const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Koleksi Buku Saya</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Tambah Buku
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BookFilter />
          {showForm && (
            <div className="mt-6">
              <BookForm 
                bookToEdit={editingBook}
                onCancel={handleCloseForm}
                onSuccess={handleCloseForm}
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <BookList onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};