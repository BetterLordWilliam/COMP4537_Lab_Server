import mysql from 'mysql2/promise';

export default class DatabaseService {
    constructor(host, user, test) {
        this.host       = host;
        this.user       = user;
        this.database   = test;

        this.pool       = mysql.createPool({
            host: this.host,
            user: this.user,
            database: this.database,
            waitForConnections: true,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        this.getAllPatients = `SELECT * FROM patient`;
    }

    async createConnection() {
        return await mysql.createConnection({
            host: this.host,
            user: this.user,
            database: this.database
        });
    }

    async dbGetAllPatients() {
        const [ results ]   = await this.pool.query(this.getAllPatients);

        console.log(results);
    }
}