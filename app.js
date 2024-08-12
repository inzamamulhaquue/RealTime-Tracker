const express = require('express');
const socketio = require("socket.io");
const http = require("http");
const path = require ("path");

const app = express();
const port = 3000;

const server = http.createServer(app);

const io = require('socket.io')(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection" , (socket) =>{
    socket.on('send-location', (data) => {
        io.emit("receive-location", {id: socket.id, ...data});
    });
    console.log("User connected");

    socket.on("disconnected", ()=>{
        io.emit("User disconnected", socket.id);
    });
});

app.get('/', (req,res) => {
    res.render("index");
});

server.listen ( port, () =>{
    console.log(`sever is running on localhost ${port}`)
});