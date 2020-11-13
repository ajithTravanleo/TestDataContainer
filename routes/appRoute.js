const express=require('express')
const router=express.Router()
const appController=require('../controller/appController')
router.get('/getcontainertests/:id/:userId',appController.getcontainertests)
router.get('/gettestconfig/:id',appController.gettestconfig)
router.get('/getcontainerdata/:id',appController.getcontainerdata)

router.post('/createtestdata',appController.ceateTest)
router.put('/updatetestconfig/:id',appController.updatetestconfig)
router.get('/clearvariants',appController.clearvariants)
module.exports = router