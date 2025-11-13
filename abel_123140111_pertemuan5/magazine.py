from library_item import LibraryItem


class Magazine(LibraryItem):
    
    def __init__(self, item_id: str, title: str, year: int, publisher: str, issue_number: int):
        super().__init__(item_id, title, year)
        self._publisher = publisher
        self._issue_number = issue_number
    
    @property
    def publisher(self):
        return self._publisher
    
    @publisher.setter
    def publisher(self, value: str):
        if not value or len(value.strip()) == 0:
            raise ValueError("Nama penerbit tidak boleh kosong")
        self._publisher = value
    
    @property
    def issue_number(self):
        return self._issue_number
    
    @issue_number.setter
    def issue_number(self, value: int):
        if value <= 0:
            raise ValueError("Nomor edisi harus lebih dari 0")
        self._issue_number = value
    
    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"ID: {self.item_id} | {self.title} | {self._publisher} | Edisi #{self._issue_number} | {self.year} | {status}")
    
    def get_type(self):
        return "Majalah"
    
    def __str__(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"[{self.item_id}] {self.title} - Edisi #{self._issue_number} ({self.year}) - {status}"
