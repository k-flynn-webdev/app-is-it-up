function Uppercase (input) {
	let tmpNoNumber = input.replace(/[^A-Za-z]/g, '')
	let upperTmp = tmpNoNumber.toLocaleUpperCase()
	for (let i = 0; i < tmpNoNumber.length; i++) {
		if (tmpNoNumber.charAt(i) === upperTmp.charAt(i)) return true
	}
	return false
}

exports.Uppercase = Uppercase

function Number (input) {
	let strip = input.replace(/\D/g, '')
	return (strip.length > 0)
}

exports.Number = Number

function Exists (input) {
	if (input === null || input === undefined) return false
	if (input.toString().length < 1) return false
	return true
}
exports.Exists = Exists
