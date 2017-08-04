/* @author booleanhunter
 * @details configuring the app object of express
 */

var express = require('express');
var async = require('async');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var serveFavicon = require('serve-favicon');
var expressSession = require('express-session');
var redis = require('redis');

function configure() {

    var RedisStore = require('connect-redis')(expressSession),
        MongoStore = require('connect-mongo')(expressSession);

    var busboy = require('connect-busboy'),
        _ = require('underscore'),
        consolidate = require('consolidate'),
        debug = require('debug')('nammapolice:express-configs');

    var expressInstance = express();

    expressInstance.disable('x-powered-by');

    expressInstance.set('views', 'views');
    expressInstance.set('view engine', 'html');
    expressInstance.engine('html', consolidate.underscore);


    expressInstance.use(express.static('./public'));
    expressInstance.use(bodyParser.urlencoded({
        extended: true,
    }));

    expressInstance.use(bodyParser.json({
        limit: '5mb'
    }));
    expressInstance.use(cookieParser());

    expressInstance.use(busboy());

    var redisip = 'localhost';

    if(process.argv.indexOf("-redisip") != -1){ //does our flag exist?
        redisip = process.argv[process.argv.indexOf("-redisip") + 1]; //grab the next item
    }
    console.log(redisip);
    expressInstance.use(expressSession({ //4
        store: new RedisStore({
            host: redisip,
            port: 6379,
            db: 2,
            ttl: 60 * 60 * 24 * 365
        }),
        secret: 'booleanhunter',
        resave: true,
        saveUninitialized: true
    }));
    
    // expressInstance.use(expressSession({
    //     store: new MongoStore({
    //                 host: 'localhost', // Default, optional
    //                 port: 27017, // Default, optional
    //                 db: 'test'
    //             }),
    //     secret: 'ashwinhariharanapp',
    //     resave: true,
    //     saveUninitialized: true
    // }));

    return expressInstance
}

exports.configure = configure;