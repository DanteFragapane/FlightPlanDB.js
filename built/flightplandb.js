"use strict";
var axios_1 = require("axios");
var baseUri = 'https://api.flightplandatabase.com';
var FlightPlanDB = /** @class */ (function () {
    function FlightPlanDB(apiKey) {
        this.apiKey = apiKey;
    }
    // Get the flight plan with the corresponding ID
    FlightPlanDB.prototype.getFlightPlan = function (id, callback) {
        axios_1.default.get(baseUri + "/plan/" + id).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
        }).catch(function (err) {
            console.error(err);
        });
    };
    // Get the airport information for the given ICAO
    FlightPlanDB.prototype.getAirport = function (icao, callback) {
        axios_1.default.get(baseUri + "/nav/airport/" + icao).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
        }).catch(function (err) {
            console.error(err);
        });
    };
    // Get the weather for a given airport's ICAO
    FlightPlanDB.prototype.getWeather = function (icao, callback) {
        axios_1.default.get(baseUri + "/weather/" + icao).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
        }).catch(function (err) {
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
    FlightPlanDB.prototype.generateFlightPlan = function (fromIcao, toIcao, callback, options) {
        if (options === void 0) { options = {
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
        }; }
        var parameters = {
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
        };
        var uri = baseUri + "/auto/generate";
        axios_1.default.post(uri, parameters, {
            headers: {
                Authorization: this.apiKey
            }
        }).then(function (data) {
            callback(data.data);
        }).catch(function (err) {
            console.error(err);
        });
    };
    // The actual request function
    FlightPlanDB.prototype._sendRequest = function (type, options, callback) {
        var uri = baseUri + "/" + type;
        options.apiKey = this.apiKey;
        axios_1.default.get(uri, {
            params: options
        }).then(function (data) {
            if (data.status === 200) {
                callback(data.data);
            }
            else
                console.error(data);
        }).catch(function (err) {
            console.error(err);
        });
    };
    return FlightPlanDB;
}());
module.exports = FlightPlanDB;
