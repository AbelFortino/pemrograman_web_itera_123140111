from library_item import LibraryItem


class Book(LibraryItem):
    
    def __init__(self, item_id: str, title: str, year: int, author: str, isbn: str):
        super().__init__(item_id, title, year)
        self._author = author
        self._isbn = isbn
    
    @property
    def author(self):
        return self._author
    
    @author.setter
    def author(self, value: str):
        if not value or len(value.strip()) == 0:
            raise ValueError("Nama penulis tidak boleh kosong")
        self._author = value
    
    @property
    def isbn(self):
        return self._isbn
    
    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"ID: {self.item_id} | {self.title} | {self._author} | {self.year} | {status}")
    
    def get_type(self):
        return "Buku"
    
    def __str__(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"[{self.item_id}] {self.title} - {self._author} ({self.year}) - {status}"
