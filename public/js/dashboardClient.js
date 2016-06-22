// dashboard client
var serverUrl = "http://localhost:3000"
var socket = io.connect(serverUrl + "/dashboard")

window.onkeyup = function (e) {
  // keys 1 to 9, 1 has the keyCode 49.
  if(e.keyCode >= 49 && e.keyCode <= 57) {
    var sceneIndex = e.keyCode - 49
    // pressing 1 gets the first image in the array
    console.log('setting new scene:', sceneIndex)
    socket.emit('set scene', sceneIndex)
  }
}

function newScene (sceneIndex) {
  console.log('setting new scene: ', sceneIndex)
  socket.emit('set scene', sceneIndex)
}

function setBackgroundColor (colorCode) {
  //colorCode will be in the form #______. e.g. #ffffff is white

}

// Development use only
socket.on('update scene display', function (imageUrl) {
  throw new Error('Dashboard is receiving update messages!\nOnly clients on the display page should receive these.')
})