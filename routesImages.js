var express = require('express')
var router = express.Router()

var images = require('./public/sceneCollections/testScenes.json')

/* RESTful API for interfacing with the images table in the database */
/* this resource is located at /images */

/*read all images from database*/
router.get('/', function (req, res) {
  
  // res.send(allTheImages)
})

/*read a specific image from the database*/
router.get('/:id', function (req, res) {
  console.log('get image with id:', req.params.id)

  // res.send(thatOneImage)
})

/*check the data is valid
create a new image row in the images table*/
router.put('/', function (req, res) {

  // res.send an error or OK (200)
})

/*check data is valid
update specific image with this data*/
router.post('/:id', function (req, res) {
  console.log('edit image with id:', req.params.id)

  // res.send an error or OK (200)
})

/*drop the specified image row if it exists*/
router.destroy('/:id', function (req, res) {
  
  // drop the specified image row if it exists
  // res.send an error or OK (200)
})

module.exports = router