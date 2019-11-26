import avator from './open-btn.png';
import './index.css';

let img = new Image();
img.src = avator;
img.classList.add('avatar')

let root = document.getElementById('root');
root.append(img);
