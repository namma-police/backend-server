/* @author booleanhunter
 * @details Configuring the API used in the citizen's app
 */

var citizenApiHandlers = require('../route-handlers/citizen-api-handlers');

function initialize(expressInstance, io, socket) {
    var app = expressInstance,
        debug = require('debug')('nammapolice:citizen-api');

    app.post('/location/police', function(req, res) { //Fetches nearby cops
        debug('request to /location/police');
        citizenApiHandlers.getNearbyCops(req, function(responseData) {
            res.json(responseData);
        });
    });

    app.post('/help/request', function(req, res) { //to request a cop
        debug('request to /request/help');
        citizenApiHandlers.requestCop(req, function(citizenData, policeData) {
            res.json(policeData);
            debug(citizenData);

            for (var i = 0; i < policeData.policeData.length; i++) {
                io.emit(policeData.policeData[i].userId + '-waiting-for-requests', citizenData);
            }
        });
    });

    app.get('/location/police/:userId', function(req, res) { //to get cop's location
        debug('Inside login');
        citizenApiHandlers.getCopLocation(req, function(responseData) {
            res.json(responseData);
        });
    });

    app.post('/help/acknowledge', function(req, res) { //for ending the issue / matter is over
        debug('request to /help/acknowledge');
        citizenApiHandlers.endIssue(req, function(responseData) {
            res.json(responseData);
        });
    });

    app.post('/help/ratings', function(req, res) {
        debug('request to /help/ratings');
        citizenApiHandlers.rateCop(req, function(responseData) {
            res.json(responseData);
        });
    });

    app.post('/citizen/location/update', function(req, res) {
        debug('request to /citizen/location/update');
        debug(req.session.user);
        if (req.session.user) {
            citizenApiHandlers.updateCitizenLocation(req, function(responseData) {
                res.json(responseData);
            });
        }
    });

    app.get('/issues', function(req, res) { //to get list of issues
        citizenApiHandlers.getIssues(req, function(responseData) {
            res.json(responseData);
        });
    });
}

exports.initialize = initialize;