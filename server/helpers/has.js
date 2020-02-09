/**
 * Check if an item has a uppercase letter present
 *
 * @param 	{String}		input
 * @returns {boolean}
 */
function Uppercase (input) {
	let tmpNoNumber = input.replace(/[^A-Za-z]/g, '')
	let upperTmp = tmpNoNumber.toLocaleUpperCase()
	for (let i = 0; i < tmpNoNumber.length; i++) {
		if (tmpNoNumber.charAt(i) === upperTmp.charAt(i)) return true
	}
	return false
}

exports.Uppercase = Uppercase

/**
 * Returns all numeric from a string
 *
 * @param 	{String} 	input
 * @returns {boolean}
 */
function Number (input) {
	let strip = input.replace(/\D/g, '')
	return (strip.length > 0)
}

exports.Number = Number

/**
 * Check if an item exists
 *
 * @param 	{Property} 	input
 * @returns {boolean}
 */
function item (input) {
	if (input === null || input === undefined) return false
	if (input.toString().length < 1) return false
	return true
}

exports.item = item
