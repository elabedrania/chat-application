//const { Socket } = require('dgram');
let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{

    console.log(('server start'));
});

io.on('connection', (socket)=>{
    socket.on('join', (data)=>{
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('new user joined');
    });
    socket.on('message', (data)=>{
        io.in(data.room).emit('new message', {user: data.user, message: data.message});

    })
})