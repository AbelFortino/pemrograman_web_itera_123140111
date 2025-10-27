import React, { useState } from 'react';
import { Book, BarChart3, Home } from 'lucide-react';
import { BookProvider } from './context/BookContext';
import HomePage from './pages/Home/HomePage';
import StatsPage from './pages/Stats/StatsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const NavButton = ({ page, icon: Icon, label }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        currentPage === page
          ? 'bg-blue-500 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm mb-6">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Book className="w-8 h-8 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Buku</h1>
              </div>
              <div className="flex gap-2">
                <NavButton page="home" icon={Home} label="Beranda" />
                <NavButton page="stats" icon={BarChart3} label="Statistik" />
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 pb-8">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'stats' && <StatsPage />}
        </main>
      </div>
    </BookProvider>
  );
};

export default App;