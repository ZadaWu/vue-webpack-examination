import './style.css'
import Vue from 'vue'
import App from './index.vue'
/* eslint-disable no-new */

const root = document.createElement('div');//创建一个div
document.body.appendChild(root);//插入到body中

new Vue({
    render: (h) => h(App)
}).$mount(root);
