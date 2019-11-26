import avator from './open-btn.png';
import style from './index.scss';
import createAvatar from './js/createAvator';

createAvatar()
let img = new Image();
img.src = avator;
img.classList.add(style.avatar);

let root = document.getElementById('root');
root.append(img);
