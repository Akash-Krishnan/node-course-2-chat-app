var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	// socket.emit('createEmail', {
	// 	to: 'aks@example.com',
	// 	text: 'Hi there!!'
	// });
})

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
// 	console.log('New Email:', email);
// });

socket.on('newMessage', function(message) {
	console.log('New Message: ', message);

	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var li = jQuery('<li></li>');
	var a = jQuery('<a target = _blank>My current Location</a>');

	li.text(`${message.from}:`);
	a.attr('href', message.url);
	li.append(a);

	jQuery('#messages').append(li);

});


// jQuery('#message-form').on('submit', function(e) {
// 	e.preventDefault();
// })

jQuery('#message-form').on('submit', function(e) {
  	e.preventDefault();

  	socket.emit('createMessage', {
  		from: 'User',
  		text: jQuery('[name=message]').val()
  	}, function() {

  	});
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Sorry not supported for you browser');
	}

	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		alert('Cant access the location');
	})
});
