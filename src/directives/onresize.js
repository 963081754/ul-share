{/* <iframe class="object1" src="" @load="resize"></iframe> */}

import Vue from 'vue'
const bindedSym = Symbol()

const handler = function(callback,el){
    if(typeof(callback) !== 'function'){
      if(el[bindedSym] && el[bindedSym].parentNode){
        el[bindedSym].parentNode.removeChild(el[bindedSym])
      }
      return
    }

    if(el[bindedSym]) return // 避免重复
  
    if(el.getStyle('position') === 'static'){
      el.style.position = 'relative'
    }
    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.top = '0px'
    iframe.style.left = '0px'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.border = 'none'
    iframe.style.pointerEvents = 'none'
    iframe.style.zIndex = '-1'    
    // iframe.style.opacity = '0'
    // iframe.style.background = '#eee'
    iframe.addEventListener('load',({target})=>{
        target.contentWindow.addEventListener('resize', () => {
            // const size = {
            //     width: e.target.document.documentElement.clientWidth,
            //     height: e.target.document.documentElement.clientHeight
            // }
            // callback(size)
            callback(el)
         })
    })
    el.appendChild(iframe)

    el[bindedSym] = iframe
}

Vue.directive('onresize', {
  componentUpdated (el, binding) {  // binding.value=null|function(e)
    handler(binding.value,el)
  },
  unbind(el){
    handler(false,el)
  }
})
  