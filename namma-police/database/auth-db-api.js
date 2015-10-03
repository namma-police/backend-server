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
			debug = require('debug')('nammapolice:account-db');

		var bcrypt = require('bcrypt');		

		exports.getCitizenDetails = function(reqObj, callback){
			mongoDBClient.collection("citizensData").findOne({
				phone: reqObj.phone
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
							citizenId: results.citizenId,
							phone: results.phone,
							displayName: results.displayName,
							email: results.email,
							password: results.password
						};
					}else{
						resultData = {
							citizenId: null,
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

		
		exports.getPoliceDetails = function(reqObj, callback){
			mongoDBClient.collection("policeData").findOne({
				policeId: reqObj.policeId
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
							policeId: results.policeId,
							phone: results.phone,
							displayName: results.displayName,
							email: results.email,
							password: results.password
						};
					}else{
						resultData = {
							policeId: null,
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

		exports.registerNewCitizen = function(reqObj, callback){
			mongoDBClient.collection("citizensData").insert({
				citizenId: reqObj.phone,
				displayName: reqObj.displayName,
				phone: reqObj.phone,
				email: reqObj.email,
				password: reqObj.password,
				earnedRatings: 5,
				totalRatings: 5
			},function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in registerNewCitizen'
					};
					callback(resultData);
				}else{
					resultData = {
						citizenId: reqObj.phone,
						displayName: reqObj.displayName	
					}
					callback(null, resultData);
				}
			});
		}

		exports.registerNewPolice = function(reqObj, callback){
			mongoDBClient.collection("policeData").insert({
				policeId: reqObj.policeId,
				displayName: reqObj.displayName,
				phone: reqObj.phone,
				email: reqObj.email,
				password: reqObj.password,
				earnedRatings: 5,
				totalRatings: 5
			},function(err, results){
				var resultData = {};
				if(err){
					resultData = {
						error: err,
						message: 'Execute failed in registerNewPolice'
					};
					callback(resultData);
				}else{
					resultData = {
						policeId: reqObj.policeId,
						displayName: reqObj.displayName,
						phone: reqObj.phone
					}
					callback(null, resultData);
				}
			});
		}


	}
);