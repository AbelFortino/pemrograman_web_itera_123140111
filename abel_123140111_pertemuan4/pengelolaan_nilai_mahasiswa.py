data_mahasiswa = [
    {
        "nama": "Budi Santoso",
        "nim": "123140001",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Siti Nurhaliza",
        "nim": "123140002",
        "nilai_uts": 78,
        "nilai_uas": 82,
        "nilai_tugas": 80
    },
    {
        "nama": "Ahmad Dahlan",
        "nim": "123140003",
        "nilai_uts": 65,
        "nilai_uas": 70,
        "nilai_tugas": 68
    },
    {
        "nama": "Dewi Lestari",
        "nim": "123140004",
        "nilai_uts": 92,
        "nilai_uas": 95,
        "nilai_tugas": 93
    },
    {
        "nama": "Rudi Hartono",
        "nim": "123140005",
        "nilai_uts": 55,
        "nilai_uas": 60,
        "nilai_tugas": 58
    }
]

def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """Menghitung nilai akhir: 30% UTS + 40% UAS + 30% Tugas"""
    return round((0.3 * nilai_uts) + (0.4 * nilai_uas) + (0.3 * nilai_tugas), 2)

def tentukan_grade(nilai_akhir):
    """Menentukan grade: A≥80, B≥70, C≥60, D≥50, E<50"""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def tampilkan_data_tabel(data):
    """Menampilkan data mahasiswa dalam format tabel"""
    print("\n" + "-"*80)
    print(f"{'No':<4}{'Nama':<20}{'NIM':<12}{'UTS':<6}{'UAS':<6}{'Tugas':<7}{'Akhir':<7}{'Grade'}")
    print("-"*80)
    
    for idx, mhs in enumerate(data, 1):
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        print(f"{idx:<4}{mhs['nama']:<20}{mhs['nim']:<12}{mhs['nilai_uts']:<6}{mhs['nilai_uas']:<6}{mhs['nilai_tugas']:<7}{nilai_akhir:<7}{grade}")
    
    print("-"*80)

def cari_mahasiswa_tertinggi(data):
    """Mencari mahasiswa dengan nilai tertinggi"""
    if not data:
        return None, 0
    
    mhs_tertinggi = data[0]
    nilai_tertinggi = hitung_nilai_akhir(mhs_tertinggi['nilai_uts'], mhs_tertinggi['nilai_uas'], mhs_tertinggi['nilai_tugas'])
    
    for mhs in data[1:]:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        if nilai_akhir > nilai_tertinggi:
            nilai_tertinggi = nilai_akhir
            mhs_tertinggi = mhs
    
    return mhs_tertinggi, nilai_tertinggi

def cari_mahasiswa_terendah(data):
    """Mencari mahasiswa dengan nilai terendah"""
    if not data:
        return None, 0
    
    mhs_terendah = data[0]
    nilai_terendah = hitung_nilai_akhir(mhs_terendah['nilai_uts'], mhs_terendah['nilai_uas'], mhs_terendah['nilai_tugas'])
    
    for mhs in data[1:]:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        if nilai_akhir < nilai_terendah:
            nilai_terendah = nilai_akhir
            mhs_terendah = mhs
    
    return mhs_terendah, nilai_terendah

def input_mahasiswa_baru():
    """Input data mahasiswa baru"""
    print("\n--- Input Data Mahasiswa Baru ---")
    nama = input("Nama: ")
    nim = input("NIM: ")
    
    while True:
        try:
            nilai_uts = float(input("Nilai UTS: "))
            nilai_uas = float(input("Nilai UAS: "))
            nilai_tugas = float(input("Nilai Tugas: "))
            
            if all(0 <= nilai <= 100 for nilai in [nilai_uts, nilai_uas, nilai_tugas]):
                break
            else:
                print("Nilai harus antara 0-100!")
        except ValueError:
            print("Input harus berupa angka!")
    
    return {
        "nama": nama,
        "nim": nim,
        "nilai_uts": nilai_uts,
        "nilai_uas": nilai_uas,
        "nilai_tugas": nilai_tugas
    }

def filter_berdasarkan_grade(data, grade_target):
    """Filter mahasiswa berdasarkan grade"""
    hasil_filter = []
    for mhs in data:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        if tentukan_grade(nilai_akhir) == grade_target.upper():
            hasil_filter.append(mhs)
    return hasil_filter

def hitung_rata_rata_kelas(data):
    """Menghitung rata-rata nilai kelas"""
    if not data:
        return 0
    total_nilai = sum(hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas']) for mhs in data)
    return round(total_nilai / len(data), 2)

def menu_utama():
    """Menu utama program"""
    while True:
        print("\n" + "="*40)
        print("  PENGELOLAAN DATA NILAI MAHASISWA")
        print("="*40)
        print("1. Tampilkan Data Mahasiswa")
        print("2. Tambah Mahasiswa")
        print("3. Nilai Tertinggi")
        print("4. Nilai Terendah")
        print("5. Filter by Grade")
        print("6. Rata-rata Kelas")
        print("7. Keluar")
        print("="*40)
        
        pilihan = input("Pilih (1-7): ")
        
        if pilihan == "1":
            tampilkan_data_tabel(data_mahasiswa)
            
        elif pilihan == "2":
            mhs_baru = input_mahasiswa_baru()
            data_mahasiswa.append(mhs_baru)
            print("Data berhasil ditambahkan!")
            
        elif pilihan == "3":
            mhs, nilai = cari_mahasiswa_tertinggi(data_mahasiswa)
            print(f"\nNilai Tertinggi:")
            print(f"Nama: {mhs['nama']}")
            print(f"NIM: {mhs['nim']}")
            print(f"Nilai: {nilai} (Grade {tentukan_grade(nilai)})")
            
        elif pilihan == "4":
            mhs, nilai = cari_mahasiswa_terendah(data_mahasiswa)
            print(f"\nNilai Terendah:")
            print(f"Nama: {mhs['nama']}")
            print(f"NIM: {mhs['nim']}")
            print(f"Nilai: {nilai} (Grade {tentukan_grade(nilai)})")
            
        elif pilihan == "5":
            grade = input("Grade (A/B/C/D/E): ")
            hasil = filter_berdasarkan_grade(data_mahasiswa, grade)
            
            if hasil:
                print(f"\nMahasiswa Grade {grade.upper()}:")
                tampilkan_data_tabel(hasil)
            else:
                print(f"Tidak ada mahasiswa grade {grade.upper()}")
            
        elif pilihan == "6":
            rata_rata = hitung_rata_rata_kelas(data_mahasiswa)
            print(f"\nJumlah Mahasiswa: {len(data_mahasiswa)}")
            print(f"Rata-rata Kelas: {rata_rata}")
            print(f"Grade: {tentukan_grade(rata_rata)}")
            
        elif pilihan == "7":
            print("\nTerima kasih!")
            break
            
        else:
            print("Pilihan tidak valid!")

if __name__ == "__main__":
    menu_utama()
