const mysql = require('mysql2/promise');

const dbConfig = {
host: 'localhost',
user: 'root',
password: 'password',
database: 'project'
};

const ipBlockModel = {
async blockIp(ip) {
const query = 'INSERT INTO blocked_ips (ip) VALUES (?)';
await mysql.createConnection(dbConfig).execute(query, [ip]);
},

async isIpBlocked(ip) {
const query = 'SELECT * FROM blocked_ips WHERE ip = ?';
const [rows] = await mysql.createConnection(dbConfig).execute(query, [ip]);
return rows.length > 0;
}
};

module.exports = ipBlockModel;