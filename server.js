/* 
 * The dashboard sends an instruction to the server
 * The server checks that the instruction is valid
 * If it is valid, it sends it to people viewing the display page
 */
var express = require('express')
var app = express()
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'))

/* Routes */
var routesApp = require('./routes/app')
var routesScenes = require('./routes/scenes')

app.use('/app', routesApp)
app.use('/scenes', routesScenes)

var port = normalizePort(process.env.PORT || 3000)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

app.set('port', port);

var scenes = require(__dirname + '/scenesTest.json')
/* Sockets handle the commands sent between the dashboard, display and the server */
io.of('/dashboard').on('connection', function(socket){
  socket.on('set scene', function (sceneIndex) {
    // @param {Integer} sceneIndex
    // check if sceneIndex corresponds to an image
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




if (module.parent === null){
  http.listen(port)
  console.log('Server is listening on http://localhost:' + port)
}

/* http is the running server */
module.exports = http