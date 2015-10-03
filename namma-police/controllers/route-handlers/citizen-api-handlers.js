/* @author Ashwin Iyer
 * @details These are the API handlers for citizens
 */
define(
    [
        'async',
        '../../database/citizen-db-api',    
        '../utilities/google-maps-api'
    ], 
    function (async, citizenDbApi, googleMapsApi) {
        var debug = require('debug')('nammapolice:auth-api-handlers');

        function requestCop(req, responseCallback){
            debug('api-handler requestCop');
            var coordinates = [Number(req.body.coordinates[1]), Number(req.body.coordinates[0])];

            async.auto(
                {
                    one: function(callback){
                        citizenDbApi.getNearestCops(coordinates, callback);
                    },
                    two: function(callback){
                        var resultData = results.one.map(function(policeDetails){
                            return {
                                policeId: policeDetails.policeId,
                                displayName: policeDetails.displayName,
                                phone: policeDetails.phone,
                                location: {
                                    address: policeDetails.location.address,
                                    coordinates: [policeDetails.location.coordinates[1], policeDetails.location.coordinates[0]]
                                }
                            };
                        })
                        responseCallback(resultData);
                        callback(null, 'Cop info sent');
                        
                    }
                },function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        citizenDbApi.registerNewIssue(reqObj, callback)
                    }
                }    
            )
            citizenDbApi.getNearestCops(coordinates, 
            });
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
            requestCop: requestCop,
            getCopLocation: getCopLocation,
            endIssue: endIssue,
            rateCop: rateCop,
            updateCitizenLocation: updateCitizenLocation
        }
    }
);