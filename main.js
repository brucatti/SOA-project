var express = require('express');
var bodyParser = require('body-parser');
var SQL = require('./mysqlFunctions.js');
var app = express();
var port = 8080;

app.listen(port);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var responseHeaders = {  
    "access-control-allow-origin": "http://localhost:8080",
    "Content-Type": "application/json"
};

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

console.log('Server started! At http://localhost:' + port);

app.post('/webAPI/search-book-name', function(req,res){
	console.log ("webAPI -- /search-book-name");
	var keySearch = req.body.keySearch;
	SQL.searchBookName(keySearch,function(err,result){
		res.send(result);
		res.end();
	});
});

app.post('/webAPI/show-book-name', function(req,res){
	console.log ("webAPI -- /show-book-name");
	var bookNumber = req.body.bookNumber;
	var page = req.body.page;
	SQL.showBookName(bookNumber,page,function(err,result){
		res.send(result);
		res.end();
	});
});


app.post('/webAPI/borrow-book', function(req,res){
	console.log ("webAPI -- /borrow-book");
	var bookID = req.body.bookID;
	var bookQuantity = req.body.bookQuantity;
	SQL.borrowBook(bookID,bookQuantity,function(err,result){
		res.send(result);
		res.end();
	});
});

app.post('/webAPI/book-detail', function(req,res){
	console.log ("webAPI -- /book-detail");
	var bookID = req.body.bookID;
	SQL.bookDetail(bookID,function(err,result){
		res.send(result);
		res.end();
	});
});




