/* @author booleanhunter
 * @details Creating a single open instance of mongoDb and returning it , this single instance is used for all db operations
 */
var mongodb = require('mongodb');

var MongoClient, mongoDB, that = this;

function configure(callback) {
    that.MongoClient = mongodb.MongoClient,
        Server = mongodb.Server;

    var server = 'mongodb://localhost:27017/nammapolice';

    if(process.argv.indexOf("-mongoip") != -1){ //does our flag exist?
        server = 'mongodb://' + process.argv[process.argv.indexOf("-mongoip") + 1] + ':27017/nammapolice'; //grab the next item
    }

    that.MongoClient.connect(server, function(err, db) {
        if (err) {
            var error = {
                message: 'MongoDB connect failed',
                error: err
            }
            callback(error);
        } else {
            that.mongoDB = db;
            callback(null, 'Connection with mongodb established');
        }

    });
}

function mongoClientDB() {
    return that.mongoDB;
}

exports.configure = configure;
exports.mongoClientDB = mongoClientDB;