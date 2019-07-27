const { validate, isNumber, hasLetters, isPositive } = require('simply_valid')

const config = require('../config.json')
const apiKey = config.apiKey
const FlightPlanDB = require('../src/flightplandb.js')

const hasNull = (val) => val || val === null

const db = new FlightPlanDB(apiKey)

// Validator object for the route object
const routeValidator = {
  id: [ isNumber, isPositive ],
  fromICAO: hasLetters,
  toICAO: hasLetters,
  fromName: hasLetters,
  toName: hasLetters,
  flightNumber: hasNull,
  distance: [ isNumber, isPositive ],
  maxAltitude: [ isNumber, isPositive ],
  waypoints: [ isNumber, isPositive ],
  likes: isNumber,
  downloads: isNumber,
  popularity: isNumber,
  notes: hasLetters,
  encodedPolyline: hasLetters,
  createdAt: hasLetters,
  updatedAt: hasLetters,
  tags: [ validate([ hasLetters ]) ],
  user: validate({
    id: isNumber,
    username: hasLetters,
    gravatarHash: hasLetters,
    location: hasNull
  }),
  route: validate({
    nodes: [
      validate({
        type: hasLetters,
        ident: hasLetters,
        name: hasLetters,
        lat: isNumber,
        lon: isNumber,
        alt: isNumber,
        via: hasNull
      })
    ]
  })
}

db.getFlightPlan(1792992).then((data) => {
  console.log(data)
  console.log(validate(routeValidator, data))
})

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
