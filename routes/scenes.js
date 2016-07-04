var express = require('express')
var router = express.Router()

var fs = require('fs')
var knexConfig = require('../knexfile').development
var knex = require('knex')(knexConfig)

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
  knex('scenes').select()
    .then(sendScenes(res))
    .catch(logError)
    .finally(cleanUp)
  // res.send(allTheScenes)
})

function sendScenes (res) {
  return function (scenes) {
    res.send(scenes)
  }
}

/* read a specific scene from the database */
router.get('/:id', function (req, res) {
  console.log('get scene with id:-->', req.params.id)
  res.end()
  // res.send(thatOneScene)
})

/* check the data is valid
create a new scene row in the scenes table */
router.put('/', function (req, res) {
  console.log('create new scene row-->')
  res.end()
  // res.send an error or OK (200)
})

/* check data is valid
update specific scene with this data */
router.post('/:id', function (req, res) {
  console.log('update scene with id:-->', req.params.id)
  res.end()
  // res.send an error or OK (200)
})

/* drop the specified scene row if it exists */
router.delete('/:id', function (req, res) {
  console.log('delete the scene with id:', req.params.id)
  res.end()
  // drop the specified scene row if it exists
  // res.send an error or OK (200)
})

function logError (err) {
  console.error(err)
}

function cleanUp () {
  console.log('<---Request complete')
  // knex.destroy()
}


module.exports = router