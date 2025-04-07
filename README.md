# Яндекс контест лидерборд
> [!Note]
> Проект в работе. Документация не полная 


## Общее

Скраппер/парсер собирает участников в одну таблицу с нескольних контестов. Плюс немного статитстики

![image](https://github.com/user-attachments/assets/2e6e732d-0f61-4b60-a177-0b7c20ae4b25)


## Содержимое

Общий стек: TS, React, Node (Fastify), MongoDb, Tailwind CSS

Монорепо:
1. **apps**:

   - `frontend`: Клиентская часть с самой таблицей и статистикой
   - `backend`:  кхм.. бекэнд . 
   - `backend-gui`: Клиент для бека. Настройка контестов

2. **packages**:
   - `ui` Общие ui компоненты для frontend и backend-gui (shadncn/ui)


Подробноее описания для каждого приложения

[Frontend](./apps/frontend/)
[Backend](./apps/backend/)
[Backend-gui](./apps/backend-gui/)


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

Либо вручную заходя в соотв папку
```
cd app/backend
pnpm run dev
```

### Docker
> [!WARNING]
> docker-compose не полностю настроен

./mongo-init.js

Файл конфига для монго при старте. Создает пользователя через которого бек будет подключаться.

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
MONGO_BACKEND_USERNAME=
MONGO_BACKEND_PASSWORD=
MONGO_BACKEND_DATABASE=
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
SERVER_PORT=
```

Для mongo-express

```
ME_CONFIG_MONGODB_ADMINUSERNAME=
ME_CONFIG_MONGODB_ADMINPASSWORD=
ME_CONFIG_MONGODB_URL=
```


старый вариант с 
