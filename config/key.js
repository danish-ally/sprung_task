module.exports = {
  port: process.env.PORT || 5000,

  jwt: {
    accessSecret: process.env.JWT_SECRET_ACCESS,
    accessTokenLife: "7d",
  },
};
