// dashboard client
var socket = io()
var numberOfScenes = 2

window.onkeyup = function (e) {
  // keys 1 to 9, 1 has the keyCode 49.
  if(e.keyCode >= 49 && e.keyCode <= 57) {
    var sceneNum = e.keyCode - 48
    if (sceneNum > numberOfScenes) return // no image stored for that key
    // pressing 1 gets the first image in the array
    console.log('setting new scene:', sceneNum)
  }
}

function newScene (sceneNum) {
  console.log('setting new scene: ', sceneNum)
  socket.emit('new scene', sceneNum)
}