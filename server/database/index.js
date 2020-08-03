var { Pool } = require('pg');


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/weather-db';
// const SSL = process.env.NODE_ENV === 'production';

 
class Database {
  constructor () {
    this._pool = new Pool({

    
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  }
      // connectionString: CONNECTION_STRING,
      // ssl: SSL,
      // user: 'postgres',
      // database: 'weather-db',
      // host: 'localhost',
      // password: 'Sanman01',
      // port: '5432'
      // user: process.env.POSTGRES_USER,
      // database: process.env.POSTGRES_DATABASE,
      // host: process.env.POSTGRES_HOST,
      // password: process.env.POSTGRES_PASSWORD,
      // port: process.env.POSTGRES_PORT
       
  //   });

  //   this._pool.on('error', (err, client) => {
  //     console.error('Unexpected error on idle PostgreSQL client.', err);
  //     process.exit(-1);
  //   });

  // }

  query (query, ...args) {
    this._pool.connect((err, client, done) => {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: 'Database error.' }, null);
        }
        callback({}, res.rows);
      });
    });

  }

  end () {
    this._pool.end();
  }
}

module.exports = new Database();