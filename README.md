# FlightPlanDB.js
An API wrapper for the website FlightPlanDatabase.com 
<br>WARNING: THIS IS FOR SIMULATION USE ONLY. DO NOT USE FOR REAL WORLD NAVIGATION.

## Use
To use the wrapper, simply import the FlightPlanDB module, and set a variable to a new instance of ``FlightPlanDB``. Call one of the attached methods, provide it the options it needs, and it will return the JSON object of the response.

## Methods
``getFlightPlan(id, callback)``-- Gets the flight plan from the database with the corresponding ID
``flightPlanQuery(query, callback)``-- Retrieves a search of all flightplans matching a query, including ICAOs, airport names, username, tags, or flight number
``flightPlanFromTo(from, to, callback)``-- Retrieves a search of all flightplans from a location, to another
``flightPlanIcaoFromTo(fromIcao, toIcao, callback)``-- Retrieves a search of all flightplans from a specific ICAO airport, to another
``flightPlanFlightNumber(flightNumber, callback)``-- Retrieves a search of all flightplans with a given flight number