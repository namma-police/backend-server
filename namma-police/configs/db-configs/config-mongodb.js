/* @author Ashwin Hariharan
 * @details Creating a single open instance of mongoDb and returning it , this single instance is used for all db operations
 */
define(
    [
        'mongodb'
    ], 
    function(mongodb) {
        var MongoClient, mongoDB, that = this;

        function configure(callback) {
            that.MongoClient = mongodb.MongoClient,
                Server = mongodb.Server;
            var server = 'mongodb://localhost:27017/test';

            that.MongoClient.connect(server, function(err, db){
                if(err){
                    var error = {
                        message: 'MongoDB connect failed',
                        error: err
                    }
                    callback(error);
                }else{
                    that.mongoDB = db;
                    callback(null, 'Connection with mongodb established');
                }
                
            });        
        }

        function mongoClientDB(){
            return that.mongoDB;
        }

        return {
            configure: configure,
            mongoClientDB: mongoClientDB
        }
    }
);