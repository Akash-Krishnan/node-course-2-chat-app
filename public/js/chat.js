var socket = io();

function scrollToBottom() {
	//Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() {
	console.log('Connected to server');

	var params = jQuery.deparam(window.location.search);
	socket.emit('join', params, function(err) {
		if(err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	})
})

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('updateUserList', function(user) {
	var ol = jQuery('<ol></ol>');

	user.forEach(function (user) {
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template =  jQuery('#message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
	scrollToBottom();
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
	scrollToBottom();
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
