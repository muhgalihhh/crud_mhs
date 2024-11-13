<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/595d8118-e3e4-48a0-ab91-1e181ead8217" height="120" alt="anime-yes"/>
    </td>
    <td style="vertical-align: middle;">
      <h5>Nama: Muhamad Galih</h5>
      <h5>NIM: H1D022052</h5>
      <h5>Shift: E (Baru)</h5>
    </td>
  </tr>
</table>


## **Demo Aplikasi**  
[Demo CRUD Sederhana IONIC](https://github.com/user-attachments/assets/85a81b51-2dd8-40e2-b1bf-37e4b225bba0)

---

## **Penjelasan CRUD**  
### **Struktur**
- `src/app/service/api.service.ts`: Berisi layanan API untuk berkomunikasi dengan backend.
- `src/app/mahasiswa/mahasiswa.page.ts`: Berisi logika utama untuk halaman mahasiswa.
- `src/app/mahasiswa/mahasiswa.page.html`: Berisi template HTML untuk halaman mahasiswa.

---

## **Operasi CRUD**  

### **1. Tambah Mahasiswa**  

---

### **Gambar Operasi Tambah Mahasiswa**
| Membuka Modal Tambah | Form Tambah Data | Notifikasi Sukses |
|-----------------------|------------------|-------------------|
| <img src="https://github.com/user-attachments/assets/8a2cd7fc-1785-42f6-aca4-7c05b035c9b7" width="150px" /> | <img src="https://github.com/user-attachments/assets/80b51d92-889e-4c71-8b2e-bfbf08588f40" width="150px" /> | <img src="https://github.com/user-attachments/assets/900e93af-c9ae-4303-8372-865b119c3130" width="150px" /> |

#### **a. Membuka Modal Tambah Data**
- **Kode yang dijalankan:**

```typescript
openModalTambah(isOpen: boolean) {
  this.modalTambah = isOpen;
  this.resetModal(); // Membersihkan form
  this.modalTambah = true; // Membuka modal tambah
  this.modalEdit = false; // Memastikan modal edit tertutup
}
```

- **Penjelasan:**
  - Membuka modal untuk menambahkan data mahasiswa.
  - Fungsi `resetModal()` membersihkan data sebelumnya di form modal.

#### **b. Pengguna Mengisi Form Tambah Data**
- **Form Tambah Data (HTML):**

```html
<ion-item>
  <ion-input
    label="Nama Mahasiswa"
    labelPlacement="floating"
    required
    [(ngModel)]="nama"
    placeholder="Masukkan Nama Mahasiswa"
    type="text"
  ></ion-input>
</ion-item>
<ion-item>
  <ion-input
    label="Jurusan Mahasiswa"
    labelPlacement="floating"
    required
    [(ngModel)]="jurusan"
    placeholder="Masukkan Jurusan Mahasiswa"
    type="text"
  ></ion-input>
</ion-item>
```

- **Penjelasan:**
  - Input `nama` dan `jurusan` mahasiswa menggunakan binding `[(ngModel)]` agar datanya terhubung dengan variabel di komponen TypeScript.

#### **c. Menjalankan Fungsi `tambahMahasiswa`**
- **Kode yang dijalankan:**

```typescript
tambahMahasiswa() {
  if (this.nama != '' && this.jurusan != '') {
    let data = {
      nama: this.nama,
      jurusan: this.jurusan,
    };
    this.api.tambah(data, 'tambah.php').subscribe({
      next: (hasil: any) => {
        this.resetModal(); // Reset form
        console.log('berhasil tambah mahasiswa');
        this.getMahasiswa(); // Refresh data mahasiswa
        this.modalTambah = false; // Tutup modal
        this.presentAlert('Berhasil', 'Data berhasil ditambahkan.');
      },
      error: (err: any) => {
        console.log('gagal tambah mahasiswa');
        this.presentAlert('Gagal', 'Gagal menambahkan data.');
      },
    });
  } else {
    this.presentAlert(
      'Gagal',
      'Form tidak boleh kosong. Harap isi semua data.'
    );
  }
}
```

- **Penjelasan Alur:**
  1. **Validasi Input**: Mengecek apakah semua input (nama, jurusan) terisi. Jika tidak, menampilkan alert kegagalan.
  2. **Persiapan Data**: Membuat objek `data` berisi `nama` dan `jurusan`.
  3. **Panggilan API**: Menggunakan fungsi `tambah` dari `ApiService` untuk mengirim data ke endpoint `tambah.php`.
  4. **Handling Response**:  
     - Jika sukses:  
       - Reset form dan tutup modal.  
       - Refresh data mahasiswa dengan `getMahasiswa`.  
       - Tampilkan alert sukses.  
     - Jika gagal: Tampilkan alert kegagalan.

#### **d. Fungsi `tambah` pada `ApiService`**
- **Kode yang dijalankan:**

```typescript
tambah(data: any, endpoint: string) {
  return this.http.post(this.apiURL() + '/' + endpoint, data);
}
```

- **Penjelasan:**
  - Mengirim data mahasiswa (`nama`, `jurusan`) ke endpoint `tambah.php` menggunakan HTTP POST.

#### **e. Mengambil dan Menampilkan Data Terbaru**
- **Kode yang dijalankan:**

```typescript
getMahasiswa() {
  this.api.tampil('tampil.php').subscribe({
    next: (res: any) => {
      console.log('sukses', res);
      this.dataMahasiswa = res; // Memperbarui daftar mahasiswa
    },
    error: (err: any) => {
      console.log(err);
    },
  });
}
```

- **Penjelasan:**
  - Memanggil endpoint `tampil.php` untuk mengambil data mahasiswa terbaru dan memperbarui variabel `dataMahasiswa`.

#### **f. Menampilkan Notifikasi**
- **Kode Alert:**

```typescript
async presentAlert(header: string, message: string) {
  const alert = await this.alert.create({
    header: header,
    message: message,
    buttons: ['OK'],
  });
  await alert.present();
}
```

--- 
### Update Mahasiswa

<div align="center">
<img src="https://github.com/user-attachments/assets/a95028e1-55ca-4b99-b356-8129b901916b" alt="Update Mahasiswa Step 1" width="150px">
<img src="https://github.com/user-attachments/assets/53692899-c9ec-4b18-b0b8-266098158749" alt="Update Mahasiswa Step 2" width="150px">
<img src="https://github.com/user-attachments/assets/c34a7075-61e6-4d10-a28b-663f91efe75a" alt="Update Mahasiswa Step 3" width="150px">
</div>

---

### **1. Membuka Modal Edit Data**

- **Kode yang dijalankan:**

```typescript
openModalEdit(isOpen: boolean, data: any) {
  this.modalEdit = isOpen; // Membuka modal edit
  this.modalTambah = false; // Memastikan modal tambah tertutup
  this.id = data.id; // Mengisi ID mahasiswa yang akan diedit
  this.nama = data.nama; // Mengisi nama mahasiswa ke form
  this.jurusan = data.jurusan; // Mengisi jurusan mahasiswa ke form
}
```

- **Penjelasan:**
  - Fungsi ini membuka modal edit data dengan mengisi form menggunakan data mahasiswa yang dipilih.
  - Data seperti `id`, `nama`, dan `jurusan` ditransfer ke variabel dalam komponen.

---

### **2. Form Edit Data Mahasiswa**

- **HTML Form Modal Edit:**

```html
<ion-item>
  <ion-input
    label="Nama Mahasiswa"
    labelPlacement="floating"
    required
    [(ngModel)]="nama"
    placeholder="Masukkan Nama Mahasiswa"
    type="text"
  ></ion-input>
</ion-item>
<ion-item>
  <ion-input
    label="Jurusan Mahasiswa"
    labelPlacement="floating"
    required
    [(ngModel)]="jurusan"
    placeholder="Masukkan Jurusan Mahasiswa"
    type="text"
  ></ion-input>
</ion-item>
```

- **Penjelasan:**
  - Input `nama` dan `jurusan` menggunakan `[(ngModel)]` agar terhubung dengan variabel `nama` dan `jurusan` di TypeScript.
  - Saat modal dibuka, nilai awal diisi dengan data mahasiswa yang akan diedit.

---

### **3. Menjalankan Fungsi `editMahasiswa`**

- **Kode yang dijalankan:**

```typescript
editMahasiswa() {
  if (this.nama != '' && this.jurusan != '') {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan,
    };
    this.api.edit(data, 'edit.php').subscribe({
      next: (hasil: any) => {
        this.resetModal(); // Reset form
        console.log('berhasil edit mahasiswa');
        this.getMahasiswa(); // Refresh data mahasiswa
        this.modalEdit = false; // Tutup modal edit
        this.presentAlert('Berhasil', 'Data berhasil diperbarui.');
      },
      error: (err: any) => {
        console.log('gagal edit mahasiswa');
        this.presentAlert('Gagal', 'Gagal memperbarui data.');
      },
    });
  } else {
    this.presentAlert(
      'Gagal',
      'Form tidak boleh kosong. Harap isi semua data.'
    );
  }
}
```

- **Penjelasan Alur:**
  1. **Validasi Input**:
     - Mengecek apakah `nama` dan `jurusan` sudah terisi.
     - Jika tidak, menampilkan alert kegagalan.
  2. **Persiapan Data**:
     - Membuat objek `data` berisi `id`, `nama`, dan `jurusan`.
  3. **Panggilan API**:
     - Menggunakan fungsi `edit` dari `ApiService` untuk mengirim data ke endpoint `edit.php`.
  4. **Handling Response**:
     - Jika sukses:
       - Reset form dan tutup modal.
       - Refresh data mahasiswa dengan `getMahasiswa`.
       - Tampilkan alert sukses.
     - Jika gagal:
       - Tampilkan alert kegagalan.

---

### **4. Fungsi `edit` pada `ApiService`**

- **Kode yang dijalankan:**

```typescript
edit(data: any, endpoint: string) {
  return this.http.put(this.apiURL() + '/' + endpoint, data);
}
```

- **Penjelasan:**
  - Fungsi ini mengirim data mahasiswa (`id`, `nama`, `jurusan`) ke endpoint `edit.php` menggunakan metode HTTP PUT.

---

### **5. Mengambil dan Menampilkan Data Terbaru**

- **Kode yang dijalankan:**

```typescript
getMahasiswa() {
  this.api.tampil('tampil.php').subscribe({
    next: (res: any) => {
      console.log('sukses', res);
      this.dataMahasiswa = res; // Memperbarui daftar mahasiswa
    },
    error: (err: any) => {
      console.log(err);
    },
  });
}
```

- **Penjelasan:**
  - Setelah data diperbarui, fungsi ini memanggil endpoint `tampil.php` untuk mengambil data mahasiswa terbaru dan memperbarui variabel `dataMahasiswa`.

---

### **6. Menampilkan Notifikasi**

- **Kode Alert:**

```typescript
async presentAlert(header: string, message: string) {
  const alert = await this.alert.create({
    header: header,
    message: message,
    buttons: ['OK'],
  });
  await alert.present();
}
```

- **Penjelasan:**
  - Fungsi ini digunakan untuk menampilkan notifikasi sukses atau gagal berdasarkan hasil operasi CRUD.

Tentu, saya akan menyesuaikan ukuran gambarnya agar konsisten seperti sebelumnya.

### Delete Mahasiswa


<div align="center">
<img src="https://github.com/user-attachments/assets/f0ed2137-02f4-4b18-bd61-e15d372b63d1" alt="Update Mahasiswa Step 1" width="150px">
<img src="https://github.com/user-attachments/assets/1db01b5c-d0a4-48ee-bfd8-ebdf115b2d62" alt="Update Mahasiswa Step 2" width="150px">

</div>
---

### **1. Memilih Mahasiswa yang Akan Dihapus**
- **Kode yang dijalankan:**

```html
<ion-button (click)="hapusMahasiswa(mahasiswa.id)">Hapus</ion-button>
```

- **Penjelasan:**
  - Tombol **Hapus** pada antarmuka akan memanggil fungsi `hapusMahasiswa` dengan parameter `id` mahasiswa yang ingin dihapus.
  - ID mahasiswa ini digunakan untuk menentukan data yang akan dihapus.

---

### **2. Menjalankan Fungsi `hapusMahasiswa`**
- **Kode yang dijalankan:**

```typescript
hapusMahasiswa(id: any) {
  this.presentAlertConfirm(id);
}
```

- **Penjelasan:**
  - Fungsi ini memanggil `presentAlertConfirm` untuk menampilkan dialog konfirmasi sebelum menghapus data mahasiswa.

---

### **3. Menampilkan Dialog Konfirmasi**
- **Kode yang dijalankan:**

```typescript
async presentAlertConfirm(id: any) {
  const alert = await this.alert.create({
    header: 'Konfirmasi Hapus',
    message: 'Apakah Anda yakin ingin menghapus data ini?',
    buttons: [
      {
        text: 'Batal',
        role: 'cancel',
        handler: () => {
          console.log('Hapus dibatalkan');
        },
      },
      {
        text: 'Hapus',
        handler: () => {
          this.prosesHapusMahasiswa(id); // Lanjutkan penghapusan jika dikonfirmasi
        },
      },
    ],
  });

  await alert.present();
}
```

- **Penjelasan:**
  - Pengguna akan diminta konfirmasi untuk memastikan apakah mereka ingin menghapus data.
  - Jika memilih **"Hapus"**, fungsi `prosesHapusMahasiswa` dipanggil untuk melanjutkan penghapusan.
  - Jika memilih **"Batal"**, proses penghapusan dibatalkan.

---

### **4. Memproses Penghapusan Data**
- **Kode yang dijalankan:**

```typescript
prosesHapusMahasiswa(id: any) {
  this.api.hapus(id, 'hapus.php').subscribe({
    next: (hasil: any) => {
      console.log('berhasil hapus mahasiswa', hasil);
      this.getMahasiswa(); // Refresh data mahasiswa
      this.presentAlert('Berhasil', 'Data berhasil dihapus.');
    },
    error: (err: any) => {
      console.log('gagal hapus mahasiswa', err);
      this.presentAlert('Gagal', 'Gagal menghapus data.');
    },
  });
}
```

- **Penjelasan:**
  1. **Panggilan API untuk Hapus Data**:
     - Menggunakan fungsi `hapus` dari `ApiService`, ID mahasiswa dikirim ke endpoint `hapus.php` dengan metode HTTP DELETE.
  2. **Handling Response**:
     - Jika berhasil:
       - Daftar mahasiswa diperbarui dengan memanggil `getMahasiswa`.
       - Tampilkan notifikasi sukses menggunakan `presentAlert`.
     - Jika gagal:
       - Tampilkan notifikasi kegagalan.

---

### **5. Fungsi `hapus` pada `ApiService`**
- **Kode yang dijalankan:**

```typescript
hapus(id: any, endpoint: string) {
  return this.http.delete(this.apiURL() + '/' + endpoint + '' + id);
}
```

- **Penjelasan:**
  - Fungsi ini mengirim permintaan HTTP DELETE ke endpoint `hapus.php` dengan ID mahasiswa yang ingin dihapus.
  - Backend kemudian akan memproses permintaan ini untuk menghapus data dari database.

---

### **6. Mengambil dan Menampilkan Data Terbaru**
- **Kode yang dijalankan:**

```typescript
getMahasiswa() {
  this.api.tampil('tampil.php').subscribe({
    next: (res: any) => {
      console.log('sukses', res);
      this.dataMahasiswa = res; // Memperbarui daftar mahasiswa
    },
    error: (err: any) => {
      console.log(err);
    },
  });
}
```

- **Penjelasan:**
  - Setelah data berhasil dihapus, fungsi ini akan memanggil endpoint `tampil.php` untuk mengambil data mahasiswa terbaru dan memperbarui variabel `dataMahasiswa`.

---Tentu, saya akan menyesuaikan ukuran gambarnya agar konsisten seperti sebelumnya.

### Delete Mahasiswa

![iPhone-13-PRO-localhost (23)](https://github.com/user-attachments/assets/f0ed2137-02f4-4b18-bd61-e15d372b63d1 =1024x1024)  
![iPhone-13-PRO-localhost (24)](https://github.com/user-attachments/assets/1db01b5c-d0a4-48ee-bfd8-ebdf115b2d62 =1024x1024)

---

### **1. Memilih Mahasiswa yang Akan Dihapus**
- **Kode yang dijalankan:**

```html
<ion-button (click)="hapusMahasiswa(mahasiswa.id)">Hapus</ion-button>
```

- **Penjelasan:**
  - Tombol **Hapus** pada antarmuka akan memanggil fungsi `hapusMahasiswa` dengan parameter `id` mahasiswa yang ingin dihapus.
  - ID mahasiswa ini digunakan untuk menentukan data yang akan dihapus.

---

### **2. Menjalankan Fungsi `hapusMahasiswa`**
- **Kode yang dijalankan:**

```typescript
hapusMahasiswa(id: any) {
  this.presentAlertConfirm(id);
}
```

- **Penjelasan:**
  - Fungsi ini memanggil `presentAlertConfirm` untuk menampilkan dialog konfirmasi sebelum menghapus data mahasiswa.

---

### **3. Menampilkan Dialog Konfirmasi**
- **Kode yang dijalankan:**

```typescript
async presentAlertConfirm(id: any) {
  const alert = await this.alert.create({
    header: 'Konfirmasi Hapus',
    message: 'Apakah Anda yakin ingin menghapus data ini?',
    buttons: [
      {
        text: 'Batal',
        role: 'cancel',
        handler: () => {
          console.log('Hapus dibatalkan');
        },
      },
      {
        text: 'Hapus',
        handler: () => {
          this.prosesHapusMahasiswa(id); // Lanjutkan penghapusan jika dikonfirmasi
        },
      },
    ],
  });

  await alert.present();
}
```

- **Penjelasan:**
  - Pengguna akan diminta konfirmasi untuk memastikan apakah mereka ingin menghapus data.
  - Jika memilih **"Hapus"**, fungsi `prosesHapusMahasiswa` dipanggil untuk melanjutkan penghapusan.
  - Jika memilih **"Batal"**, proses penghapusan dibatalkan.

---

### **4. Memproses Penghapusan Data**
- **Kode yang dijalankan:**

```typescript
prosesHapusMahasiswa(id: any) {
  this.api.hapus(id, 'hapus.php').subscribe({
    next: (hasil: any) => {
      console.log('berhasil hapus mahasiswa', hasil);
      this.getMahasiswa(); // Refresh data mahasiswa
      this.presentAlert('Berhasil', 'Data berhasil dihapus.');
    },
    error: (err: any) => {
      console.log('gagal hapus mahasiswa', err);
      this.presentAlert('Gagal', 'Gagal menghapus data.');
    },
  });
}
```

- **Penjelasan:**
  1. **Panggilan API untuk Hapus Data**:
     - Menggunakan fungsi `hapus` dari `ApiService`, ID mahasiswa dikirim ke endpoint `hapus.php` dengan metode HTTP DELETE.
  2. **Handling Response**:
     - Jika berhasil:
       - Daftar mahasiswa diperbarui dengan memanggil `getMahasiswa`.
       - Tampilkan notifikasi sukses menggunakan `presentAlert`.
     - Jika gagal:
       - Tampilkan notifikasi kegagalan.

---

### **5. Fungsi `hapus` pada `ApiService`**
- **Kode yang dijalankan:**

```typescript
hapus(id: any, endpoint: string) {
  return this.http.delete(this.apiURL() + '/' + endpoint + '' + id);
}
```

- **Penjelasan:**
  - Fungsi ini mengirim permintaan HTTP DELETE ke endpoint `hapus.php` dengan ID mahasiswa yang ingin dihapus.
  - Backend kemudian akan memproses permintaan ini untuk menghapus data dari database.

---

### **6. Mengambil dan Menampilkan Data Terbaru**
- **Kode yang dijalankan:**

```typescript
getMahasiswa() {
  this.api.tampil('tampil.php').subscribe({
    next: (res: any) => {
      console.log('sukses', res);
      this.dataMahasiswa = res; // Memperbarui daftar mahasiswa
    },
    error: (err: any) => {
      console.log(err);
    },
  });
}
```

- **Penjelasan:**
  - Setelah data berhasil dihapus, fungsi ini akan memanggil endpoint `tampil.php` untuk mengambil data mahasiswa terbaru dan memperbarui variabel `dataMahasiswa`.

---
