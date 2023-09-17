const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
app.use(cors());

const server = http.createServer(app); //http server

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  //react server 
        methods: ["GET", "POST", "DELETE"]
    }
});

io.on("connection", (socket) => {  //cand se conecteaza -> callback function
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User whit ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (date) => {
        socket.to(date.room).emit("receive_message", date); //emite mesajul la toti userii
    });

    socket.on("disconnect", () => { //disconnect part
        console.log("User Disconnected", socket.id);
    });
});


server.listen(3001, () => {
    console.log("Server running!"); //server cu port
});