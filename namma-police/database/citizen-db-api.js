//database operations for citizens

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
			debug = require('debug')('nammapolice:citizen-db-api');

		exports.getCitizenDetails = function(reqObj, callback){
			mongoDBClient.collection("citizensData").findOne({
				phone: reqObj.userId
			}, function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in getcitizenDetails'
					};
					callback(resultData);
				}else{
					if(results){
						resultData = {
							userId: results.userId,
							phone: results.phone,
							displayName: results.displayName,
							email: results.email,
							password: results.password
						};
					}else{
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
		
		exports.updateCitizenLocation = function(reqObj, callback){
			mongoDBClient.collection("citizensData").ensureIndex( { "location" : "2dsphere" }, function(){
				mongoDBClient.collection("citizensData").update({
					userId: reqObj.phone
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
							message: 'Execute failed in updateCitizenLocation'
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

		exports.getNearestCops = function(coordinates, callback){
			mongoDBClient.collection("policeData").ensureIndex({ "location" : "2dsphere" }, function(){
				mongoDBClient.collection("policeData").find({
					location: {
						$near: {
							$geometry: {
								type: "Point",
								coordinates: coordinates
							},
							$maxDistance: 3000
						}
					}
				}).toArray(function(err, results){
					if(err){
						callback(err);
					}else{
						callback(null, results);
					}
				});
			});
		}

		exports.registerNewIssue = function(reqObj, callback){
			mongoDBClient.collection("issuesData").findOne({
				_id: reqObj.citizenDetails.userId,
				status: 'active' //active/engaged/closed/fir
			}, function(err, results){
				if(err){
					callback(err);
				}else{
					if(results === null){
						mongoDBClient.collection("issuesData").insert({
							_id: reqObj.citizenDetails.userId,
							occurrenceTime: reqObj.occurrenceTime,
							citizenDetails: reqObj.citizenDetails,
							status: 'active' //active/engaged/closed/fir
						}, function(err, results){
							if(err){
								callback(err);
							}else{
								reqObj.issueId = results.insertedIds[0];
								callback(null, reqObj);
							}
						});
					}else{
						mongoDBClient.collection("issuesData").update({
							_id: reqObj.citizenDetails.userId
						},{
							$set: {citizenDetails: reqObj.citizenDetails}
						},function(err, results){
							if(err){
								callback(err);
							}else{
								debug(results);
								reqObj.issueId = reqObj.citizenDetails.userId;
								callback(null, reqObj);
							}
						});
					}
				}
			});	
		}

		exports.endIssue = function(issueId, callback){
			debug(issueId);
			mongoDBClient.collection("issuesData").update({
				_id: issueId
			},{
				$set: {status: 'resolved'}
			},function(err, results){
				if(err){
					callback(err);
				}else{
					callback(null, 'resolved');
				}
			});
		}
	}
);