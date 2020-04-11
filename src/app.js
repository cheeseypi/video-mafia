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

var game = io.of('/game').on('connection', socket =>{
    socket.emit('ack');
    socket.on('attachGame', (gameid)=>{
        socket.join(gameid);
        socket.emit('joinedGame', gameid);
        socket.on('ready', (player) => {
            console.log("Player "+player+" in game "+gameid+" is ready.")
            socket.emit('pend');
            socket.emit('start', 'Mafioso')
        });
    })
});

io.on('connection', socket => {
});
