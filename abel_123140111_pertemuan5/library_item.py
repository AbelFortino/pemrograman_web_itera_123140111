from abc import ABC, abstractmethod
from datetime import datetime


class LibraryItem(ABC):
    
    def __init__(self, item_id: str, title: str, year: int):
        self.__item_id = item_id
        self.__title = title
        self._year = year
        self._is_available = True
        self._borrowed_date = None
    
    @property
    def item_id(self):
        return self.__item_id
    
    @property
    def title(self):
        return self.__title
    
    @title.setter
    def title(self, value: str):
        if not value or len(value.strip()) == 0:
            raise ValueError("Judul tidak boleh kosong")
        self.__title = value
    
    @property
    def year(self):
        return self._year
    
    @year.setter
    def year(self, value: int):
        current_year = datetime.now().year
        if value < 1000 or value > current_year:
            raise ValueError(f"Tahun harus antara 1000 dan {current_year}")
        self._year = value
    
    @property
    def is_available(self):
        return self._is_available
    
    @abstractmethod
    def display_info(self):
        pass
    
    @abstractmethod
    def get_type(self):
        pass
    
    def borrow(self):
        if self._is_available:
            self._is_available = False
            self._borrowed_date = datetime.now()
            return True
        return False
    
    def return_item(self):
        if not self._is_available:
            self._is_available = True
            self._borrowed_date = None
            return True
        return False
    
    def __str__(self):
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"[{self.__item_id}] {self.__title} ({self._year}) - {status}"
