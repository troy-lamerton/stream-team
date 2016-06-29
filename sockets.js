var httpServer = require('./server')
var io = require('socket.io')(httpServer);

io.of('/dashboard').on('connection', function(socket){
  socket.on('set scene', function (sceneIndex) {
    // @param {Integer} sceneIndex
    // check if sceneIndex corresponds to an image
    if (sceneIndex > images.length -1) return;
    activeSceneIndex = sceneIndex
    socket.broadcast.emit('new scene', images[sceneIndex])
    io.of('/').emit('update scene display', images[sceneIndex]);
  })
  socket.on('set background color', function (colorCode) {
    // check color code is valid
    if ( colorCode.slice(0,1) === "#" && (colorCode.length === 7 || colorCode.length === 4) ) {
      console.log('Background color is valid')
      io.of('/').emit('update background color', colorCode)
    } else {
      console.error('Background color invalid')
      return
    }
  })
});