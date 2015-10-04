/* @author Ashwin Iyer
 * @details Configuring the API used in the citizen's app
 */
define(
    [
        '../route-handlers/citizen-api-handlers',
        //'passport',
    ],
    function(citizenApiHandlers) {
        function initialize(expressInstance, io, socket) {
            //passport configurations
            var app = expressInstance,
                debug = require('debug')('nammapolice:police-api');

            app.post('/location/police', function (req, res) { //to request a cop
                debug('request to /location/police');
                citizenApiHandlers.getNearbyCops(req, function(responseData){
                    res.json(responseData);
                });
            });

            app.post('/help/request', function (req, res) { //to request a cop
                debug('request to /request/help');
                citizenApiHandlers.requestCop(req, function(responseData){
                    res.json(responseData);
                    debug(responseData);
                    var citizenData = req.session.user;
                    citizenData.location = responseData.location;

                    for(var i=0; i<responseData.policeData.length; i++){
                        //
                        debug(responseData.policeData[i].policeId);
                        io.emit(responseData.policeData[i].policeId+'-waiting-for-requests', citizenData);
                    }    
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
                debug(req.session.user);
                if(req.session.user){
                    citizenApiHandlers.updateCitizenLocation(req, function(responseData){
                        res.json(responseData);
                    });
                }
            });
        }
        return {
            initialize: initialize
        }
    }
);