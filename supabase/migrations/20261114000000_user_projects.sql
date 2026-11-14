-- Schema the app expects for saved projects (src/services/dataService.ts).
-- Review against the deployed database before applying: this repository did
-- not previously track migrations, so the live table may already exist.
create table if not exists public.user_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  file_name text not null,
  file_size bigint not null check (file_size >= 0),
  status text not null default 'processing' check (status in ('processing', 'completed', 'failed')),
  slides_count integer not null default 0 check (slides_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_projects_user_id_updated_at_idx
  on public.user_projects (user_id, updated_at desc);

alter table public.user_projects enable row level security;

-- Each signed-in user can see and change only their own projects.
drop policy if exists "Own projects: select" on public.user_projects;
create policy "Own projects: select" on public.user_projects
  for select using (auth.uid() = user_id);
drop policy if exists "Own projects: insert" on public.user_projects;
create policy "Own projects: insert" on public.user_projects
  for insert with check (auth.uid() = user_id);
drop policy if exists "Own projects: update" on public.user_projects;
create policy "Own projects: update" on public.user_projects
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Own projects: delete" on public.user_projects;
create policy "Own projects: delete" on public.user_projects
  for delete using (auth.uid() = user_id);
