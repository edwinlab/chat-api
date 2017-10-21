module.exports = () => {
  const serverConfig = {
    port: process.env.PORT || 3000,
  };

  switch (process.env.NODE_ENV) {
    case 'production':
      break;
    case 'stage':
      break;
    case 'dev':
    default:
      break;
  }

  return serverConfig;
};
