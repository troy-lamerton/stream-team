var express = require('express')
var fs = require('fs')
var Handlebars = require('handlebars')
var app = express()
var PORT = process.env.PORT || 3000
var images = require('./public/sceneCollections/testScenes.json')

// app.set('views', __dirname + '/views');
// app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  var source = fs.readFileSync('views/display.hbs')
  var template =  Handlebars.compile(source.toString())

  res.send(template({imageUrl: 'http://handlebarsjs.com/images/handlebars_logo.png'}))

	// res.render('display', {img: "www.google.com"})
})

app.get('/dashboard', function (req, res) {
  var source = fs.readFileSync('views/dashboard.hbs')
  var template = Handlebars.compile(source.toString())

  console.log('images after require:', images)
  console.log('images after json parse:', JSON.parse(images))
})

app.listen(PORT)
console.log('Server is listening on http://localhost:' + PORT)