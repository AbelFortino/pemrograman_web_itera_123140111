from typing import List, Optional
from library_item import LibraryItem


class Library:
    
    def __init__(self, name: str):
        self.__name = name
        self.__items: List[LibraryItem] = []
        self.__total_borrowed = 0
    
    @property
    def name(self):
        return self.__name
    
    @property
    def total_items(self):
        return len(self.__items)
    
    @property
    def available_items(self):
        return sum(1 for item in self.__items if item.is_available)
    
    @property
    def borrowed_items(self):
        return sum(1 for item in self.__items if not item.is_available)
    
    def add_item(self, item: LibraryItem) -> bool:
        if self.__find_by_id(item.item_id) is not None:
            return False
        self.__items.append(item)
        return True
    
    def __find_by_id(self, item_id: str) -> Optional[LibraryItem]:
        for item in self.__items:
            if item.item_id.lower() == item_id.lower():
                return item
        return None
    
    def search_by_title(self, title: str) -> List[LibraryItem]:
        results = []
        search_term = title.lower()
        for item in self.__items:
            if search_term in item.title.lower():
                results.append(item)
        return results
    
    def search_by_id(self, item_id: str) -> Optional[LibraryItem]:
        return self.__find_by_id(item_id)
    
    def display_all_items(self):
        if not self.__items:
            print("\nPerpustakaan kosong.")
            return
        
        print(f"\n=== {self.__name.upper()} ===")
        print(f"Total: {self.total_items} | Tersedia: {self.available_items} | Dipinjam: {self.borrowed_items}\n")
        
        for i, item in enumerate(self.__items, 1):
            print(f"{i}. {item}")
    
    def display_available_items(self):
        available = [item for item in self.__items if item.is_available]
        
        if not available:
            print("\nTidak ada item tersedia.")
            return
        
        print(f"\n=== ITEM TERSEDIA ===")
        for i, item in enumerate(available, 1):
            print(f"{i}. {item}")
    
    def borrow_item(self, item_id: str) -> bool:
        item = self.__find_by_id(item_id)
        
        if item is None:
            print(f"\nItem '{item_id}' tidak ditemukan.")
            return False
        
        if item.borrow():
            self.__total_borrowed += 1
            print(f"\nBerhasil meminjam: {item.title}")
            return True
        else:
            print(f"\nItem '{item.title}' sedang dipinjam.")
            return False
    
    def return_item(self, item_id: str) -> bool:
        item = self.__find_by_id(item_id)
        
        if item is None:
            print(f"\nItem '{item_id}' tidak ditemukan.")
            return False
        
        if item.return_item():
            print(f"\nBerhasil mengembalikan: {item.title}")
            return True
        else:
            print(f"\nItem '{item.title}' tidak sedang dipinjam.")
            return False
    
    def get_statistics(self):
        books = sum(1 for item in self.__items if item.get_type() == "Buku")
        magazines = sum(1 for item in self.__items if item.get_type() == "Majalah")
        
        print(f"\n=== STATISTIK ===")
        print(f"Total Item: {self.total_items}")
        print(f"Tersedia: {self.available_items} | Dipinjam: {self.borrowed_items}")
        print(f"Buku: {books} | Majalah: {magazines}")
