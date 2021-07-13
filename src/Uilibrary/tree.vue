<template>
    <div class="tree">
        <treeItem :list="list" :isRoot="true">
            <template v-slot:default="{item}">
                <slot v-bind:item="item"></slot>
            </template>
        </treeItem>
    </div>
</template>

<script>
import treeItem from './tree.item.vue'

const sym = Symbol()
const setupSym = Symbol()

const dragOpts = {
    dragstart(el){
        if(!el[sym].info) return
        el[sym].info.target1.addClass('dragSource')
    },
    dragover(event,el){
        if(!el[sym].info) return
        event.preventDefault()
    },
    dragenter(event,el){
        if(!el[sym].info) return

        const moveInfo = el[sym].info
        const info = {}
        const target1 = el[sym].info.target1
        const target = event.target
        if(target === el){
            // console.log(0)
            return
        }
        {
            let prev = target
            while(prev){
                if(prev === target1){
                    // console.log(1)
                    return
                }
                if(prev === el) break
                prev = prev.parentNode
            }
        } // 目标是自己或自己的子元素 都无效
        {            
            let itemId2
            let prev = target
            while(prev){
                if(prev === el){
                    //  console.log(1.1)
                    return
                }
                if(prev instanceof HTMLDivElement){
                    if((itemId2 = prev.getAttribute('item_itemId'))){
                        info.target2 = prev
                        info.type = 0
                        break
                    }else if((itemId2 = prev.getAttribute('before_itemId'))){
                        info.target2 = prev
                        info.type = -1
                        break
                    }
                    else if((itemId2 = prev.getAttribute('after_itemId'))){                        
                        info.target2 = prev
                        info.type = 1
                        break
                    }
                }
                prev = prev.parentNode
            }
            if(!itemId2){
                // console.log(2)
                return
            }
            else{                
                info.item2 = moveInfo.list.findFromTree(itemId2)
                if(info.type !== 0){
                    info.item2 = moveInfo.list.findFromTree(info.item2.pid)
                    info.item2 = info.item2 || moveInfo.rootOptions // 根
                }
                console.log(info.item2.acceptSigns,moveInfo.item1.sign)
                if(!info.item2.acceptable){
                    // console.log(3,info.item2,info.type)
                     return // 目标 不接受
                }else if((info.item2.acceptSigns instanceof Array) && !info.item2.acceptSigns.includes(moveInfo.item1.sign)){
                    // console.log(4,info.item2.name,info.item2.acceptSigns,moveInfo.item1.sign)
                    return // 不在目标的接受对象内
                }
            }
        } // 找到 目标，没找到则退出；或者目标 不接收，也退出。

        if(info.target2 === moveInfo.target2){
            // console.log(5)
            return
        }else{
            if(moveInfo.target2){
                moveInfo.target2.removeClass('active')
            }
            moveInfo.target2 = info.target2
            moveInfo.item2 = info.item2
            moveInfo.type = info.type

            moveInfo.target2.addClass('active')
        }
    },
    drop(el){
        if(!el[sym].info) return
        // console.log('drop1')
        const { item1, item2, type } = el[sym].info
        if(!item2){
            // console.log('drop2')
            return
        }
        if(item1 === item2){
            // console.log('drop3')
            return
        }

        const sorter = el[sym].sorter
        if(typeof(sorter) === 'function'){
            const li = el[sym].info.target2.parentNode
            let index = li.parentNode.getChildIndex(li)
            switch(type){
                // case -1:
                //     index = index - 1
                //     index = index < 0 ? 0 : index
                //     break
                case 1:
                    index = index + 1
                    break
                case 0:
                    index = 0
                    break
            }
            sorter({ item1, item2, index })
        }

        dragOpts.dragend(el)         
    },
    dragend(el){
        if(!el[sym].info) return
        
        el[sym].info.target1.removeClass('dragSource').removeAttribute('draggable')
        el[sym].info.target2 && el[sym].info.target2.removeClass('active')
        delete el[sym].info           
    } // 清理
}

const getDefaultRrootOptions = ()=>({
    acceptable:true,
    acceptSigns:null,
    id:undefined
})

