/* @author booleanhunter
 * @details Configuration file 
 */
var config = {
    database_port: 27107,
    dbURL: "mongodb://localhost/socialogin",
    production: {
        server_port1: 443,
        server_port2: 80
    },
    development: {
        server_port1: 8000,
        server_port2: 8080,
        googleBackEndPlacesKey: "AIzaSyBE1zF3esVLiworvuhyNkC9hAi4t1AFmlU"
    }
}

exports.config = config