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
            var reqBody = req.body;
            if(typeof(reqBody.citizenDetails.coordinates) === 'string'){
                reqBody.citizenDetails.coordinates = JSON.parse(reqBody.citizenDetails.coordinates)
            }

            var citizenCoordinates = [Number(reqBody.citizenDetails.coordinates[1]), Number(reqBody.citizenDetails.coordinates[0])];

            var policeCoordinates = [Number(reqBody.policeDetails.coordinates[1]), Number(reqBody.policeDetails.coordinates[0])];

            async.auto(
                {
                    one: function(callback){
                        policeDbApi.checkIssueStatus(reqBody.issueId, callback);
                    },

                    two: ['one', function(callback, results) {
                        debug(results);
                        if(results.one.status === 'active'){
                            googleMapsApi.getlatLngDetails(reqBody.citizenDetails.coordinates, callback);
                        }else{
                            var result = {
                                status: 'A police is already on it'
                            }
                            callback(result);
                        }
                        
                    }],
                    three: ['two', function(callback, results) {
                        googleMapsApi.getlatLngDetails(reqBody.policeDetails.coordinates, callback);
                    }]
                },function(err, results){
                    if(err){
                        debug(err);
                        if(err.status){
                            responseCallback(err);
                        }
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
                            userId: reqBody.policeDetails.userId,
                            displayName: reqBody.policeDetails.displayName,
                            phone: reqBody.policeDetails.phone,
                            location: {
                                address: results.three.results[0].formatted_address,
                                coordinates: citizenCoordinates
                            }
                        }

                        var citizenData = {
                            issueId: reqBody.issueId,
                            citizenDetails: citizenDetails
                        },

                        policeData = {
                            issueId: reqBody.issueId,
                            policeDetails: policeDetails
                        };
                        responseCallback(citizenData, policeData);
                        policeDbApi.updateIssueStatus(reqBody.issueId, policeDetails, function(err, result){
                            if(err){
                                debug(err);
                            }else{
                                debug(result);
                            }
                        });
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
                        var locationData = {
                            userId: reqBody.userId,
                            address: results.one.results[0].formatted_address,
                            coordinates: [Number(reqBody.coordinates[1]), Number(reqBody.coordinates[0])]
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