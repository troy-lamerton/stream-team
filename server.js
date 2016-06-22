var express = require('express')
var fs = require('fs')
var Handlebars = require('handlebars')
var app = express()
var http = require('http').Server(app);
var PORT = process.env.PORT || 3000

var io = require('socket.io')(http);

var images = require('./public/sceneCollections/testScenes.json')

// app.set('views', __dirname + '/views');
// app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

/* Display page */
app.get('/', function (req, res) {
  var source = fs.readFileSync('views/display.hbs')
  var template =  Handlebars.compile(source.toString())

  res.send(template({imageUrl: 'http://handlebarsjs.com/images/handlebars_logo.png'}))

	// res.render('display', {img: "www.google.com"})
})

io.on('connection', function(socket){
  // socket.on('want scene', function(sceneNum){
  //   io.emit('new scene', images[sceneNum-1])
  // })
  socket.on('new scene', function (sceneNum) {
    console.log('new scene being broadcast')
    console.log('the new scene: ' + images[sceneNum].slice(0, 10) + '...')
    socket.broadcast.emit('new scene', images[sceneNum])
  })
});

io.on('disconnect', function(socket){
  console.log('a user disconnected');
})

/* Dashboard page */
app.get('/dashboard', function (req, res) {
  var source = fs.readFileSync('views/dashboard.hbs')
  var template = Handlebars.compile(source.toString())
  res.send(template({imageUrls: images}))
})

http.listen(PORT)
console.log('Server is listening on http://localhost:' + PORT)

// io on the server will listen for an emit asking for an image.
// it will respond with the url to that image

// listen to the dashboard emits and send image url 
// to people on the display page