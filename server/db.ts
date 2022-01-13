import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: "webserver",
    host: "localhost",
    database: "berintmoffettcom",
    password: "johnnytasty^",
    port: 5432,
});

export { pool };
