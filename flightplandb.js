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
    this._sendRequest('search/plans', {
      q: query
    }, callback)
  }

  // The from to version of the flight plan search
  flightPlanFromTo(from, to, callback) {
    this._sendRequest('search/plans', {
      from: from,
      to: to
    }, callback)
  }

  // The ICAO version of the From To search
  flightPlanIcaoFromTo(fromIcao, toIcao, callback) {
    this._sendRequest('search/plans', {
      fromICAO: fromIcao,
      toICAO: toIcao
    }, callback)
  }

  // Seaerch via flight number
  flightPlanFlightNumber(flightNumber, callback) {
    this._sendRequest('search/plans', {
      flightNumber: flightNumber
    }, callback)
  }

  // Generate a flight plan
  generateFlightPlan(fromIcao, toIcao, callback,
    useNat = true, usePacot = true, useAwylo = true, useAwyhi = true,
    cruiseAlt = 35000, cruiseSpeed = 420,
    ascentRate = 2500, ascentSpeed = 250,
    descentRate = 1500, descentSpeed = 250) {
    const options = {
      fromICAO: fromIcao,
      toICAO: toIcao,
      useNAT: useNat,
      usePACOT: usePacot,
      useAWYLO: useAwylo,
      useAWYHI: useAwyhi,
      cruiseAlt: cruiseAlt,
      cruiseSpeed: cruiseSpeed,
      ascentRate: ascentRate,
      ascentSpeed: ascentSpeed,
      descentRate: descentRate,
      descentSpeed: descentSpeed
    }

    const uri = `${baseUri}/auto/generate`
    axios.post(uri, options, {
      headers: {
        Authorization: this.apiKey
      }
    }).then(data => {
      callback(data.data)
    }).catch(err => {
      console.error(err)
    })
  }

  // The actual request function
  _sendRequest(type, options = {}, callback) {
    const uri = `${baseUri}/${type}`
    options.apiKey = this.apiKey
    axios.get(uri, {
      params: options
    }).then(data => {
      callback(data.data)
    }).catch(err => {
      console.error(err)
    })
  }
}

module.exports = FlightPlanDB