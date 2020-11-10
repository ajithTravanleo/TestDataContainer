const express=require('express')
const router=express.Router()
const appController=require('../controller/appController')

router.get('/getcontainer',appController.getcontainer)
router.post('/createtestdata',appController.ceateTest)
module.exports = router