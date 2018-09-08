import { DataConfig } from '../config/data.config';
import * as mysql from 'mysql';

export class DbContext {
    private conn: mysql.Connection

    constructor() {
        this.conn = mysql.createConnection(new DataConfig());
    }

    connect() {
        this.conn.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + this.conn.threadId);
        });
    }

    endConnection() {
        this.conn.end();
        console.log('connection end');
    }

    getConnectionProperty() {
        return this.conn;
    }
}



/* if connected user doesn't work try to execute
  ALTER USER 'user'@'server' IDENTIFIED WITH mysql_native_password BY 'password'

*/