const express = require('express')
const http = require("http");

const contactRouter = require('./routes/contacts')
const authRouter = require("./routes/auth")
const app = express()
const cors = require("cors")
const server = http.createServer(app)
const io = require("socket.io")(server, { cors: { origin: '*' } })
const db = require('./db/connection');

// Auth part
io.use((socket, next) => {
    const userId = socket.handshake.auth.id;
    if (!userId) {
        return next(new Error("invalid username"));
    }
    socket.userId = userId;
    next();
});

io.on('connection', async (socket) => {
    console.log("User " + socket.userId + " has connected with id: "+socket.id);
    socket.join(socket.userId);
    const queryResponse = await db.query("SELECT * FROM contact WHERE $to in to", {
        to: socket.userId,
    });
    queryResponse[0].result.map(contact => {
        console.log("Giving every Contact a socket rooom "+contact.id);
        socket.join(contact.id)
    })

    socket.on("private message", ({ roomId, content }) => {
        console.log("Recieved private message: "+content)
        io.sockets.in(socket.userId).in(roomId).emit("private message", {
            roomId,
            content,
            from: socket.userId,
        });
    });

    socket.on('disconnect', () => {
        console.log("User " + socket.userId + " has disconnected");
    });
});

app.use(express.json())

app.use(cors());
app.use(contactRouter);
app.use(authRouter);

// Error handling
app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(res.statusCode || 500);
    res.json({
        message: error.message
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});