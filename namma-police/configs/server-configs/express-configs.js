/* @author Ashwin Hariharan
 * @details configuring the app object of express
 */
 
define(
    [
        'express',
        'async',
        'path',
        'body-parser',
        'cookie-parser',
        'serve-favicon',
        'express-session',
        'redis'
    ], function(express, async, path, bodyParser, cookieParser, serveFavicon, expressSession, redis){
        function configure(){

            var RedisStore = require('connect-redis')(expressSession),
                MongoStore = require('connect-mongo')(expressSession);
                busboy = require('connect-busboy'),
                _ = require('underscore'),
                consolidate = require('consolidate'),
                debug = require('debug')('myApp:express-configs');

            var expressInstance = express(),
                options = {
                    db: 2,
                    client: redis.createClient(),
                    ttl: 60 * 60 * 24 * 365
                };

            expressInstance.disable('x-powered-by');

            expressInstance.set('views', 'views');            
            expressInstance.set('view engine', 'html');           
            expressInstance.engine('html', consolidate.underscore);


            expressInstance.use(express.static('./public'));
            expressInstance.use(bodyParser.urlencoded({
                extended: true,
            }));
             
            expressInstance.use(bodyParser.json({limit: '5mb'}));
            expressInstance.use(cookieParser());

            expressInstance.use(busboy());

            expressInstance.use(expressSession({
                secret: 'ashwinhariharanapp',
                store: new RedisStore({db:2}),
                saveUninitialized: true,
                resave: true
            }));

            expressInstance.use(expressSession({
                store: new MongoStore({
                            host: 'localhost', // Default, optional
                            port: 27017, // Default, optional
                            db: 'test'
                        }),
                secret: 'ashwinhariharanapp',
                resave: true,
                saveUninitialized: true
            }));
            
            return expressInstance    
        }
        return {
            configure: configure
        }
    }
);

