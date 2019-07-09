import Axios from 'axios'
const baseUri = 'https://api.flightplandatabase.com'

interface Options {
	[propName: string]: any
}

// Interface to set up nodes
interface Nodes {
	nodes: Array<{
		type: string
		ident: string
		name: string
		lat: number
		lon: number
		alt: number | null
		via: string | null
	}>
}

// Class for the route object
class Route {
	route: Nodes
	constructor (nodes: Nodes) {
		this.route = nodes
	}
}

// Main class
class FlightPlanDB {
	apiKey: string

	constructor (apiKey: string) {
		this.apiKey = apiKey
	}

	// Get the flight plan with the corresponding ID
	getFlightPlan (id: number, callback: Function) {
		Axios.get(`${baseUri}/plan/${id}`)
			.then((data) => {
				if (data.status === 200) {
					callback(data.data)
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	// Get the airport information for the given ICAO
	getAirport (icao: string, callback: Function) {
		Axios.get(`${baseUri}/nav/airport/${icao}`)
			.then((data) => {
				if (data.status === 200) {
					callback(data.data)
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	// Get the weather for a given airport's ICAO
	getWeather (icao: string, callback: Function) {
		Axios.get(`${baseUri}/weather/${icao}`)
			.then((data) => {
				if (data.status === 200) {
					callback(data.data)
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	// The query version of the flight plan search
	flightPlanQuery (query: string, callback: Function) {
		this._sendRequest(
			'search/plans',
			{
				q: query
			},
			callback
		)
	}

	// The from to version of the flight plan search
	flightPlanFromTo (from: string, to: string, callback: Function) {
		this._sendRequest(
			'search/plans',
			{
				from: from,
				to: to
			},
			callback
		)
	}

	// The ICAO version of the From To search
	flightPlanIcaoFromTo (fromIcao: string, toIcao: string, callback: Function) {
		this._sendRequest(
			'search/plans',
			{
				fromICAO: fromIcao,
				toICAO: toIcao
			},
			callback
		)
	}

	// Seaerch via flight number
	flightPlanFlightNumber (flightNumber: string, callback: Function) {
		this._sendRequest(
			'search/plans',
			{
				flightNumber: flightNumber
			},
			callback
		)
	}

	// Generate a flight plan
	generateFlightPlan (
		fromIcao: string,
		toIcao: string,
		callback,
		useNat = true,
		usePacot = true,
		useAwylo = true,
		useAwyhi = true,
		cruiseAlt?: 35000,
		cruiseSpeed?: 420,
		ascentRate?: 2500,
		ascentSpeed?: 250,
		descentRate?: 1500,
		descentSpeed?: 250
	) {
		const parameters = {
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
		Axios.post(uri, parameters, {
			headers: {
				Authorization: this.apiKey
			}
		})
			.then((data) => {
				callback(data.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	// The actual request function
	private _sendRequest (type, options: Options, callback) {
		const uri = `${baseUri}/${type}`
		options.apiKey = this.apiKey
		Axios.get(uri, {
			params: options
		})
			.then((data) => {
				if (data.status === 200) {
					callback(data.data)
				} else console.error(data)
			})
			.catch((err) => {
				console.error(err)
			})
	}
}

export = FlightPlanDB
