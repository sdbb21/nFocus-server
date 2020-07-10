require("dotenv").config();

console.log("PROCESS LOG:", process.env.DATABASE_DEV);

module.exports = {
  development: {
    url: process.env.DATABASE_DEV,
    dialect: "postgres",
    operatorsAliases: "0",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    url: process.env.DATABASE_DEV,
    dialect: "postgres",
    operatorsAliases: "0",
    use_env_variable: "DATABASE_DEV",
  },
};
