const mongosse = require('mongoose')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const Msg = require('./model/messages');

const mongoDB = 'mongodb+srv://oussama:skikdach21@cluster1.tz9yx.mongodb.net/message-database?retryWrites=true&w=majority'

mongosse.connect(mongoDB,()=>{
    console.log("connected mongo")
}).catch(err=>console.log(err))



const { Server } = require("socket.io");
const io = new Server(server);

var count = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
        
 



count++;
console.log(count);
      socket.on('chat message', msg => {
        const message = new Msg({ msg });
        message.save( ()=>{
            io.emit('chat message', msg)
        })
    
})
        

    socket.on('disconnect', (msgd) => {
        count--;
        io.emit('count', count);
        console.log(count);
      });
      io.emit('count', count);
  });


server.listen(3000, () => {
  console.log('listening on *:3000');
});