// Import the expect function from Chai
import { expect } from 'chai'

// Import the modules
import flightplandb = require('../built/flightplandb')
import airport = require('../built/airport')

// Import the config file
import config = require('../config.js')

// Create a new flightplandb object
const db = new flightplandb(config.apiKey)

// The actual tests
describe('get', function () {
  it('getAirport', function () {
    const result = db.getAirport('kcle', (result) => {
			result = 
      return expect(result).to.be.an.instanceof()
    })
  })

  it('generatePlan', function () {
    const result = db.generateFlightPlan('KCLE', 'KDEN', (result) => {})
    expect(result).equal(1)
  })
})
