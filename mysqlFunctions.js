var mysql = require("mysql");
var express = require("express");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "12345678",
	database: "soa"
});

con.connect(function(err){
	if(err){
		console.log("Error connecting to database");
		return;
	}
	console.log("Connection to databases established");
});

exports.searchBookName = function searchBookName(keySearch,callback){
	con.query("SELECT id,book_name,quantity FROM soa.books where book_name regexp '" + keySearch + "'",function(err,rows){
		console.log(rows[1]);
		var result = {'books':rows};
		callback(null,result);
	});
}

exports.showBookName = function showBookName(bookNumber,page,callback){
	con.query("SELECT id,book_name,quantity FROM soa.books",function(err,rows){
		var numOfPage = Math.ceil(Object.keys(rows).length/bookNumber);
		var begin = (page - 1) * bookNumber;
		var end = page * bookNumber;
		if (end > Object.keys(rows).length) 
			end = Object.keys(rows).length;
		console.log(numOfPage);
		console.log(begin);
		console.log(end);
		var result = [];
		for (var i = begin;i<end;i++){
			result.push(rows[i]);
		}
		result = {
					'numOfPage':numOfPage,
					'books':result
				};
		callback(null,result);
	});
}


exports.borrowBook = function borrowBook(bookID,bookQuantity,callback){
	con.query("SELECT quantity FROM soa.books where id = '"+bookID+"'",function(err,rows){
		var quantity = rows[0].quantity;
		updateQuantity(bookID,bookQuantity,quantity,function(err,result){
			callback(null,result);
		});
	});
}

function updateQuantity(bookID,bookQuantity,quantity,callback){
	con.query("update soa.books set quantity = " + (quantity-bookQuantity) +" where id = '"+bookID+"'",function(err,rows){
		result =  {'status':'done'};
		callback(null,result);
	});
}

exports.bookDetail = function bookDetail(bookID,callback){
	con.query("select id,book_name,description from soa.books where id = '"+bookID+"'",function(err,rows){
		var result = {'book_detail':rows};
		callback(null,result);
	});
}