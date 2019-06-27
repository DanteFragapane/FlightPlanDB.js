const axios = require('axios')
const baseUri = 'https://api.flightplandatabase.com'

class FlightPlanDB {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  // Get the flight plan with the corresponding ID
  getFlightPlan(id, callback) {
    axios.get(`${baseUri}/plan/${id}`).then(data => {
      if (data.status === 200) {
        callback(data.data)
      }
    }).catch(err => {
      console.error(err)
    })
  }

  // The query version of the flight plan search
  flightPlanQuery(query, callback) {
    this._sendRequest('search/plans', { q: query }, callback)
  }

  // The to from version of the flight plan search
  flightPlanFromTo(from, to, callback) {
    this._sendRequest('search/plans', { from: from, to: to }, callback)
  }

  // The actual request function
  _sendRequest(type, options = {}, callback) {
    const uri = `${baseUri}/${type}`
    options.apiKey = this.apiKey
    axios.get(uri, {params: options}).then(data => {
      callback(data.data)
    }).catch(err => {
      console.error(err)
    })
  }
}

module.exports = FlightPlanDB
