let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server)
let bodyParser = require('body-parser')

let path = require('path');

 let users = [];
 let connections = [];
 //Connect
 io.sockets.on('connection', function(socket){
   connections.push(socket);
   console.log('Connected: %s sockets connected', connections.length);
   console.log(connections[0].id)


 //Disconnect
 socket.on('disconnect', function(data){

   users.splice(users.indexOf(socket.username), 1);
   updateUsernames();
   connections.splice(connections.indexOf(socket), 1);
   console.log('Disconnected: %s sockets connected', connections.length);
 })

 //Send message
 socket.on('send message', function(data){
   console.log(data)
  io.sockets.emit('new message', {msg:data, user: socket.username});
})

//new user
socket.on('new user', function(data,callback){
  callback(true);
  socket.username = data;
  users.push(socket.username);
  updateUsernames();
})

// io.sockets.emit('get connections', connections)
function updateUsernamess(){
  io.sockets.emit('get connetions', connections);
}
function updateUsernames(){
  io.sockets.emit('get users', users);
}
});










server.listen(process.env.PORT || 3000);
console.log('Server  hi running HIJOPUTA........')



// app.use(bodyParser.json());
// app.use('/', express.static('client2'));



app.get('/', function(req, res){
  res.sendFile(__dirname + '/client2/index.html');
})

app.get('/assets/js/bundlechat.js', function(req, res){
  res.sendFile(__dirname + '/client2/assets/js/bundlechat.js')
})
app.get('/assets/js/bundlevideo.js', function(req, res){
  res.sendFile(__dirname + '/client2/assets/js/bundlevideo.js')
})
app.get('/assets/css/style.css', function(req, res){
  res.sendFile(__dirname + '/client2/assets/css/style.css')
})
app.get('/assets/css/stylewebcam.css', function(req, res){
  res.sendFile(__dirname + '/client2/assets/css/stylewebcam.css')
})
app.get('/assets/img/fondo2.jpg', function(req, res){
  res.sendFile(__dirname + '/client2/assets/img/fondo2.jpg')
})

app.get('/battle', function(req, res){
  res.sendFile(__dirname + '/client2/index3.html')
})
