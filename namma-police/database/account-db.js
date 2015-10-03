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
			debug = require('debug')('myApp:account-db');

		var bcrypt = require('bcrypt');		

		exports.checkForFbUser = function(options, callback){
			this.db.collection("users").findOne({
	            fbId: options
	        }, callback);
		};

		exports.verifyFbUser = function(options, callback){
			this.db.collection("users").findOne({
				fbId: options.fbId
			}, callback);
		};

		exports.registerNewFbUser = function(options,callback){
			db.collection("users").insert
			this.db.collection("users").insert(options, {
				w: 1
			}, callback);
		};

		exports.checkForUser = function(reqObj, callback){
			var query = 'SELECT user_name, display_name FROM user_profiles WHERE user_name = ?',
				params = [reqObj.userName];

			var resultData = {};	
			cassandraClient.execute(query, params, function(err, result){
			    if(err){
			        var error = {
		        		message: 'execute failed in checkForUser',
		        		error: err
		        	};
			        callback(error);
			    }else{
			    	debug('db-api checkForUser');

			    	if(result.rows.length > 0){
			    		resultData = {
			    		    userName: result.rows[0].user_name,
			    		    displayName: result.rows[0].display_name
			    		};

			    		callback(null, resultData);
			    	}else{
			    		resultData = {
			    			message: 'doesnotexist'
			    		};

			    		callback(null, resultData)
			    	}		        
			    }
			});	
		};

		exports.checkForEmail = function(reqObj, callback){
			var resultData = {};
			mongoDBClient.collection('user_profiles').findOne({email: reqObj.email}, function(err, item){
				debug('Email under check: ' + reqObj.email);
				if(item == null){
					resultData = {
		    			message: 'not in use'
		    		};
		    		callback(null, resultData);
				}
				else{
					resultData = {
		    			message: 'already in use'
		    		};
					callback(null, resultData);
				}
			})
		};


		exports.registerNewUser = function(reqObj, responseCallback){
			var responseData = {};
			var query = 'INSERT INTO user_profiles (user_name, display_name, emails, password, phone_numbers) values (?,?,?,?,?)';
			    params = [
				    {
				    	value: reqObj.userName, 
				    	hint: dataTypes.text
				    },
				    {
				    	value: reqObj.displayName,
				    	hint: dataTypes.text
				    },
				    {
				    	value: [reqObj.email],
				    	hint: dataTypes.set
				    },
				    {
				    	value: reqObj.password,
				    	hint: dataTypes.text
				    },
				    {
				    	value: [reqObj.phone],
				    	hint: dataTypes.set
				    },
			    ];	
			
			cassandraClient.execute(query, params, function(err, result){
			    if(err){
			        var error = {
		        		message: 'execute failed in registerNewUser',
		        		error: err
		        	};
			        responseCallback(error);
			    }else{
			    	debug('db-api registerNewUser');
			        var responseData = {
			        	userName: reqObj.userName,
			        	displayName: reqObj.displayName,
			            status: 'loggedIn'
			        };

			        mongoJson = {
			        	userName: reqObj.userName,
			        	email: reqObj.email,
			        	phone: reqObj.phone
			        }

			        mongoDBClient.collection("user_profiles").insert(mongoJson, {w:1}, function(err, item){
			        	debug('Result item: ' + item);			        	
			        })

			        responseCallback(responseData);
			    }
			}); 

			that.setRedisKey("registerEmail:"+reqObj.token, reqObj.userName.toLowerCase(), 1209600);
		};

		exports.setRedisKey = function(key, value, ttl){
			if(ttl){
				redisClient.setex(key, ttl, value);
			}else{
				redisClient.set(key, value);
			}
		};

		exports.getRedisValue = function(token, callback){
			redisClient.get("registerEmail:" + token, function(err, result) {
			    if(err){
			    	var error = {
			    		message: 'execute failed in getRedisValue',
			    		error: err
			    	};
			    	callback(error);
			    }else{
			    	if(result !== null){
			    		var resultData = {
			    			value: result
			    		}
			    		callback(null, resultData);
			    	}else{
			    		var error = {
			    			message: 'Key expired',
			    			error: result
			    		};
			    		callback(error);
			    	}
			    	
			    }
			});
		};

		exports.deleteRedisKey = function(key, callback){
			redisClient.del("registerEmail:"+key, function(err, result) {
			    if(err){
			    	var error = {
			    		message: 'execute failed in deleteRedisKey',
			    		error: err
			    	};
			    	callback(error);
			    }else{
			    	if(result !== null){
			    		var resultData = {
			    			value: result
			    		}
			    		callback(null, resultData);
			    	}else{
			    		var error = {
			    			message: 'Key does not exist',
			    			error: result
			    		};
			    		callback(error);
			    	}
			    	
			    }
			});
		};

	}
);