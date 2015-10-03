/* @author Ashwin Iyer
 * @details Configuring the API related to authentication and invoking other authentication modules
 */
define(
    [
        '../route-handlers/auth-api-handlers',
        //'passport',
    ],
    function(authApiHandlers) {
        function initialize(expressInstance) {
            //passport configurations
            var app = expressInstance,
                debug = require('debug')('myApp:auth-api');

            app.get('/logout', function (req, res) {
                debug('request to /logout');
                req.session.destroy(function(){
                    res.redirect('/');
                });
            });

            app.post('/login', function (req, res){
                debug('Inside login');
                authApiHandlers.login(req, function(responseData){                   
                    if(responseData.status === 'loggedIn'){
                        debug(responseData);

                        req.session.regenerate(function(){
                            req.session.user = {
                                userName: responseData.userName,
                                displayName: responseData.displayName,
                                displayPicture: responseData.displayPicture,
                                coverPicture: responseData.coverPicture,
                                userPrivilege: responseData.userPrivilege,
                                status: responseData.status
                            };
                        
                            res.json(responseData);                          
                        });
                    }else{
                        res.json(responseData);
                    }
                });
            });

            app.get('/', function (req, res) {
                debug('request to /');
                authApiHandlers.homeRender(req, 'all', function(argOne, argTwo){
                    res.render(argOne, argTwo);
                });
            });
        }
        return {
            initialize: initialize
        }
    }
);