var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, '0.0.0.0');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname+'/static'));

app.route('/')
    .get((req, res) =>{
        res.sendFile(__dirname+'/client/index.html');
    })
;
app.route('/game')
    .post((req, res)=>{
        var args = req.body;
        res.redirect('?gameid='+args["gameid"]+'&player='+args["name"]);
    })
    .get((req, res)=>{
        res.sendFile(__dirname+'/client/game.html');
    })
;
app.route('/host')
    .get((req, res)=>{
        res.sendFile(__dirname+'/client/host.html');
    })
;
app.route('/start')
    .post((req, res) => {
        res.sendFile(__dirname+'/client/start.html');
    })
;

io.on('connection', socket => {
    socket.emit('message', 'HEYO');
    setTimeout(_=>{
        socket.emit('message', 'HEY YOURSELF!');
    }, 1000);
});
