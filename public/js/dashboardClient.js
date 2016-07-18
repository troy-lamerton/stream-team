// dashboard client
var socket = io.connect("/dashboard")

function newScene (sceneIndex) {
  socket.emit('set scene', sceneIndex)
}

$( document ).ready(function () {
  $('#setBackgroundColor').click(function() {
    // this code is not running -- ???
    var colorCode = $('#backgroundColor').val();
    //colorCode will be in the form #______. e.g. #ffffff is white
    socket.emit('set background color', colorCode);
  });
});

// Development use only
socket.on('update scene display', function (imageUrl) {
  throw new Error('Dashboard is receiving update messages!\nOnly clients on the display page should receive these.')
});