"use strict";
var axios_1 = require("axios");
var baseUri = 'https://api.flightplandatabase.com';
// Class for the route object
var Route = /** @class */ (function () {
    function Route(nodes) {
        this.route = nodes;
    }
    return Route;
}());
// Main class
var FlightPlanDB = /** @class */ (function () {
    function FlightPlanDB(apiKey) {
        this.apiKey = apiKey;
    }
    // Get the flight plan with the corresponding ID
    FlightPlanDB.prototype.getFlightPlan = function (id, callback) {
        axios_1.default.get(baseUri + "/plan/" + id)
            .then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    // Get the airport information for the given ICAO
    FlightPlanDB.prototype.getAirport = function (icao, callback) {
        axios_1.default.get(baseUri + "/nav/airport/" + icao)
            .then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    // Get the weather for a given airport's ICAO
    FlightPlanDB.prototype.getWeather = function (icao, callback) {
        axios_1.default.get(baseUri + "/weather/" + icao)
            .then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    // The query version of the flight plan search
    FlightPlanDB.prototype.flightPlanQuery = function (query, callback) {
        this._sendRequest('search/plans', {
            q: query
        }, callback);
    };
    // The from to version of the flight plan search
    FlightPlanDB.prototype.flightPlanFromTo = function (from, to, callback) {
        this._sendRequest('search/plans', {
            from: from,
            to: to
        }, callback);
    };
    // The ICAO version of the From To search
    FlightPlanDB.prototype.flightPlanIcaoFromTo = function (fromIcao, toIcao, callback) {
        this._sendRequest('search/plans', {
            fromICAO: fromIcao,
            toICAO: toIcao
        }, callback);
    };
    // Seaerch via flight number
    FlightPlanDB.prototype.flightPlanFlightNumber = function (flightNumber, callback) {
        this._sendRequest('search/plans', {
            flightNumber: flightNumber
        }, callback);
    };
    // Generate a flight plan
    FlightPlanDB.prototype.generateFlightPlan = function (fromIcao, toIcao, callback, useNat, usePacot, useAwylo, useAwyhi, cruiseAlt, cruiseSpeed, ascentRate, ascentSpeed, descentRate, descentSpeed) {
        if (useNat === void 0) { useNat = true; }
        if (usePacot === void 0) { usePacot = true; }
        if (useAwylo === void 0) { useAwylo = true; }
        if (useAwyhi === void 0) { useAwyhi = true; }
        var parameters = {
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
        };
        var uri = baseUri + "/auto/generate";
        axios_1.default.post(uri, parameters, {
            headers: {
                Authorization: this.apiKey
            }
        })
            .then(function (data) {
            callback(data.data);
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    // The actual request function
    FlightPlanDB.prototype._sendRequest = function (type, options, callback) {
        var uri = baseUri + "/" + type;
        options.apiKey = this.apiKey;
        axios_1.default.get(uri, {
            params: options
        })
            .then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
            else
                console.error(data);
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    return FlightPlanDB;
}());
module.exports = FlightPlanDB;
