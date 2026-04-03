# Todo App

A full-stack personal task manager built with Next.js 16 and Supabase.

## Setup

### 1. Supabase project

Create a project at [supabase.com](https://supabase.com), then run this SQL in the SQL editor:

```sql
create table todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  is_complete boolean not null default false,
  created_at timestamptz not null default now()
);

alter table todos enable row level security;

create policy "Users can manage their own todos"
  on todos
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests

```bash
npm run test          # unit tests
npm run test:e2e      # Playwright E2E (requires dev server + real Supabase credentials)
```
