
const {Router} = require('express')
const viewControllers = require('../controller/views.controller')

const router = Router();

router.get('/', viewControllers.views)
router.get('/realtimeproducts/', viewControllers.realTimeProduct)
router.delete('/realtimeproducts/:pid', viewControllers.deleteRealTimeProduct)
router.post('/realtimeproducts/', viewControllers.addRealTimeProduct)
router.get('/chats', viewControllers.renderChats)


module.exports = router;