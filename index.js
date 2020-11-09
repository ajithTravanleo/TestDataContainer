const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const PORT=process.env.port||3401
const Utils=require('./utils/utils')
const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

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
//    // console.log(response)
//    testConfig.createTestVariant({
//       variant:{test:'data'}
//     }).then(console.log('created!!!'))
//   })
// })

  app.get('/',async (req,res,next)=>{
    try {
        const data=Utils.getParamsFromJson()
        await data.then(testData=>{
            res.send(testData)
        })
       
      } catch (error) {
      
      }
  })
 
app.listen(PORT,function(){
    console.log("server running at port :"+ PORT)
})
