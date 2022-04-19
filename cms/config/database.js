const path = require("path");
const fs = require("fs");

module.exports = ({ env }) => {
  console.log("DB", env("DATABASE_URL"));

  const parse = require("pg-connection-string").parse;
  const config = parse(env("DATABASE_URL"));

  const connection = {
    connection: {
      client: "postgres",
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: false
      },
      debug: true
    }
  };
  console.log({ connection: connection.connection });

  return connection;
};
