-- Support requests submitted from the landing page (/support).
-- Run once in the Supabase SQL editor.
-- Anon key may insert only; reading requires the service role (or the dashboard).

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  title text not null,
  details text not null,
  source text not null default 'landing:support',
  status text not null default 'open',
  created_at timestamptz not null default now()
);

alter table public.support_requests enable row level security;

create policy "anon can insert support requests"
  on public.support_requests
  for insert
  to anon
  with check (true);
