var express = require('express')
var fs = require('fs')
var Handlebars = require('handlebars')
var app = express()
var http = require('http').Server(app);
var PORT = process.env.PORT || 3000

var io = require('socket.io')(http);

var images = require('./public/sceneCollections/testScenes.json')
var activeSceneIndex = 0

// app.set('views', __dirname + '/views');
// app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

/* Display page */
app.get('/', function (req, res) {
  var source = fs.readFileSync('views/display.hbs')
  var template =  Handlebars.compile(source.toString())
  console.log('new client being sent: ', activeSceneIndex)
  res.send(template(images[activeSceneIndex]))

	// res.render('display', {img: "www.google.com"})
})

/* Dashboard page */
app.get('/dashboard', function (req, res) {
  var source = fs.readFileSync('views/dashboard.hbs')
  var template = Handlebars.compile(source.toString())
  res.send(template({imageUrls: images}))
})

io.of('/dashboard').on('connection', function(socket){
  socket.on('set scene', function (sceneIndex) {
    // check if sceneIndex corresponds to an image
    if (sceneIndex > images.length -1) return;
    activeSceneIndex = sceneIndex
    socket.broadcast.emit('new scene', images[sceneIndex])
    io.of('/').emit('update scene display', images[sceneIndex]);
  })
  socket.on('set background color', function (colorCode) {
    // check color code is valid
    console.log('DASH: setting background color')
    if ( colorCode.slice(1) === "#" 
      && colorCode.length === 7 || colorCode.length === 4
      && isNaN(colorCode.slice(1, 7)) ) {
        console.log('Background color is valid')
        io.of('/').emit('update background color', colorCode)
    } else {
      return
    }
  })
});


http.listen(PORT)
console.log('Server is listening on http://localhost:' + PORT)

// io on the server will listen for an emit asking for an image.
// it will respond with the url to that image

// listen to the dashboard emits and send image url 
// to people on the display page