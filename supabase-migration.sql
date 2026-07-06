-- Rodar no SQL Editor do projeto Supabase do Vicente (cerebro-voz).
-- Cria a tabela de progresso do curso de espanhol + o RPC do painel admin.

create table if not exists public.espanhol_progress (
  learner_id    uuid not null references auth.users(id) on delete cascade,
  module_id     text not null,
  progress      jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now(),
  primary key (learner_id, module_id)
);

alter table public.espanhol_progress enable row level security;

drop policy if exists "learner reads own progress" on public.espanhol_progress;
create policy "learner reads own progress"
  on public.espanhol_progress for select using (auth.uid() = learner_id);

drop policy if exists "learner upserts own progress" on public.espanhol_progress;
create policy "learner upserts own progress"
  on public.espanhol_progress for insert with check (auth.uid() = learner_id);

drop policy if exists "learner updates own progress" on public.espanhol_progress;
create policy "learner updates own progress"
  on public.espanhol_progress for update using (auth.uid() = learner_id);

drop policy if exists "learner deletes own progress" on public.espanhol_progress;
create policy "learner deletes own progress"
  on public.espanhol_progress for delete using (auth.uid() = learner_id);

-- RPC pro painel admin: só libera dados se quem chama for thiagogeib@gmail.com.
-- security definer permite ler auth.users (a API pública normalmente não expõe essa tabela).
create or replace function public.espanhol_admin_overview()
returns table (
  learner_id uuid,
  nome text,
  email text,
  ultimo_acesso timestamptz,
  module_id text,
  progress jsonb
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.email() is distinct from 'thiagogeib@gmail.com' then
    raise exception 'não autorizado';
  end if;

  return query
    select u.id, u.raw_user_meta_data->>'nome', u.email, u.last_sign_in_at,
           p.module_id, p.progress
    from auth.users u
    left join public.espanhol_progress p on p.learner_id = u.id
    order by u.last_sign_in_at desc nulls last;
end;
$$;
