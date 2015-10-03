/* @author Ashwin Iyer
 * @details Configuring the API used in the citizen's app
 */
define(
    [
        '../route-handlers/citizen-api-handlers',
        //'passport',
    ],
    function(citizenApiHandlers) {
        function initialize(expressInstance) {
            //passport configurations
            var app = expressInstance,
                debug = require('debug')('nammapolice:police-api');

            app.post('/help/request', function (req, res) { //to request a cop
                debug('request to /request/help');
                citizenApiHandlers.requestCop(req, function(responseData){
                    res.json(responseData);
                });
            });

            app.get('/location/police/:policeId', function (req, res){ //to get cop's location
                debug('Inside login');
                citizenApiHandlers.getCopLocation(req, function(responseData){                   
                   res.json(responseData); 
                });
            });

            app.post('/help/acknowledge', function (req, res) { //for ending the issue / matter is over
                debug('request to /help/acknowledge');
                citizenApiHandlers.endIssue(req, function(responseData){                   
                   res.json(responseData); 
                });
            });

            app.post('/help/ratings', function (req, res){
                debug('request to /help/ratings');
                citizenApiHandlers.rateCop(req, function(responseData){
                    res.json(responseData);
                });
            });

            app.post('/citizen/location/update', function(req, res){
                debug('request to /citizen/location/update');
                citizenApiHandlers.updateCitizenLocation(req, function(responseData){
                    res.json(responseData);
                });
            });
        }
        return {
            initialize: initialize
        }
    }
);