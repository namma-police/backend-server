/* @author Ashwin Iyer
 * @details These are the API handlers for authentication
 */
define(
    [
        'async',
        'bcrypt',
        'crypto',
        '../../database/auth-db-api',
        '../utilities/mail-handler',
    ], 
    function (async, bcrypt, crypto, authDbApi, mailHandler) {
        var bcrypt = require('bcrypt'),
            SALT_WORK_FACTOR = 10,
            debug = require('debug')('nammapolice:auth-api-handlers');


        function checkForCitizen(req, responseCallback){
            authDbApi.getCitizenDetails(req.body, function(err, resultData){
                var responseData = {};
                if(err){
                    debug(err);
                }else{
                    if(resultData.phone){
                        responseData = {
                            status: 'notavailable'
                        }
                    }else{
                        responseData = {
                            status: 'available'
                        }
                    }
                }
                responseCallback(responseData);
            });
        }

        function checkForPolice(req, responseCallback){
            authDbApi.getPoliceDetails(req.body, function(err, resultData){
                var responseData = {};
                if(err){
                    debug(err);
                }else{
                    if(resultData.policeid){
                        responseData = {
                            status: 'notavailable'
                        }
                    }else{
                        responseData = {
                            status: 'available'
                        }
                    }
                }
                responseCallback(responseData);
            });
        }

        function registerNewCitizen(req, responseCallback){
            debug('api-handler registerNewCitizen');

            var reqObj = req.body;

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
                    authDbApi.registerNewCitizen(reqObj, function(err, resultData){
                        if(err){
                            debug(err);
                        }else{
                            resultData = {
                                userId: resultData.citizenId,
                                displayName: resultData.displayName,
                                status: 'loggedIn',
                                userType: 'citizen'
                            };

                            responseCallback(resultData);
                        }
                    });
                });
            });

            // var messageBody = 'Welcome!';

            // debug(messageBody);

            // mailHandler.sendEmail('My-App <notification@myApp.org>', [reqObj.email], null, 'Welcome to My App', messageBody, function(err, result){
            //     if(err){
            //         debug(err);
            //     }else{
            //         debug(result);
            //     }               
            // });
        }    

        function registerNewPolice(req, responseCallback){
            debug('api-handler registerNewPolice');

            var reqObj = req.body;

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
                    authDbApi.registerNewPolice(reqObj, function(err, resultData){
                        if(err){
                            debug(err);
                        }else{
                            resultData = {
                                userId: resultData.policeId,
                                displayName: resultData.displayName,
                                status: 'loggedIn',
                                userType: 'police'
                            };
                            responseCallback(resultData);
                        }
                    });
                });
            });
        }  

        function loginCitizen(req, responseCallback){
            debug('api-handler loginCitizen');
            debug(req.body);
            var reqObj = req.body;

            async.series(
                [
                    function (callback) {
                        authDbApi.getCitizenDetails(reqObj, callback);
                    }
                ],
                function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        var resultData = {};
                        if(results[0].phone){
                            bcrypt.compare(req.body.password, results[0].password, function(err, res) {
                                if (err){
                                    debug(err);
                                }else{
                                    if(res){
                                        debug('success')
                                        resultData = {
                                            userId: results[0].citizenId,
                                            displayName: results[0].displayName,
                                            status: 'loggedIn',
                                            userType: 'citizen'
                                        }
                                    }else{
                                        debug('failure');
                                        resultData = {
                                            userId: null,
                                            displayName: null,
                                            status: null,
                                            userType: null
                                        }
                                    }

                                    responseCallback(resultData);
                                }
                            });
                        }else{
                            resultData = {
                                userId: null,
                                displayName: null,
                                status: null,
                                userType: null
                            }
                            responseCallback(resultData);
                        }
                    }
                }
            );
        }

        function loginPolice(req, responseCallback){
            debug('api-handler loginPolice');
            
            var reqObj = req.body;

            async.series(
                [
                    function (callback) {
                        authDbApi.getPoliceDetails(reqObj, callback);
                    }
                ],
                function(err, results){
                    if(err){
                        debug(err);
                    }else{
                        var resultData = {};
                        if(results[0].policeId){
                            bcrypt.compare(req.body.password, results[0].password, function(err, res) {
                                if (err){
                                    debug(err);
                                }else{
                                    if(res){
                                        debug('success')
                                        resultData = {
                                            userId: results[0].policeId,
                                            displayName: results[0].displayName,
                                            status: 'loggedIn',
                                            userType: 'police'
                                        }
                                    }else{
                                        debug('failure');
                                        resultData = {
                                            userId: null,
                                            displayName: null,
                                            status: null,
                                            userType: null
                                        }
                                    }

                                    responseCallback(resultData);
                                }
                            });
                        }else{
                            resultData = {
                                userId: null,
                                displayName: null,
                                status: null,
                                userType: null
                            }
                            responseCallback(resultData);
                        }
                    }
                }
            );
        }

        function homeRender(req, responseCallback){
            debug('inside homeRender');
            var argOne = 'index',
                argTwo = {};
            console.log(req.session.user);
            if(req.session.user){
                argTwo = {
                    user_id: req.session.user.userId,
                    status: req.session.user.status,
                    display_name: req.session.user.displayName,
                    user_type: req.session.user.userType
                };                        
            }
            else {
                argTwo = {
                    user_id: null,
                    status: null,
                    display_name: null,
                    user_type: null
                };
            }

            responseCallback(argOne, argTwo);
        };
        
        return {
            checkForCitizen: checkForCitizen,
            checkForPolice: checkForPolice,
            registerNewCitizen: registerNewCitizen,
            registerNewPolice: registerNewPolice,
            loginCitizen: loginCitizen,
            loginPolice: loginPolice,
            homeRender: homeRender
        }
    }
);