/* @author booleanhunter
 * @details These are API used in the police's app
 */
var policeApiHandlers = require('../route-handlers/police-api-handlers');

function initialize(expressInstance, io, socket) {
    var app = expressInstance,
        debug = require('debug')('nammapolice:police-api');

    app.post('/request/acknowledge', function(req, res) {
        debug('request to /request/acknowledge');
        policeApiHandlers.acknowledgeRequest(req, function(citizenData, policeData) {
            if (citizenData.citizenDetails) {
                io.emit(citizenData.citizenDetails.userId + '-waiting-for-help', policeData);
                res.json(citizenData);
            } else if (citizenData.status) {
                res.json(citizenData);
            }

        });
    });

    app.get('/location/citizen/:citizenId', function(req, res) {
        debug('Inside /location/citizen/citizenId');
        responseData = {
            greeting: req.params.citizenId
        }
        res.json(responseData);

        // policeApiHandlers.getCitizenLocation(req, function(responseData){    

        // });
    });

    app.post('/citizen/ratings', function(req, res) {
        debug('request to /citizen/ratings');
        policeApiHandlers.rateCitizen(req, function(responseData) {
            res.json(responseData);
        });
    });

    app.post('/police/location/update', function(req, res) {
        debug('request to /police/location/update');
        policeApiHandlers.updatePoliceLocation(req, function(responseData) {
            res.json(responseData);
        });
    });

    // socket.on('online-police-'+req.session.user.userId, function(postData){
    //     debug('Police is online at ');
    //     debug(postData);
    // });
}

exports.initialize = initialize;