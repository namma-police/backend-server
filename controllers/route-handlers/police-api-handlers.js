/* @author booleanhunter
 * @details These are the API handlers for authentication
 */

var async = require('async');

var policeDbApi = require('../../database/police-db-api');
var authDbApi = require('../../database/auth-db-api');
var googleMapsApi = require('../utilities/google-maps-api');
var debug = require('debug')('nammapolice:police-api-handlers');

function acknowledgeRequest(req, responseCallback) {
    debug('api-handler acknowledgeRequest');
    var reqBody = req.body;
    if (typeof(reqBody.citizenDetails) === 'string') {
        reqBody.citizenDetails = JSON.parse(reqBody.citizenDetails)
    }
    if (typeof(reqBody.policeDetails) === 'string') {
        reqBody.policeDetails = JSON.parse(reqBody.policeDetails)
    }
    var citizenCoordinates = [Number(reqBody.citizenDetails.location.coordinates[1]), Number(reqBody.citizenDetails.location.coordinates[0])];

    async.auto({
        one: function(callback) {
            policeDbApi.checkIssueStatus(reqBody.issueId, callback);
        },

        two: ['one', function(callback, results) {
            if (results.one.status === 'active') {
                googleMapsApi.getlatLngDetails(reqBody.citizenDetails.location.coordinates, callback);
            } else {
                var result = {
                    status: 'A police is already on it'
                }
                callback(result);
            }

        }],
        three: ['two', function(callback, results) {
            authDbApi.getPoliceDetails(reqBody.policeDetails, callback);
        }]
    }, function(err, results) {
        if (err) {
            debug(err);
            if (err.status) {
                responseCallback(err);
            }
        } else {
            var citizenDetails = {
                userId: reqBody.citizenDetails.userId,
                displayName: reqBody.citizenDetails.displayName,
                phone: reqBody.citizenDetails.userId,
                location: {
                    address: results.two.results[0].formatted_address,
                    coordinates: citizenCoordinates
                }
            }

            var policeDetails = {
                userId: reqBody.policeDetails.userId,
                displayName: reqBody.policeDetails.displayName,
                //phone: reqBody.policeDetails.phone,
                location: results.three.location
            }

            var citizenData = {
                    issueId: reqBody.issueId,
                    citizenDetails: citizenDetails
                },
                date = new Date(),
                policeData = {
                    issueId: reqBody.issueId,
                    policeDetails: policeDetails,
                    responseTime: date.getTime(),
                    status: 'engaged'
                },
                

                statusData = {
                    issueId: reqBody.issueId,
                    responseTime: date.getTime(),
                };

            responseCallback(citizenData, policeData);
            policeDbApi.updateIssueStatus(statusData, policeDetails, function(err, result) {
                if (err) {
                    debug(err);
                } else {
                    debug(result);
                }
            });
        }
    });
}

function getCitizenLocation(req, responseCallback) {
    debug('api-handler getCitizenLocation');
}

function rateCitizen(req, responseCallback) {
    debug('api-handler rateCitizen');
}

function updatePoliceLocation(req, responseCallback) {
    debug('inside updatePoliceLocation');
    var reqBody = req.body;
    if (typeof(reqBody.coordinates) === 'string') {
        reqBody.coordinates = JSON.parse(reqBody.coordinates)
    }
    async.auto({
            one: function(callback) {
                googleMapsApi.getlatLngDetails(reqBody.coordinates, callback);
            },
            two: ['one', function(callback, results) {
                var locationData = {
                    userId: reqBody.userId,
                    address: results.one.results[0].formatted_address,
                    coordinates: [Number(reqBody.coordinates[1]), Number(reqBody.coordinates[0])]
                }
                policeDbApi.updatePoliceLocation(locationData, callback)
            }]
        },
        function(err, results) {
            if (err) {
                debug(err);
            } else {
                var resultData = {
                    status: 'Location updated'
                }
                responseCallback(resultData);

            }
        }
    );
};

function getCopLocation(req, responseCallback) {
    debug('inside getCopLocation');

    policeDbApi.getCopLocation(req.params.userId, responseCallback);
};

function getNearestIssues(req, responseCallback) {
    var reqBody = req.body;

    debug(req.query);
    if (typeof(reqBody.coordinates) === 'string') {
        reqBody.coordinates = JSON.parse(reqBody.coordinates)
    }

    var coordinates = [Number(req.query.lng), Number(req.query.lat)];
    
    async.auto({
            one: function(callback) {
                policeDbApi.getIssuesOfCop(req.session.user.userId, callback);
            },
            two: ['one', function(callback, results) {
                
                policeDbApi.getNearestIssues(coordinates, callback)
            }]
        },
        function(err, results) {
            if (err) {
                debug(err);
            } else {
                debug(results);
                var engagedIssues = results.one.map(function(issueData){
                    return {
                        issueId: issueData["_id"],
                        citizenDetails: issueData.citizenDetails,
                        policeDetails: issueData.policeDetails,
                        status: issueData.status,
                        occurrenceTime: issueData.occurrenceTime
                    }
                    
                });

                var activeIssues = results.two.map(function(issueData){
                    return {
                        issueId: issueData["_id"],
                        citizenDetails: issueData.citizenDetails,
                        status: issueData.status,
                        occurrenceTime: issueData.occurrenceTime
                    }
                    
                });

                var responseData = {
                    activeIssues: activeIssues,
                    engagedIssues: engagedIssues
                };
                responseCallback(responseData);

            }
        }
    );
}

exports.acknowledgeRequest = acknowledgeRequest;
exports.getCitizenLocation = getCitizenLocation;
exports.rateCitizen = rateCitizen;
exports.getCopLocation = getCopLocation;
exports.updatePoliceLocation = updatePoliceLocation;
exports.getNearestIssues = getNearestIssues;