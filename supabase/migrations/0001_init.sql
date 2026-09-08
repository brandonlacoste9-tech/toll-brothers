create table if not exists communities (
  slug text primary key,
  name text not null,
  city text not null,
  state text not null,
  region text not null,
  kind text not null,
  home_type text not null,
  price_from integer,
  price_to integer,
  sqft_from integer,
  sqft_to integer,
  style text not null,
  image text not null,
  blurb text not null,
  address text,
  school text,
  live_url text not null,
  advisor_phone text not null,
  advisor_href text not null,
  advisor_label text not null
);

create table if not exists plans (
  slug text primary key,
  community_slug text not null references communities (slug),
  name text not null,
  collection text not null,
  beds text not null,
  baths text not null,
  half_baths text not null,
  garage text not null,
  sqft integer not null,
  stories text not null,
  price_from integer,
  style text not null,
  image text not null,
  blurb text not null,
  highlights text not null,
  live_url text not null
);

create table if not exists homes (
  slug text primary key,
  community_slug text not null references communities (slug),
  plan_slug text,
  name text not null,
  status text not null,
  address text not null,
  beds integer not null,
  baths integer not null,
  half_baths integer not null,
  garage integer not null,
  sqft integer not null,
  stories integer not null,
  price integer not null,
  style text not null,
  elevation text not null,
  image text not null,
  move_date text,
  tags text not null,
  live_url text not null
);

create table if not exists collections (
  slug text primary key,
  name text not null,
  tags text not null,
  image text not null,
  blurb text not null
);

create table if not exists inquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  region text not null,
  interest text not null,
  community_slug text,
  home_slug text,
  message text,
  created_at timestamptz not null default now(),
  routed_phone text not null,
  live_url text not null,
  stored boolean not null default true
);

alter table communities enable row level security;
alter table plans enable row level security;
alter table homes enable row level security;
alter table collections enable row level security;
alter table inquiries enable row level security;

create policy "public read communities" on communities for select to anon using (true);
create policy "public read plans" on plans for select to anon using (true);
create policy "public read homes" on homes for select to anon using (true);
create policy "public read collections" on collections for select to anon using (true);
