import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';

/**
 * Komponen Form untuk menambah/edit buku
 * @param {Object} bookToEdit - Data buku yang akan diedit (optional)
 * @param {Function} onCancel - Callback saat form dibatalkan
 * @param {Function} onSuccess - Callback saat form berhasil disubmit
 */
export const BookForm = ({ bookToEdit, onCancel, onSuccess }) => {
  const { addBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: bookToEdit?.title || '',
    author: bookToEdit?.author || '',
    status: bookToEdit?.status || 'milik'
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  // Validasi form
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi';
    }
    if (formData.title.length > 100) {
      newErrors.title = 'Judul maksimal 100 karakter';
    }
    if (formData.author.length > 100) {
      newErrors.author = 'Nama penulis maksimal 100 karakter';
    }
    return newErrors;
  };

  // Handle submit form
  const handleSubmit = () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = bookToEdit 
      ? updateBook(bookToEdit.id, formData)
      : addBook(formData);

    if (result.success) {
      setNotification({ type: 'success', message: result.message });
      setTimeout(() => {
        onSuccess && onSuccess();
        onCancel && onCancel();
      }, 1000);
    } else {
      setNotification({ type: 'error', message: result.message });
    }
  };

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        {bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h3>
      
      {notification && (
        <div className={`mb-4 p-3 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {notification.message}
        </div>
      )}

      <div onSubmit={(e) => e.preventDefault()}>
        {/* Input Judul */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Judul Buku *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan judul buku"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Input Penulis */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Penulis *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan nama penulis"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>

        {/* Select Status */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="milik">Dimiliki</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>

        {/* Tombol Submit dan Cancel */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {bookToEdit ? 'Update' : 'Tambah'} Buku
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};