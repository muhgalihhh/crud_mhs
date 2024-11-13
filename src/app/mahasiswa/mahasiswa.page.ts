import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: any;
  modalTambah: any;
  modalEdit: any;
  id: any;
  nama: any;
  jurusan: any;

  constructor(
    private api: ApiService,
    private modal: ModalController,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.getMahasiswa();
  }

  getMahasiswa() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  resetModal() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  async presentAlert(header: string, message: string, color: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: color === 'success' ? 'alert-success' : 'alert-danger',
    });

    await alert.present();
  }

  tambahMahasiswa() {
    if (this.nama != '' && this.jurusan != '') {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      };
      this.api.tambah(data, 'tambah.php').subscribe({
        next: (hasil: any) => {
          this.presentAlert(
            'Berhasil',
            'Mahasiswa berhasil ditambahkan',
            'success'
          );
          this.resetModal();
          this.getMahasiswa();
          this.modalTambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          this.presentAlert('Gagal', 'Gagal menambahkan mahasiswa', 'danger');
        },
      });
    } else {
      this.presentAlert('Gagal', 'Data tidak boleh kosong', 'danger');
    }
  }

  async presentDeleteConfirm(item: any) {
    const alert = await this.alert.create({
      header: 'Konfirmasi Hapus',
      message: `Apakah anda yakin ingin menghapus ${item.nama}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Batal hapus data');
          },
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            this.hapusMahasiswa(item.id);
          },
        },
      ],
    });

    await alert.present();
  }

  hapusMahasiswa(id: any) {
    this.api.hapus(id, 'hapus.php?id=').subscribe({
      next: (res: any) => {
        this.presentAlert('Berhasil', 'Mahasiswa berhasil dihapus', 'success');
        this.getMahasiswa();
      },
      error: (error: any) => {
        this.presentAlert('Gagal', 'Gagal menghapus mahasiswa', 'danger');
      },
    });
  }

  ambilMahasiswa(id: any) {
    this.api.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let mahasiswa = hasil;
        this.id = mahasiswa.id;
        this.nama = mahasiswa.nama;
        this.jurusan = mahasiswa.jurusan;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMahasiswa(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  editMahasiswa() {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan,
    };
    this.api.edit(data, 'edit.php').subscribe({
      next: (hasil: any) => {
        this.presentAlert(
          'Berhasil',
          'Mahasiswa berhasil diperbarui',
          'success'
        );
        this.resetModal();
        this.getMahasiswa();
        this.modalEdit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        this.presentAlert('Gagal', 'Gagal memperbarui mahasiswa', 'danger');
      },
    });
  }
}
