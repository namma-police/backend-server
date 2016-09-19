var authApi = require('./routes/auth-api');
var citizenApi = require('./routes/citizen-api');
var policeApi = require('./routes/police-api');

function initialize(expressInstance, io, socket) {

    authApi.initialize(expressInstance, io, socket);
    citizenApi.initialize(expressInstance, io, socket);
    policeApi.initialize(expressInstance, io, socket);
}

exports.initialize = initialize;