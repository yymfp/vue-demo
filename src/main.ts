import Vue from 'vue';
import { Button, Input, Form, FormItem, Row, Col, Message, Table, Upload, Dialog } from 'element-ui'
import jquery from 'jquery'
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/base.less'

Vue.config.productionTip = false;
window.$ = jquery

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Upload)
Vue.use(Dialog)

Vue.prototype.$message = Message;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
