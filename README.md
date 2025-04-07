# Яндекс контест лидерборд

## Оглавление

1. [Общее](#Общее)
2. [Содержимое](#Содержимое)
   - [Frontend](./apps/frontend/)
   - [Backend](./apps/backend/)
   - [Backend-gui](./apps/backend-gui/)
4. [Установка](#Установка)
   - [Обычный способ](#Обычный-способ)
   - [Docker](#Docker)
   - [Env](#Env)


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
   - `ui`: Общие ui компоненты для frontend и backend-gui (shadncn/ui)
  
3. **configs**:
   - `mongo-init.js`: файл конфига первоначальной настройки для монго. Создает пользователя через которого бек будет подключаться.
   - `nginx`: конфиг reverse-proxy
      перенаправляет запросы /api в бек контейнер и /gui в приложение backend-gui
     
 > [!IMPORTANT]
 > `mongo-init.js` запускается только при первом запуске. Если забыли env файл то перезапустив контейнер он не сработает. Нужно будет очистить 'volume' 

     


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

`docker-compose.yaml` - основной файл
`docker-compose.dev.yaml` - упрощенный файл только с монго и монго экспресс. Можно поднять локально все/необходимые приложения через `pnpm` + монго через этот файл как dev среда 

сразу все запустить
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

для запуска через докер `.env` должен быть в руте. 

Для запуска локально через `pnpm run dev` env должен быть в apps/backend



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
SERVER_HOST= 
```

Для mongo-express

`ME_WEB_USERNAME` и `ME_WEB_PASSWORD`  для аунтефикации через веб интерфейс

```
ME_CONFIG_MONGODB_ADMINUSERNAME=
ME_CONFIG_MONGODB_ADMINPASSWORD=
ME_CONFIG_MONGODB_URL=
ME_WEB_USERNAME=
ME_WEB_PASSWORD=
```


