import { Pool } from "pg";

const pool = new Pool({
    user: "webserver",
    host: "localhost",
    database: "berintmoffettcom",
    password: "johnnytasty^",
    port: 5432,
});

export default { pool };
