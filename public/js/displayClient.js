// display client
var socket = io()

socket.on('update scene display', function (imageUrl) {
  $('#scene').attr('src', imageUrl)
})

socket.on('update background color', (colorCode) => {
  //colorCode will be in the form #______. e.g. #ffffff is white
  $('#scene').css('background-color', colorCode)
})