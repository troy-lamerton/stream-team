var httpServer = require('./server')
var io = require('socket.io')(httpServer);

io.of('/dashboard').on('connection', function(socket){
  socket.on('set scene', function (sceneIndex) {
    // @param {Integer} sceneIndex
    // check if sceneIndex corresponds to an scene
    if (sceneIndex > scenes.length -1) return;
    activeSceneIndex = sceneIndex
    socket.broadcast.emit('new scene', scenes[sceneIndex])
    io.of('/').emit('update scene display', scenes[sceneIndex]);
  })
  socket.on('set background color', function (colorCode) {
    // check color code is valid
    if ( colorCode.slice(0,1) === "#" && (colorCode.length === 7 || colorCode.length === 4) ) {
      io.of('/').emit('update background color', colorCode)
    } else return
  })
});