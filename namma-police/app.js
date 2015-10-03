/* @author Ashwin Hariharan
 * @details Bootstraps the main server
 */
 
var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(
	[
		'http',
		'https',
		'async',
		'fs',
		'express',
		'configs/server-configs/config', 
		'configs/server-configs/express-configs', 	
		'configs/db-configs/config-cassandra',
		'configs/db-configs/config-redis',
		'configs/db-configs/config-mongodb'
	], 
	function(http, https, async, fs, express, config, expressConfigs, configCassandra, configRedis, configMongodb){
		var expressInstance = expressConfigs.configure(),
			debug = require('debug')('nammapolice:app');

		// var privateKey  = fs.readFileSync('ssl-certs-1/my-ssl-certifications/host.key', 'utf8'),
		// 	certificate = fs.readFileSync('ssl-certs-1/f5bbd28d4c33691b.crt', 'utf8'),
		// 	ca1 = fs.readFileSync('ssl-certs-1/gd_bundle-g2-g1.crt');

		// var credentials = {key: privateKey, cert: certificate, ca: [ca1]};

		// https.createServer(credentials, expressInstance).listen(config.production.server_port1, function () {
		//     debug('Server running on ' + config.production.server_port1);
		    
		//     async.parallel(
		//     	[
		//     		function(callback){
		//     			configCassandra.configure(callback);
		    			
		//     		},
		//     		function(callback){
		//     			configRedis.configure(callback);
		//     		},
		//     		function(callback){
		//     			configMongodb.configure(callback);
		//     		}
		//     	], function(err, results){
		// 			if(err){
		// 				debug(err);
		// 			}else{
		// 				debug(results);
		// 				requirejs(['controllers/routes'],function(routes){
		// 					routes.initialize(expressInstance); //dB
		// 				});
		// 			}		    		
		//     	}
		//     );
		// });


		//For redirecting from http to https
		// var redirectApp = express();
		// redirectServer = http.createServer(redirectApp).listen(config.production.server_port2, function(){
		// 	redirectApp.use(function (req, res, next) {
		// 		if (!req.secure) {
		// 			return res.redirect('https://' + req.headers.host + req.url);
		// 		}
		// 		next();
		// 	});
		// });  

		http.createServer(expressInstance).listen(config.development.server_port1, function () {
		    debug('Server running on ' + config.development.server_port1);
		    
			async.parallel(
				[
					// function(callback){
					// 	configCassandra.configure(callback);	
					// },
					function(callback){
						configRedis.configure(callback);
					},
					function(callback){
						configMongodb.configure(callback);
					}
				], function(err, results){
					if(err){
						debug(err);
					}else{
						console.log(results);
						debug(results);
						requirejs(['controllers/routes'],function(routes){
							routes.initialize(expressInstance); //dB
						});
					}					
				}
			);
		});

	}
);
