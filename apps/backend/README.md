# Общее

Стек:
  Fastify,
  Swagger,
  Cheerio,
  Mongoose,
  Pino

Апи так же можно посмотреть в свагере (/documentation) при запуске 

```
pnpm rin i
pnpm run dev
```

# ENV

## общее

Порт на котором запустится сервер
```
SERVER_PORT=
```

## Подключение к бд
```
DATABASE_HOST=
DATABASE_PORT=
MONGO_BACKEND_USERNAME=
MONGO_BACKEND_PASSWORD=
MONGO_BACKEND_DATABASE=
```
сама строка строится как 
```
 `mongodb://${MONGO_BACKEND_USERNAME}:${MONGO_BACKEND_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${MONGO_BACKEND_DATABASE}`;
```


