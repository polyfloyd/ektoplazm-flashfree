// ==UserScript==
// @name        Ektoplazm Noflash
// @namespace   polyfloyd
// @include     *.ektoplazm.com/*
// @version     22-10-2014
// @grant       none
// ==/UserScript==

(function() {

function insertAfter(node, ref) {
  ref.parentNode.insertBefore(node, ref.nextSibling);
}

Array.prototype.forEach.call(document.getElementsByClassName('post'), function(post) {
  var source  = post.querySelector('.audioplayer_container ~ p script').innerHTML;
  var encoded = source.match(/soundFile:\s*\"([^"]+)"/)[1];
  var decoded = atob(encoded);
  var files   = decoded.split(',');

  var siblings = post.querySelector('.tl').getElementsByClassName('d');
  files.forEach(function(file, i) {
    var audio = document.createElement('audio');
    audio.setAttribute('controls', 'controls');
    audio.setAttribute('preload',  'none');
    audio.setAttribute('src',      file);
    insertAfter(audio, siblings[i]);
  });

  post.querySelector('.audioplayer_container').innerHTML = '';
});

})();
