var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
	res.send('<body>Hello, this is where the image will go</body>')
})

app.listen(PORT)