from book import Book
from magazine import Magazine
from library import Library


def print_menu():
    print("\n=== MENU ===")
    print("1. Tambah Buku")
    print("2. Tambah Majalah")
    print("3. Tampilkan Semua Item")
    print("4. Tampilkan Item Tersedia")
    print("5. Cari berdasarkan Judul")
    print("6. Cari berdasarkan ID")
    print("7. Pinjam Item")
    print("8. Kembalikan Item")
    print("9. Statistik")
    print("0. Keluar")


def add_book(library: Library):
    print("\n=== TAMBAH BUKU ===")
    try:
        item_id = input("ID: ").strip()
        title = input("Judul: ").strip()
        author = input("Penulis: ").strip()
        isbn = input("ISBN: ").strip()
        year = int(input("Tahun: "))
        
        book = Book(item_id, title, year, author, isbn)
        
        if library.add_item(book):
            print(f"Buku '{title}' ditambahkan!")
        else:
            print(f"ID '{item_id}' sudah ada.")
    except Exception as e:
        print(f"Error: {e}")


def add_magazine(library: Library):
    print("\n=== TAMBAH MAJALAH ===")
    try:
        item_id = input("ID: ").strip()
        title = input("Judul: ").strip()
        publisher = input("Penerbit: ").strip()
        issue_number = int(input("Edisi: "))
        year = int(input("Tahun: "))
        
        magazine = Magazine(item_id, title, year, publisher, issue_number)
        
        if library.add_item(magazine):
            print(f"Majalah '{title}' ditambahkan!")
        else:
            print(f"ID '{item_id}' sudah ada.")
    except Exception as e:
        print(f"Error: {e}")


def search_by_title(library: Library):
    print("\n=== CARI BERDASARKAN JUDUL ===")
    title = input("Judul: ").strip()
    
    results = library.search_by_title(title)
    
    if not results:
        print(f"Tidak ditemukan '{title}'")
        return
    
    print(f"\nDitemukan {len(results)} item:")
    for i, item in enumerate(results, 1):
        print(f"{i}. {item}")


def search_by_id(library: Library):
    print("\n=== CARI BERDASARKAN ID ===")
    item_id = input("ID: ").strip()
    
    item = library.search_by_id(item_id)
    
    if item is None:
        print(f"Item '{item_id}' tidak ditemukan.")
    else:
        print("\nDitemukan:")
        item.display_info()


def borrow_item(library: Library):
    print("\n=== PINJAM ITEM ===")
    item_id = input("ID: ").strip()
    library.borrow_item(item_id)


def return_item(library: Library):
    print("\n=== KEMBALIKAN ITEM ===")
    item_id = input("ID: ").strip()
    library.return_item(item_id)


def initialize_sample_data(library: Library):
    book1 = Book("B001", "Pemrograman Python", 2023, "Dr. Budi Santoso", "978-123-456-789-0")
    book2 = Book("B002", "Web Development Modern", 2024, "Siti Nurhaliza", "978-234-567-890-1")
    mag1 = Magazine("M001", "Tech Indonesia", 2024, "Gramedia", 45)
    
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(mag1)


def main():
    library = Library("Perpustakaan ITERA")
    initialize_sample_data(library)
    
    print("\n=== SISTEM PERPUSTAKAAN ITERA ===")
    
    while True:
        print_menu()
        choice = input("\nPilih: ").strip()
        
        if choice == "1":
            add_book(library)
        elif choice == "2":
            add_magazine(library)
        elif choice == "3":
            library.display_all_items()
        elif choice == "4":
            library.display_available_items()
        elif choice == "5":
            search_by_title(library)
        elif choice == "6":
            search_by_id(library)
        elif choice == "7":
            borrow_item(library)
        elif choice == "8":
            return_item(library)
        elif choice == "9":
            library.get_statistics()
        elif choice == "0":
            print("\nTerima kasih!")
            break
        else:
            print("Pilihan tidak valid!")


if __name__ == "__main__":
    main()
