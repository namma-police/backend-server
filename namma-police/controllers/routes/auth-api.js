/* @author Ashwin Iyer
 * @details Configuring the API related to authentication and invoking other authentication modules
 */
define(
    [
        '../route-handlers/auth-api-handlers',
        '../route-handlers/citizen-api-handlers'
    ],
    function(authApiHandlers, citizenApiHandlers) {
        function initialize(expressInstance, io, socket) {
            //passport configurations
            var app = expressInstance,
                debug = require('debug')('nammapolice:auth-api');     

            socket.on('police-online', function(postData){
                debug('a police is online at');
                debug(postData);
            });

            app.post('/citizen/phone/verify', function(req, res){
                debug('Inside /citizen/phone/verify');
                authApiHandlers.checkForCitizen(req, function(responseData){
                    res.json(responseData);
                });
            });   

            app.post('/police/id/verify', function(req, res){
                debug('Inside /police/id/verify');
                authApiHandlers.checkForPolice(req, function(responseData){
                    res.json(responseData);
                });
            }); 

            app.post('/citizen/signup', function(req, res){
                debug('inside /citizen/signup');
                authApiHandlers.registerNewCitizen(req, function(responseData){
                    req.session.regenerate(function(){
                        req.session.user = responseData;
                    
                        res.json(responseData);                          
                    });
                });
            });

            app.post('/police/signup', function(req, res){
                debug('inside /police/signup');
                authApiHandlers.registerNewPolice(req, function(responseData){
                    req.session.regenerate(function(){
                        req.session.user = responseData;
            
                        res.json(responseData);                          
                    });
                });
            });

            app.post('/citizen/login', function (req, res){
                debug('Inside /citizen/login');
                authApiHandlers.loginCitizen(req, function(responseData){                   
                    if(responseData.status === 'loggedIn'){
                        debug(responseData);

                        req.session.regenerate(function(){
                            req.session.user = responseData;
                        
                            res.json(responseData);                         
                        });
                    }else{
                        res.json({
                            status: 'invalid'
                        })
                    }
                });
            });

            app.post('/police/login', function (req, res){
                debug('Inside /police/login');
                authApiHandlers.loginPolice(req, function(responseData){                   
                    if(responseData.status === 'loggedIn'){
                        debug(responseData);

                        req.session.regenerate(function(){
                            req.session.user = responseData;
                        
                            res.json(responseData);                          
                        });
                    }else{
                        debug('inside else')
                        res.json({
                            status: 'invalid'
                        });
                    }
                });
            });

            app.get('/logout', function (req, res) {
                debug('request to /logout');
                req.session.destroy(function(){
                    res.redirect('/');
                });
            });

            // app.get('/', function (req, res) {
            //     debug('request to /');
            //     authApiHandlers.homeRender(req, function(argOne, argTwo){
            //         res.render(argOne, argTwo);
            //     });
            // });
        }
        return {
            initialize: initialize
        }
    }
);