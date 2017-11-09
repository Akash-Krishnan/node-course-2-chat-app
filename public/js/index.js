var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	// socket.emit('createEmail', {
	// 	to: 'aks@example.com',
	// 	text: 'Hi there!!'
	// });
	socket.emit('createMessage', {
		from: 'Akash',
		text: 'Okey. Sure will be'
	});
})

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
// 	console.log('New Email:', email);
// });

socket.on('newMessage', function(message) {
	console.log('New Message: ', message);
})