export default {
    components:{ treeItem },
    props:{
        list:{
            type:Array,
            required:true
        }, // [model.TreeItem]
        rootOptions:{
            type:Object,
            required:false,
            default:getDefaultRrootOptions
        }, //  参考:model.TreeItem
        hand:{
            type:String,
            required:false
        } // 能拖动的位置，没有则 整个li
    },
    watch:{
        list:{
            handler(){
                this.$nextTick(()=>{
                    this.setupDrag()
                })
            },
            immediate:true
        }
    },
    methods:{
        setupDrag(){
            if(this.list.length === 0) return

            const el = this.$el
            const lis = el.querySelectorAll('li.treeLi')
            Array.prototype.forEach.call(lis,(li)=>{
                if(li[setupSym]) return
                // const isLeaf = !!li.getAttribute('leaf')
                const target = this.hand ? li.querySelector(this.hand) : li  // 'div.name'
                const mouseup = ()=>{
                    li.removeAttribute('draggable')
                    delete el[sym].info
                    target.removeEventListener('mouseup',mouseup)
                }
                const mousedown = (e)=>{
                    e.stopPropagation()
                    // if(this.lockBranch && !isLeaf) return //锁定“树枝”，不允许移动                    
                    let itemId1 = li.querySelector('div[item_itemId]').getAttribute('item_itemId')
                    const item1 = this.list.findFromTree(itemId1)
                    if(!item1.moveable) return // 不可移动

                    li.setAttribute('draggable',true)
                    el[sym].info = {
                        target1:li,
                        // itemId1,
                        // leaf:isLeaf,
                        item1,
                        list:this.list,
                        rootOptions:{
                            ...getDefaultRrootOptions(),
                            ...this.rootOptions,
                            // model:{ id:this.list[0].pid },
                            children:this.list
                        }
                    }
                    target.addEventListener('mouseup',mouseup)
                }
                target.addEventListener('mousedown',mousedown)
                // target.addEventListener('mouseup',mouseup)
                li[setupSym] = true
            })

            if(!el[sym]){
                el[sym] = {
                    sorter: this.sorter.bind(this),
                    drags:{
                        dragstart:()=>{dragOpts.dragstart(el)},
                        dragover:(e)=>{dragOpts.dragover(e,el)},
                        dragenter:(e)=>{dragOpts.dragenter(e,el)},
                        drop:()=>{dragOpts.drop(el)},
                        dragend:()=>{dragOpts.dragend(el)}
                    }
                }
                el.addEventListener('dragstart',el[sym].drags.dragstart)
                el.addEventListener('dragover',el[sym].drags.dragover)
                el.addEventListener('dragenter',el[sym].drags.dragenter)
                el.addEventListener('drop',el[sym].drags.drop)
                el.addEventListener('dragend',el[sym].drags.dragend)
            }
        },
        sorter({ item1, item2, index }){
            // console.log( item1, item2, index)
            {
                const oldChildren = (this.list.findFromTree(item1.pid) || {children:this.list}).children
                // if(oldChildren){
                //     oldChildren.splice(oldChildren.indexOf(item1),1)
                // }
                const oldIndex = oldChildren.indexOf(item1)                
                oldChildren.splice(oldIndex,1)
                if(item1.pid === item2.id){ // 原层次 移动
                    if(oldIndex < index){
                        item2.children.splice(index - 1,0,item1)
                    }else{
                        item2.children.splice(index,0,item1)
                    }                    
                }else{ // 越层次 移动                    
                    item1.pid = item2.id
                    item2.children.splice(index,0,item1)
                }
            }
            this.$emit('sorted',{item:{...item1}, seq:index})

            this.$forceUpdate() // 强制刷新(预防 传进来的list不是可以监听的)
            this.$nextTick(()=>{
                this.setupDrag()
            })
        },
        closeAll(){
            this.list.eachTree(item=>{
                item.folded = true
            })
            this.$forceUpdate()
        },
        openAll(){
            this.list.eachTree(item=>{
                item.folded = false
            })
            this.$forceUpdate()
        }
    }
}
</script>

<style lang="scss" scoped>
.tree > ul{
    padding: 0px;
}
</style>