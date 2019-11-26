import avator from '../open-btn.png';

function createAvatar() {
    var img = new Image();
    img.src = avator;
    img.classList.add('avatar');

    var root = document.getElementById('root');
    root.append(img);
}

export default createAvatar;
