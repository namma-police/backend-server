/* @author Ashwin Iyer
 * @details This function uses google maps api 
 */
define(
    [
        'googlemaps', 
    ], 
    function (GoogleMapsAPI) {
        var debug = require('debug')('nammapolice:google-maps-api'),
            googleApiKey = 'AIzaSyDAnb4-YCzt_byKF-ZoU3SGgwq3i2uCSog';

            
        var publicConfig = {
            key: googleApiKey,
            stagger_time:       1000, // for elevationPath
            encode_polylines:   false,
            secure:             false, // use https
            //proxy:              'http://127.0.0.1:8000' // optional, set a proxy for HTTP requests
        };

        var gmAPI = new GoogleMapsAPI(publicConfig);    

        function getlatLngDetails(coordinates, callback){
            debug('api-handler getlatLngDetails');
            var reverseGeocodeParams = {
                "latlng":  coordinates[0] + ","+ coordinates[1]
            };

            gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
                var resultData = {};
                if(err){
                    resultData = {
                        message: 'Execute failed in getlatLngDetails',
                        error: err
                    };
                    callback(resultData);
                }else{
                    callback(null, result);
                }
                
            });
        }    
        
        return {
            getlatLngDetails: getlatLngDetails
        }
    }
);