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
            var coordinates = [Number(req.body.coordinates[1]), Number(req.body.coordinates[0])];

            async.auto(
                {
                    one: function(callback) {
                        googleMapsApi.getlatLngDetails(req.body.coordinates, callback);
                    },

                    two: ['one', function(callback){
                        citizenDbApi.getNearestCops(coordinates, callback);
                    }],

                    three: ['two', function(callback, results){
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
                            userId: req.body.userId,
                            phone: req.body.userId,
                            displayName: req.body.displayName,
                            location: {
                                coordinates: req.body.coordinates,
                                address: results.one.results[0].formatted_address
                            }
                        }
                        var policeData = {
                            policeData: policeArray
                        };
                        
                        responseCallback(citizenData, policeData); 

                        callback(null, citizenData);
                    }],

                    // four: ['three', function(callback, results){
                    //     var date = new Date();
                    //     var reqObj = {
                    //         occurrenceTime: date.getTime(),
                    //         userId: req.body.userId,
                    //         citizenDisplayName: req.body.displayName,
                    //         location: {
                    //             type: "Point",
                    //             address: results.one.results[0].formatted_address,
                    //             coordinates: coordinates
                    //         }
                    //     }
                    //     citizenDbApi.registerNewIssue(reqObj, callback);
                    // }]
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