const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Your Next.js frontend URL
    methods: ['GET', 'POST']
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

let connectedUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for join events to track users
  socket.on('join', (user) => {
    connectedUsers[user] = socket.id;
    console.log(`${user} joined the chat`);
  });

  // Listen for new messages
  socket.on('newMessage', (message) => {
    // Emit the message to the receiver in real-time
    const receiverSocket = connectedUsers[message.receiver];
    if (receiverSocket) {
      io.to(receiverSocket).emit('receiveMessage', message);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const user in connectedUsers) {
      if (connectedUsers[user] === socket.id) {
        delete connectedUsers[user];
      }
    }
  });
});

// Start the server
server.listen(4000, () => {
  console.log('Server running on port 4000');
});
