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
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template =  jQuery('#message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template =  jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url:message.url,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});


// jQuery('#message-form').on('submit', function(e) {
// 	e.preventDefault();
// })

jQuery('#message-form').on('submit', function(e) {
  	e.preventDefault();
  	var messageTextBox = jQuery('[name=message]');
  	socket.emit('createMessage', {
  		from: 'User',
  		text: messageTextBox.val()
  	}, function() {
  		messageTextBox.val('');
  	});
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Sorry not supported for you browser');
	}

	locationBtn.attr('disabled', 'disabled').text('Sending Location..');

	navigator.geolocation.getCurrentPosition(function(position) {
		locationBtn.removeAttr('disabled').text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		alert('Cant access the location');
		locationBtn.removeAttr('disabled').text('Send Location');
	})
});
