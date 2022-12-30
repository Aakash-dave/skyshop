const { Client } = require('pg');

const client$ = new Client ({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    password: 'Postgre123',
    database: 'postgres'
})

// client$.connect();

// client$.query(`SELECT * FROM products`,(resolve, error) => {
//     if (resolve) (console.log(resolve.rows));

//     else (console.log(error));

//     client$.end;
// })


module.exports = client$;