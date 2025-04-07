# Общее

Стек:
  Fastify,
  Swagger,
  Cheerio,
  Mongoose,
  Pino

Апи так же можно посмотреть в свагере (/documentation) при запуске 

```
pnpm rгn i
pnpm run dev
```

# Структура

- `controllers`: собственно контреллоеры, обработка запросов, отправка ответа
- `models`: модели бд (mongoDb)
- `lib`:  подключение к бд и логика парсера
- `plugins`: конфига к плагинам fastify - свагер, env, логгер
- `routes`: определение  эндпоинты +  схема + контроллер
- `schemas`: схемы эдпоинтов / свагера которые  больше пары строк,  чтобы не держать их напрямую в `routes`  
- `services`: собственно бизнес логика и взаимодействие с бд.
- `tasks`: задачи - обновление контестов

# ENV

## общее

Порт на котором запустится сервер
```
SERVER_PORT=3000
SERVER_HOST=0.0.0.0
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


