/* @author booleanhunter
 * @details This function uses google maps api 
 */
 
var GoogleMapsAPI = require('googlemaps');
var config = require('../../configs/server-configs/config');

var debug = require('debug')('nammapolice:google-maps-api');
    
var googleApiKey = config.config.development.googleBackEndPlacesKey; 


var publicConfig = {
    key: googleApiKey,
    stagger_time: 1000, // for elevationPath
    encode_polylines: false,
    secure: false, // use https
    //proxy:              'http://127.0.0.1:8000' // optional, set a proxy for HTTP requests
};

var gmAPI = new GoogleMapsAPI(publicConfig);

function getlatLngDetails(coordinates, callback) {
    debug('api-handler getlatLngDetails');
    var reverseGeocodeParams = {
        "latlng": coordinates[0] + "," + coordinates[1]
    };

    gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result) {
        var resultData = {};
        if (err) {
            resultData = {
                message: 'Execute failed in getlatLngDetails',
                error: err
            };
            callback(resultData);
        } else {
            callback(null, result);
        }

    });
}

exports.getlatLngDetails = getlatLngDetails;