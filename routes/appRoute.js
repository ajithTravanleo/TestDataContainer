const express=require('express')
const router=express.Router()
const appController=require('../controller/appController')

router.get('/getcontainertests/:id/:userId',appController.getcontainertests)
router.get('/gettestconfig/:id',appController.gettestconfig)
router.post('/createtestdata',appController.ceateTest)
module.exports = router