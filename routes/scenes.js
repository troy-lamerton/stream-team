var express = require('express')
var router = express.Router()

var knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
var knex = require('knex')(knexConfig)

var tableName = 'scenes'

/* RESTful API for interfacing with the scenes table in the database */
/* this resource is located at /scenes */

function logScenes (scenes) {
  scenes.forEach(function (scene) {
    console.log(scene.id + ': ' + scene.title)
  })
}
/* read all scenes from database */
router.get('/', function (req, res) {
  console.log('send all the scenes-->')
  knex(tableName).select()
    .then(sendScenes(res))
    .catch(logError, res)
    .finally(cleanUp)
  // res.send(allTheScenes)
})

function sendScenes (res) {
  return function (scenes) {
    if(scenes.length < 1) res.status(404).end()
    else res.send(scenes)
  }
}

/* read a specific scene from the database */
router.get('/:id', function (req, res) {
  console.log('get scene with id:-->', req.params.id)
  knex(tableName).where('id', parseInt(req.params.id)).select()
    .then(sendScenes(res))
    .catch(logError, res)
    .finally(cleanUp)
  // res.send(thatOneScene)
})


router.get('/new', function (req, res) {
  console.log('send back an html form -->')

  res.status(404).end()
})

/* check the data is valid
create a new scene row in the scenes table */
router.post('/', function (req, res) {
  console.log('create new scene row-->')
  console.log('body of req:', req.query)
  // file upload content is in a different format!
  // watch out for multipart/form-data
  // knex(tableName)
  res.end()
  // res.send an error or OK (200)
})


/* check data is valid
update specific scene with this data */
router.put('/:id', function (req, res) {
  console.log('update scene with id:-->', req.params.id)
  res.status(503).end()
  // res.send an error or OK (200)
})


/* drop the specified scene row if it exists */
router['delete']('/:id', function (req, res) {
  console.log('delete the scene with id:', req.params.id)
  res.status(503).end()
  // drop the specified scene row if it exists
  // res.send an error or OK (200)
})


function logError (err, res) {
  console.error(err)
  res.status(500).send()
}

function cleanUp () {
  console.log('...request complete')
  // knex.destroy()
}


module.exports = router