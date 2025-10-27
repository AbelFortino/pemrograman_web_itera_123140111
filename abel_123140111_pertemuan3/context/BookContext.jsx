import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const addBook = (book) => {
    const newBook = {
      id: Date.now(),
      ...book,
      createdAt: new Date().toISOString()
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => book.id === id ? { ...book, ...updatedBook } : book));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || book.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <BookContext.Provider value={{
      books,
      filteredBooks,
      searchQuery,
      setSearchQuery,
      filterStatus,
      setFilterStatus,
      addBook,
      updateBook,
      deleteBook
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};