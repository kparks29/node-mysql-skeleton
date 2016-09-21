import userQueries from './userQueries'
import Query from '../models/queryModel'
import bcrypt from 'bcrypt-nodejs'

export default class UserRepo {
  constructor () {
    this.userQueries = userQueries
    this.Query = Query
    this.bcrypt = bcrypt

  }

  createUser (user) {
    user.salt = this.bcrypt.genSaltSync(),
    user['hashed_password'] = this.bcrypt.hashSync(user.password, user.salt)
    delete user.password;
    let query = {
      sql: this.userQueries.createUser,
      values: [ user ]
    }
    return new this.Query(query)
  }

  getUserByEmail (email) {
      let query = {
        sql: this.userQueries.getUserByEmail,
        values: [ user ]
      }
      return new this.Query(query)
  }

}
