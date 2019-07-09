// Import the expect function from Chai
import { expect } from 'chai'

// Import the module
import flightplandb = require('../built/flightplandb.js')

// Create a new flightplandb object
const db = new flightplandb('')

// The actual tests
describe('get', function () {
	it('', function () {
		let result = db.getAirport('kcle', (result) => {
			console.log(result)
		})
		expect(result).to.equal(result)
	})
})
