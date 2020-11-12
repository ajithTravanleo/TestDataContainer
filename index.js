const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const PORT=process.env.port||3401
const Utils=require('./utils/utils')
const app=express()
const appRouter=require('./routes/appRoute')
app.use(cors())
const multer=require('multer')
const upload=multer()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(upload.array())
require('dotenv').config()

  app.use('/api',appRouter)
  app.get('/',async (req,res,next)=>{
    //console.log(req.body)
    res.send('welcome')
    // try {
    //     const data=Utils.getParamsFromJson()
    //     await data.then(testData=>{
    //         res.send(testData)
    //     })
       
    //   } catch (error) {
      
    //   }
  })
 
app.listen(PORT,function(){
    console.log("server running at port :"+ PORT)
})
