# EcoKos (Frontend)

Implementasi desain Figma EcoKos dengan Next.js 16 (App Router), TypeScript, Tailwind CSS 4, dan Recharts.
Hanya frontend: semua data adalah dummy dan sesi login disimpan di `localStorage`.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi
```

## Alur

`/auth` (daftar / masuk) → `/dashboard` → `/pencatatan` atau `/tantangan` (navigasi di sidebar).
Halaman di dalam `(app)` dijaga: tanpa sesi akan diarahkan kembali ke `/auth`.

## Struktur

```
src/
  app/(auth)/auth        halaman daftar & masuk
  app/(app)/*            dashboard, pencatatan, tantangan (dibungkus AppShell)
  components/ui          Button, Card, Badge, ProgressBar, Modal, Toast, form field
  components/layout      AppShell, Sidebar, Header
  components/<fitur>     komponen per halaman
  data/                  data dummy (ganti dengan API saat backend siap)
  hooks/                 useSession, useElectricityLogs
  lib/                   format, energi, pagination, session (localStorage)
```

## Menyambung ke backend nanti

- `src/lib/session.ts` dan `AuthForm` → ganti dengan endpoint login/register.
- `src/hooks/use-electricity-logs.ts` → ganti state lokal dengan fetch/mutation.
- `src/data/*` → sumber data dashboard dan tantangan.

Catatan: logo memakai ikon daun buatan sendiri (aset asli Figma tidak bisa diunduh saat pembuatan).
