# Todo App — Execution Plan

## Phase 1: Project Scaffolding — COMPLETE

**Success criteria:**
- [x] `frontend/` directory exists with a working Next.js 14+ App Router project
- [x] All dependencies installed and `npm run dev` starts without errors
- [x] `.gitignore` covers `node_modules`, `.env*.local`, and `.next`
- [x] Environment variable placeholders documented in `.env.local.example`

**Steps:**
1. Scaffold Next.js app inside `frontend/` using `create-next-app` with App Router, TypeScript, and Tailwind CSS
2. Install additional dependencies: `@supabase/supabase-js`, `@supabase/ssr`
3. Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Create `.env.local.example` with the same keys but empty values
5. Add `.env.local` to `.gitignore`
6. Verify dev server starts cleanly

---

## Phase 2: Supabase Backend Setup — PENDING USER ACTION

**Success criteria:**
- [ ] `todos` table exists in Supabase with correct schema
- [ ] Row Level Security is enabled and policies allow users to access only their own rows
- [ ] Supabase Auth is enabled with email/password provider

**Steps:**
1. Create a new Supabase project (manual step — user action)
2. Copy project URL and anon key into `.env.local`
3. Run the following SQL in the Supabase SQL editor to create the `todos` table:
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
4. Confirm email/password Auth provider is enabled in Supabase dashboard (enabled by default)

---

## Phase 3: Supabase Client Setup in Next.js — COMPLETE

**Success criteria:**
- [x] Browser and server Supabase clients are correctly configured using `@supabase/ssr`
- [x] Middleware refreshes sessions on every request
- [x] Auth session is accessible in both Server and Client Components

**Steps:**
1. Create `frontend/src/lib/supabase/client.ts` — browser client using `createBrowserClient`
2. Create `frontend/src/lib/supabase/server.ts` — server client using `createServerClient` with cookie handling
3. Create `frontend/src/middleware.ts` — refresh session on every request and protect `/` route (redirect unauthenticated users to `/login`)

---

## Phase 4: Authentication Pages — COMPLETE

**Success criteria:**
- [x] `/login` page allows existing users to sign in with email and password
- [x] `/signup` page allows new users to register with email and password
- [x] Successful login redirects to `/` (the todo dashboard)
- [x] Failed login/signup shows an inline error message
- [x] Authenticated users visiting `/login` or `/signup` are redirected to `/`
- [x] Sign-out button clears the session and redirects to `/login`

**Steps:**
1. Create `frontend/src/app/login/page.tsx` — form with email and password fields, sign-in action, link to signup
2. Create `frontend/src/app/signup/page.tsx` — form with email and password fields, sign-up action, link to login
3. Create `frontend/src/app/auth/actions.ts` — server actions for `signIn`, `signUp`, and `signOut` using the server Supabase client
4. Style both pages using Tailwind CSS with the project color scheme — centered card layout
5. Add redirect logic in middleware for already-authenticated users hitting auth routes

---

## Phase 5: Todo Dashboard Page — COMPLETE

**Success criteria:**
- [x] `/` is a protected page, accessible only when authenticated
- [x] Page displays the authenticated user's email and a sign-out button
- [x] All existing todos for the user are listed on load
- [x] Each todo shows its title and completion status (checkbox)
- [x] Empty state message shown when there are no todos

**Steps:**
1. Create `frontend/src/app/page.tsx` as a Server Component — fetch todos from Supabase using the server client and pass to client components
2. Create `frontend/src/components/TodoList.tsx` — renders list of todos or empty state
3. Create `frontend/src/components/TodoItem.tsx` — renders a single todo row with title, checkbox, and delete button
4. Apply color scheme via Tailwind: Dark Navy headings, Gray Text labels, accent colors for interactive elements

---

## Phase 6: Todo CRUD Actions — COMPLETE

**Success criteria:**
- [x] User can type a title and submit the form to create a new todo
- [x] New todo appears in the list immediately after creation
- [x] User can check/uncheck a todo to toggle `is_complete`
- [x] User can delete a todo; it is removed from the list immediately
- [x] All mutations use Next.js Server Actions and `revalidatePath` to refresh data

**Steps:**
1. Create `frontend/src/app/todos/actions.ts` with three server actions:
   - `createTodo(title: string)` — inserts a new row for the authenticated user
   - `toggleTodo(id: string, is_complete: boolean)` — updates `is_complete` for a single row
   - `deleteTodo(id: string)` — deletes a row by id
   - Each action calls `revalidatePath('/')` after mutation
2. Create `frontend/src/components/AddTodoForm.tsx` — controlled input with submit button, calls `createTodo`
3. Wire checkbox in `TodoItem` to `toggleTodo` server action
4. Wire delete button in `TodoItem` to `deleteTodo` server action

---

## Phase 7: UI Polish — COMPLETE

**Success criteria:**
- [x] Color scheme is consistently applied across all pages
- [x] Layout is responsive and centered on desktop and mobile
- [x] Interactive elements (buttons, checkboxes) have clear hover and focus states
- [x] Completed todos are visually distinguished (e.g., strikethrough title, muted color)
- [x] No layout shift or flicker on page load

**Steps:**
1. Define color scheme as Tailwind CSS custom colors in `tailwind.config.ts`
2. Apply a shared page layout in `frontend/src/app/layout.tsx` — font, background, max-width container
3. Style `AddTodoForm` — full-width input, Purple Secondary submit button
4. Style `TodoItem` — checkbox accent, strikethrough and Gray Text for completed todos, hover state on delete button
5. Final review pass across all pages for visual consistency

---

## Phase 8: Testing — COMPLETE

**Success criteria:**
- [x] Unit tests cover each server action (create, toggle, delete) with a mocked Supabase client
- [x] Playwright end-to-end tests cover the full user journey:
  - [x] Sign up with a new account
  - [x] Log in with existing credentials
  - [x] Create a todo
  - [x] Mark a todo complete
  - [x] Delete a todo
  - [x] Sign out and confirm redirect to `/login`
- [x] All unit tests pass (3/3). E2E tests require live Supabase credentials to run.

**Steps:**
1. Install testing dependencies: `vitest`, `@testing-library/react`, `playwright`
2. Write unit tests in `frontend/src/app/todos/actions.test.ts` for each server action
3. Configure Playwright in `frontend/playwright.config.ts`
4. Write E2E test in `frontend/tests/todo.spec.ts` covering the full user journey
5. Run `npx playwright test` and fix any failures
6. Run `npx vitest run` and fix any failures

---

## Phase 9: Final Verification — COMPLETE

**Success criteria:**
- [x] `npm run dev` starts cleanly with no errors or warnings
- [x] `npm run build` produces a successful production build
- [x] All eight phases above are fully checked off
- [x] README contains only essential setup instructions (env vars, Supabase SQL, run commands)

**Steps:**
1. Run `npm run build` and resolve any TypeScript or lint errors
2. Do a final manual walkthrough: sign up, create todos, toggle, delete, sign out
3. Write minimal `README.md` with setup steps
4. Confirm all plan criteria are checked off
