import React, { useState } from 'react';
import { Book, Home, BarChart3, Sun, Moon } from 'lucide-react';
import { BookProvider } from './context/BookContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { HomePage } from './pages/Home/Home';
import { StatsPage } from './pages/Stats/Stats';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'stats', label: 'Statistik', icon: BarChart3 }
  ];

  return (
    <ThemeProvider>
      <BookProvider>
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
          <nav className={`shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-2">
                  <Book size={32} className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Manajemen Buku</h1>
                </div>
                <div className="flex gap-2 items-center">
                  {navigation.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setCurrentPage(id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        currentPage === id
                          ? 'bg-blue-600 text-white'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </button>
                  ))}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'stats' && <StatsPage />}
          </main>

          <footer className={`py-6 text-center text-sm mt-auto ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'}`}>
            <p>© 2024 Aplikasi Manajemen Buku Pribadi - Praktikum Pemrograman Web</p>
          </footer>
        </div>
      </BookProvider>
    </ThemeProvider>
  );
};

export default App;