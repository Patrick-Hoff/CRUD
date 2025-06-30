import mysql from 'mysql2'

export const db = mysql.createConnection({
  host: 'trolley.proxy.rlwy.net',
  port: 56642,
  user: 'root',
  password: 'uuTbLRDkPpAiCGwesBMrUEAqITPQoTCN', // certinha agora
  database: 'railway'
});

// export const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password:'',    
//     database: 'crud'
// })