const {Router} = require('express')
const controller = require('../controller/controller')
let route = Router()

route.get('/', controller.get_home)
route.get('/register', controller.get_register)
route.post('/register', controller.post_register)

route.get('/user/:id', controller.get_user)
route.patch('/user/:id', controller.patch_user)
route.get('/user-detail/:id', controller.get_user_detail)

route.get('/log-in', controller.get_log_in)
route.post('/log-in', controller.post_log_in)

route.get('/admin', controller.get_admin)

module.exports = route