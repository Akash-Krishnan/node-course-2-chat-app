const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newEmail', {
	// 	from: 'aks123@example.com',
	// 	text: 'Hello!!!!',
	// 	createdAt: 1235
	// });

	// socket.on('createEmail', (email) => {
	// 	console.log('Mail:', email);
	// });

	socket.emit('newMessage', {
		from: 'silvester',
		text: 'Be online at 6.',
		createdAt: 42143
	});

	socket.on('createMessage', (message) => {
		console.log('New message: ', message);
	});

	socket.on('disconnect', (socket) => {
		console.log('Client disconnected');
	});
});

io.on('disconnect', (socket) => {
	console.log('Connection terminated')
});


app.use(express.static(publicPath));


// app.get('/', (req, res) => {
// 	res.sendFile(publicPath + '/index.html');
// });	

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
})
