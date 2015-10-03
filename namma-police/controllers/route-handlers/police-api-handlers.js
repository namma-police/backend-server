/* @author Ashwin Iyer
 * @details These are the API handlers for authentication
 */
define(
    [
        'async',
        '../../database/police-db-api',    
        '../utilities/google-maps-api'
    ], 
    function (async, citizenDbApi, googleMapsApi) {
        var debug = require('debug')('nammapolice:auth-api-handlers');

        function acknowledgeRequest(req, responseCallback){
            debug('api-handler acknowledgeRequest');
        }    

        function getCitizenLocation(req, responseCallback){
            debug('api-handler getCitizenLocation');
        }

        function rateCitizen(req, responseCallback){
            debug('api-handler rateCitizen');
        }

        function updatePoliceLocation(req, responseCallback){
            debug('inside updatePoliceLocation');
            async.auto(
                {
                    one: function(callback) {
                        googleMapsApi.getlatLngDetails(req.body.coordinates, callback);
                    },
                    two: ['one', function (callback, results){
                        var locationData = {
                            policeId: req.session.user.userId,
                            address: results.one.results[0].formatted_address,
                            coordinates: [Number(req.body.coordinates[1]), Number(req.body.coordinates[0])]
                        }
                        citizenDbApi.updatePoliceLocation(locationData, callback)
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
            acknowledgeRequest: acknowledgeRequest,
            getCitizenLocation: getCitizenLocation,
            rateCitizen: rateCitizen,
            updatePoliceLocation: updatePoliceLocation
        }
    }
);