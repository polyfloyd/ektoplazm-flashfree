// ==UserScript==
// @name        Ektoplazm Noflash
// @namespace   polyfloyd
// @include     *.ektoplazm.com/free-music/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {

function insertAfter(node, ref) {
  ref.parentNode.insertBefore(node, ref.nextSibling);
}

var source  = document.querySelector('.audioplayer_container ~ p script').innerHTML;
var encoded = source.match(/soundFile:\s*\"([^"]+)"/)[1];
var decoded = atob(encoded);
var files   = decoded.split(',');

var siblings = document.querySelector('.tl').getElementsByClassName('d');
files.forEach(function(file, i) {
  var audio = document.createElement('audio');
  audio.setAttribute('controls', 'controls');
  audio.setAttribute('preload',  'none');
  audio.setAttribute('src',      file);
  insertAfter(audio, siblings[i]);
}, '');

document.querySelector('.audioplayer_container').innerHTML = '';

})();
