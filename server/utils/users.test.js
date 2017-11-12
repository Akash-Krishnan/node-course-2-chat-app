var expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Akash',
			room: 'Friends'
		},{
			id: '2',
			name: 'Sam',
			room: 'Work'
		}, {
			id: '3',
			name: 'Max',
			room: 'Friends'
		}]
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '124',
			name: 'Akash',
			room: 'Friends'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual(resUser);
	});

	it('should remove a user', () => {
		var userId = '2';
		var user = users.removeUser(userId);
		console.log(user);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should get a user with id', () => {
		var user = users.getUser('1');
		expect(user).toEqual([{
			id: '1',
			name: 'Akash',
			room: 'Friends'
		}]);

	});

	it('should not get user with invalid id', () => {
		var user = users.getUser('123');
		expect(user).toEqual([]);

	});

	it('should get user from Friends room', () => {
		var friendsUsers = users.getUserList('Friends');
		expect(friendsUsers).toEqual(['Akash', 'Max']);

	});

	it('should get user from work room', () => {
		var friendsUsers = users.getUserList('Work');
		expect(friendsUsers).toEqual(['Sam']);
		
	});
});
