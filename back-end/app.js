const path = require('path');
var express = require('express');
const legos = require('./legos.json');
var app = express();

app.set('view engine', 'pug');

var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('home', {
      title: 'Home',
      legos: legos.lego
  });
});

app.get('/istruzioni', (req, res) => {
  const lego = legos.lego.find(l => l.setNumber === req.query.setNumber);
  res.render('lego', {
    title: `${lego.setNumber}`,
    lego,
  });
});

app.get('/api',function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname+'/legos.json'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});