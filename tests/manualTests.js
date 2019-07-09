const config = require('../config.json')
const apiKey = config.apiKey
const FlightPlanDB = require('../built/flightplandb.js')

const db = new FlightPlanDB(apiKey)

// db.getFlightPlan(1792992, (response) => {
//   console.log(response)
// })

// db.flightPlanFromTo('KCLE', 'KDEN', response => {
//   console.log(response)
// })

// db.generateFlightPlan('KCLE', 'KDEN', (response) => {
// 	console.log(response)
// })

// db.getAirport('KCLE', (response) => {
// 	console.log(response)
// })

// db.getWeather('KCLE', (response) => {
//   console.log(response)
// })
