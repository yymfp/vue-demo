import Vue from 'vue';
import { Button, Input, Form, FormItem, Row, Col } from 'element-ui'
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
