create table profiles (
  id uuid primary key references auth.users(id),
  username text,
  avatar_url text,
  created_at timestamp default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  content text,
  image_url text,
  created_at timestamp default now()
);
