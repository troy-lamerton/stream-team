// display client
var socket = io()

socket.on('update scene display', function (imageUrl) {
  $('#scene').attr('src', imageUrl)
})

/* @param {String} colorCode */
socket.on('update background color', function (colorCode) {
  //colorCode will be in the form #______. e.g. #ffffff is white
  console.log('New background color recieved')
  $('#scene').css('background-color', colorCode)
})