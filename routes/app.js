var express = require('express')
var router = express.Router()

var fs = require('fs')
var Handlebars = require('handlebars')

const activeSceneIndex = 0 // placeholder until a database is implemented

/* Display page */
router.get('/display', function (req, res) {
  var source = fs.readFileSync('views/display.hbs')
  var template =  Handlebars.compile(source.toString())
  console.log('new client being sent: ', activeSceneIndex)
  res.end() //(template(scenes[activeSceneIndex]))

  // res.render('display', {img: "www.google.com"})
})

/* Dashboard page */
router.get('/dashboard', function (req, res) {
  var source = fs.readFileSync('views/dashboard.hbs')
  var template = Handlebars.compile(source.toString())
  res.end() //(template({imageUrls: scenes}))
})

module.exports = router