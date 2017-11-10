const expect = require('expect');

const {app} = require('./../server');
var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {

	it('should generate correct message object', () => {

		var res = generateMessage('Akash', 'Testing generateMessage func');
			expect(res.createdAt).toBeA('number');
			expect(res).toInclude({
				from: 'Akash',
				text: 'Testing generateMessage func'
			})
			
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var res = generateLocationMessage('Akash',10, 20);
		expect(res.createdAt).toBeA('number');
		expect(res).toInclude({
			from: 'Akash',
			url: 'https://google.com/maps?q=10,20'
		})
	});
});