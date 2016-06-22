// This file handles keyboard events of the number keys.
// It changes the html to switch to the correct image
var scenes = require('./sceneCollections/testScenes.json')
console.log('scenes:', scenes)
document.addEventListener('DOMContentLoaded', function() {

}, false);

window.onkeyup = function (e) {
  // keys 1 to 9
  if(e.keyCode >= 49 && e.keyCode <= 57) {
    var scene = document.getElementById('scene')
    if (e.keyCode - 49 > scenes.length - 1) return // no image stored for that key
    // pressing 1 gets the first image in the array
    scene.src = scenes[e.keyCode - 49]
    console.log('changing image to:', scene.src)
  }
}