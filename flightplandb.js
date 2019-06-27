const axios = require('axios')
const baseUri = 'https://api.flightplandatabase.com'

class FlightPlanDB {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  getFlightPlan(id, callback) {
    axios.get(`${baseUri}/plan/${id}`).then(data => {
      if (data.status === 200) {
        callback(data.data)
      }
    }).catch(err => {
      console.error(err)
    })
  }

  flightPlanQuery(query, callback) {
    this._sendRequest('search/plans', { q: query }, callback)
  }

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
