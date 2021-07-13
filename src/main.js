import Vue from 'vue'
import App from '@/App.vue'

import '@/utility/html.extension'
import '@/utility/object.extension'
import '@/directives'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import '@/assets/css/raw.scss'
import '@/assets/css/main.scss'
import popup from '@/Uilibrary/popup.vue'
import minipopup from '@/Uilibrary/minipopup.vue'
import toggle from '@/Uilibrary/toggle.vue'
import combobox from '@/Uilibrary/combobox.vue'
import datePicker from '@/Uilibrary/datePicker.vue'
import colorPicker from '@/Uilibrary/colorPicker.vue'
import unagainButton from '@/Uilibrary/unagainButton.vue'
import tree from '@/Uilibrary/tree.vue'
import message from '@/Uilibrary/message.js'

Vue.config.productionTip = false
Vue.component('popup',popup)
Vue.component('r-minipopup',minipopup)
Vue.component('r-toggle',toggle)
Vue.component('r-combobox',combobox)
Vue.component('r-date-picker',datePicker)
Vue.component('r-color-picker',colorPicker)
Vue.component('r-button',unagainButton)
Vue.component('r-tree',tree)

Vue.prototype.$message = new message()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
