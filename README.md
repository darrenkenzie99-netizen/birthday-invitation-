# A Special Chapter — Birthday Invitation

Undangan ulang tahun interaktif untuk Safira Feronika Putri.

## Struktur
- `index.html` — struktur/isi website
- `style.css` — seluruh styling, responsive layout, dan animasi
- `script.js` — opening envelope, navbar, countdown, surprise, music, RSVP, dan scroll reveal
- `assets/images/` — tempat foto
- `assets/audio/` — tempat musik
- `assets/icons/` — tempat icon tambahan

## Cara menjalankan
1. Extract folder project.
2. Buka `index.html` di browser.
3. Untuk foto, masukkan file:
   - `assets/images/photo-01.jpg`
   - `assets/images/photo-02.jpg`
   - `assets/images/photo-03.jpg`
4. Untuk musik, masukkan:
   - `assets/audio/birthday-music.mp3`

## Bagian yang mudah diganti
- Nama Safira: cari teks `Safira Feronika Putri` di `index.html`.
- Countdown: ubah `targetDate` di `script.js`.
- Lokasi: ubah `Your Location` dan URL Google Maps di `index.html`.
- Warna: ubah CSS variables di bagian `:root` pada `style.css`.

## Catatan
RSVP versi ini hanya frontend dan tidak menyimpan data ke database. Struktur form sudah dibuat agar nantinya mudah dihubungkan ke backend/database.
