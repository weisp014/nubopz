const pg = require('pg');
let pool;

// When the app is deployed on the internet
// use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
// DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on personal computer
// connect to the postgres database that is 
// also running on local machine (localhost)
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'nubopz',
    });
}

module.exports = pool;
