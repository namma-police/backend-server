/* @author Ashwin Iyer
 * @details These are the API handlers for authentication
 */
define(
    [
        'async',
        '../../database/police-db-api',    
        '../utilities/google-maps-api'
    ], 
    function (async, policeDbApi, googleMapsApi) {
        var debug = require('debug')('nammapolice:police-api-handlers');

        function acknowledgeRequest(req, responseCallback){
            debug('api-handler acknowledgeRequest');
            var citizenCoordinates = [Number(req.body.citizenDetails.coordinates[1]), Number(req.body.citizenDetails.coordinates[0])];

            var policeCoordinates = [Number(req.body.policeCoordinates.coordinates[1]), Number(req.body.policeCoordinates.coordinates[0])];

            async.auto(
                {
                    one: function(callback) {
                        googleMapsApi.getlatLngDetails(req.body.citizenCoordinates, callback);
                    },
                    two: function(callback) {
                        googleMapsApi.getlatLngDetails(req.body.policeCoordinates, callback);
                    },
                    three: ['two', function(callback, results){

                        var date = new Date();

                        var citizenDetails = req.body.citizenDetails;
                        citizenDetails.location =  {
                            type: "Point",
                            address: results.one.results[0].formatted_address,
                            coordinates: citizenCoordinates
                        };

                        var policeDetails = req.body.policeDetails;
                        policeDetails.location =  {
                            type: "Point",
                            address: results.two.results[0].formatted_address,
                            coordinates: policeCoordinates
                        };

                        var reqObj = {
                            occurrenceTime: date.getTime(),
                            citizenDetails: citizenDetails,
                            policeDetails: policeDetails
                        };

                        policeDbApi.registerNewIssue(reqObj, callback);
                    }]
                },function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        var responseData = {
                            issueId: results.three["_id"],
                            policeDetails: results.three["policeDetails"]
                        }
                        debug(responseData);
                    }
                }    
            );
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
                        policeDbApi.updatePoliceLocation(locationData, callback)
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