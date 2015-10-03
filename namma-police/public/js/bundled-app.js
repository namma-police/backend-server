webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(1),
			__webpack_require__(3),
			__webpack_require__(5),
			__webpack_require__(6),
			__webpack_require__(7)
			
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, $, LoginPage, CitizenPage, PolicePage){	
			console.log('Loaded the Home Page');
			var documentBody = document.body,
				userId = documentBody.getAttribute('data-userid'),
				userType = documentBody.getAttribute('data-user-type');

			if(userId === ''){
				React.render(React.createElement(LoginPage, null), document.getElementById('componentContainer'))
			}else if(userType === 'citizen'){
				React.render(React.createElement(CitizenPage, {userId: userId, userType: userType}), document.getElementById('componentContainer'));
			}else if(userType === 'police'){
				React.render(React.createElement(PolicePage, {userId: userId, userType: userType}), document.getElementById('componentContainer'));
			}
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	//webpack --progress --colors --watch (for development)
	//webpack -p (for production)

/***/ },
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(1),
			__webpack_require__(8)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, commonFunctions){
			var LoginPage = React.createClass({displayName: "LoginPage",
				getInitialState: function(){
					return {
						userName:'ashwin'
					}			
				},
				componentDidMount:function(){
					console.log('triggered once after initial render');
				},
				verifyCitizenPhone: function(){
					var citizenPhone = document.getElementById('citizenPhone').value;
					var postData = {
						phone: citizenPhone
					},
					successcallback = function(data){
						console.log(data);
					}
					commonFunctions.makeAjaxPost('/citizen/phone/verify', postData, successcallback);

				},
				verifyPoliceId: function(){
					var policeid = document.getElementById('policeIdInput').value;
					var postData = {
						policeid: policeid
					},
					successcallback = function(data){
						console.log(data);
					}
					commonFunctions.makeAjaxPost('/police/id/verify', postData, successcallback);
				},
				registerCitizen: function(){
					var displayName = document.getElementById('citizenDisplayNameInput').value,
						phone = document.getElementById('citizenPhone').value,
						email = document.getElementById('citizenEmailInput').value,
						password = document.getElementById('citizenPassword').value;

					var postData = {
						displayName: displayName,
						phone: phone,
						email: email,
						password: password
					},
					successcallback = function(data){
						console.log(data);
						window.location.replace('/');
					};

					commonFunctions.makeAjaxPost('/citizen/signup', postData, successcallback);

				},
				registerPolice: function(){
					var displayName = document.getElementById('policeDisplayNameInput').value,
						policeId = document.getElementById('policeIdInput').value,
						phone = document.getElementById('policePhone').value,
						email = document.getElementById('policeEmailInput').value,
						password = document.getElementById('policePassword').value;

					var postData = {
						displayName: displayName,
						policeId: policeId,
						phone: phone,
						email: email,
						password: password
					},
					successcallback = function(data){
						console.log(data);
						window.location.replace('/');
					};

					commonFunctions.makeAjaxPost('/police/signup', postData, successcallback);
				},
				loginCitizen: function(){
					var phone = document.getElementById('citizenLoginPhone').value,
						password = document.getElementById('citizenLoginPassword').value;

					var postData = {
						phone: phone,
						password: password
					},
					successcallback = function(data){
						console.log(data);
						window.location.replace('/');
					}
					commonFunctions.makeAjaxPost('/citizen/login', postData, successcallback);
				},
				loginPolice: function(){
					var policeId = document.getElementById('policeLoginId').value,
						password = document.getElementById('policeLoginPassword').value;

					var postData = {
						policeId: policeId,
						password: password
					},
					successcallback = function(data){
						console.log(data);
						window.location.replace('/');
					}
					commonFunctions.makeAjaxPost('/police/login', postData, successcallback);
				},
			  	render:function(){
			  		var style={
			  			top: '-200px',
			  			left: '400px',
			  			position: 'relative'
			  		},
			  		that = this;

				    return (
				    	React.createElement("div", {id: "loginPage"}, 
				    		React.createElement("div", {id: "citizenSignup"}, 
				    			React.createElement("div", null, "Citizen Display Name: ", React.createElement("input", {type: "text", id: "citizenDisplayNameInput"}), " "), 
				    			React.createElement("div", null, "Citizen phone: ", React.createElement("input", {type: "text", id: "citizenPhone", onBlur: that.verifyCitizenPhone})), 
				    			React.createElement("div", null, "Citizen email: ", React.createElement("input", {type: "text", id: "citizenEmailInput"})), 
				    			React.createElement("div", null, "Citizen password: ", React.createElement("input", {type: "password", id: "citizenPassword"})), 
				    			React.createElement("button", {type: "submit", id: "citizenSignupButton", onClick: that.registerCitizen}, "Register")
				    		), 
				    		React.createElement("div", {id: "policeSignup"}, 
				    			React.createElement("div", null, "Police ID: ", React.createElement("input", {type: "text", id: "policeIdInput", onBlur: that.verifyPoliceId}), " "), 
				    			React.createElement("div", null, "Police display name: ", React.createElement("input", {type: "text", id: "policeDisplayNameInput"}), " "), 
				    			React.createElement("div", null, "Police phone: ", React.createElement("input", {type: "text", id: "policePhone"})), 
				    			React.createElement("div", null, "Police email: ", React.createElement("input", {type: "text", id: "policeEmailInput"})), 
				    			React.createElement("div", null, "Police password: ", React.createElement("input", {type: "password", id: "policePassword"})), 
				    			React.createElement("button", {type: "submit", id: "policeSignupButton", onClick: that.registerPolice}, " register")
				    		), 
				    		React.createElement("div", {style: style}, 
					    		React.createElement("div", {id: "citizenLogin"}, 
					    			React.createElement("div", null, "Citizen Login with phone: ", React.createElement("input", {type: "text", id: "citizenLoginPhone"}), " "), 
					    			React.createElement("div", null, "Password: ", React.createElement("input", {type: "password", id: "citizenLoginPassword"}), " "), 
					    			React.createElement("button", {type: "submit", id: "citizenLoginButton", onClick: that.loginCitizen}, "Register")
					    		), 

					    		React.createElement("div", {id: "policeLogin"}, 
					    			React.createElement("div", null, "Police Login with id: ", React.createElement("input", {type: "text", id: "policeLoginId"}), " "), 
					    			React.createElement("div", null, "Password: ", React.createElement("input", {type: "password", id: "policeLoginPassword"}), " "), 
					    			React.createElement("button", {type: "submit", id: "policeLoginButton", onClick: that.loginPolice}, "Register")
					    		)
					    	)	
		 		    	)
				    );
			  	}
			});

			return LoginPage;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(1),
			__webpack_require__(9),
			__webpack_require__(8)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, MapWidget, commonFunctions){
			var CitizenPage = React.createClass({displayName: "CitizenPage",
				getInitialState: function(){
					return {
						userId: this.props.userId,
						userType: this.props.userType,
						currentLocation: null
					}			
				},
				componentDidMount:function(){
					console.log('triggered once after initial render');

					socket.on('waiting-for-help', function(postData){
						console.log(postData);
					});
				},
				processAddress: function(placeInfo){
					var postData = {
						coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
					},
					successCallback = function(data){
						console.log(data);
						socket.emit('help-request', postData);
					}.bind(this);
					
					commonFunctions.makeAjaxPost('/help/request', postData, successCallback);
					//commonFunctions.makeAjaxPost('/'+this.props.userType+'/location/update', postData, successCallback);

				},
				logout: function(){
					window.location.replace('/logout');
				},
			  	render:function(){
			  		var mapOptions = {
			  			displayMaps: true, 
			  			autocompleteInput: '#autocomplete',
			  			autocompleteCallback: this.processAddress,
			  			latLng: [20.594, 78.963],
			  			zoomLevel: 4,
			  			animateMarker: false
			  		},
			  		style = {
			  			width: '600px',
			  			height: '400px'
			  		};
				    return (
				    	React.createElement("div", {id: "CitizenPage"}, 
				    		React.createElement("button", {id: "logoutButton", onClick: this.logout}, "logout"), 
				    		React.createElement("div", null, 
				    			"Welcome, ", this.state.userId
				    		), 
				    			
				    		React.createElement("input", {type: "text", id: "autocomplete"}), 
				    		React.createElement("div", {id: "map-container", style: style}, 
				    			React.createElement(MapWidget, {options: mapOptions})
				    		)
		 		    	)
				    );
			  	}
			});

			return CitizenPage;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(1),
			__webpack_require__(9),
			__webpack_require__(8)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, MapWidget, commonFunctions){
			var PolicePage = React.createClass({displayName: "PolicePage",
				getInitialState: function(){
					return {
						userId: this.props.userId,
						userType: this.props.userType,
						currentLocation: null
					}			
				},
				componentDidMount:function(){
					console.log('triggered once after initial render');
					//this.props.userId+
					socket.on(this.props.userId+'-waiting-for-requests', function(postData){
						console.log(postData);
					});
					
				},
				processAddress: function(placeInfo){
					var postData = {
						coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
					},
					successCallback = function(data){
						console.log(data);
					};
					
					//commonFunctions.makeAjaxPost('/help/request', postData, successCallback);
					commonFunctions.makeAjaxPost('/'+this.props.userType+'/location/update', postData, successCallback);

				},
				logout: function(){
					window.location.replace('/logout');
				},
			  	render:function(){
			  		var mapOptions = {
			  			displayMaps: true, 
			  			autocompleteInput: '#autocomplete',
			  			autocompleteCallback: this.processAddress,
			  			latLng: [20.594, 78.963],
			  			zoomLevel: 4,
			  			animateMarker: false
			  		},
			  		style = {
			  			width: '600px',
			  			height: '400px'
			  		};
				    return (
				    	React.createElement("div", {id: "PolicePage"}, 
				    		React.createElement("button", {id: "logoutButton", onClick: this.logout}, "logout"), 
				    		React.createElement("div", null, 
				    			"Welcome, ", this.state.userId
				    		), 
				    			
				    		React.createElement("input", {type: "text", id: "autocomplete"}), 
				    		React.createElement("div", {id: "map-container", style: style}, 
				    			React.createElement(MapWidget, {options: mapOptions})
				    		)
		 		    	)
				    );
			  	}
			});

			return PolicePage;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        exports,
	        __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(exports, $){
	    	exports.makeAjaxGet = function(url, successCallback){
	    		$.ajax({
	    		    url: url,
	    		    type: 'GET',
	    		    data: postData,
	    		    success: successCallback,
	    		    error: function(httpRequest,status,error){
	    		        console.log(error);
	    		    }
	    		});
	    	};

	    	exports.makeAjaxPost = function(url, postData, successCallback){
	    		$.ajax({
	    		    url: url,
	    		    type: 'POST',
	    		    data: postData,
	    		    success: successCallback,
	    		    error: function(httpRequest,status,error){
	    		        console.log(error);
	    		    }
	    		});
	    	};
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))    

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
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

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(1),
	        __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, $) {
	    
	    var MapWidget = React.createClass({displayName: "MapWidget",
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
	                React.createElement("div", {className: "location-map ", id: "location-map"}

	                )
	            )
	        }
	    });   
	    return MapWidget;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));     

/***/ }
]);