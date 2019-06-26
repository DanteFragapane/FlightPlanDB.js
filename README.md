# FlightPlanDB.js
An API wrapper for the website FlightPlanDatabase.com 
<br>WARNING: THIS IS FOR SIMULATION USE ONLY. DO NOT USE FOR REAL WORLD NAVIGATION.

## Use
To use the wrapper, simply import the FlightPlanDB module, and set a variable to a new instance of ``FlightPlanDB``. Call one of the attached methods, provide it the options it needs, and it will return the JSON object of the response.

## Methods
``GetFlightPlan( {ID} )``-- Gets the flight plan from the database with the corresponding ID