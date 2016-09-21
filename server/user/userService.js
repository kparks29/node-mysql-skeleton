import Service from '../models/serviceModel'
import UserRepo from './userRepo'
import bcrypt from 'bcrypt-nodejs'

export default class UserService extends Service {
  constructor () {
    super()

    this.UserRepo = new UserRepo()
    this.bcrypt = bcrypt
  }

  createUser (user) {
      if (!user.password) {
          return this.promise.reject('Missing password')
      }
      if (!user.username) {
          return this.promise.reject('Missing username')
      }
      if (!user.email) {
          return this.promise.reject('Missing email')
      }

      return this.UserRepo.createUser(user).then(() => {
          return this.promise.resolve('Successfully created user')
      }).catch(() => {
          return this.promise.reject('Could not create user')
      })
  }

  login (data) {
    if (data && data.email && data.password) {
      return this.UserRepo.getUserByEmail(data.email).then((user) => {
        if (!user || user.length === 0) {
          return this.promise.reject('Incorrect Email or Password')
        }
        try {
          if (this.bcrypt.compareSync(data.password, user[0].hashed_password.toString())) {
            let response = user[0]
            delete response.salt
            delete response.hashed_password
            response.token = this.jwt.sign(response, process.env['VRS_SECRETKEY'], {expiresIn: "24h"})
            response.id = response.uuid
            delete response.uuid
            return this.promise.resolve(response)
          } else {
            return this.promise.reject('Incorrect Email or Password')
          }
        } catch (err) {
          return this.promise.reject('Failed to Login')
        }
      }).catch((err) => {
        if (err === 'Incorrect Email or Password') {
          return this.promise.reject(err)
        }
        return this.promise.reject('Failed to Login')
      })
    } else {
      return this.promise.reject('Missing Login Information')
    }
  }
}
