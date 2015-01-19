var express = require('express');
var router = express.Router();

var DinoMessage = require('../public/javascripts/sendSMS');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* POST for sending message to user. */
router.post('/sendMessage', function(req, res) {
  var to = req.body[0];
  var body = req.body[1];
  DinoMessage.sendMessage(body, to);
  res.end();
});

module.exports = router;

