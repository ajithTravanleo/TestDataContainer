
const Container=require('../models').container
const TestConfig=require('../models').testConfig
const TestVariant=require('../models').testVariant


exports.getcontainertests=async(req,res,next)=>{
    console.log(req.params)
    try{
        Container.findOne({
            where:{cntId:[`${req.params.id}`]},
            attributes: {include:['id']}
        }).then(container=> {
            if(container){
                let id=container.id
                TestConfig.findAll({
                    where:{containerId:id},
                    attributes: {exclude:['containerId','config','createdAt','updatedAt']}
                }).then(testNames=>{
                    //console.log(testNames)
                    res.json({tests:testNames})
                }).catch(err=>next(err))
            }else{
                res.status(400).send({msg:'invalid test id'})
            }
            
        }).catch(err=>next(err))
      
    }catch(err){
        next(err);
    }
    //next()
}
exports.gettestconfig=async(req,res,next)=>{
    console.log(req.params)
    try{
        TestConfig.findAll({
            where:{id:req.params.id},
            include: [
              {
                model: TestVariant,
                //attributes:['variant']
              }
            ]
          }).then(testConfig => {
             // const data=testConfig;
             // console.log('test con',testConfig)
             try{
                const resObj=testConfig.map(item=>{
                    //console.log(item.testVariant.get());
                    if(item.testVariant)
                    {
                      const variant=item.testVariant.get();
                          if(variant.variant){
                              return Object.assign(
                                  {},
                                  {
                                  id: item.id,
                                  name: item.name,
                                  params: item.config.params,
                                  variants: variant.variant
                                  })
                          }else{
                              return Object.assign(
                                  {},
                                  {
                                  id: item.testId,
                                  name: item.name,
                                  params: item.config.params,
                                  variants: [{checked:true,variant:item.config.params}],
                                  //variants: variant.variant
                                  })
                          }
                      // return Object.assign(
                      //     {},
                      //     {
                      //       id: item.id,
                      //       name: item.name,
                      //       params: item.config.params,
                      //       variants: variant.variant.map(variant => {
                      //        // console.log('variants')
                      //         //tidy up the post data
                      //         return Object.assign(
                      //           {},
                      //           {
                      //            variant:variant.variant
                                 
                      //           })
                      //       })
                      //     })
                    }else{
                      console.log('here')
                      return Object.assign(
                          {},
                          {
                            id: item.id,
                            name: item.name,
                            params: item.config.params,
                            variants:[{checked:true,variant:item.config.params}]
                          })
                    }
                  
                  });
                  res.json(resObj)
             }catch(ex){
                console.log(ex)
             }
             
              next('success')
          }).catch(err=>{next(err)})
    }catch(err){
        next(err);
    }
   
}
exports.getcontainerdata=async(req,res,next)=>{
   Container.findOne({
            where:{cntId:[`${req.params.id}`]},
            attributes: {include:['id']}
        }).then(container=> {
           // console.log('container id',container.id)
            if(container){
                TestConfig.findAll({
                    where:{containerId:container.id},
                    include: [
                      {
                        model: TestVariant,
                        //attributes:['variant']
                      }
                    ]
                  }).then(testConfig => {
                     // const data=testConfig;
                     // console.log(testConfig)
                      const resObj=testConfig.map(item=>{
                         // console.log(item.testVariant);
                          if(item.testVariant)
                          {
                            const variant=item.testVariant.get();
                            if(variant.variant.length>0){
                              return Object.assign(
                                  {},
                                  {
                                    id: item.testId,
                                    name: item.name,
                                    //params: item.config.params,
                                    variants: variant.variant
                                  })
                            }else{
                              return Object.assign(
                                  {},
                                  {
                                    id: item.testId,
                                    name: item.name,
                                    variants: [{variant:item.config.params}],
                                    //variants: variant.variant
                                  })
                            }
                          }else{
                            return Object.assign(
                                {},
                                {
                                  id: item.testId,
                                  name: item.name,
                                  variants:  [{variant:item.config.params}],
                                  //variants: variant.variant
                                })
                          }
                        });
                        res.json(resObj)
                  }).catch(err=>{next(err)})

            }else{
                res.status(400).send({msg:'invalid test id'})
            }
            
    }).catch(err=>{next(err)})
}
exports.updatetestconfig=async(req,res,next)=>{
    console.log('updated',req.body)
    TestConfig.findOne({
        where:{id:req.params.id},
        attributes:{include:['id']}
    }).then(async (testconfig)=>{
        if(testconfig){
           const found= await TestVariant.count({
                where:{configId:testconfig.id},
            });
            console.log(found)
           if(found>0){
            TestVariant.update({
                variant:req.body.variants,
               },{where:{
                    configId:req.params.id
               }
            }).then(result=>{
                console.log(result)
                res.send('updated')
            }).catch(err=>{next(err)})
           }else{
            testconfig.createTestVariant({
                variant:req.body.variants
            }).then(result=>{
                res.send({msg:'created!'})
            }).catch(err=>{next(err)})
           }
        }else{
            res.status(200).send({msg:'invalid test id'})
        }      
        // testconfig.update({variant:req.body.variants})
    }).catch(err=>{next(err)})
}
exports.ceateTest=async(req,res,next)=>{
    try{
        const bodyString= JSON.stringify(req.body)
        const body=await JSON.parse(bodyString)
        //console.log('create test called',body)
        const data= await JSON.parse(body.containerData);
       // console.log(data)
        let testExId=''
        let cid=''
       //res.status(204).send('')
        if(data.length===0){
            res.send('invalid data')
        }else{
            testExId=body.testId;
            const found= await Container.count({
                where:{cntId:testExId},
            });
            if(found>0){
                res.status(400).send({msg:'Cannot create container.container already exists'})
            }else{
                Container.create({
                    name:body.testName,
                    cntId:body.testId,
                    userInfo:{
                        userId:body.userId,
                       // userName:data.userinfo.user
                    }
                }).then(async (container)=>{
                    //let tests=data.tests
                    cid=container.id;
                    await data.forEach(async(item)=>{
                      // console.log('item id',item.id)
                         container.createTestConfig({
                            name:item.name,
                            testId:item.id,
                            config:{
                                params:item.params
                            }
                        }).then(response=>{
                           // console.log(response)  
                        }).catch(err=>next(err))
                    })
                    res.status(200).send({msg:'saved successfully',testId:testExId,containerId:cid}) 
                }).catch(err=>next(err))
            }
            
        }  
    }catch(err){next(err)}
}
exports.clearvariants=async(req,res,next)=>{
    try{
        await TestVariant.destroy({
            truncate: true
          });
          res.send('truncated')
          next()
    }catch{

    }
}