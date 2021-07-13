class TreeItem{
    constructor(obj){
        Object.defineProperties(this,{
            id:{
                configurable:false,
                enumerable:true,
                writable:false,
                value:obj.id
            }, // 不可监听，可系列化
            pid:{
                configurable:false,
                enumerable:true,
                writable:true,
                value:obj.pid
            }, // 不可监听，可系列化
            name:{
                configurable:false,
                enumerable:true,
                writable:true,
                value:obj.name
            }, // 可监听，可系列化
            icon:{
                configurable:false,
                enumerable:true,
                writable:false,
                value:obj.icon
            }, // 可监听，可系列化
            icon_open:{
                configurable:false,
                enumerable:true,
                writable:false,
                value:obj.icon_open
            }, // 可监听，可系列化
            folded:{ 
                configurable:true,
                enumerable:true,
                writable:true,
                value: !!obj.folded
            },// 可监听，可系列化；折叠/展开            
            moveable:{
                configurable:false,
                enumerable:true,
                writable:true,
                value: Object.prototype.hasOwnProperty.call(obj,'moveable') ? !!obj.moveable : true
            },// 可监听，可系列化；可移动的
            acceptable:{
                configurable:false,
                enumerable:true,
                writable:true,
                value: Object.prototype.hasOwnProperty.call(obj,'acceptable') ? !!obj.acceptable : true
            },// 可监听，可系列化；可接纳的
            acceptSigns:{
                configurable:false,
                enumerable:true,
                writable:false,
                value:obj.acceptSigns || null // ['xxx','yyyy'……]
            },// 可监听，可系列化；可接纳的"标记"列表，acceptable=true时可用，acceptSigns为null则接收所有。
            sign:{
                configurable:false,
                enumerable:true,
                writable:false,
                value:obj.sign || null
            },// 可监听，可系列化；"标记"   
            children:{
                configurable:true,
                enumerable:true,
                writable:true,
                value: obj.children || []
            },         
            model:{
                configurable:false,
                enumerable:true,
                writable:false,
                value:obj.model
            }, // 不可监听，可系列化；节点内容
            seq:{
                configurable:false,
                enumerable:false,
                writable:false,
                value:obj.seq
            } // 不可监听，不可系列化
        })
    }
}

export default TreeItem