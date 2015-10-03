/* @author Ashwin Hariharan
 * @details Creating a single open instance of cassandraDb and returning it , this single instance is used for all db operations
 */

define(
    [
        'node-cassandra-cql'
    ], 
    function(cql) {       
        var cassandraClient, dataTypes, cqlTypes, that = this;

        function configure(callback) {

			that.cassandraClient = new cql.Client({
			    hosts: ['127.0.0.1:9042'],
			    keyspace: 'myapp_db',
			});

			// var cql = require('cassandra-driver');
			// var cassandraClient = new cql.Client({
			//     hosts: ['127.0.0.1:9042'],
			//     keyspace: 'myapp_db',
			//     contactPoints: ['localhost']
			// });

			that.dataTypes = cql.types.dataTypes,
			that.cqlTypes = cql.types;

			that.cassandraClient.connect(function established(err){
			    if(err){
			    	var error = {
			    		message: 'Cassandra connect failed',
			    		error: err
			    	}
			        callback(error);
			    }else{
			        callback(null, 'Connection with Cassandra established');
			    }
			});
		}
		
		function cassandraClient(){
			return that.cassandraClient;
		}

		function dataTypes(){
			return that.dataTypes;
		}

		function cqlTypes(){
			return that.cqlTypes;
		}

		return {
			configure: configure,
			cassandraClient: cassandraClient,
			dataTypes: dataTypes,
			cqlTypes: cqlTypes
		}
    }
);