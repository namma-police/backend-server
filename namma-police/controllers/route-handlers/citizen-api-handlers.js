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
            var coordinates = [Number(req.body.coordinates[1]), Number(req.body.coordinates[0])];

            citizenDbApi.getNearestCops(coordinates, function(err, results){
                if(err){
                    debug(err);
                }else{
                    var resultData = results.map(function(policeDetails){
                        return {
                            location: {
                                address: policeDetails.location.address,
                                coordinates: [policeDetails.location.coordinates[1], policeDetails.location.coordinates[0]]
                            }
                        };
                    });
                    responseCallback(resultData);
                }
            });
        }

        function requestCop(req, responseCallback){
            debug('api-handler requestCop');
            var coordinates = [Number(req.body.coordinates[1]), Number(req.body.coordinates[0])];

            async.auto(
                {
                    one: function(callback){
                        citizenDbApi.getNearestCops(coordinates, callback);
                    },
                    two: ['one', function(callback, results){
                        var resultArray = results.one.map(function(policeDetails){
                            return {
                                policeId: policeDetails.policeId,
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
                        var policeData = underscore.filter(resultArray, function(policeDetails){
                            return policeDetails.rating >= 50
                        });

                        if(policeData.length === 0){
                            policeData = resultArray;
                        };
                        var resultData = {
                            policeData: policeData
                        };
                        
                        responseCallback(resultData);    
                        callback(null, resultArray);
                    }],
                    three: ['two', function(callback){
                        googleMapsApi.getlatLngDetails(req.body.coordinates, callback);       
                    }],
                    four: ['three', function(callback, results){
                        var reqObj = {
                            citizenId: req.session.user.userId,
                            location: {
                                address: results.three.results[0].formatted_address,
                                coordinates: [Number(req.body.coordinates[1]), Number(req.body.coordinates[0])]
                            }
                        }
                        citizenDbApi.registerNewIssue(reqObj, callback);
                    }]
                },function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        //debug(results);
                    }
                }    
            );
        }    

        function getCopLocation(req, responseCallback){
            debug('api-handler getCopLocation');
        }

        function endIssue(req, responseCallback){
            debug('api-handler endIssue');
        }

        function rateCop(req, responseCallback){
            debug('inside rateCop');
 
        };

        function updateCitizenLocation(req, responseCallback){
            debug('inside updateCitizenLocation');
            async.auto(
                {
                    one: function(callback) {
                        googleMapsApi.getlatLngDetails(req.body.coordinates, callback);
                    },
                    two: ['one', function (callback, results){
                        debug(results);
                        var locationData = {
                            phone: req.session.user.userId,
                            address: results.one.results[0].formatted_address,
                            coordinates: [Number(req.body.coordinates[1]), Number(req.body.coordinates[0])]
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
        
        return {
            getNearbyCops: getNearbyCops,
            requestCop: requestCop,
            getCopLocation: getCopLocation,
            endIssue: endIssue,
            rateCop: rateCop,
            updateCitizenLocation: updateCitizenLocation
        }
    }
);