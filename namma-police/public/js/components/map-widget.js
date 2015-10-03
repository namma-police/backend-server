/**
 * @author Ashwin Hariharan
 * @Details A Custom Widget for rendering a map, can be used as a plugin anywhere. Requires an 'options' object
        to be passed as props. Example:-
        {
            displayMaps: true, 
            autocompleteInput: '#autocomplete',
            autocompleteCallback: this.processAddress,
            latLng: [20.594, 78.963],
            zoomLevel: 4,
            animateMarker: true
        }

        Will be converting this to a normal modular file too.
 */

define(
    [
        'react',
        'jquery'
    ], function(React, $) {
    
    var MapWidget = React.createClass({
        getInitialState:function(){
            return {
                map: ''
            }
        },
        mapComponents: {
            map: null,
            mapOptions: null,
            marker: null,
            markerOptions: null, 
            latLng: null,
            autocompleteDom: null,
            geocoder: null       
        },
        componentWillMount: function(){
            this.loadGoogleMaps();
        },
        loadGoogleMaps: function(){
            var that = this;
            $script("https://www.google.com/jsapi", function() {
                google.load("maps", "3.exp", {
                    callback: that.initialize,
                    other_params: 'libraries=places'
                });
            });
        },
        initialize: function(){
            var that = this,
                options = this.props.options;

            if(options.displayMaps && options.latLng){
                that.initializeMap(options);
                that.changeMapOnClick(options.autocompleteCallback);
            }

            if(options.autocompleteInput){
                that.initializeAutocomplete(options.autocompleteInput, options.autocompleteCallback);              
            }
            
        },
        initializeMap: function(options){
            this.mapComponents.latLng = new google.maps.LatLng(options.latLng[0], options.latLng[1]);
            var mapOptions = {
                zoom: options.zoomLevel,
                center: this.mapComponents.latLng,
                zoomControl: true,

            }

            this.mapComponents.geocoder = new google.maps.Geocoder(),
            this.mapComponents.map =  new google.maps.Map(document.getElementById("location-map"), mapOptions);
            
            // this.adjustZoom(options.placeType[0]);
            this.initializeMarker(options);
        },
        initializeMarker: function(options){
            var that = this,
                animation = null,
                autocomplete = this.mapComponents.autocompleteDom;

            if(options.animateMarker){
                animation = google.maps.Animation.BOUNCE;
            }

            this.mapComponents.marker = new google.maps.Marker({
                map: this.mapComponents.map,
                draggable: true,
                position: this.mapComponents.latLng,
                animation: animation
            });

            google.maps.event.addListener(this.mapComponents.marker, 'click', this.toggleBounce);

            var zoomLevel,
                autoComplete;

            google.maps.event.addListener(this.mapComponents.marker, 'dragend', function() {
                that.mapComponents.geocoder.geocode({
                    'latLng': that.mapComponents.marker.getPosition()
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results) {
                            zoomLevel = that.mapComponents.map.getZoom();
                            autoComplete = that.mapComponents.autocompleteDom;

                            if(zoomLevel > 12){
                                autoComplete.value = results[1].formatted_address;
                            }else if(zoomLevel > 8 && zoomLevel <= 12){
                                autoComplete.value = results[2].formatted_address;
                            }else if(zoomLevel >6 && zoomLevel <=8){
                                autoComplete.value = results[results.length - 3].formatted_address;
                            }else if(zoomLevel >4 && zoomLevel <= 6){
                                autoComplete.value = results[results.length - 2].formatted_address;
                            }else if(zoomLevel <= 4){
                                autoComplete.value = results[results.length - 1].formatted_address;
                            }
                            autoComplete.focus();
                        }
                    }
                });
            });

            //this.setMapBounds(options.latLng);
        },
        initializeAutocomplete: function(dom, callback){
            var that = this,
                domElement;

            switch(dom[0]){
                case '#':
                    domElement = document.getElementById(dom.replace('#',''));
                    break;
                case '.':
                    domElement = document.getElementsByClassName(dom.replace('.',''))[0];

            }
            this.mapComponents.autocompleteDom = domElement;

            var autocomplete = new google.maps.places.Autocomplete(
                (domElement), {
                    types: []
                });
            var placeInfo;

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                placeInfo = autocomplete.getPlace();
                console.info(placeInfo);
                if(that.mapComponents.map){
                    that.mapComponents.map.panTo(new google.maps.LatLng(placeInfo.geometry.location.lat(), placeInfo.geometry.location.lng()));
                    
                    that.mapComponents.marker.setPosition(new google.maps.LatLng(placeInfo.geometry.location.lat(), placeInfo.geometry.location.lng()));
                    //that.mapComponents.marker.setAnimation(google.maps.Animation.BOUNCE);
                    that.adjustZoom(placeInfo.types[0])
                }

                if(typeof(callback) === 'function'){
                    callback(placeInfo);
                }
            });
        },
        toggleBounce: function() {
            var that = this;
            if (this.mapComponents.marker.getAnimation()) {
                that.mapComponents.marker.setAnimation(null);
            }else{
                that.mapComponents.marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        },
        changeMapOnClick: function(callback){
            var that = this, 
                zoomLevel;

            if(typeof(callback) === 'function'){
                google.maps.event.addListener(that.mapComponents.map, 'click', function(e) {
                    that.mapComponents.geocoder.geocode({'latLng': e.latLng}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results) {
                                var zoomLevel = that.mapComponents.map.getZoom();
                                var autoComplete = document.getElementById('autocomplete');
                                if(zoomLevel > 12){
                                    callback(results[1]);
                                
                                }else if(zoomLevel > 8 && zoomLevel <= 12){
                                    callback(results[2]);
                                
                                }else if(zoomLevel >6 && zoomLevel <=8){
                                    callback(results[results.length - 3]);
                                
                                }else if(zoomLevel >4 && zoomLevel <= 6){
                                    callback(results[results.length - 2]);
                                
                                }else if(zoomLevel <= 4){
                                    callback(results[results.length - 1]);
                                }
                            }
                        }
                    });
                });
            }           
        },
        adjustZoom: function(placeType){
            switch(placeType){
                case 'world': zoomLevel = 0;
                                break;
                case 'country': zoomLevel = 4;
                                break;
                case 'administrative_area_level_1': zoomLevel = 6;
                                break;
                case 'locality' : zoomLevel = 7;
                                break;
                case 'sublocality_level_1': zoomLevel = 8;                                
                                break;
                default: zoomLevel = 6;
                                break;
            }
            this.mapComponents.map.setZoom(zoomLevel);
        },
        setMapBounds: function(latLng){
            var that = this;
            var bounds = new google.maps.LatLngBounds(),
                points = [
                    new google.maps.LatLng(Number(latLng[0]), Number(latLng[1]))
                ];

            // Extend bounds with each point
            for (var i = 0; i < points.length; i++) {
                bounds.extend(points[i]);
                //new google.maps.Marker({position: points[i], map: that.mapComponents.map});
            }

            // Apply fitBounds
            that.mapComponents.map.fitBounds(bounds);  

            // Draw the bounds rectangle on the map
            var ne = bounds.getNorthEast(),
                sw = bounds.getSouthWest();

            var boundingBox = new google.maps.Polyline({
                path: [
                    ne, new google.maps.LatLng(ne.lat(), sw.lng()),
                    sw, new google.maps.LatLng(sw.lat(), ne.lng()), ne
                ],
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            boundingBox.setMap(that.mapComponents.map);
        },
        refreshMaps: function(){
            google.maps.event.trigger(this.mapComponents.map, 'resize');
        },
        render:function(){
            var that = this;
            return (
                <div className="location-map " id="location-map">

                </div>
            )
        }
    });   
    return MapWidget;
    }
);     