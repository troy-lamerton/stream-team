// display client
var socket = io()

socket.on('update scene display', function (imageUrl) {
  $('#scene').attr('src', imageUrl)
})