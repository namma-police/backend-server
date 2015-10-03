/* @author Ashwin Iyer
 * @details These are the API handlers for authentication
 */
define(
    [
        'async',
        'bcrypt',
        'crypto',
        '../../database/account-db',
        '../utilities/mail-handler',
    ], 
    function (async, bcrypt, crypto, accountDb, mailHandler) {
        var bcrypt = require('bcrypt'),
            SALT_WORK_FACTOR = 10,
            debug = require('debug')('myApp:auth-api-handlers');


        function signup(req, responseCallback){
            debug('api-handler signup');

            var reqObj = req.body;
                reqObj.userName = req.body.userName.toLowerCase();

            reqObj.displayName = reqObj.displayName;

            var token = crypto.randomBytes(15).toString('hex');
            reqObj.token = token;

            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if (err){
                    debug(err);
                }

                // hash the password using our new salt
                bcrypt.hash(reqObj.password, salt, function(err, hash) {
                    if (err) return next(err);
             
                    // override the cleartext password with the hashed one
                    reqObj.password = hash;
                    accountDb.registerNewUser(reqObj, responseCallback);
                });
            });

            var messageBody = 'Welcome!';

            debug(messageBody);

            mailHandler.sendEmail('My-App <notification@myApp.org>', [reqObj.email], null, 'Welcome to My App', messageBody, function(err, result){
                if(err){
                    debug(err);
                }else{
                    debug(result);
                }               
            });
        }    

        function login(req, responseCallback){
            debug('api-handler login');
            debug(req.body);
            var reqObj = req.body;

            async.series(
                {
                    one: function (callback) {
                        accountDb.checkForUser(reqObj, callback);
                    }
                },
                function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        var responseData = {};

                        if(results.one.message){
                            responseData = {
                                status: 'incorrect username'
                            };
                            responseCallback(responseData);                      
                        
                        }else{
                            bcrypt.compare(reqObj.password, results.one.password, function(err, res) {
                                if (err){
                                    debug(err);
                                }else{
                                    if(res){
                                        var displayPicture = null, coverPicture = null;
                                        if(results.one.displayPictures){
                                            displayPicture = results.one.displayPictures[0]
                                        }
                                        if(results.one.coverPictures){
                                            coverPicture = results.one.coverPictures[0]
                                        }

                                        responseData = {
                                            userName: reqObj.userName,
                                            displayName: results.one.displayName,
                                            userPrivilege: results.one.userPrivilege,
                                            status: 'loggedIn',
                                            displayPicture: displayPicture,
                                            coverPicture: coverPicture
                                        };
                                    }else{
                                        responseData = {
                                            status: 'unlogged'
                                        };
                                    }

                                    responseCallback(responseData);
                                }
                            });
                        }
                    }
                }
            );
        }

        function checkUserName(req, responseCallback){
            debug('api-handler checkUserName');
            
            var reqObj = {};
            reqObj.userName = req.body.userName;
            
            accountDb.checkForUser(reqObj, responseCallback);
        }

        homeRender = function(req, url, responseCallback){
            debug('inside homeRender');
            var argOne = 'index',
                argTwo = {};
                
            if(req.session.user != null){
                argTwo = {
                    user_name: req.session.user.userName,
                };

                responseCallback(argOne, argTwo);                         
            }
            else {
                argTwo = {
                    user_name: null
                };

                responseCallback(argOne, argTwo);
            }
        };
        
        return {
            signup: signup,
            login: login,
            checkUserName: checkUserName,
            homeRender: homeRender
        }
    }
);