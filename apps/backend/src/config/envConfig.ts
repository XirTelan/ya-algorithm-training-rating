export default () => ({
  MONGODB_URI: `mongodb://${process.env.MONGO_BACKEND_USERNAME}:${process.env.MONGO_BACKEND_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.MONGO_BACKEND_DATABASE}`,
});
