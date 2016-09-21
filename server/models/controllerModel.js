import express from 'express'
import jwt from 'jsonwebtoken'
import AclController from '../acl/aclController'

export default class Controller {
  constructor () {
    this.privateRouter = express.Router()
    this.verifyToken = this.verifyToken.bind(this)
    this.AclController = new AclController()
  }

  get router () {
    return this.privateRouter
  }

  verifyToken (req, res, next) {
    try {
      req.user = jwt.verify(req.headers['access-token'], process.env['VRS_SECRETKEY'])
      next()
    } catch (err) {
      return res.status(401).send('Invalid Token.')
    }
  }
}
