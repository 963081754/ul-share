<template>
    <ul class="tree">
        <li class="treeLi" v-for="item in list" :key="item.id">
            <div class="before" :before_itemId="item.id"></div>
            <div class="item" :item_itemId="item.id">
                <div class="icons">
                    <template  v-if="item.children.length > 0">
                        <i v-if="item.folded" class="fa fa-caret-right" @click.stop="showLeaf(item)"/>
                        <i v-else             class="fa fa-caret-down"  @click.stop="showLeaf(item)"/>

                        <template v-if="item.folded">
                            <i :class="`fa fa-${item.icon || 'folder'}`" @click.stop="showLeaf(item)"/>
                        </template>
                        <template v-else>
                            <i :class="`fa fa-${item.icon_open || item.icon || 'folder-open'}`" @click.stop="showLeaf(item)"/>
                        </template>
                    </template>
                    <template v-else>
                        <i v-if="item.icon" :class="`fa fa-${item.icon}`"/>
                        <i v-else           :class="`fa fa-folder-o`"/>
                    </template>
                </div>
                <div class="caller" :class="{noChildren:item.children.length === 0}">
                    <slot v-bind:item="item">{{item.name}}</slot>
                </div>
            </div>
            <div class="after" :after_itemId="item.id"></div>
            <treeItem v-if="item.children && item.children.length>0" :list="item.children" :class="{hide:item.folded}">
                <template v-slot:default="{item}">
                    <slot v-bind:item="item"></slot>
                </template>
            </treeItem>
        </li>
    </ul>
</template>

<script>
export default {
    name:'treeItem',
    props:{
        list:{
            type:Array,
            required:true
        }
    },
    methods:{
        showLeaf(item){
            item.folded = !item.folded
            this.$forceUpdate()
        }
    }
}
</script>

<style lang="scss" scoped>
ul.tree{
    padding-left: 20px;
    li{
        > div.before,
        > div.after{
            height: 4px;
            transition: height 200ms;
            // background: #f99;
        }
        > div.after{
            border-bottom: 1px solid #ddd;
        }
        > div.item{
            height: 18px;
            line-height: 18px;            
            transition: height 150ms;
            padding: 0px 3px;
            white-space: nowrap; // 保证不隐藏 
            > div.icons,
            > div.caller{
                display: inline-block;
                white-space: nowrap; // 保证不隐藏
                // border: 1px solid #999;
                // vertical-align: baseline;
                vertical-align: text-top;
                text-align: left;
            }
            > div.icons{
                > i.fa{
                    vertical-align: middle;
                    padding: 0px 5px 0px 0px;
                    width: 18px;
                    overflow: hidden;
                    &.fa-caret-right,
                    &.fa-caret-down{
                        font-size: 20px;
                        padding: 0px 19px 0px 0px;
                        width: 15px;
                        cursor: pointer;
                    }
                }
            }
            > div.caller{
                width: calc(100% - 36px);
                &.noChildren{
                    width: calc(100% - 17px);
                }
            }
        }
        > div.item.active{
            border-radius: 2px;
            // background: #efefff;
            background: #335;
            color: #fff;
            text-align: right;
        }
        > div.before.active,
        > div.after.active,
        > div.item.active{
            position: relative;
            &::before{
                content: "\f061";
                font: normal normal normal 14px/1 FontAwesome;
                font-size: 20px;
                color: #335;

                position: absolute;
                top: -11px;
                left: -20px;
            }
        }
        > div.before.active{
            border-top: 2px solid #335;
        }
        > div.after.active{
            border-bottom: 2px solid #335;
            &::before{
                top: auto;
                bottom: -10px;
            }
        }
        > div.item.active{
            &::before{
                top: 0px;
            }
        }
        &:hover > div{
            // background: #e3e3e3;
            background: #fcb; 
        }
    }
    > li.dragSource div.item,
    > li.dragSource div.before,
    > li.dragSource div.after, // 拖拉中的隐藏起来
    &.hide li div.item,
    &.hide li div.before, // 折叠
    &.hide li div.after{
        height: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        overflow: hidden;  
        border-bottom:none;
    }
}
</style>