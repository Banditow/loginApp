//RUN FROM ../website

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';
var insertDocument = function(db, callback){
	var collection = db.collection('test');
	
	collection.insert({'name':'Hans'}, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		console.log('Inserted 1 document into the collection');
		callback(result);
	});
}


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//MORE IMPORTS HERE

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());


app.get('/', function(req, res){
	res.render('home');
//	console.log('GET-Request at ' + __dirname);
});

app.use(function(req, res, next){
	console.log('Looking for URL: ' + req.url);
	console.log('Method: ' + req.method);
	next();
});


app.get('/login', function(req, res){
	res.render('login');
//	console.log('GET-Request at ' + __dirname);
});

app.post('/userauth', function(req, res){
	res.render('success');
	console.log(req.body.mail + req.body.pwd);
});

app.use(function(req, res, next){
        res.type('text/html');
        res.status(404);
        res.render('404');
});

MongoClient.connect(url, function(err, db) {
	if(err){
		console.log('Failed to connect to Database: ' + err);
	} else {
		console.log('Connected successfully to server');
	}
	insertDocument(db, function(){
		db.close();
	});
});

app.listen(app.get('port'), function(){
	console.log('Started on Localhost');
});

