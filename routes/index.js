var express = require('express');
var router = express.Router();
var Events= new require("events");
var myEvent = new Events();
/* GET home page. */
myEvent.on("doit",function(){
  console.log("asdasdas");
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/abc', function(req, res, next) {

  myEvent.emit("doit");
  res.render('index', { title: '8.1活动' });
});
module.exports = router;
