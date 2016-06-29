var express = require('express')
var app = express()
var http = require('http').Server(app);

var io = require('socket.io')(http);

var images = require('./public/sceneCollections/testScenes.json')
var activeSceneIndex = 0 // placeholder until a databse is implemented

// app.set('views', __dirname + '/views');
// app.set('view engine', 'hbs');

var routesFile = require('./routes')

app.use('/app', routesFile)
app.use(express.static(__dirname + '/public'))

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


const PORT = process.env.PORT || 3000

if (module.parent === null){
  http.listen(PORT)
  console.log('Server is listening on http://localhost:' + PORT)
}

// the server listens for the dashboard emits which change something
//  the display page

// io on the server will listen for an emit asking for an image.
// the server will respond with the url to that image