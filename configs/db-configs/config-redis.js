/* @author booleanhunter
 * @details Creating a single open instance of Redis and returning it , this single instance is used for all db operations
 */
 
var redis = require('redis');
var redisClient, that = this;

function configure(callback) {
	var redisip = 'localhost';

	if(process.argv.indexOf("-redisip") != -1){ //does our flag exist?
	    redisip = process.argv[process.argv.indexOf("-redisip") + 1]; //grab the next item
	}

    redisClient = redis.createClient(6379, redisip);
    callback(null, 'connection with redis established');
}

function redisClient() {
    redisClient;
}

exports.configure = configure;
exports.redisClient = redisClient;