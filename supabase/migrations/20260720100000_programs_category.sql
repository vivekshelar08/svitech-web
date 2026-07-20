-- Add filterable category for programmes (Viswa-style sidebar filters)
alter table public.programs
  add column if not exists category text;

update public.programs
set category = case
  when slug in (
    'financial-digital-inclusion',
    'digital-skills-training',
    'digital-financial-literacy',
    'digital-service-camps'
  ) then 'digital'
  when slug in ('educational-support-schools') then 'education'
  when slug in ('health-welfare-facilitation') then 'health'
  when slug in ('women-empowerment') then 'women'
  when slug in ('road-safety-awareness', 'corporate-csr-engagement') then 'csr'
  else 'community'
end
where category is null or category = '';
