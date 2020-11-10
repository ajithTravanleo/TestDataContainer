const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const PORT=process.env.port||3401
const Utils=require('./utils/utils')
const app=express()
const appRouter=require('./routes/appRoute')
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// const Container=require('./models').container
// const TestConfig=require('./models').testConfig
// const TestVariant=require('./models').testVariant

// Container.create({
//   name:'Test Container2',
//   userInfo:{
//     userId:'45494646464sdfdsd',
//     userName:'Ajith'
//   }
// }).then(data=>{
//   data.createTestConfig({
//     name:'Test Config',
//     config:{
//       testname:'sample',
//       params:{
//         parms1:'a',
//         parms2:'b',
//       }
//     }
//   }).then(testConfig=>{
//     console.log(testConfig.get())
//    testConfig.createTestVariant({
//       containerId:testConfig.containerId,
//       variant:{test:'data'}
//     }).then(data=>{
//       console.log(data.get())
//       console.log('created!!!')
//     })
//   })
// })
  app.use('/api',appRouter)
  app.get('/',async (req,res,next)=>{
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
