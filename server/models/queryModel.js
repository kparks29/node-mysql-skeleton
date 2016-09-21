import mysql from 'mysql'
import Promise from 'promise'
import '../environmentSetup'

export default class Query {
  constructor (...queries) {
    this.queries = queries
    return this.setupConnection().then(() => {
      return this.runQueries()
    }).then((results) => {
      return this.commitTransaction(results)
    })
  }

  runQueries () {
    let promises = []
    for (let query of this.queries) {
      promises.push(this.runQuery(query.sql, query.values))
    }
    return Promise.all(promises)
  }

  runQuery (query, values) {
    return new Promise((resolve, reject) => {
      let options = {
        sql: query,
        values: values,
        typeCast: this.convertToBoolean
      }
      this.connection.query(options, (err, result) => {
        if (err) {
          return this.connection.rollback(() => {
            reject(err)
          })
        }
        resolve(result)
      })
    })
  }

  convertToBoolean (field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      return (field.string() === '1')
    }
    return next()
  }

  commitTransaction (results) {
    return new Promise((resolve, reject) => {
      this.connection.commit((err) => {
        if (err) {
          return this.connection.rollback(() => {
            reject(err)
          })
        }
        resolve(results)
        this.connection.end()
      })
    })
  }

  setupConnection () {
    this.connection = mysql.createConnection({
      host: process.env['VRS_HOST'] || '',
      user: process.env['VRS_USER'] || '',
      password: process.env['VRS_PASSWORD'] || '',
      database: process.env['VRS_DATABASE'] || '',
      port: process.env['VRS_PORT'] || ''
    })
    this.connection.connect()
    return new Promise((resolve, reject) => {
      this.connection.beginTransaction((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }
}
