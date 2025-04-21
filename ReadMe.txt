1. прописать в корне проекта   docker-compose up --build

2.  прописать в корне проекта:
    docker cp ./data_dump.sql todoesoft-db-1:/tmp/data_dump.sql
    docker exec -i todoesoft-db-1 psql -U postgres -d todo -f /tmp/data_dump.sql

в дампе лежат данные из бд

для входа под админом:
login: admin111
password: admin111

остальные пользователи:
login: user1, user2, user3
password: password

для подключения к бд в докере через pgadmin:
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
POSTGRES_DB: todo