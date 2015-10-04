define(
	[
		'exports',
		'../configs/db-configs/config-cassandra',
		'../configs/db-configs/config-redis',
		'../configs/db-configs/config-mongodb'
	],function(exports, configCassandra, configRedis, configMongo){
		var db;
		var ObjectID = require('mongodb').ObjectID;

		var cassandraClient = configCassandra.cassandraClient(),
			redisClient = configRedis.redisClient(),
			mongoDBClient = configMongo.mongoClientDB(),
			dataTypes = configCassandra.dataTypes(),
			that = this,
			debug = require('debug')('nammapolice:police-db-api');
		
		exports.updatePoliceLocation = function(reqObj, callback){
			mongoDBClient.collection("policeData").ensureIndex( { "location" : "2dsphere" }, function(){
				mongoDBClient.collection("policeData").update({
					userId: reqObj.userId
				},{
					$set: {
						location: {
							type: "Point",
							address: reqObj.address,
							coordinates: reqObj.coordinates
						}	
					}
				}, function(err, results){
					var resultData = {};
					if(err){
						resultData = {
							error: err,
							message: 'Execute failed in updatePoliceLocation'
						};
						callback(resultData);
					}else{
						resultData = {
							status: 'Location Updated',
							docs: results
						};
						callback(null, resultData);
					}
				});
			});	
		}

		exports.checkIssueStatus = function(issueId, callback){
			mongoDBClient.collection("issuesData").findOne({
				_id: issueId
			}, function(err, results){
				if(err){
					callback(err);
				}else{
					debug(results);
					var resultData = {
						issueId: issueId,
						status: results.status
					}
					callback(null, resultData);
				}
			});
		}

		exports.updateIssueStatus = function(issueId, policeDetails, callback){
			mongoDBClient.collection("issuesData").update({
				_id: issueId
			},{
				$set: {policeDetails: policeDetails, status: 'engaged'}
			},function(err, results){
				if(err){
					callback(err);
				}else{
					debug(results);
					var resultData = {
						issueId: issueId,
						status: 'engaged'
					}
					callback(null, resultData);
				}
			});
		}
	}
);