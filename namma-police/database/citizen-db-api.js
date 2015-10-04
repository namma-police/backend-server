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
		
		exports.updateCitizenLocation = function(reqObj, callback){
			mongoDBClient.collection("citizensData").ensureIndex( { "location" : "2dsphere" }, function(){
				mongoDBClient.collection("citizensData").update({
					phone: reqObj.phone
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
	}
);