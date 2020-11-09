const sidedata=require('./TestingScrumBoardSteps.json')

exports.getParamsFromJson=(async(data)=>{
    try{
        const testsArray=sidedata.tests;
        const paramsArray=[]
        testsArray.forEach(async(testItem) => {
            const testCommands=testItem.commands;
            console.log('testid',testItem.id)
            const test={}
            const params= testCommands.filter(item=>{
                return (item.value!='' || item.value!=null) && item.command=='type'
                }) .map(item=>{
                        let filterObjects={}  
                        filterObjects['id']=item.id
                        filterObjects['target']=item.target
                        filterObjects['value']=item.value
                        return filterObjects
                    });
            test['id']=testItem.id;
            test['name']=testItem.name;
            test['params']= params
            paramsArray.push(test);
        });
        return paramsArray
    }catch{
        
    }
})