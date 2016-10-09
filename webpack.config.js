/**
 * @Author Ashwin Hariharan
 * @Details Webpack config file for adding new vendors, defining entry points and shimming modules. 
 */

var webpack = require('webpack');
var path = require("path");

var lib_dir = __dirname + '/public/js/libs',
    node_dir = __dirname + '/node_modules',
    plugins_dir = __dirname + '/public/plugins';
   // bower_dir = __dirname + '/bower_components'

var config = {
    addVendor: function (name, path) {  //This is not a built-in function
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },

    resolve: {
        alias: {
            react: lib_dir + '/react.js',
            reactDom: lib_dir + '/react-dom',
            underscore: node_dir + '/underscore/underscore.js',
            jquery: lib_dir + '/jQuery-2.1.4.min.js',
            velocity: lib_dir + '/velocity.min.js',
            jqueryUi: plugins_dir + '/jQueryUI/jquery-ui.min.js',
            bootstrap: plugins_dir + '/bootstrap/js/bootstrap.min.js',
            slimscroll: plugins_dir + '/slimScroll/jquery.slimscroll.min.js',
            fastclick: plugins_dir + '/fastclick/fastclick.min.js',
        }
    }, 

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            'window.jQuery': "jquery",
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/dist/vendors.js', Infinity),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()

    ],

    entry: {
        app: ['./public/js/app-main'],
        vendors: ['react','reactDom','underscore','jquery','velocity','jqueryUi','bootstrap','slimscroll','fastclick']
    },

    output: {
        path: path.join(__dirname, "public"),
        filename: "js/bundled-app.js"
    },

    output: {
        path: path.join(__dirname, "public"),
        filename: "js/dist/[name].bundle.js"
    },
    
    module: {
        noParse: [
            new RegExp(lib_dir + './react.js'),
            new RegExp(lib_dir + './react-dom.js')
        ],

        loaders: [
            // { 
            //     test: /\.js?$/, 
            //     loaders: ['react-hot'],
            //     include: path.join(__dirname, 'public')

            // },
            { 
               loader: 'babel', //'jsx-loader'
                query: {
                    presets: ['react', 'es2015']
                },
                include: path.join(__dirname, 'public')
            }, 
        ]
    }
};

// config.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = config;

/*
----------
View package.json for more configuration details

1. Command:- 
    webpack --profile --json > stats.json 
        
    Will generate a JSON file called stats.json. Go to http://webpack.github.io/analyse/ and upload the file,
    and see all dependencies in a tree like structure

2. Commands:-
    --> npm run dev 

    Will run webpack-dev-server with the arguments specified (--devtool eval --progress --colors --content-base build)

1. --devtool eval will add source urls to your code, which will make sure that any errors point to the right file and line.
2. --progress and --colors will just improve the feedback you get in the terminal when running your workflow.
3. --content-base build points to where you have your custom index.html located.
----------
Since we are using React, we need to evaluate XML along with JS.  This can be done by using jsx-loader. npm install jsx-loader --save will make 
the module available, and then we specify the loader in here- {test:/\.js$/,loader: 'jsx-loader'}. This tells
WebPack that whenever we try to require something that ends with .js it should run the contents of that file through the jsx-loader. 
----------

  "scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --colors --content-base views/"
  },

*/