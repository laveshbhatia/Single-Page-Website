//Import the express and url modules
var express = require('express');

//The express module is a function. When it is executed it returns an app object
var app = express();

//Create a data structure that will be accessed using the web service
var mysql = require('mysql');

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));

app.post('/login', handleLogin);
app.post('/register', handleRegister);
app.post('/fileupload', fileUpload);
app.post('/uploadPost', postUpload);
app.post('/displayPost', displayPost);
app.post('/search' , searchPost);

function searchPost(request, response) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "lavesh",
        password: "lavesh",
        database: "postbook"
    });
    con.connect(
        function (err) {
            if (err) response.send("error communicating");


        }
    );
    var sql = "SELECT * FROM posts where username ='" + request.body.user + "'";

    con.query(sql, function (err, result) {
        //Check for errors
        if (err) response.send("error communicating");

        if (result.length>0){
        var input = "";
        input += '<div class="row">';
        input += ' <div class="col-md-3 offset-md-9">'
        input += ' <input class=" mt-2 mb-2 " type="text" name="search" value="" autocomplete="off" id="myinput"\n' +
            '                   placeholder="Search"> '
        input += '<button onclick="searchFunction()" class="btn btn-success"> Search </button>'
        input +=   '</div>'
        input +=    '</div>'
        result.forEach(function (p) {

            input += '  <div class="col-md-6 offset-md-3">'
            input +=   '<h2 class="h3 p-2 text-info bg-light">' + p.username+ '</h2>'
            input +=  '<img class="img-thumbnail rounded mx-auto" src="images/' +p.path+ '" alt="Post image">'
            input +=   '<p class="text-center text-warning" id="wrapper">' + p.post + '</p>'
            input +=   '</div>'
            input +=    '</div>'
        })

        response.send(input);
    }else {
            response.send("OK");
        }
    });
}

function displayPost(request, response) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "lavesh",
        password: "lavesh",
        database: "postbook"
    });
    con.connect(
        function (err) {
                  if (err) response.send("error communicating");

        }
    );
    var sql = "SELECT * FROM posts";

    con.query(sql, function (err, result) {

        //Check for errors
              if (err) response.send("error communicating");
        var input = "";
        input += '<div class="row">';
        input += ' <div class="col-md-3 offset-md-9">'
        input += ' <input class=" mt-2 mb-2 " type="text" name="search" value="" autocomplete="off" id="myinput"\n' +
            '                   placeholder="Search"> '
input += '<button onclick="searchFunction()" class="btn btn-success"> Search </button>'
        input +=   '</div>'
        input +=    '</div>'
        result.forEach(function (p) {

            input += '  <div class="col-md-6 offset-md-3">'
            input +=   '<h2 class="h3 p-2 text-info bg-light">' + p.username+ '</h2>'
            input +=  '<img class="img-thumbnail rounded mx-auto" src="images/' +p.path+ '" alt="Post image">'
            input +=   '<p class="text-center text-warning" id="wrapper">' + p.post + '</p>'
            input +=   '</div>'
            input +=    '</div>'
        })

        response.send(input);


    });
    con.end();
}

//Close the connection



var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var newpath;
function fileUpload(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;

        newpath = 'C:/Users/nikil/Desktop/cw3 csd/public/images/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
                  if (err) response.send("error communicating");
            res.redirect("localhost:8080/fileupload");

        });
    });

}

function postUpload(request, response) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "lavesh",
        password: "lavesh",
        database: "postbook"

    });
    con.connect(
        function (err) {
                  if (err) response.send("error communicating");
        }
    );
    var path = newpath.split('/');
    var pathend = path[path.length - 1];
    var sql = "Insert into posts (path, post, username) values ('" + pathend + "','" + request.body.post + "','" + request.body.user + "')";

    con.query(sql, function (err, result) {
              if (err) response.send("error communicating");
        else {
            response.send("OK");
        }



    });
    con.end();
}

function handleLogin(request, response) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "lavesh",
        password: "lavesh",
        database: "postbook"

    });
    con.connect(
        function (err) {
                  if (err) response.send("error communicating");

        }
    );

    var sql = "Select * from users where username='" + request.body.user + "'";

    con.query(sql, function (err, result) {
              if (err) response.send("error communicating");


        if (result.length == 0)
            response.send("User not found, try again");

        else {
            result.forEach(function (u) {
                if (u.password === request.body.pass)
                    response.send("OK");
                else
                    response.send("Password incorrect");

            });
        }
    });

    con.end();
}

function handleRegister(request, response) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "lavesh",
        password: "lavesh",
        database: "postbook"

    });
    con.connect(
        function (err) {
                  if (err) response.send("error communicating");

        }
    );

    var sql = "Insert into users (email, password, username) values ('" + request.body.email + "','" + request.body.pass + "','" + request.body.user + "')";

    con.query(sql, function (err, result) {
        if (err) {
            response.send("Username already exists");
        }
        else {
            response.send("OK");
        }



    });
    con.end();
}





//Start the app listening on port 8080
app.listen(8080);

