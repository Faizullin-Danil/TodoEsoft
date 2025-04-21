--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20250417054632_users.js	1	2025-04-21 06:54:06.943+00
2	20250417121816_tasks.js	1	2025-04-21 06:54:06.975+00
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, lastname, patronymic, login, password, role) FROM stdin;
844bf1b6-4edb-4ffe-96e5-dcef34df086a	Алексей	Миров	АЛексеевич	user1	$2b$05$pCCSUf3Kc58oJLx90of6rOA9CiUJmmnG6AssYQK8cIbwxkLDE053a	Пользователь
201e399a-0988-42d6-a594-d4a7be9fbd85	Андрей	Мелов	Максимович	user2	$2b$05$KkC5OaZE0425FRT15X3R5eBBfAGv8A/ZuLuIuZeySMLdkS7ByZDYS	Пользователь
e6d78669-2227-49d6-b752-706bc018605c	Егор	Егоров	Алексеевич	admin111	$2b$05$IYpAbjSY3llPW6KhXh9B5OMu9q83TvAyIw.wUmgbNAV37mLJyNzlK	Руководитель
7e1ca57a-36ae-4250-bd6a-3cb1bebb1f16	Елена	Рябкова	Федоровна	user3	$2b$05$zwku4W5eNmoydQQDRHa.MeOlb.nYNFjlE8NWwivYVdTG.S76Hv5h2	Пользователь
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tasks (id, title, description, due_date, created_date, updated_date, priority, status, creator_id, responsible_id) FROM stdin;
1	задача 1	описание задачи 1	2025-04-23 00:00:00+00	2025-04-21 07:09:44.944+00	2025-04-21 07:09:44.944+00	средний	к выполнению	e6d78669-2227-49d6-b752-706bc018605c	201e399a-0988-42d6-a594-d4a7be9fbd85
2	задача 2	описание задачи 2	2025-04-20 00:00:00+00	2025-04-21 07:10:07.429+00	2025-04-21 07:10:07.429+00	высокий	к выполнению	e6d78669-2227-49d6-b752-706bc018605c	7e1ca57a-36ae-4250-bd6a-3cb1bebb1f16
3	задача 3	описание задачи 3	2025-05-09 00:00:00+00	2025-04-21 07:10:35.65+00	2025-04-21 07:10:35.65+00	высокий	к выполнению	e6d78669-2227-49d6-b752-706bc018605c	7e1ca57a-36ae-4250-bd6a-3cb1bebb1f16
4	задача 4	описание задачи 4	2025-04-23 00:00:00+00	2025-04-21 07:11:17.918+00	2025-04-21 07:11:17.918+00	средний	к выполнению	e6d78669-2227-49d6-b752-706bc018605c	844bf1b6-4edb-4ffe-96e5-dcef34df086a
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 2, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tasks_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

