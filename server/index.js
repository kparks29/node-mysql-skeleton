import express from 'express'
import bodyParser from 'body-parser'
import UserController from './user/userController'

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Token')
  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  }
  else {
    next()
  }
})

app.use('/users', new UserController().router)

// launch server
app.listen(8081, () => {
  console.log('Server listening on port 8081')
})

export default app
