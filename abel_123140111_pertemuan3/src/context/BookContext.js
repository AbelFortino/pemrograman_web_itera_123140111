import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

/**
 * Provider untuk Book Context
 * Mengelola state global untuk aplikasi buku
 */
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk menambah buku baru
  const addBook = (book) => {
    try {
      const newBook = {
        id: Date.now().toString(),
        ...book,
        createdAt: new Date().toISOString()
      };
      setBooks([...books, newBook]);
      return { success: true, message: 'Buku berhasil ditambahkan!' };
    } catch (error) {
      return { success: false, message: 'Gagal menambahkan buku' };
    }
  };

  // Fungsi untuk update buku
  const updateBook = (id, updatedBook) => {
    try {
      setBooks(books.map(book => 
        book.id === id ? { ...book, ...updatedBook, updatedAt: new Date().toISOString() } : book
      ));
      return { success: true, message: 'Buku berhasil diupdate!' };
    } catch (error) {
      return { success: false, message: 'Gagal mengupdate buku' };
    }
  };

  // Fungsi untuk hapus buku
  const deleteBook = (id) => {
    try {
      setBooks(books.filter(book => book.id !== id));
      return { success: true, message: 'Buku berhasil dihapus!' };
    } catch (error) {
      return { success: false, message: 'Gagal menghapus buku' };
    }
  };

  // Filter buku berdasarkan status dan search query
  const filteredBooks = books.filter(book => {
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <BookContext.Provider value={{
      books,
      filteredBooks,
      filterStatus,
      setFilterStatus,
      searchQuery,
      setSearchQuery,
      addBook,
      updateBook,
      deleteBook
    }}>
      {children}
    </BookContext.Provider>
  );
};

/**
 * Custom Hook untuk menggunakan Book Context
 */
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};