/* @author booleanhunter
 * @details Database operations for police
 */
 
var configCassandra = require('../configs/db-configs/config-cassandra');
var configRedis = require('../configs/db-configs/config-redis');
var configMongo = require('../configs/db-configs/config-mongodb');

var ObjectID = require('mongodb').ObjectID;

var cassandraClient = configCassandra.cassandraClient(),
    redisClient = configRedis.redisClient(),
    mongoDBClient = configMongo.mongoClientDB(),
    dataTypes = configCassandra.dataTypes(),
    debug = require('debug')('nammapolice:police-db-api');

function updatePoliceLocation(reqObj, callback) {
    mongoDBClient.collection("policeData").ensureIndex({
        "location": "2dsphere"
    }, function() {
        mongoDBClient.collection("policeData").update({
            userId: reqObj.userId
        }, {
            $set: {
                location: {
                    type: "Point",
                    address: reqObj.address,
                    coordinates: reqObj.coordinates
                }
            }
        }, function(err, results) {
            var resultData = {};
            if (err) {
                resultData = {
                    error: err,
                    message: 'Execute failed in updatePoliceLocation'
                };
                callback(resultData);
            } else {
                resultData = {
                    status: 'Location Updated',
                    docs: results
                };
                callback(null, resultData);
            }
        });
    });
}

function checkIssueStatus(issueId, callback) {
    mongoDBClient.collection("issuesData").findOne({
        _id: new ObjectID(issueId)
    }, function(err, results) {
        if (err) {
            callback(err);
        } else {
            if (results) {
                var resultData = {
                    issueId: issueId,
                    status: results.status
                }
                callback(null, resultData);
            }

        }
    });
}

function updateIssueStatus(statusData, policeDetails, callback) {
    mongoDBClient.collection("issuesData").update({
        _id: new ObjectID(statusData.issueId)
    }, {
        $set: {
            policeDetails: policeDetails,
            status: 'engaged',
            responseTime: statusData.responseTime
        }
    }, function(err, results) {
        if (err) {
            callback(err);
        } else {
            var resultData = {
                issueId: statusData.issueId,
                status: 'engaged'
            }
            callback(null, resultData);
        }
    });
}

exports.updatePoliceLocation = updatePoliceLocation;
exports.checkIssueStatus = checkIssueStatus;
exports.updateIssueStatus = updateIssueStatus;