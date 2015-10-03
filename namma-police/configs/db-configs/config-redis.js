/* @author Ashwin Hariharan
 * @details Creating a single open instance of Redis and returning it , this single instance is used for all db operations
 */

define(
    [
        'redis'
    ], 
    function(redis) {       
        var redisClient, that = this;

        function configure(callback) {
			that.redisClient = redis.createClient();
            callback(null, 'connection with redis established');
        }

        function redisClient(){
            return that.redisClient;
        }

		return {
			configure: configure,
            redisClient: redisClient
		}
    }
);