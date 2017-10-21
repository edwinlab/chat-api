module.exports = () => {
  // Default to dev presets
  const dbConfig = {
    url: 'mongodb://localhost:27017/dev',
    opts: {
      useMongoClient: true,
      autoReconnect: true,
      keepAlive: 300000,
    },
  };

  switch (process.env.NODE_ENV) {
    case 'production':
      dbConfig.url = process.env.MONGODB_URL;
      break;
    case 'stage':
      break;
    case 'dev':
    default:
      break;
  }

  return dbConfig;
};
