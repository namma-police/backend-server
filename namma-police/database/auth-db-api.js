/* @author booleanhunter
 * @details Handling authentication
 */

var configCassandra = require('../configs/db-configs/config-cassandra');
var configRedis = require('../configs/db-configs/config-redis');
var configMongo = require('../configs/db-configs/config-mongodb');

var ObjectID = require('mongodb').ObjectID;

var cassandraClient = configCassandra.cassandraClient(),
    redisClient = configRedis.redisClient(),
    mongoDBClient = configMongo.mongoClientDB(),
    dataTypes = configCassandra.dataTypes(),
    debug = require('debug')('nammapolice:account-db');

function getCitizenDetails(reqObj, callback) {
    mongoDBClient.collection("citizensData").findOne({
        phone: reqObj.phone
    }, function(err, results) {
        var resultData = {};
        if (err) {
            resultData = {
                error: err,
                message: 'Execute failed in getCitizenDetails'
            };
            callback(resultData);
        } else {
            if (results) {
                resultData = {
                    userId: results.userId,
                    phone: results.phone,
                    displayName: results.displayName,
                    email: results.email,
                    password: results.password
                };
            } else {
                resultData = {
                    userId: null,
                    phone: null,
                    displayName: null,
                    email: null,
                    password: null
                };
            }
            callback(null, resultData);
        }
    });
}


function getPoliceDetails(reqObj, callback) {
    mongoDBClient.collection("policeData").findOne({
        userId: reqObj.userId
    }, function(err, results) {
        var resultData = {};
        if (err) {
            resultData = {
                error: err,
                message: 'Execute failed in getPoliceDetails'
            };
            callback(resultData);
        } else {
            if (results) {
                resultData = {
                    userId: results.userId,
                    phone: results.phone,
                    displayName: results.displayName,
                    email: results.email,
                    password: results.password,
                    location: results.location
                };
            } else {
                resultData = {
                    userId: null,
                    phone: null,
                    displayName: null,
                    email: null,
                    password: null,
                    location: null
                };
            }
            callback(null, resultData);
        }
    });
}

function registerNewCitizen(reqObj, callback) {
    mongoDBClient.collection("citizensData").insert({
        userId: reqObj.phone,
        displayName: reqObj.displayName,
        phone: reqObj.phone,
        email: reqObj.email,
        password: reqObj.password,
        earnedRatings: 5,
        totalRatings: 5
    }, function(err, results) {
        var resultData = {};
        if (err) {
            resultData = {
                error: err,
                message: 'Execute failed in registerNewCitizen'
            };
            callback(resultData);
        } else {
            resultData = {
                userId: reqObj.phone,
                displayName: reqObj.displayName
            }
            callback(null, resultData);
        }
    });
}

function registerNewPolice(reqObj, callback) {
    mongoDBClient.collection("policeData").insert({
        userId: reqObj.userId,
        displayName: reqObj.displayName,
        phone: reqObj.phone,
        email: reqObj.email,
        password: reqObj.password,
        earnedRatings: 4,
        totalRatings: 5,
        status: 'available'
    }, function(err, results) {
        var resultData = {};
        if (err) {
            resultData = {
                error: err,
                message: 'Execute failed in registerNewPolice'
            };
            callback(resultData);
        } else {
            resultData = {
                userId: reqObj.userId,
                displayName: reqObj.displayName,
                phone: reqObj.phone
            }
            callback(null, resultData);
        }
    });
}

exports.getCitizenDetails = getCitizenDetails;
exports.getPoliceDetails = getPoliceDetails;
exports.registerNewCitizen = registerNewCitizen;
exports.registerNewPolice = registerNewPolice;