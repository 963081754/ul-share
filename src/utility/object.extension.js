/**
 * 拉平“树”
 */
 Array.prototype.flatTree = function(){
    let list = []
    this.forEach(item=>{
        list.push(item)
        if(item.children && item.children.length > 0){
            list = list.concat(item.children.flatTree())
        }
    })
    return list
}
Array.prototype.findFromTree = function(id){
    let item = this.find(t=>t.id == id) // 不能用===
    if(item) return item
    for(let i = 0; i < this.length; i++){
        item = this[i].children.findFromTree(id)
        if(item) return item
    }
    return null
}
Array.prototype.eachTree = function(callback){
    this.forEach(item=>{
        callback(item)
        if(item.children instanceof Array){
            item.children.eachTree(callback)
        }
    })
    return this
}

Date.prototype.isValid = function(){
    return !isNaN(this.getTime())
}