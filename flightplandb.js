const request = require('request')
const baseUri = 'https://api.flightplandatabase.com'

class FlightPlanDB {
  constructor (apiKey) {
    this.apiKey = apiKey
  }

  getFlightPlan (id, callback) {
    this._sendRequest('plan', id, callback)
  }

  _sendRequest (type, options, callback) {
    const url = `${baseUri}/${type}/${options}`
    request(url, function (err, response, body) {
      if (err) {
        console.error(err)
      }
      if (!err) {
        callback(JSON.parse(body))
      }
    })
  }
}

module.exports = FlightPlanDB
