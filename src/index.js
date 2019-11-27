// var root = document.getElementById('root');
// import './index.scss'
import './style.css'
// root.innerHTML = '<i class="web-font">明月几时有，自己抬头瞅</i>'
// console.log('hhhh')
import counter from './js/count.js';
import number from './js/number.js';

counter();
number();

if (module.hot) {
    module.hot.accept('./js/number', () => {
        let abc = document.getElementById('number');
        document.body.removeChild(abc);
        number();
    })
}
var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function() {
    var div = document.createElement('div');
    div.innerHTML = 'item';
    document.body.appendChild(div)
}
