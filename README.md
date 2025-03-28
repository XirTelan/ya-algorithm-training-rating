# Яндекс контест лидерборд
> [!Note]
> Проект в работе. Документация не полная 


## Общее

Скраппер/парсер собирает участников в одну таблицу с нескольних контестов. Плюс немного статитстики

## Содержимое

Общий стек: TS, React, Node (Fastify), MongoDb, Tailwind CSS

Монорепо:
1. **apps**:

   - `frontend`: Клиентская часть с самой таблицей и статистикой
   - `backend`:
   - `backend-gui`: Клиент

2. **packages**:
   - `ui` Общие ui компоненты для frontend и backend-gui (shadncn/ui)


Подробноее описания для каждого приложения

[Frontend](./apps/frontend/README.MD)
[Backend](./apps/backend/README.MD)
[Backend-gui](./apps/backend-gui/README.MD)


## Установка

### Обычный способ

Установка зависимостей. Запуск из рута монорепо. Установит зависимости для всех пакетов.

```
pnpm i
```

Запуск всех приложений (также из рута). Используется `turborepo`

```
pnpm run dev
```

Для запуска по отдельности либо запускать команду находясь в соотв папке либо через `--filter`

Пример запуск только бека

```
pnpm run dev --filter=@yatr/backend
```

### Docker

сразу все запустить можно через `docker-compose`

```
docker-compose up
```

так же можно запустить по отдельности.

> [!IMPORTANT]  
> Для frontend and backend-gui запускать билд из рута монорепо с передачей контекста `.` т.к им необходимо иметь доступ к `@repo/ui`

```
docker build -t front-image -f ./apps/frontend/dockerfile .
```

### Env

```
DATABASE_HOST=
DATABASE_PORT=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
SERVER_HOST=
SERVER_PORT=
```

Для mongo-express

```
ME_CONFIG_MONGODB_ADMINUSERNAME=
ME_CONFIG_MONGODB_ADMINPASSWORD=
ME_CONFIG_MONGODB_URL=
```


старый вариант с 
