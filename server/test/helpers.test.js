const list_to_string = require('../helpers/list_to_string.js');



describe('helpers tests', function() {

	let test_array = ['one','two'];
	let test_string = '[ one, two ]';
	let test_string2 = 'L one, two }';
	
	it('list_to_string should be a function', function() {
		expect(list_to_string).toBeInstanceOf(Function);
	});
	it('list_to_string should return a string from a list', function() {
		expect(list_to_string(test_array)).toBe(test_string);
	});
	it('list_to_string should return a string from a list', function() {
		expect(list_to_string(test_array,'L ',' }')).toBe(test_string2);
	});		
});