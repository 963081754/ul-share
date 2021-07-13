<template>
  <div id="app">
    <h1>组件示例：</h1>

    <table class="table1">
      <tr class="head">
        <td>组件名</td>
        <td>示例</td>
      </tr>
      <tr>
        <td>仿title提示</td>
        <td>
          <span class="hint" hint="纯CSS仿title提示,纯CSS仿title提示" hintl140 >鼠标移上来，显示 仿title提示</span>
        </td>
      </tr>
      <tr>
        <td>日期输入框datePicker</td>
        <td>
          <r-date-picker v-model="date1" :defaultShortcuts="true" />
        </td>
      </tr>
      <tr>
        <td>多样式bool值输入toggle</td>
        <td>
          <div class="toggle">
          <r-toggle v-model="toggleValue" :iconMode='1'/>
          <r-toggle v-model="toggleValue" :iconMode='2'/>
          <r-toggle v-model="toggleValue" :iconMode='3'/>
          <r-toggle v-model="toggleValue" :iconMode='4'/>
        </div>
        </td>
      </tr>
      <tr>
        <td>颜色选择器colorPicker</td>
        <td>
          <span class="color" :style="{background:colorAttrs.value}" @click="showColor">{{colorAttrs.value}}</span>
          <r-color-picker :value.sync="colorAttrs.value" :visible.sync="colorAttrs.visible" :site="colorAttrs.site" />
        </td>
      </tr>
      <tr>
        <td>提交时等待button<br/>消息提示message</td>
        <td>
          <r-button class="button" @click="submit">按钮，unagainButton与message的测试</r-button>
        </td>
      </tr>
      <tr>
        <td>迷尔弹窗minipopup</td>
        <td>
          <button @click.stop="minipopupAttrs.visible=true">弹出 迷你弹窗</button>
          <r-minipopup :visible.sync="minipopupAttrs.visible" icon="bell" :shade="true" :resizeable="true" :closeable="true" title="迷你弹窗">      
            <div style="text-align: left;">
              按住边缘 可改变宽高:resizeable="true"<br/>
              按住标题 可移动<br/>
              可关闭:closeable="true"<br/>
              设置左上角图标 icon="bell"<br/>
              显示遮罩:shade="true"
            </div>
          </r-minipopup>
        </td>
      </tr>
      <tr>
        <td>仿window弹窗popup</td>
        <td>
          <button @click.stop="popupAttrs1.visible=true">弹出 仿window弹窗1</button>
          <button @click.stop="popupAttrs2.visible=true">弹出 仿window弹窗2</button>
          <popup :visible.sync="popupAttrs1.visible" title="仿window弹窗 1，我不能移动。" icon="windows"  :enableMax="false" :drag="false" :shade="false" :closeable="true" :fix="true" :autoHeight="true"
          :aloneWindow="true" @aloneShow="aloneShow">
            <div style="padding:10px;">
              <div>仿window弹窗 1111111111</div>
              <div>点亮 <i class="fa fa-thumb-tack"></i> 可以保持 最前</div>
              <div>高度自适应：autoHeight=true</div>
              <div>定义左上角图标：icon="windows" </div>
              <div>是否遮罩：:shade=false</div>
              <div>最小化功能 好像未整理</div>
              <div>其它功能具体看文档：<a href="http://www.zuobaobiao.cn#a49" target="_blank">仿window弹窗popup</a> </div>
            </div>
          </popup>
          <popup :visible.sync="popupAttrs2.visible" title="仿window弹窗 2" icon="windows" :shade="false" :closeable="true" :fix="true" :autoHeight="true"
          :aloneWindow="true" @aloneShow="aloneShow">
            <div style="min-width:400px;min-height:250px;">
              <div>仿window弹窗 222222222222</div>
              <div>点亮 <i class="fa fa-thumb-tack"></i> 可以保持 最前</div>
              <div>隐藏最大、还原 按钮：enableMax="false"</div>      
              <div>最小化功能 好像未整理</div>
              <div>其它功能具体看文档：<a href="http://www.zuobaobiao.cn#a49" target="_blank">仿window弹窗popup</a> </div>
            </div>
          </popup>
        </td>
      </tr>
      <tr>
        <td>多列select</td>
        <td>
          <r-combobox class="combobox" v-model="comboboxAttrs.value" :items="comboboxAttrs.items" :vField="'code'" :tField="'name'" :nullable="true" :autoWidth="true">
              <template v-slot:header>
                  <div class="header">
                      <label>编号</label>
                      <label>名称</label>
                  </div>
              </template>
              <template v-slot:default="{data}">
                  <div class="item">
                      <label>{{data.code}}</label>
                      <label>{{data.name}}</label>
                  </div>
              </template>
          </r-combobox>
        </td>
      </tr>
    </table>
    
    <div class="treeWrap">
      <div class="title">可拖拉树tree</div>
      <r-tree class="tree" :list="treeAttrs.items" :rootOptions="{id:0,acceptable:true,acceptSigns:null}">
        <template v-slot:default="{item}">
          {{item.name}}（{{item.children ? item.children.length : 0}}）
        </template>
      </r-tree>
    </div>

    <div>组件文档详细看这里：<a href="http://www.zuobaobiao.cn" target="_blank">文档说明</a></div>

  </div>
