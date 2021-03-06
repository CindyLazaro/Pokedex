var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const request = require('request');
const apiKey = 'e382be00f8cb67ca67272d26347cdf3b963c18c9';

async function asyncCall() {
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.emit('poke message auto', 'Bienvenido a Pokedex!');
	socket.emit('poke message auto', '¿En qué puedo ayudarte hoy?');
  socket.on('poke message', function(msg){
	  var pregunta = msg;
	  socket.emit('poke message', msg);
	  let url = 'http://beta.soldai.com/bill-cipher/askquestion?question='+pregunta+'&session_id='+app.sid+'&key='+apiKey+'&log=1';
	  request(url, function(err, response, body)
	   {
		   var json = JSON.parse(body);
		   socket.emit('poke message auto', json.current_response.message);
	   });
  });
  socket.on('poke message auto', function(msg){
	socket.emit('poke message auto', msg);

  });
});

  }
  
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Resuelto');
    }, 2000);
  });
  
}
asyncCall();
 

http.listen(4000, function(){
  console.log('listening on *:4000');
});
    