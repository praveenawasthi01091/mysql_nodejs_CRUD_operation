var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'userInfo'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all room Links
app.get('/getallRoomLink', function (req, res) {
    dbConn.query('SELECT * from roomLink', function (error, results, fields) {
        if (error) throw error;
        return res.send({  data: results });
    });
});
 
 
// Retrieve room link with room id 
app.get('/getRoomLinkByRoomId/:id', function (req, res) {
  
    let roomId = req.params.id;
  
    if (!roomId) {
        return res.status(400).send({ error: true, message: 'Please provide room_id' });
    }
  
    dbConn.query('SELECT * FROM roomLink where roomId=?', roomId, function (error, results, fields) {
        if (error) throw error;
        return res.send({  data: results[0]});
    });
  
});
 
 
// Add a new roomLink 
app.post('/saveroomLink', function (req, res) {
  
    var roomValue = req.body.data;
    var roomValue1=1234;
    console.log(roomValue);
    var y=(Math.random() * 100).toString().replace('.', '');
    // var ip='https://192.168.147.22';
    var ip='https://172.23.239.100';
    var port=':9000';
    
    y=ip+port+'#'+y;

    var post  = {roomId: roomValue.roomId, roomAddress: y};
    var query = dbConn.query('INSERT INTO roomLink SET ?', post, function(err, result) {
      // Neat!
    });
    console.log(query.sql); 

    return res.send({ error: false,  message: 'New roomLink has been added successfully.' });

});


/** server config */
var port = process.env.PORT || 9001;

// set port
app.listen(port, function () {
    console.log('Node app is running on port 9001');
});
 
 module.exports = app;
