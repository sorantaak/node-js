import pg from "pg";

const pool = new pg.Pool({
  database: "testdb",
  user: "postgres",
  password: "Reactjs@#2026",
});

export function query(text, params) {
  return pool.query(text, params);
}
