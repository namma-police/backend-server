/* @author booleanhunter
 * @details Creating a single open instance of Redis and returning it , this single instance is used for all db operations
 */
 
var redis = require('redis');
var redisClient, that = this;

function configure(callback) {
    redisClient = redis.createClient();
    callback(null, 'connection with redis established');
}

function redisClient() {
    redisClient;
}

exports.configure = configure;
exports.redisClient = redisClient;