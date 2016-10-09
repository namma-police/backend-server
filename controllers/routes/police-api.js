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
                io.sockets.in(citizenData.citizenDetails.userId).emit('waiting-for-help', policeData);
                //io.emit(citizenData.citizenDetails.userId + '-waiting-for-help', policeData);
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

    app.get('/location/police/:userId', function(req, res) { //to get cop's location
        debug('Inside /location/police/:userId');
        policeApiHandlers.getCopLocation(req, function(responseData) {
            res.json(responseData);
        });
    });

    app.get('/police/issues', function(req, res){
        policeApiHandlers.getNearestIssues(req, function(responseData) {
            res.json(responseData);
        });
    });
}

exports.initialize = initialize;