
const createTree=(arr,parentId="")=>{
    const newArr=[];
    
    for(const item of arr){
        if(item.parent_id==parentId){
            const children= createTree(arr,item.id);
            if(children.length>0){
                item.children=children;
            }
            newArr.push(item);
        }
    }
    
    return newArr;
}
module.exports=(arr,parentId="")=>{
    const tree=createTree(arr,parentId);
    return tree;
}