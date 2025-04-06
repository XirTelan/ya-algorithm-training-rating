print("Running mongo-init.js...");

const dbName = `${process.env.MONGO_BACKEND_DATABASE}`;

const db = db.getSiblingDB(dbName);

const createResult = db.createUser({
  user: process.env.MONGO_BACKEND_USERNAME,
  pwd: process.env.MONGO_BACKEND_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_BACKEND_DATABASE,
    },
  ],
});
printjson({ createResult });

print("mongo-init.js done.");
