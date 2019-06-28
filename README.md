# FlightPlanDB.js
An API wrapper for the website FlightPlanDatabase.com 
<br>WARNING: THIS IS FOR SIMULATION USE ONLY. DO NOT USE FOR REAL WORLD NAVIGATION.

## Use
To use the wrapper, simply import the FlightPlanDB module, and set a variable to a new instance of ``FlightPlanDB``. Call one of the attached methods, provide it the options it needs, and it will return the JSON object of the response.

## Methods
``getFlightPlan(id, callback)``-- Gets the flight plan from the database with the corresponding ID<br>
``getAirport(icao, callback)``-- Gets the airport information for a given ICAO code<br>
``getWeather(icao, callback)``-- Gets the METAR and TAF (if available) for the given ICAO airport<br>
``flightPlanQuery(query, callback)``-- Retrieves a search of all flightplans matching a query, including ICAOs, airport names, username, tags, or flight number<br>
``flightPlanFromTo(from, to, callback)``-- Retrieves a search of all flightplans from a location, to another<br>
``flightPlanIcaoFromTo(fromIcao, toIcao, callback)``-- Retrieves a search of all flightplans from a specific ICAO airport, to another<br>
``flightPlanFlightNumber(flightNumber, callback)``-- Retrieves a search of all flightplans with a given flight number<br>
``generateFlightPlan(fromIcao, toIcao, callback, {
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
})``-- Generates a flight plan with the given parameters. All parameters in the object are optional, and defaults are shown above.