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

function makeid() {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

exports.searchBookName = function searchBookName(keySearch,callback){
	con.query("SELECT id,book_name,quantity FROM soa.books where book_name regexp '" + keySearch + "'",function(err,rows){
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

exports.bookList = function bookList(callback){
	con.query("SELECT * FROM soa.books",function(err,rows){
		var result = {'booksList':rows};
		callback(null,result);
	});
}

exports.addBook = function addBook(bookName,bookDescription,bookQuantity,callback){
	con.query("INSERT INTO soa.books (id, book_name, description,quantity) VALUES ('"+makeid()+"', '"+bookName+"','"+bookDescription+"','"+bookQuantity+"')",function(err,rows){
		var result ={};
		if (rows.affectedRows = 1) result = {'status':'done'};
		else result = {'status':'fail'};
		callback(null,result);
	});
}

exports.deleteBook = function deleteBook(bookID,callback){
	con.query("DELETE FROM soa.books WHERE id = '"+bookID+"'",function(err,rows){
		var result = {};
		if (rows.affectedRows = 1) result = {'status':'done'};
		else result = {'status':'fail'};
		callback(null,result);
	});
}

exports.adjustBook = function adjustBook(bookID,bookName,bookDescription,bookQuantity,callback){
	con.query("UPDATE soa.books SET book_name = '"+bookName+"',description = '"+bookDescription+"', quantity = '"+bookQuantity+"' WHERE id = '"+bookID+"'",function(err,rows){
		var result = {};
		if (rows.affectedRows = 1) result = {'status':'done'};
		else result = {'status':'fail'};
		callback(null,result);
	});
}

