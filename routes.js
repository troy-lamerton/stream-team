var express = require('express')
var router = express.Router()

var fs = require('fs')
var Handlebars = require('handlebars')
var images = require('./public/sceneCollections/testScenes.json')

const activeSceneIndex = 0 // placeholder until a database is implemented

/* Display page */
router.get('/', function (req, res) {
  var source = fs.readFileSync('views/display.hbs')
  var template =  Handlebars.compile(source.toString())
  console.log('new client being sent: ', activeSceneIndex)
  res.send(template(images[activeSceneIndex]))

  // res.render('display', {img: "www.google.com"})
})

/* Dashboard page */
router.get('/dashboard', function (req, res) {
  var source = fs.readFileSync('views/dashboard.hbs')
  var template = Handlebars.compile(source.toString())
  res.send(template({imageUrls: images}))
})

module.exports = router