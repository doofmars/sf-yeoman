'use strict';

function im(element, image) {
    element.src = image;
}



function playNew() {
    var id = 0;
    var zone = document.getElementById('audioElements');
    var tag = document.createElement('audio');
    tag.setAttribute('preload', 'auto');
    tag.setAttribute('autoplay', 'autoplay');
    tag.setAttribute('src', 'resources/mp3_inception.mp3');
    tag.setAttribute('id', 'audio' + id);
    zone.appendChild(tag);
    tag.play();
    setTimeout('x=document.getElementById("audio" + id + "");x.parentNode.removeChild(x);', 3500);
    id++;
}
