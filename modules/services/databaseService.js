import mysql from 'mysql2/promise';

export default class DatabaseService {
    constructor(host, user, password, database) {
        this.host       = host;
        this.user       = user;
        this.password   = password;
        this.database   = database;

        this.pool       = mysql.createPool({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            namedPlaceholders: true,
            waitForConnections: true,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        this.getAllPatients = 'SELECT * FROM patient';
        this.getPatientById = 'SELECT * FROM patient WHERE id = :id';
        this.insertPatient  = 'INSERT INTO patient VALUES ( :id, :name, :dateOfBirth )';
    }

    async createConnection() {
        return await mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    }

    async dbGetAllPatients() {
        const [ results ] = await this.pool.execute(this.getAllPatients);
        return results;
    }

    async dbGetPatientById(id) {
        const [ results ] = await this.pool.execute(
            this.getPatientById,
            { id: id }
        );
        return results;
    }

    async dbInsertNewPatient(id, name, dateOfBirth) {
        let date    = new Date(dateOfBirth);
        let fdate   = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;

        const [ results ] = await this.pool.execute(
            this.insertPatient,
            { id: id, name: name, dateOfBirth: fdate }
        );
        return results;
    }

    async dbExecuteQuery(queryString) {
        const [ results ] = await this.pool.execute(
            queryString
        );

        return results;
    }
}