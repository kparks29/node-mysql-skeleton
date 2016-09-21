import Query from '../../models/queryModel'
import _ from 'lodash'

const QUERIES = _.map([
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        uuid VARCHAR(36) UNIQUE,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255),
        qr_code VARCHAR(255),
        hashed_password BINARY(60) NOT NULL,
        salt VARCHAR(36),
        created_on DATETIME DEFAULT NOW(),
        PRIMARY KEY (id)
    );`,
    `CREATE TRIGGER before_insert_user
        BEFORE INSERT ON users
        FOR EACH ROW
        SET new.uuid = UUID();`
], (query) => {
    return { sql: query, values: [] };
})



let migration = new Query(...QUERIES)
export default migration
