/**
 * Copyright Toorq Media Serivces
 * @author Ashwin Hariharan
 * @Details Styles for google maps.
 */

define(
	[
		"exports"
	],
	function(exports){
		exports.retro = [
		    {
		        "featureType": "administrative",
		        "stylers": [
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "stylers": [
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "stylers": [
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "stylers": [
		            {
		                "color": "#84afa3"
		            },
		            {
		                "lightness": 52
		            }
		        ]
		    },
		    {
		        "stylers": [
		            {
		                "saturation": -17
		            },
		            {
		                "gamma": 0.36
		            }
		        ]
		    },
		    {
		        "featureType": "transit.line",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#3f518c"
		            }
		        ]
		    }
		];

		exports.unsaturatedBrown = [
		    {
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "hue": "#ff4400"
		            },
		            {
		                "saturation": -68
		            },
		            {
		                "lightness": -4
		            },
		            {
		                "gamma": 0.72
		            }
		        ]
		    },
		    {
		        "featureType": "road",
		        "elementType": "labels.icon"
		    },
		    {
		        "featureType": "landscape.man_made",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "hue": "#0077ff"
		            },
		            {
		                "gamma": 3.1
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "stylers": [
		            {
		                "hue": "#00ccff"
		            },
		            {
		                "gamma": 0.44
		            },
		            {
		                "saturation": -33
		            }
		        ]
		    },
		    {
		        "featureType": "poi.park",
		        "stylers": [
		            {
		                "hue": "#44ff00"
		            },
		            {
		                "saturation": -23
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "hue": "#007fff"
		            },
		            {
		                "gamma": 0.77
		            },
		            {
		                "saturation": 65
		            },
		            {
		                "lightness": 99
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "labels.text.stroke",
		        "stylers": [
		            {
		                "gamma": 0.11
		            },
		            {
		                "weight": 5.6
		            },
		            {
		                "saturation": 99
		            },
		            {
		                "hue": "#0091ff"
		            },
		            {
		                "lightness": -86
		            }
		        ]
		    },
		    {
		        "featureType": "transit.line",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "lightness": -48
		            },
		            {
		                "hue": "#ff5e00"
		            },
		            {
		                "gamma": 1.2
		            },
		            {
		                "saturation": -23
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "labels.text.stroke",
		        "stylers": [
		            {
		                "saturation": -64
		            },
		            {
		                "hue": "#ff9100"
		            },
		            {
		                "lightness": 16
		            },
		            {
		                "gamma": 0.47
		            },
		            {
		                "weight": 2.7
		            }
		        ]
		    }
		];

		exports.deathByBlue = [
		    {
		        "featureType": "all",
		        "elementType": "all",
		        "stylers": [
		            {
		                "weight": "1.69"
		            },
		            {
		                "hue": "#00e9ff"
		            },
		            {
		                "saturation": "-13"
		            },
		            {
		                "lightness": "-23"
		            },
		            {
		                "gamma": "1.19"
		            }
		        ]
		    }
		];

		exports.midnightCommander = [
		    {
		        "featureType": "all",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "color": "#ffffff"
		            }
		        ]
		    },
		    {
		        "featureType": "all",
		        "elementType": "labels.text.stroke",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 13
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "color": "#000000"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#144b53"
		            },
		            {
		                "lightness": 14
		            },
		            {
		                "weight": 1.4
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#08304b"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#0c4152"
		            },
		            {
		                "lightness": 5
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "color": "#000000"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#0b434f"
		            },
		            {
		                "lightness": 25
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "color": "#000000"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#0b3d51"
		            },
		            {
		                "lightness": 16
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#146474"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#021019"
		            }
		        ]
		    }
		]


	}
)	    