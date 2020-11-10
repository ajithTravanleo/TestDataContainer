 const Container=require('../models').container
 const TestConfig=require('../models').testConfig

exports.getcontainer=async(req,res,next)=>{
    res.send('controller executed')
}
exports.ceateTest=async(req,res,next)=>{
    const data=req.body;
    //console.log(data)
    if(!data.name){
        res.send('invalid data')
    }else{
        Container.create({
            name:data.name,
            userInfo:{
                userId:data.userinfo.id,
                userName:data.userinfo.user
            }
        }).then(container=>{
            let tests=data.tests
            tests.forEach(item=>{
                container.createTestConfig({
                    name:item.name,
                    config:{
                        params:item.params
                    }
                }).then(response=>{
                    console.log(response)
                   
                }).catch(err=>{console.log(err)})
            })
        }).then(data=>{
            res.status(200).send('saved successfully')
        }).catch(err=>{console.log(err)})
    }
}