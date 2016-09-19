/* @author booleanhunter
 * @details Bootstraps the main server
 */
var http = require('http');
var async = require('async');
var express = require('express');
var debug = require('debug')('nammapolice:app');

var config = require('./configs/server-configs/config');
var expressConfigs = require('./configs/server-configs/express-configs');
var configCassandra = require('./configs/db-configs/config-cassandra');
var configRedis = require('./configs/db-configs/config-redis');
var configMongodb = require('./configs/db-configs/config-mongodb');

var expressInstance = expressConfigs.configure();
 
var server = http.Server(expressInstance),
    io = require('socket.io')(server);

server.listen(config.config.development.server_port1, function() {
    debug('Server running on ' + config.config.development.server_port1);

    function homeRender(req, pageType, responseCallback) {
        debug('inside homeRender');
        var argOne = 'index',
            argTwo = {};
        console.log(req.session.user);
        if (req.session.user) {
            argTwo = {
                user_id: req.session.user.userId,
                status: req.session.user.status,
                display_name: req.session.user.displayName,
                user_type: req.session.user.userType,
                page_type: pageType
            };
        } else {
            argTwo = {
                user_id: null,
                status: null,
                display_name: null,
                user_type: null,
                page_type: pageType
            };
        }

        responseCallback(argOne, argTwo);
    };
    async.parallel(
        [
            function(callback) {
                configRedis.configure(callback);
            },
            function(callback) {
                configMongodb.configure(callback);
            }
        ],
        function(err, results) {
            if (err) {
                debug(err);
            } else {
                debug(results);
                expressInstance.get('/', function(req, res) {
                    debug('request to /');
                    homeRender(req, '', function(argOne, argTwo) {
                        res.render(argOne, argTwo);
                    });
                });
                expressInstance.get('/stats', function(req, res) {
                    debug('request to /stats');
                    homeRender(req, 'stats', function(argOne, argTwo) {
                        res.render(argOne, argTwo);
                    });
                });

                var routes = require('./controllers/routes');

                io.on('connection', function(socket) {
                    routes.initialize(expressInstance, io, socket);
                });
            }
        }
    );
});




    // var privateKey  = fs.readFileSync('ssl-certs-1/my-ssl-certifications/host.key', 'utf8'),
    //  certificate = fs.readFileSync('ssl-certs-1/f5bbd28d4c33691b.crt', 'utf8'),
    //  ca1 = fs.readFileSync('ssl-certs-1/gd_bundle-g2-g1.crt');

    // var credentials = {key: privateKey, cert: certificate, ca: [ca1]};

    // https.createServer(credentials, expressInstance).listen(config.production.server_port1, function () {
    //     debug('Server running on ' + config.production.server_port1);

    //     async.parallel(
    //      [
    //          function(callback){
    //              configCassandra.configure(callback);

    //          },
    //          function(callback){
    //              configRedis.configure(callback);
    //          },
    //          function(callback){
    //              configMongodb.configure(callback);
    //          }
    //      ], function(err, results){
    //          if(err){
    //              debug(err);
    //          }else{
    //              debug(results);
    //              requirejs(['controllers/routes'],function(routes){
    //                  routes.initialize(expressInstance); //dB
    //              });
    //          }                   
    //      }
    //     );
    // });


    //For redirecting from http to https
    // var redirectApp = express();
    // redirectServer = http.createServer(redirectApp).listen(config.production.server_port2, function(){
    //  redirectApp.use(function (req, res, next) {
    //      if (!req.secure) {
    //          return res.redirect('https://' + req.headers.host + req.url);
    //      }
    //      next();
    //  });
    // }); 