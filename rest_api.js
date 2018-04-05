var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// Middleware stuff
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
     });
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// END Middleware stuff


// Constants
var PORT = 8888;

// Functions 
function authorize(base64_credentials, callback){
    if (base64_credentials === '' || ! base64_credentials ) {
        callback(null,"Corrupt data!");
    }
    var plain_text = Buffer.from(base64_credentials, 'base64').toString('ascii');
    var splitted = plain_text.split(':');

    if ( splitted.length != 2){
        callback(null,"Corrupt data!");
    }

    credentials = {
        username : splitted[0],
        password : splitted[1]
    }
    if ( credentials.username == 'matias' && credentials.password == '1234' ){
        callback("success",null);
    }else{
        callback(null,"Unauthorized");
    }
 }

// END Functions


// GET Methdods
app.get('/health', function (req, res) {
	console.log('Recibido!');
	res.header('Content-Type', 'text/html'); 
	res.status(200).end("Im okay!");
  
});

app.get('/authorize', function (req, res) {
    console.log(req.header('Authorization'));
	authorize(req.header('Authorization'), function(result,error) {
        console.log(req.header('Authorization'));
        if(error){
            res.header('Content-Type', 'text/html'); 
	        res.status(401).end(error);    
        }else{
            res.header('Content-Type', 'text/html'); 
	        res.status(200).end("Authorized!");
        }
    });
	
  
});

// POST Methdods
app.post('/post_something', function (req, res) {

});


app.options('*', function (req, res) {
   res.status(200).send("Ok");
});

// Safeguards
app.get('*', function (req, res) {
  res.status(500).send('Unknown method!')
});
app.post('*', function (req, res) {
  res.status(500).send('Unknown method!')
});


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});


/* EJEMPLO de request body

*/

