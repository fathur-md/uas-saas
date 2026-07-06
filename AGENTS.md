<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-planning-workflow -->

# Structured Project Planning Workflow

When working on this project, you MUST follow these guardrails:

1. **Documentation-First** — Do not jump into coding without understanding existing docs.
2. **Core Documents** — Maintain `planning.md`, `sitemap.md`, `tasks.md`.
3. **Decision Log** — Track all decisions in `tasks.md#Log-Keputusan`.
4. **Delayed Updates** — If user says they will do a step manually, wait for their confirmation before marking it done.
5. **Deployment Criteria** — DILARANG menandai tugas pada Fase 4 (Production/Deployment) sebagai selesai hanya berdasarkan pengujian build lokal (`npm run build`). Fase ini baru sah dianggap selesai jika kode telah di-push ke GitHub dan di-deploy ke server produksi yang nyata.
<!-- END:project-planning-workflow -->

# SiapSedia — SaaS Marketplace

Academic project (UAS Progweb). Platform connecting customers with local merchants for gallon water, LPG gas, and laundry services.

## Stack

- **Framework**: Next.js 16.2.10 (App Router) + React 19.2.4
- **Language**: TypeScript (`strict: true`), path alias `@/*` → `src/*`
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`, NOT `@tailwind` directives)
- **Database**: PostgreSQL + Prisma ORM v7
- **Auth**: NextAuth v5 beta (Credentials provider, JWT strategy, no OAuth)
- **Icons**: lucide-react

## Project structure

```
src/
├── auth.ts                     # NextAuth config — exports { handlers, signIn, signOut, auth }
├── lib/prisma.ts               # Prisma client singleton (uses @prisma/adapter-pg + pg)
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Landing page (public)
│   ├── actions/                # Server actions (mutations only)
│   ├── api/auth/[...nextauth]/ # NextAuth route handler
│   ├── login/page.tsx          # Login form (✅ functional)
│   ├── register/               # Customer & Merchant registration (✅ both work)
│   ├── customer/               # Customer area (✅ implemented)
│   ├── merchant/               # Merchant area (✅ implemented)
│   └── admin/                  # Admin area (✅ implemented)
docs/                           # planning.md, sitemap.md, tasks.md, database-schema.md, design.md
prisma/schema.prisma            # 6 models, 5 enums (Account/Session/VerificationToken removed)
```

## Gotchas & known issues

### Prisma v7 (not @prisma/client)
- Generator is `prisma-client` (NOT the old `@prisma/client`).
- Generated client lives at `src/generated/prisma/`. Import from `@/generated/prisma/client`.
- Config file: `prisma.config.ts` (not in `package.json`).
- `postinstall` script runs `prisma generate` automatically.
- **Missing from package.json**: `pg` and `@prisma/adapter-pg` are required by `src/lib/prisma.ts`. Install them if regenerating node_modules.

### Auth
- Import `signIn`, `signOut`, `auth` from `@/auth` (not from `next-auth`).
- Credentials-only login. Role (`CUSTOMER`, `MERCHANT`, `ADMIN`) attached to JWT via `jwt`/`session` callbacks.
- Login page (`/login`) is ✅ functional — uses `useActionState` + `loginUser` server action.
- Proxy exists (`src/proxy.ts` + `src/auth.config.ts`) with role-based route protection.
- PrismaAdapter has been **removed** — not needed for Credentials-only auth with JWT.
- Account/Session/VerificationToken models have been **removed** from schema.

### Previously broken (now fixed)
- ✅ **Merchant registration** — `registerMerchant` action exists in `src/app/actions/auth.ts`.
- ✅ **Merchant sidebar** — links correctly use `/merchant/*` prefix.
- ✅ **Dashboards** — Merchant and Admin dashboards have stats & data tables.
- ✅ **Admin Users** — full user management with soft delete/restore.

### Database
- Database applied via `prisma db push`.
- Seed script exists: `prisma/seed.ts`. Membutuhkan env var `ADMIN_SEED_PASSWORD` (contoh kredensial default: admin@siapsedia.com / sesuai nilai env).

### Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config) |
| `npm run start` | Start production server |
| `npx prisma db push` | Push schema to DB |
| `npx prisma migrate dev --name <name>` | Create migration |
| `npx prisma generate` | Regenerate Prisma client |
| `npx prisma studio` | Open DB browser |

### Style conventions
- Prefer Server Components. Use `"use client"` only when needed (hooks, browser APIs, state).
- Forms use **server actions** (in `src/app/actions/`) with `useActionState` on the client.
- Page files use `page.tsx` naming in App Router segments.
- All naming in komposisi: Indonesian for UI text, English for code identifiers.
- Colors use CSS custom properties (`--background`, `--foreground`) via `@theme inline`.

<!-- BEGIN:model-delegation-workflow -->

## Model Delegation Workflow

Optimize context usage by utilizing Gemini effectively for both coding and research:

### Gemini (Main Agent) — Full Stack Development & Reasoning
- ✏️ Writing, editing, and reviewing code
- 🐛 Debugging and fixing bugs
- 🧠 Deep code review (logic, security, architecture)
- 📐 Architecture decisions
- ✅ Verification (running tests, builds)

### Research Subagent (Gemini) — Reading & Research
- 🔍 Reading and analyzing large or multiple files
- 🔍 Codebase exploration (grep, search)
- 🌐 Web search and documentation lookup
- 📋 Summarizing file contents for the main agent

### Rules
1. **Use Research Subagent** when reading more than 2-3 files to save main agent context.
2. **Subagent returns summaries** — main agent receives condensed info, not raw file contents.
3. **Coding stays on the Main Agent** — never delegate file writes or edits to subagents.
4. **Review workflow**: Subagent reads & summarizes → Main Agent reviews logic, decides, and executes code changes.

<!-- END:model-delegation-workflow -->

<!-- BEGIN:npm-package-management-rules -->

# NPM Package Management

- **NEVER** modify `package.json` directly using text-editing tools (like `replace_file_content` or `write_to_file`) to add, remove, or update dependencies.
- Always use the appropriate NPM terminal commands:
  - To add a package: `npm install <package-name>`
  - To remove a package: `npm uninstall <package-name>`
- **CRITICAL: Wajib Minta Izin!** Agen DILARANG KERAS menjalankan perintah `npm install` atau `npm uninstall` secara otonom/sepihak.
- **Sebelum** menjalankan perintah tersebut, agen WAJIB:
  1. Meminta izin secara eksplisit kepada User.
  2. Memberikan penjelasan/alasan yang sangat jelas MENGAPA paket tersebut perlu diinstal atau dihapus.
  3. Menunggu persetujuan (approval) dari User sebelum mengeksekusinya.
- This ensures `package-lock.json` and the `node_modules` directory remain perfectly synchronized with `package.json`.

<!-- END:npm-package-management-rules -->

<!-- BEGIN:code-modification-rules -->

# Code Modification Workflow

1. **Transparansi Perubahan**: Selalu jelaskan *file* mana yang akan diubah, alasan perubahan tersebut, dan tunjukkan *snippet* atau rencana modifikasinya kepada user.
2. **Perubahan Skala Besar**: Jika tugas mengharuskan perubahan struktur yang masif atau melibatkan banyak *file* sekaligus, **DILARANG** langsung mengeksekusinya. Diskusikan rencana arsitekturalnya terlebih dahulu dan tunggu persetujuan (*approval*) dari user sebelum menulis ke *file*.

<!-- END:code-modification-rules -->

<!-- BEGIN:advanced-agent-rules -->

# Self-Validation & Testing
1. **Wajib Linting**: Setelah membuat perubahan kode yang signifikan, agen HARUS menjalankan `npm run lint` untuk memastikan tidak ada pelanggaran aturan TypeScript/ESLint.
2. **Cek Build**: Sebelum menyatakan suatu fitur "selesai 100%", agen disarankan untuk menjalankan `npm run build` jika dirasa perlu, untuk memastikan tidak ada *error* kompilasi di Next.js.

# Next.js App Router Strict Guidelines
1. **Server by Default**: Jadikan semua komponen sebagai Server Component secara *default*.
2. **Push 'use client' Down**: Hanya tambahkan `"use client"` pada komponen sekecil mungkin yang memang membutuhkan *state* (`useState`), *hooks*, atau *event listeners* (`onClick`). Jangan menaruhnya di *file* *layout* atau *page* utama jika tidak terpaksa.
3. **Data Mutations**: Dilarang membuat rute `/api` untuk mutasi data biasa. WAJIB menggunakan **Server Actions** di dalam direktori `src/app/actions/` yang dipanggil melalui `useActionState` (untuk *form*).

# Security & Environment Variables
1. **No Real Secrets**: JANGAN PERNAH *generate* atau menulis kunci API (*API keys*), *password* DB asli, atau JWT *secret* ke dalam *file* kode sumber.
2. **Gunakan .env**: Jika membutuhkan variabel lingkungan baru, tambahkan contohnya HANYA ke `.env.example` dengan *value* palsu/dummy.

# Code Style Rules
1. **Jangan Hapus Komentar Eksisting**: Jangan menghapus komentar atau dokumentasi kode lama jika tidak berhubungan langsung dengan fitur yang sedang dikerjakan.
2. **Tailwind CSS**: Dilarang menulis gaya CSS kustom (*inline styles*) jika masih bisa diselesaikan menggunakan kelas utilitas bawaan Tailwind v4.

<!-- END:advanced-agent-rules -->