</template>

<script>
import TreeItem from '@/Uilibrary/TreeItem'

export default {
  name: 'App',
  data(){
    return{
      date1:new Date(),
      colorAttrs:{
        visible:false,
        value:'#0000ff',
        site:null
      },
      comboboxAttrs:{
        items:[
          {code:'aa',name:'是的'},
          {code:'bb',name:'范围'},
          {code:'cc',name:'阿文'},
          {code:'dd',name:'禁用'},
          {code:'ee',name:'初始时'},
          {code:'sd',name:'士大夫'},
          {code:'33',name:'士大夫士大夫'},
          {code:'gg',name:'只需'},
          {code:'hh',name:'自诩为额外'},
          {code:'vv',name:'体育语句用'},
          {code:'zzz',name:'写程序吧是'},
          {code:'llll',name:'新村vwe'},
          {code:'ooo',name:'问问二'},
          {code:'uuu',name:'更好吗还没有'},
          {code:'mmm',name:'企管部'},
          {code:'qqqq',name:'被认为v'},
        ],
        value:'33'
      },
      toggleValue:true,
      treeAttrs:{
        items:[
          new TreeItem({id:1,pid:0,name:'天天天天天天天',icon:'envelope',icon_open:'envelope-open',children:[
            new TreeItem({id:3,pid:1,name:'地地地地地地'}),
            new TreeItem({id:4,pid:1,name:'看看看看看看',sign:'xxx'}),
          ]}),
          new TreeItem({id:2,pid:0,name:'只接收“看”与“四”',acceptable:true,acceptSigns:['xxx'],children:[
            new TreeItem({id:5,pid:2,name:'不接收',acceptable:false}),
            new TreeItem({id:6,pid:2,name:'不可拖',moveable:false,icon:'bell'}),
          ]}),
          new TreeItem({id:7,pid:0,name:'不接收,不可拖',acceptable:false,moveable:false,children:[
            new TreeItem({id:8,pid:7,name:'四四四四四四四',sign:'xxx'}),
            new TreeItem({id:9,pid:7,name:'五五五五五五五'}),
          ]}),
        ],
      },
      minipopupAttrs:{
        visible:false,
      },
      popupAttrs1:{
        visible:false,
      },
      popupAttrs2:{
        visible:false,
      }
    }
  },
  methods:{
    showColor({target}){
      this.colorAttrs.visible = true
      this.colorAttrs.site = target
    },
    submit({unlock}){
      this.$message.confirm('确定提交吗？').then(()=>{
        return this.$message.prompt('请输入要提交的值','',true)
      }).then(value=>{
        this.$message.info(`提交开始：${value}。再次点击不会重复提交；8秒后结束。`)
        setTimeout(() => {
          this.$message.success('提交结束')
          unlock()
        }, 8000)
      }).catch(()=>{
        unlock()
      })
    },
    aloneShow(){
      this.$message.info('打开什么要自己实现；用不到可以隐藏它。')
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #432;
  margin-top: 60px;
  > .table1{
    display: inline-block;
    border-collapse: collapse;
    text-align: left;
    > tr{
      td{
        padding: 3px;
        border: 1px solid #432;
      }
    }
    > tr.head{
      background: #432;
      > td{
        color: #fed;
      }
    }
    .hint{
      display: inline-block;
      padding: 3px;
      margin: 5px;
      border: 1px solid #987;
    }
    .color{
      display: inline-block;
      margin: 10px;
      height: 30px;
      width: 60px;
      line-height: 30px;
      text-align:center;
      border: 1px solid #000;
      color: #fff;
    }
    .combobox{
      .header,.item{
        > label{
          display: inline-block;
          width: 80px;
        }
      }
      .header{
        background: #edc;
      }
    }
    .toggle{
      > *{
        margin: 5px;
      }
    }
    .button, button{
      padding: 2px 15px;
      margin: 10px;
    }
  }
  
  > .treeWrap{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    border: 1px solid #432;
    > .title{
      background: #432;
      color: #fed;
      padding: 3px;
    }
    // > .tree{
    // }
  }  
  
}
</style>
