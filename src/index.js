import { add } from './math.js';
import _ from 'lodash';
add(2, 3)
console.log(_.join(['a', 'b', 'c'], '***'));
function getComponent() {
    // 异步加载lodash
    return import('lodash').then(_ => {
        var ele = document.createElement('div');
        ele.innerHTML = _.join(['Hello', 'World'], '-');
        return ele;
    })
}


getComponent().then(ele => {
    document.body.appendChild(ele);
})
