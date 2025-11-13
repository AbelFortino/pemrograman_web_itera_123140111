# Manajemen Buku - Aplikasi Manajemen Buku Pribadi

**Nama**: Abel Fortino  
**NIM**: 123140111  
**Kelas**: RA

## Deskripsi
Manajemen Buku adalah aplikasi web modern untuk mengelola koleksi buku pribadi. Aplikasi ini dibangun dengan React dan menggunakan Context API untuk state management, dengan fitur-fitur advanced seperti filtering, searching, statistik, dan theme customization.

## Fitur

### Fitur Inti
- **Manajemen Buku Lengkap**: Create, Read, Update, Delete operations
- **Sistem Status Buku**: Tiga status buku (Dimiliki, Sedang Dibaca, Ingin Dibeli)
- **Advanced Filtering**: Filter berdasarkan status buku
- **Real-time Search**: Pencarian instan berdasarkan judul dan penulis
- **Dashboard Statistik**: Halaman statistik dengan berbagai metrics
- **Theme System**: Dark dan Light mode dengan persistence

### Fitur Tambahan
- **LocalStorage Integration**: Penyimpanan data lokal dengan error handling
- **Form Validation**: Validasi comprehensive dengan user feedback
- **Responsive Design**: Optimal pada berbagai device sizes
- **Custom Hooks**: Reusable hooks untuk localStorage dan statistik
- **Context API**: State management yang efisien
- **Tailwind CSS**: Styling modern dan konsisten

## Screenshot

### 1. Dashboard Beranda dengan Koleksi Buku
![Dashboard](screenshots/dashboard.png)
*Dashboard utama dengan daftar koleksi buku*

### 2. Dark Mode Interface
![Dark Mode](screenshots/darkmode.png)
*Tampilan dark mode dengan navigasi yang elegan*

### 3. Halaman Statistik Buku
![Stats Page](screenshots/stats.png)
*Halaman statistik dengan metrics lengkap*

## Panduan

### Requirements
- Node.js (versi 14 atau lebih baru)
- npm atau yarn
- Modern web browser dengan JavaScript support

### Installation Steps
1. Clone atau download folder pertemuan3
2. Buka terminal dan navigasi ke folder pertemuan3
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan aplikasi:
   ```bash
   npm start
   ```
5. Buka browser dan akses `http://localhost:3000`

### User Guide
1. **Menambah Buku**: Klik "Tambah Buku" dan isi form dengan data yang valid
2. **Mengedit Buku**: Klik ikon edit pada buku yang ingin diubah
3. **Menghapus Buku**: Klik ikon hapus pada buku yang ingin dihapus
4. **Filtering**: Gunakan dropdown filter untuk memfilter berdasarkan status
5. **Searching**: Gunakan search box untuk mencari berdasarkan judul atau penulis
6. **Melihat Statistik**: Klik menu "Statistik" untuk melihat dashboard statistik
7. **Theme Switching**: Toggle antara dark dan light mode via tombol di header

## Aspek Teknis

### LocalStorage Implementation
Aplikasi menggunakan custom hook `useLocalStorage` dengan error handling yang robust:

```javascript
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
};
```

**Data Structure:**
```javascript
{
    id: String,
    title: String,
    author: String,
    status: String, // 'milik' | 'baca' | 'beli'
    createdAt: String,
    updatedAt?: String
}
```

### Form Validation System
Validasi form menggunakan state management dengan real-time feedback:

```javascript
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
```

**Validation Rules:**
- Judul buku: Required, maksimal 100 karakter
- Nama penulis: Required, maksimal 100 karakter
- Status: Auto-validated dengan default value

### Context API Implementation
State management menggunakan React Context dengan custom hooks:

```javascript
const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // CRUD operations
  const addBook = (book) => { /* implementation */ };
  const updateBook = (id, updatedBook) => { /* implementation */ };
  const deleteBook = (id) => { /* implementation */ };

  // Filtered books computation
  const filteredBooks = books.filter(book => {
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    const matchesSearch = searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <BookContext.Provider value={{ /* context value */ }}>
      {children}
    </BookContext.Provider>
  );
};
```

### Custom Hooks
Aplikasi menggunakan custom hooks untuk logic reusability:

#### useBookStats Hook
```javascript
export const useBookStats = (books) => {
  const [stats, setStats] = useState({
    total: 0,
    milik: 0,
    baca: 0,
    beli: 0
  });

  useEffect(() => {
    const newStats = {
      total: books.length,
      milik: books.filter(b => b.status === 'milik').length,
      baca: books.filter(b => b.status === 'baca').length,
      beli: books.filter(b => b.status === 'beli').length
    };
    setStats(newStats);
  }, [books]);

  return stats;
};
```

## Project Structure
```
abel_123140111_pertemuan3/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── components/
│   │   ├── BookFilter/
│   │   │   └── BookFilter.js   # Komponen filter buku
│   │   ├── BookForm/
│   │   │   └── BookForm.js     # Komponen form tambah/edit buku
│   │   └── BookList/
│   │       └── BookList.js     # Komponen daftar buku
│   ├── context/
│   │   ├── BookContext.js      # Context untuk state buku
│   │   └── ThemeContext.js     # Context untuk theme management
│   ├── hooks/
│   │   ├── useBookStats.js     # Hook untuk kalkulasi statistik
│   │   └── useLocalStorage.js  # Hook untuk localStorage
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.js         # Halaman utama
│   │   └── Stats/
│   │       └── Stats.js        # Halaman statistik
│   ├── App.js                  # Komponen utama aplikasi
│   ├── index.css               # Global styles
│   └── index.js                # Entry point React
├── package.json                # Dependencies dan scripts
├── tailwind.config.js          # Konfigurasi Tailwind CSS
└── postcss.config.js           # Konfigurasi PostCSS
```

## Teknologi yang Digunakan
- **React 18**: Library JavaScript untuk UI
- **Tailwind CSS**: Framework CSS utility-first
- **Lucide React**: Icon library
- **Context API**: State management
- **LocalStorage**: Client-side data persistence
- **Custom Hooks**: Reusable logic patterns
