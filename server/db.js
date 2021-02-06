const pg = require('pg');
const Pool = pg.Pool;

//creating a new pool of connections

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'perntodos',
});

module.exports = pool;
