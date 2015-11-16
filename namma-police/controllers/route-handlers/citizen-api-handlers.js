/* @author Ashwin Iyer
 * @details These are the API handlers for citizens
 */
define(
    [
        'async',
        'underscore',
        '../../database/citizen-db-api',  
        '../utilities/google-maps-api'
    ], 
    function (async, underscore, citizenDbApi, googleMapsApi) {
        var debug = require('debug')('nammapolice:citizen-api-handlers');

        function getNearbyCops(req, responseCallback){
            var reqBody = req.body;
            if(typeof(reqBody.coordinates) === 'string'){
                reqBody.coordinates = JSON.parse(reqBody.coordinates)
            }

            var coordinates = [Number(reqBody.coordinates[1]), Number(reqBody.coordinates[0])];

            citizenDbApi.getNearestCops(coordinates, function(err, results){
                if(err){
                    debug(err);
                }else{
                    var resultData = results.map(function(policeDetails){
                        return {
                            address: policeDetails.location.address,
                            coordinates: [policeDetails.location.coordinates[1], policeDetails.location.coordinates[0]]
                        };
                    });

                    var responseData = {
                        locationDetails: resultData
                    }
                    responseCallback(responseData);
                }
            });
        }

        function requestCop(req, responseCallback){
            debug('api-handler requestCop');
            var reqBody = req.body;
            if(typeof(reqBody.coordinates) === 'string'){
                reqBody.coordinates = JSON.parse(reqBody.coordinates)
            }
            var coordinates = [Number(reqBody.coordinates[1]), Number(reqBody.coordinates[0])];

            async.auto(
                {
                    one: function(callback) {
                        googleMapsApi.getlatLngDetails(reqBody.coordinates, callback);
                    },

                    two: ['one', function(callback){
                        citizenDbApi.getNearestCops(coordinates, callback);
                    }],
                    three: ['two', function(callback, results){
                        var citizenDetails = {
                            userId: reqBody.userId,
                            displayName: reqBody.displayName,
                            location: {
                                coordinates: coordinates,
                                address: results.one.results[0].formatted_address
                            }
                        },
                        date = new Date();
                        var citizenObj = {
                            citizenDetails: citizenDetails,
                            occurrenceTime: date.getTime()
                        }
                        citizenDbApi.registerNewIssue(citizenObj, callback);
                    }],

                    four: ['three', function(callback, results){
                        var resultArray = results.two.map(function(policeDetails){
                            return {
                                userId: policeDetails.userId,
                                displayName: policeDetails.displayName,
                                phone: policeDetails.phone,
                                location: {
                                    address: policeDetails.location.address,
                                    coordinates: [policeDetails.location.coordinates[1], policeDetails.location.coordinates[0]]
                                },
                                rating: policeDetails.totalRatings / policeDetails.earnedRatings * 100
                            };
                        });
                        //debug(resultData);
                        var policeArray = underscore.filter(resultArray, function(policeDetails){
                            return policeDetails.rating >= 50
                        });

                        if(policeArray.length === 0){
                            policeArray = resultArray;
                        };
                        var citizenData = {
                            issueId: results.three.issueId,
                            citizenDetails: {
                                userId: reqBody.userId,
                                phone: reqBody.userId,
                                displayName: reqBody.displayName,
                                location: {
                                    coordinates: reqBody.coordinates,
                                    address: results.one.results[0].formatted_address
                                }
                            }  
                        }
                        var policeData = {
                            policeData: policeArray
                        };
                        
                        responseCallback(citizenData, policeData); 

                        callback(null, citizenData);
                    }]
                },function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        //debug(results.four);
                    }
                }    
            );
        }    

        function getCopLocation(req, responseCallback){
            debug('api-handler getCopLocation');
        }

        function endIssue(req, responseCallback){
            debug('api-handler endIssue');
            citizenDbApi.endIssue(req.body.issueId, function(err, result){
                if(err){
                    debug(err);
                }else{
                    var responseData = {
                        status: 'resolved'
                    }
                    responseCallback(responseData);
                }
            })
        }

        function rateCop(req, responseCallback){
            debug('inside rateCop');
 
        };

        function updateCitizenLocation(req, responseCallback){
            debug('inside updateCitizenLocation');
            var reqBody = req.body;
            if(typeof(reqBody.coordinates) === 'string'){
                reqBody.coordinates = JSON.parse(reqBody.coordinates)
            }
            async.auto(
                {
                    one: function(callback) {
                        googleMapsApi.getlatLngDetails(reqBody.coordinates, callback);
                    },
                    two: ['one', function (callback, results){
                        debug(results);
                        var locationData = {
                            phone: req.session.user.userId,
                            address: results.one.results[0].formatted_address,
                            coordinates: [Number(reqBody.coordinates[1]), Number(reqBody.coordinates[0])]
                        }
                        citizenDbApi.updateCitizenLocation(locationData, callback)
                    }]
                },
                function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        var resultData = {
                            status: 'Location updated'
                        }
                        responseCallback(resultData);
                    }
                }
            ); 
        };

        function getIssues(req, responseCallback){
            debug('inside getIssues');
            citizenDbApi.getIssues(function(err, resultData){
                if(err){
                    debug(err);
                }else{
                    var geoJsonData = resultData.issues.map(function(issueDetails){
                        return {
                            type: 'Feature',
                            geometry: {
                                type : "Point",
                                coordinates: issueDetails.citizenDetails.location.coordinates
                            },
                            properties: {
                                address: issueDetails.citizenDetails.location.address,
                                occurrenceTime: issueDetails.occurrenceTime,
                                status: issueDetails.status
                            }
                        }
                    });
                    var responseData = {
                        type: 'FeatureCollection',
                        features: geoJsonData
                    } 
                    responseCallback(responseData);
                }
            });
        };
        
        return {
            getNearbyCops: getNearbyCops,
            requestCop: requestCop,
            getCopLocation: getCopLocation,
            endIssue: endIssue,
            rateCop: rateCop,
            updateCitizenLocation: updateCitizenLocation,
            getIssues: getIssues
        }
    }
);