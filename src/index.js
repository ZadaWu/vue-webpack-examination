// import { add } from './math.js';
// import _ from 'lodash';
// add(2, 3)
// console.log(_.join(['a', 'b', 'c'], '***'));
// function getComponent() {
//     // 异步加载lodash
//     // 意思是异步引入lodash，当做代码分割的时候，给这个lodash库单独进行打包的时候，给它起的名字叫lodash
//     return import(/*webpackChunkName:"lodash" */'lodash').then(_ => {
//         var ele = document.createElement('div');
//         ele.innerHTML = _.join(['Hello', 'World'], '-');
//         return ele;
//     })
// }
//
//
// getComponent().then(ele => {
//     document.body.appendChild(ele);
// })

// 同步引入lodash
// import _ from 'lodash';
// var ele = document.createElement('div');
// ele.innerHTML = _.join(['Hello', 'World'], '-');
// document.body.appendChild(ele);

// function getComponent() {
//     return import(/*webpackChunkName:"lodash" */'lodash').then(_ => {
//         var ele = document.createElement('div');
//         ele.innerHTML = _.join(['Hello', 'World'], '-');
//         return ele;
//     })
// }
//
// document.addEventListener('click', () => {
//     getComponent().then(ele => {
//         document.body.appendChild(ele);
//     })
// })
// webpackPrefetch: true 会等你主要的 JS 都加载完了之后，网络带宽空闲的时候，它就会预先帮你加载好
document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */'./click.js').then(({default: func}) => {
        func();
    })
})
