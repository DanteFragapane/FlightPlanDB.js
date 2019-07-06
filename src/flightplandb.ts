import Axios from 'axios';
const baseUri = 'https://api.flightplandatabase.com'

interface Options {
  [propName: string]: any
}

interface Route {

}

class FlightPlanDB {
  apiKey: string
  
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  // Get the flight plan with the corresponding ID
  getFlightPlan(id, callback) {
    Axios.get(`${baseUri}/plan/${id}`).then(data => {
      if (data.status === 200) {
        callback(data.data)
      }
    }).catch(err => {
      console.error(err)
    })
  }

  // Get the airport information for the given ICAO
  getAirport(icao, callback) {
    Axios.get(`${baseUri}/nav/airport/${icao}`).then(data => {
      if (data.status === 200) {
        callback(data.data)
      }
    }).catch(err => {
      console.error(err)
    })
  }

  // Get the weather for a given airport's ICAO
  getWeather(icao, callback) {
    Axios.get(`${baseUri}/weather/${icao}`).then(data => {
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
  generateFlightPlan(fromIcao, toIcao, callback, options = {
    useNat: true,
    usePacot: true,
    useAwylo: true,
    useAwyhi: true,
    cruiseAlt: 35000,
    cruiseSpeed: 420,
    ascentRate: 2500,
    ascentSpeed: 250,
    descentRate: 1500,
    descentSpeed: 250
  }) {
    const parameters = {
      fromICAO: fromIcao,
      toICAO: toIcao,
      useNAT: options.useNat,
      usePACOT: options.usePacot,
      useAWYLO: options.useAwylo,
      useAWYHI: options.useAwyhi,
      cruiseAlt: options.cruiseAlt,
      cruiseSpeed: options.cruiseSpeed,
      ascentRate: options.ascentRate,
      ascentSpeed: options.ascentSpeed,
      descentRate: options.descentRate,
      descentSpeed: options.descentSpeed
    }

    const uri = `${baseUri}/auto/generate`
    Axios.post(uri, parameters, {
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
  private _sendRequest(type, options: Options, callback) {
    const uri = `${baseUri}/${type}`
    options.apiKey = this.apiKey
    Axios.get(uri, {
      params: options
    }).then(data => {
      if (data.status === 200) {
        callback(data.data)
      } else console.error(data)
    }).catch(err => {
      console.error(err)
    })
  }
}

export = FlightPlanDB