const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values', () =>{
		var param = {
			name: 2323,
			room: 'Friends'
		};
		expect(isRealString(param.name)).toBe(false);
		expect(isRealString(param.room)).toBe(true);
	});

	it('should reject string with only spaces', () =>{
		var param = {
			name : 'Akash',
			room : '    '
		};
		expect(isRealString(param.name)).toBe(true);
		expect(isRealString(param.room)).toBe(false);
	});

	it('should allow a string with non-space character', () =>{
		var param = {
			name : 'Akash',
			room : '  Friends   '
		};
		expect(isRealString(param.name)).toBe(true);
		expect(isRealString(param.room)).toBe(true);
	});
});

