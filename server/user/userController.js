import Controller from '../models/controllerModel'
import UserService from './userService'

export default class UserController extends Controller {
  constructor () {
    super();
    this.UserService = new UserService()

    this.createUser = this.createUser.bind(this)
    this.login = this.login.bind(this)

    this.router.use(this.verifyToken)
    this.router.post('', this.createUser)
    this.router.post('/login', this.login)
  }

  createUser (req, res) {
    let pass = req.body.password
    this.UserService.createUser(req.body).then((success) => {
      res.status(200).send(success)
    }).catch((error) => {
      res.status(400).send(error)
    })
  }

  login (req, res) {
    this.UserService.login(req.body).then((success) => {
      res.status(201).send(success)
    }).catch((error) => {
      res.status(400).send(error)
    })
  }

}
