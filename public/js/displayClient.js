// display client
var socket = io()
var numberOfScenes = 2

window.onkeyup = function (e) {
  // keys 1 to 9, 1 has the keyCode 49.
  if(e.keyCode >= 49 && e.keyCode <= 57) {
    var sceneNum = e.keyCode - 48
    if (sceneNum > numberOfScenes) return // no image stored for that key
    // pressing 1 gets the first image in the array
    console.log('requesting scene number:', sceneNum)
    socket.emit('want scene', sceneNum)
  }
}

socket.on('new scene', function (imageUrl) {
  console.log('received new scene')
  console.log('new image:', imageUrl)
  $('#scene').attr('src', imageUrl)
})