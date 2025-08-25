require("dotenv/config");

module.exports = {
  service: {
    endpoint: {
      url: process.env.NEXT_PUBLIC_SERVICE_URL,
      skipSSLValidation: true,
    },
  },
};
