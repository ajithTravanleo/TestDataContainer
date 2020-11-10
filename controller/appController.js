 const Container=require('../models').container
 const TestConfig=require('../models').testConfig
 const TestVariant=require('../models').testVariant

 async function getVariants(id){
    TestVariant.findAll({
        where:{configId:[id]},
        attributes: {include:['variant']}
    }).then(variants=>{
        return  variants
    }).catch(err=>console.log(err))
     //return [{id:1,variant:'test'}]
    //TestVariant.findAll()
 }

exports.getcontainertests=async(req,res,next)=>{
    console.log(req.params)
    try{
        Container.findAll({
            where:{cntId:[`${req.params.id}`]},
            attributes: {include:['id']}
        }).then(id=> {
            // id=[1]
            if(id.length>0){
                TestConfig.findAll({
                    where:{containerId:id},
                    attributes: {include:['name']}
                }).then(testNames=>{
                    console.log(testNames)
                    res.json({tests:testNames})
                }).catch(err=>{console.log('error occured',err)})
            }else{
                res.status(200).send({tests:[]})
            }
        }).catch(err=>console.log(err))

    }catch{}
    //next()
}
exports.gettestconfig=async(req,res,next)=>{
    console.log(req.params)
    try{
        Container.findAll({
            where:{cntId:[`${req.params.id}`]},
            attributes: {include:['id']}
        }).then(id=> {
            id=[1]
            if(id.length>0){
                TestConfig.findAll({
                    where:{containerId:id},
                    attributes: {include:['config','testId','name','id']}
                }).then(async (configs)=>{
                    let testData={}
                    testData['id']=configs.testId
                    testData['name']=configs.name
                    testData['params']=configs.config
                    testData['variants']=await getVariants(configs.id)
                    console.log(testData)
                    res.send(testData)
                }).catch(err=>{console.log('error occured',err)})
            }else{
                res.status(200).send({tests:[]})
            }
        }).catch(err=>console.log(err))

    }catch{}
}
exports.ceateTest=async(req,res,next)=>{
    try{
        const data=req.body.containerData;
        //console.log(data)
        const testExId=''
        if(data.length===0){
            res.send('invalid data')
        }else{
            testExId=req.body.testId;
            Container.create({
                name:req.body.testName,
                cntId:req.body.testId,
                userInfo:{
                    userId:userData.id,
                   // userName:data.userinfo.user
                }
            }).then(container=>{
                //let tests=data.tests
                data.forEach(item=>{
                    container.createTestConfig({
                        name:item.name,
                        testId:item.id,
                        config:{
                            params:item.params
                        }
                    }).then(response=>{
                        console.log(response)
                       
                    }).catch(err=>{console.log(err)})
                })
            }).then(data=>{
                res.status(200).send({msg:'saved successfully',respBody:testExId})
            }).catch(err=>{console.log(err)})
        }
    }catch{

    }
}
exports.getcontainerdata=async(req,res,next)=>{

}