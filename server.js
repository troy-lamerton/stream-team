var express = require('express')
var app = express()
var http = require('http').Server(app);

var io = require('socket.io')(http);

var images = require('./public/sceneCollections/testScenes.json')
var activeSceneIndex = 0 // placeholder until a databse is implemented

// app.set('views', __dirname + '/views');
// app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

/* Routes */
var routesApp = require('./routesApp')
var routesImages = require('./routesImages')

app.use('/app', routesApp)
app.use('/images', routesImages)

/* Sockets handle the commands sent between the dashboard, display and the server */
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
    console.log('DASH: setting background color --', colorCode);
    if ( colorCode.slice(0,1) === "#" && (colorCode.length === 7 || colorCode.length === 4) ) {
      console.log('Background color is valid')
      io.of('/').emit('update background color', colorCode)
    } else {
      console.error('Background color invalid')
      return
    }
  })
});


const let PORT = process.env.PORT || 3000

if (module.parent === null){
  http.listen(PORT)
  console.log('Server is listening on http://localhost:' + PORT)
}

/* http is the running server */
module.exports = http
// The dashboard sends an instruction to the server
// The server checks that the instruction is valid
// If it is valid, it sends it to people viewing the display page