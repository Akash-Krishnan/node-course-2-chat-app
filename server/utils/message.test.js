const expect = require('expect');

const {app} = require('./../server');
var {generateMessage} = require('./message')

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