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
            debug(req.body);
            var citizenCoordinates = [Number(req.body.citizenDetails.coordinates[1]), Number(req.body.citizenDetails.coordinates[0])];

            var policeCoordinates = [Number(req.body.policeDetails.coordinates[1]), Number(req.body.policeDetails.coordinates[0])];

            async.auto(
                {
                    one: function(callback){
                        policeDbApi.checkIssueStatus(req.body.issueId, callback);
                    },

                    two: ['one', function(callback, results) {
                        debug(results);
                        if(results.one.status === 'active'){
                            googleMapsApi.getlatLngDetails(req.body.citizenDetails.coordinates, callback);
                        }else{
                            var result = {
                                status: 'A police is already on it'
                            }
                            callback(result);
                        }
                        
                    }],
                    three: ['two', function(callback, results) {
                        googleMapsApi.getlatLngDetails(req.body.policeDetails.coordinates, callback);
                    }]
                },function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        debug(results.three);

                        var citizenDetails = {
                            userId: req.body.citizenDetails.userId,
                            displayName: req.body.citizenDetails.displayName,
                            phone: req.body.citizenDetails.userId,
                            location: {
                                address: results.two.results[0].formatted_address,
                                coordinates: citizenCoordinates
                            }
                        }

                        var policeDetails = {
                            userId: req.body.policeDetails.userId,
                            displayName: req.body.policeDetails.displayName,
                            phone: req.body.policeDetails.phone,
                            location: {
                                address: results.three.results[0].formatted_address,
                                coordinates: citizenCoordinates
                            }
                        }

                        var citizenData = {
                            issueId: req.body.issueId,
                            citizenDetails: citizenDetails
                        },

                        policeData = {
                            issueId: req.body.issueId,
                            policeDetails: policeDetails
                        };
                        responseCallback(citizenData, policeData);
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
                            userId: req.body.userId,
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