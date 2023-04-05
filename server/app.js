const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http').Server(app);





// Routes which should handle requests

const Userroutes = require("./api/routes/userRoute.js");
const Chatroutes = require("./api/routes/chatRoute.js");

// Database connection
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://Pratik:' + process.env.MONGO_ATLAS_PW + '@cluster0.tbgorca.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;


// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// Socket.io
const socketIO = require('socket.io')(http,{
    cors:{
        // origin: '*',
        origin: 'http://localhost:3000',
    }
})

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

//   socket.broadcast.emit("user connected", {
//     userID: socket.id,
//     username: socket.username,
//   });
// socketIO.emit('newUserResponse', users);

  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

// socket.on means it is listening on this event called newUser
  socket.on('newUser', (data) => {
    console.log(socket.id);
    
    var obj={};
    obj['data'] = data.data;
    obj['socketID'] = socket.id;
    console.log(obj);
    console.log(users);

    // users.push(data);
    users.push(obj);
    console.log(users);
    console.log("users array printed");
    socketIO.emit('newUserResponse', users);
  });
  socket.on('disconnected',()=>{
    console.log('🔥: A user disconnecteddddddddddddddd');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    console.log(`🔥: A user with socketid ${socket.id} disconnectedoooooooooooooo`);
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});






// Routes which should handle requests
app.use('/api/user', Userroutes);
app.use('/api/chat',Chatroutes);    

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message: "ik",
        error:{
            message: error.message
        }
    });
});


http.listen(5000, () => {
    console.log("Server is running on port 5000");
    }
);