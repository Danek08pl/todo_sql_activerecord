import * as mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'todoDD',
    namedPlaceholders: true,
    decimalNumbers: true

});