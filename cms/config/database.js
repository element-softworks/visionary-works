const path = require("path");

module.exports = ({ env }) => {
  console.log(env("DATABASE_URL"))

  const parse = require("pg-connection-string").parse;
  const config = parse(env("DATABASE_URL"));

  console.log({ config });

  return {
    connection: {
      client: "postgres",
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false
        }
      },
      debug: false
    }
  }
};
