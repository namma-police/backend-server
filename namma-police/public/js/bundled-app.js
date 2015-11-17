webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(3),
			__webpack_require__(16),
			__webpack_require__(17),
			__webpack_require__(18),
			__webpack_require__(19),
			__webpack_require__(20),
			__webpack_require__(21),
			__webpack_require__(22)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, HeaderBar, ControlPanel, ContainerOne, ContainerFive,ControlsMenu, MapWidget, commonFunctions){
			var CitizenPage = React.createClass({displayName: "CitizenPage",
				getInitialState: function(){
					return {
						userId: this.props.userId,
						displayName: this.props.displayName,
						userType: this.props.userType,
						coordinates: null
					}			
				},
				componentDidMount:function(){
					console.log('triggered once after initial render');

					socket.on(this.props.userId+'-waiting-for-help', function(postData){
						console.log(postData);
					});
				},
				processAddress: function(placeInfo){
					var postData = {
						userId: this.props.userId,
						displayName: this.props.displayName,
						coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
					},
					successCallback = function(data){
						console.log(data);
						this.setState({coordinates: postData.coordinates})
					}.bind(this);
					
					commonFunctions.makeAjaxPost('/help/request', postData, successCallback);
					//commonFunctions.makeAjaxPost('/'+this.props.userType+'/location/update', postData, successCallback);

				},
				getCrimeData: function(){
					var successCallback = function(data){
						console.log(data);
						this.refs.myMap.displayCrimeStats(data);
					}.bind(this);
					commonFunctions.makeAjaxGet('/issues', successCallback);
				},
				logout: function(){
					window.location.replace('/logout');
				},
			  	render:function(){
			  		var mapOptions = {
			  			displayMaps: true, 
			  			autocompleteInput: '#autocomplete',
			  			autocompleteCallback: this.getCrimeData,
			  			latLng: [12.9759849, 77.6345852],  
			  			zoomLevel: 8,
			  			animateMarker: false
			  		},
			  		style1 = {
			  		    position: 'relative',
			  		    height: '300px'
			  		},
			  		style2 = {
			  			marginLeft: '1px'
			  		},
			  		style3 = {
			  			backgroundColor: 'white'
			  		};
				    return (

		 		    	React.createElement("div", {className: "wrapper", style: style3}, 
	    					React.createElement(HeaderBar, null), 
	    					
	    					React.createElement("div", {className: "content-wrapper", style: style2}, 
	    						React.createElement("section", {className: "content-header"}, 
	    							React.createElement("h1", null, 
	    						        "Dashboard", 
	    						       	React.createElement("small", null, "Control panel")
	    						    ), 
	    							/*<ol className="breadcrumb">
	    								<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
	    								<li className="active">Dashboard</li>
	    							</ol>*/
	                                React.createElement(ControlPanel, null)
	    						), 

	    						React.createElement("section", {className: "content"}, 
	    							React.createElement("div", {className: "row"}, 
	    								React.createElement("section", {className: "col-lg-12 connectedSortable ui-sortable"}, 
											React.createElement("div", {className: "nav-tabs-custom"}, 
							                    /* Tabs within a box */
							                    React.createElement("ul", {className: "nav nav-tabs pull-right ui-sortable-handle"}, 
							                        React.createElement("li", {className: ""}, React.createElement("a", {href: "#revenue-chart", "data-toggle": "tab", "aria-expanded": "false"}, "Area")), 
							                        React.createElement("li", {className: "active"}, React.createElement("a", {href: "#Map-chart", "data-toggle": "tab", "aria-expanded": "true"}, "Donut")), 
							                        React.createElement("li", {className: "pull-left header"}, React.createElement("i", {className: "fa fa-map-marker"}), " Map")
							                    ), 
							                    React.createElement("div", {className: "tab-content no-padding"}, 
							                        /* Morris chart - Map */
							                        React.createElement("div", {className: "chart tab-pane", id: "revenue-chart", style: style1}

							                        ), 
							                        React.createElement("div", {className: "chart tab-pane active", id: "Map-chart", style: style1}, 
							                        	React.createElement("br", null), 
							                        	React.createElement("input", {type: "text", id: "autocomplete"}), 
							                        	React.createElement(MapWidget, {options: mapOptions, ref: "myMap"})
							                        )
							                    )
							                )
	    								)

	                                    /*<section className="col-lg-5 connectedSortable ui-sortable">
	                                        <ContainerFive />
	                                    </section>*/
	    							)
	    						)

	    					), 

	                        React.createElement("footer", {className: "main-footer"}, 
	                            React.createElement("div", {className: "pull-right hidden-xs"}, 
	                                React.createElement("b", null, "Version"), " 1.0.0"
	                            ), 
	                            React.createElement("strong", null, "A ", React.createElement("a", {href: "http://namma-police.github.io"}, "Namma Police"), " initiative. ")
	                        )

	                        /*<ControlsMenu />*/
	    				)
				    );
			  	}
			});

			return CitizenPage;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(3),
			__webpack_require__(4),
			__webpack_require__(5),
			__webpack_require__(12),
			__webpack_require__(1),
			__webpack_require__(13),
			__webpack_require__(14)
			
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, ReactDOM, $, LoginPage, CitizenPage, PolicePage, StatsPage){	
			console.log('Loaded the Home Page');
			var documentBody = document.body,
				userId = documentBody.getAttribute('data-userid'),
				displayName = documentBody.getAttribute('data-display-name'),
				userType = documentBody.getAttribute('data-user-type');
				pageType = documentBody.getAttribute('data-page-type');

			if(pageType === ''){
				switch(userType){
					case '':
						ReactDOM.render(React.createElement(LoginPage, null), document.getElementById('componentContainer'));
						break;
					case 'citizen':
						ReactDOM.render(React.createElement(CitizenPage, {userId: userId, userType: userType, displayName: displayName}), document.getElementById('componentContainer'));
						break;
					case 'police':
						ReactDOM.render(React.createElement(PolicePage, {userId: userId, userType: userType, displayName: displayName}), document.getElementById('componentContainer'));
						break;
				}
			}else{
				console.log(pageType);
				ReactDOM.render(React.createElement(StatsPage, {userId: userId, userType: userType, displayName: displayName}), document.getElementById('componentContainer'));
			}
			
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	//webpack --progress --colors --watch (for development)
	//webpack -p (for production)

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(3),
			__webpack_require__(22)
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
						userId: policeid
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
						userId: policeId,
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
						//window.location.replace('/');
					}
					commonFunctions.makeAjaxPost('/citizen/login', postData, successcallback);
				},
				loginPolice: function(){
					var policeId = document.getElementById('policeLoginId').value,
						password = document.getElementById('policeLoginPassword').value;

					var postData = {
						userId: policeId,
						password: password
					},
					successcallback = function(data){
						console.log(data);
						//window.location.replace('/');
					}
					commonFunctions.makeAjaxPost('/police/login', postData, successcallback);
				},
			  	render:function(){
			  		var that = this;
				    return (
				    	React.createElement("div", {id: "homePage"}, 
				    		React.createElement("h2", {id: "mainHeader"}, "Welcome to Namma-Police"), 
				    		
				    		React.createElement("div", {id: "main", className: "section group"}, 
				    			React.createElement("div", {id: "contentWrapper1", className: "section group"}, 
						     		React.createElement("div", {id: "citizenLogin", className: "column loginSection"}, 
						     			React.createElement("h5", null, "Existing citizen?"), 
						     			React.createElement("h3", {className: "loginHeader"}, "Login"), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {className: true, type: "text", id: "citizenLoginPhone", placeholder: "User-name"})
							     		), 
							     		React.createElement("p", {className: "inputClassOne"}, 
							     			React.createElement("input", {type: "password", id: "citizenLoginPassword", placeholder: "Password"})
							     		), 
							     		React.createElement("div", {onClick: that.loginCitizen, className: "buttonClassOne", id: "citizenLoginButton"}, "Login"), 		
							     		React.createElement("div", {id: "loginErrMsg"})
							     	), 

				     	     		React.createElement("div", {id: "policeLogin", className: "column loginSection"}, 
				     	     			React.createElement("h5", null, "Existing police?"), 
				     	     			React.createElement("h3", {className: "loginHeader"}, "Login"), 
				     		    		React.createElement("p", {className: "inputClassOne"}, 
				     		     			React.createElement("input", {type: "text", id: "policeLoginId", placeholder: "User-name"})
				     		     		), 
				     		     		React.createElement("p", {className: "inputClassOne"}, 
				     		     			React.createElement("input", {type: "password", id: "policeLoginPassword", placeholder: "Password"})
				     		     		), 
				     		     		React.createElement("div", {onClick: that.loginPolice, className: "buttonClassOne", id: "policeLoginButton"}, "Login"), 		
				     		     		React.createElement("div", {id: "loginErrMsg"})
				     		     	)
				     		    ), 
				     		    React.createElement("div", {id: "contentWrapper2", className: "section group"}, 
						     		React.createElement("div", {id: "citizenSignup", className: "column signupSection"}, 
						     			React.createElement("h5", null, "Are you a new citizen?"), 
						     			React.createElement("h3", {className: "signupHeader"}, "Sign Up!"), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {type: "text", id: "citizenDisplayNameInput", placeholder: "Your full name"})
						     			), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {type: "text", id: "citizenPhone", placeholder: "Enter your phone", onBlur: that.verifyCitizenPhone}), 
						     				React.createElement("div", {id: "signupNameMsg"})
						     			), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {type: "text", id: "citizenEmailInput", placeholder: "Enter your email"}), 
						     				React.createElement("br", null), React.createElement("br", null), 
						     				React.createElement("input", {type: "password", id: "citizenPassword", placeholder: "Enter your password"}), 
						   					React.createElement("div", {id: "signupPwMsg"})
						     			), 
						     			React.createElement("div", {onClick: that.registerCitizen, className: "buttonClassOne", id: "citizenSignupButton"}, "Sign Up!")	
						     		), 

						     		React.createElement("div", {id: "policeSignup", className: "column signupSection"}, 
						     			React.createElement("h5", null, "Are you a new police?"), 
						     			React.createElement("h3", {className: "signupHeader"}, "Sign Up!"), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {type: "text", id: "policeDisplayNameInput", placeholder: "Your full name"})
						     			), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {type: "text", id: "policeIdInput", placeholder: "Your ID", onBlur: that.verifyPoliceId})
						     			), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {type: "text", id: "policePhone", placeholder: "Enter your phone"}), 
						     				React.createElement("div", {id: "signupNameMsg"})
						     			), 
						     			React.createElement("p", {className: "inputClassOne"}, 
						     				React.createElement("input", {type: "text", id: "policeEmailInput", placeholder: "Enter your email"}), 
						     				React.createElement("br", null), React.createElement("br", null), 
						     				React.createElement("input", {type: "password", id: "policePassword", placeholder: "Enter your password"}), 
						   					React.createElement("div", {id: "signupPwMsg"})
						     			), 
						     			React.createElement("div", {onClick: that.registerPolice, className: "buttonClassOne", id: "policeSignupButton"}, "Sign Up!")	
						     		)
						     	), 
					     		React.createElement("div", {id: "bgImg"}), 
					     		React.createElement("div", {className: "overlay"})
					     	)	
		 		    	)
				    );
			  	}
			});
			return LoginPage;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(3),
			__webpack_require__(16),
			__webpack_require__(17),
			__webpack_require__(18),
			__webpack_require__(19),
			__webpack_require__(20),
			__webpack_require__(21),
			__webpack_require__(22)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, HeaderBar, ControlPanel, ContainerOne, ContainerFive,ControlsMenu, MapWidget, commonFunctions){
			var PolicePage = React.createClass({displayName: "PolicePage",
				getInitialState: function(){
					return {
						userId: this.props.userId,
						displayName: this.props.displayName,
						userType: this.props.userType,
						coordinates: ['12.934689', '77.61206400000003'],
						citizenDetails: {},
						issueId: null
					}			
				},
				componentDidMount:function(){
					console.log('triggered once after initial render');
					var that = this;
					//this.props.userId+
					socket.on(this.props.userId+'-waiting-for-requests', function(postData){
						console.log(postData);
						that.setState({citizenDetails: postData.citizenDetails, issueId: postData.issueId});
					});
					
				},
				processAddress: function(placeInfo){
					var that = this;
					var postData = {
						userId: that.state.userId,
						coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
					},
					successCallback = function(data){
						console.log(data);
						this.setState({coordinates: postData.coordinates});
					}.bind(this);
					commonFunctions.makeAjaxPost('/police/location/update', postData, successCallback);

				},
				acknowledgeRequest: function(){
					var citizenDetails = this.state.citizenDetails,
						that = this;
					var postData = {
						issueId: that.state.issueId,
						citizenDetails: {
							userId: citizenDetails.userId,
							displayName: citizenDetails.displayName,
							location: citizenDetails.location
						},
						policeDetails: {
							userId: that.state.userId,
							displayName: that.state.displayName
						}
					},
					successCallback = function(data){
						console.log(data);
					}.bind(this);

					commonFunctions.makeAjaxPost('/request/acknowledge', postData, successCallback);

				},
				closeIssue: function(){
					var that = this;
					var postData = {
						issueId: that.state.issueId
					},
					successCallback = function(data){
						console.log(data);
					}.bind(this);

					commonFunctions.makeAjaxPost('/help/acknowledge', postData, successCallback);	
				},
				logout: function(){
					window.location.replace('/logout');
				},
			  	render:function(){
			  		var mapOptions = {
			  			displayMaps: true, 
			  			autocompleteInput: '#autocomplete',
			  			autocompleteCallback: this.processAddress,
			  			latLng: [12.9759849, 77.6345852],
			  			zoomLevel: 8,
			  			animateMarker: false
			  		},
			  		style1 = {
			  		    position: 'relative',
			  		    height: '300px'
			  		},
			  		style2 = {
			  			marginLeft: '1px'
			  		},
			  		style3 = {
			  			backgroundColor: 'white'
			  		};
				    return (

		 		    	React.createElement("div", {className: "wrapper", style: style3}, 
	    					React.createElement(HeaderBar, {notificationsCallback: this.acknowledgeRequest}), 
	    					
	    					React.createElement("div", {className: "content-wrapper", style: style2}, 
	    						React.createElement("section", {className: "content-header"}, 
	    							React.createElement("h1", null, 
	    						        "Dashboard", 
	    						       	React.createElement("small", null, "Control panel")
	    						    ), 
	    							/*<ol className="breadcrumb">
	    								<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
	    								<li className="active">Dashboard</li>
	    							</ol>*/
	    							React.createElement("button", {id: "acknowledge", onClick: this.acknowledgeRequest}, "Respond"), 
	    							React.createElement("button", {onClick: this.closeIssue}, "End issue"), 
	                                React.createElement(ControlPanel, null)
	    						), 

	    						React.createElement("section", {className: "content"}, 
	    							React.createElement("div", {className: "row"}, 
	    								React.createElement("section", {className: "col-lg-12 connectedSortable ui-sortable"}, 
											React.createElement("div", {className: "nav-tabs-custom"}, 
							                    /* Tabs within a box */
							                    React.createElement("ul", {className: "nav nav-tabs pull-right ui-sortable-handle"}, 
							                        React.createElement("li", {className: ""}, React.createElement("a", {href: "#revenue-chart", "data-toggle": "tab", "aria-expanded": "false"}, "Area")), 
							                        React.createElement("li", {className: "active"}, React.createElement("a", {href: "#Map-chart", "data-toggle": "tab", "aria-expanded": "true"}, "Donut")), 
							                        React.createElement("li", {className: "pull-left header"}, React.createElement("i", {className: "fa fa-map-marker"}), " Map")
							                    ), 
							                    React.createElement("div", {className: "tab-content no-padding"}, 
							                        /* Morris chart - Map */
							                        React.createElement("div", {className: "chart tab-pane", id: "revenue-chart", style: style1}

							                        ), 
							                        React.createElement("div", {className: "chart tab-pane active", id: "Map-chart", style: style1}, 
							                        	React.createElement("br", null), 
							                        	React.createElement("input", {type: "text", id: "autocomplete"}), 
							                        	React.createElement(MapWidget, {options: mapOptions, ref: "myMap"})
							                        )
							                    )
							                )
	    								)

	                                    /*<section className="col-lg-5 connectedSortable ui-sortable">
	                                        <ContainerFive />
	                                    </section>*/
	    							)
	    						)

	    					), 

	                        React.createElement("footer", {className: "main-footer"}, 
	                            React.createElement("div", {className: "pull-right hidden-xs"}, 
	                                React.createElement("b", null, "Version"), " 1.0.0"
	                            ), 
	                            React.createElement("strong", null, "A ", React.createElement("a", {href: "http://namma-police.github.io"}, "Namma Police"), " initiative. ")
	                        )

	                        /*<ControlsMenu />*/
	    				)


				    );
			  	}
			});

			return PolicePage;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(3),
			__webpack_require__(16),
			__webpack_require__(17),
			__webpack_require__(18),
			__webpack_require__(19),
			__webpack_require__(20),
			__webpack_require__(23),
			__webpack_require__(21),
			__webpack_require__(22)
		], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, HeaderBar, ControlPanel, ContainerOne, ContainerFive, ControlsMenu, StatTile, MapWidget, commonFunctions){
			var StatsPage = React.createClass({displayName: "StatsPage",
				getInitialState: function(){
					return {
						userId: this.props.userId,
						displayName: this.props.displayName,
						userType: this.props.userType,
						coordinates: null,
						noOfCrimes: '',
						activeIssues: [],
						engagedIssues: [],
						resolvedIssues: []
					}			
				},
				componentDidMount:function(){
					console.log('triggered once after initial render');
				},
				getCrimeData: function(){
					var successCallback = function(data){
						console.log(data);
						this.refs.myMap.displayCrimeStats(data);
						var activeIssues = [], engagedIssues = [], resolvedIssues = [];
						data.features.map(function(crimeData){
							switch(crimeData.properties.status){
								case 'active': 
									activeIssues.push(crimeData);
									break;
								case 'engaged':
									engagedIssues.push(crimeData);
									break;
								case 'resolved':
									resolvedIssues.push(crimeData);

							}
						});

						this.setState({
							noOfCrimes: data.features.length,
							activeIssues: activeIssues,
							engagedIssues: engagedIssues,
							resolvedIssues: resolvedIssues
						});

					}.bind(this);
					commonFunctions.makeAjaxGet('/issues', successCallback);
				},
				logout: function(){
					window.location.replace('/logout');
				},
			  	render:function(){
			  		var mapOptions = {
			  			displayMaps: true, 
			  			autocompleteInput: '#autocomplete',
			  			autocompleteCallback: this.getCrimeData,
			  			latLng: [12.9759849, 77.6345852],  
			  			zoomLevel: 8,
			  			animateMarker: false,
			  			renderCallback: this.getCrimeData
			  		},
			  		style1 = {
			  		    position: 'relative',
			  		    height: '300px'
			  		},
			  		style2 = {
			  			marginLeft: '1px'
			  		},
			  		style3 = {
			  			backgroundColor: 'white'
			  		};

				    return (

		 		    	React.createElement("div", {className: "wrapper", style: style3}, 
	    					React.createElement(HeaderBar, null), 
	    					
	    					React.createElement("div", {className: "content-wrapper", style: style2}, 
	    						React.createElement("section", {className: "content-header"}, 
	    							React.createElement("h1", null, 
	    						        "Dashboard", 
	    						       	React.createElement("small", null, "Control panel")
	    						    ), 
	    							/*<ol className="breadcrumb">
	    								<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
	    								<li className="active">Dashboard</li>
	    							</ol>*/
	                                React.createElement(ControlPanel, null)
	    						), 

	    						React.createElement("section", {className: "content"}, 
	    							React.createElement("div", {className: "row"}, 
	    								React.createElement(StatTile, {
	    								    icon: "ion-stats-bars", 
	    								    stats: ''+this.state.noOfCrimes, 
	    								    subject: "Total crimes", 
	    								    theme: "bg-aqua"}), 
	    								React.createElement(StatTile, {
	    								    icon: "ion-stats-bars", 
	    								    stats: ''+this.state.resolvedIssues.length, 
	    								    subject: "Resolved issues", 
	    								    theme: "bg-green"}), 
	    								React.createElement(StatTile, {
	    								    icon: "ion-stats-bars", 
	    								    stats: ''+this.state.engagedIssues.length, 
	    								    subject: "Engaged issues", 
	    								    theme: "bg-yellow"}), 
	    								React.createElement(StatTile, {
	    								    icon: "ion-stats-bars", 
	    								    stats: ''+this.state.activeIssues.length, 
	    								    subject: "Unresolved issues", 
	    								    theme: "bg-red"})
	    							), 
	    							React.createElement("div", {className: "row"}, 
	    								React.createElement("section", {className: "col-lg-12 connectedSortable ui-sortable"}, 
											React.createElement("div", {className: "nav-tabs-custom"}, 
							                    /* Tabs within a box */
							                    React.createElement("ul", {className: "nav nav-tabs pull-right ui-sortable-handle"}, 
							                        React.createElement("li", {className: ""}, React.createElement("a", {href: "#revenue-chart", "data-toggle": "tab", "aria-expanded": "false"}, "Area")), 
							                        React.createElement("li", {className: "active"}, React.createElement("a", {href: "#Map-chart", "data-toggle": "tab", "aria-expanded": "true"}, "Donut")), 
							                        React.createElement("li", {className: "pull-left header"}, React.createElement("i", {className: "fa fa-map-marker"}), " Map")
							                    ), 
							                    React.createElement("div", {className: "tab-content no-padding"}, 
							                        /* Morris chart - Map */
							                        React.createElement("div", {className: "chart tab-pane", id: "revenue-chart", style: style1}

							                        ), 
							                        React.createElement("div", {className: "chart tab-pane active", id: "Map-chart", style: style1}, 
							                        	React.createElement("br", null), 
							                        	React.createElement("input", {type: "text", id: "autocomplete"}), 
							                        	React.createElement(MapWidget, {options: mapOptions, ref: "myMap"})
							                        )
							                    )
							                )
	    								)

	                                    /*<section className="col-lg-5 connectedSortable ui-sortable">
	                                        <ContainerFive />
	                                    </section>*/
	    							)
	    						)

	    					), 

	                        React.createElement("footer", {className: "main-footer"}, 
	                            React.createElement("div", {className: "pull-right hidden-xs"}, 
	                                React.createElement("b", null, "Version"), " 1.0.0"
	                            ), 
	                            React.createElement("strong", null, "A ", React.createElement("a", {href: "http://namma-police.github.io"}, "Namma Police"), " initiative. ")
	                        )

	                        /*<ControlsMenu />*/
	    				)
				    );
			  	}
			});

			return StatsPage;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3),
	        __webpack_require__(5),
	        __webpack_require__(24)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function (React, $, HeaderNotifications) {
	        var HeaderBar = React.createClass({displayName: "HeaderBar",
	            getInitialState: function () {
	                return {
	                    notifications: []
	                }
	            },
	            pushMenu: function () {
	                var body = document.body;
	                if(body.clientWidth > 768){
	                    if(body.className.indexOf('sidebar-collapse') === -1){
	                        body.className += ' sidebar-collapse';
	                    }else {
	                        body.className = body.className.replace(' sidebar-collapse', '');
	                    }
	                }else{
	                    if (body.className.indexOf('sidebar-open') === -1) {
	                        body.className += ' sidebar-open';
	                    }else{
	                        body.className = body.className.replace(' sidebar-open','');
	                    }
	                }
	            },
	            componentDidMount: function () {
	                var notifications = [{
	                    subject: '5 new members joined today',
	                    className: 'fa fa-users text-aqua'
	                }, {
	                    subject: 'Very long description here that may not fit into the page and may cause design problems',
	                    className: 'fa fa-warning text-yellow'
	                }, {
	                    subject: '5 new members joined',
	                    className: 'fa fa-users text-red'
	                }, {
	                    subject: '25 sales made',
	                    className: 'fa fa-shopping-cart text-green'
	                }, {
	                    subject: 'You changed your username',
	                    className: 'fa fa-user text-red'
	                }];

	                this.setState({
	                    notifications: notifications
	                });
	            },
	            render: function () {
	                var that = this;
	                return (
	                    React.createElement("header", {className: "main-header"}, 
	                        /* Logo */
	                        React.createElement("a", {href: "index2.html", className: "logo"}, 
	                            /* mini logo for sidebar mini 50x50 pixels */
	                            React.createElement("span", {className: "logo-mini"}, React.createElement("b", null, "N"), "P"), 
	                            /* logo for regular state and mobile devices */
	                            React.createElement("span", {className: "logo-lg"}, "Namma", React.createElement("b", null, "Police"))
	                        ), 
	                        /* Header Navbar: style can be found in header.less */
	                        React.createElement("nav", {className: "navbar navbar-static-top", role: "navigation"}, 
	                            /* Sidebar toggle button*/
	                            React.createElement("a", {href: "#", className: "sidebar-toggle", "data-toggle": "offcanvas", role: "button", onClick: that.pushMenu}, 
	                                React.createElement("span", {className: "sr-only"}, "Toggle navigation")
	                            ), 
	                            React.createElement("div", {className: "navbar-custom-menu"}, 
	                                React.createElement("ul", {className: "nav navbar-nav"}, 
	                                    /* Notifications: style can be found in dropdown.less */
	                                    React.createElement("li", {className: "dropdown notifications-menu"}, 
	                                        React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown"}, 
	                                            React.createElement("i", {className: "fa fa-bell-o"}), 
	                                            React.createElement("span", {className: "label label-warning"}, that.state.notifications.length)
	                                        ), 
	                                        React.createElement(HeaderNotifications, {notifications: that.state.notifications, notificationsCallback: that.props.notificationsCallback})
	                                    ), 
	                                    /* User Account: style can be found in dropdown.less */
	                                    React.createElement("li", {className: "dropdown user user-menu"}, 
	                                        React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown"}, 
	                                            React.createElement("span", {className: "hidden-xs"}, "Alexander Pierce")
	                                        ), 
	                                        React.createElement("ul", {className: "dropdown-menu"}, 
	                                            /* User image */
	                                            React.createElement("li", {className: "user-header"}, 
	                                                React.createElement("p", null, 
	                                                    "Alexander Pierce - Citizen", 
	                                                    React.createElement("small", null, "Member since Nov. 2012")
	                                                )
	                                            ), 
	                                            /* Menu Footer */
	                                            React.createElement("li", {className: "user-footer"}, 
	                                                React.createElement("div", {className: "pull-left"}, 
	                                                    React.createElement("a", {href: "#", className: "btn btn-default btn-flat"}, "Statistics")
	                                                ), 
	                                                React.createElement("div", {className: "pull-right"}, 
	                                                    React.createElement("a", {href: "#", className: "btn btn-default btn-flat"}, "Sign out")
	                                                )
	                                            )
	                                        )
	                                    )
	                                    /* ontrol Sidebar Toggle Button */
	                                )
	                            )
	                        )
	                    )
	                )
	            }
	        });

	        return HeaderBar;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3),
	        __webpack_require__(5),
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(React,$){
	    	var ControlPanel = React.createClass({displayName: "ControlPanel",
	    		render: function(){
	                var style = {
	                    position: 'relative',
	                    height: '300px'
	                };

	    			return (
	    				React.createElement("div", {className: "row", id: "contains-custom-header"}
	                        
	                    )
	    			)
	    		}
	    	})

	    	return ControlPanel;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))     

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3),
	        __webpack_require__(5),
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(React,$){
	    	var ContainerOne = React.createClass({displayName: "ContainerOne",
	    		render: function(){
	                var style = {
	                    position: 'relative',
	                    height: '300px'
	                };

	    			return (
	    				React.createElement("div", {className: "nav-tabs-custom"}, 
	                        /* Tabs within a box */
	                        React.createElement("ul", {className: "nav nav-tabs pull-right ui-sortable-handle"}, 
	                            React.createElement("li", {className: ""}, React.createElement("a", {href: "#revenue-chart", "data-toggle": "tab", "aria-expanded": "false"}, "Area")), 
	                            React.createElement("li", {className: "active"}, React.createElement("a", {href: "#sales-chart", "data-toggle": "tab", "aria-expanded": "true"}, "Donut")), 
	                            React.createElement("li", {className: "pull-left header"}, React.createElement("i", {className: "fa fa-inbox"}), " Map")
	                        ), 
	                        React.createElement("div", {className: "tab-content no-padding"}, 
	                            /* Morris chart - Sales */
	                            React.createElement("div", {className: "chart tab-pane", id: "revenue-chart", style: style}), 
	                            React.createElement("div", {className: "chart tab-pane active", id: "sales-chart", style: style})
	                        )
	                    )
	    			)
	    		}
	    	})

	    	return ContainerOne;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))     

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3),
	        __webpack_require__(5),
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(React,$){
	    	var ContainerFive = React.createClass({displayName: "ContainerFive",
	    		render: function(){
	                var style = {
	                    height: '250px'
	                };
	                //style="overflow: hidden; width: auto; height: 250px;"
	    			return (
	    				React.createElement("div", {className: "box box-solid bg-light-blue-gradient"}, 
	                        React.createElement("div", {className: "box-header ui-sortable-handle"}, 
	                            React.createElement("div", {className: "pull-right box-tools"}, 
	                                React.createElement("button", {className: "btn btn-primary btn-sm daterange pull-right", "data-toggle": "tooltip", title: "Date range"}, 
	                                    React.createElement("i", {className: "fa fa-calendar"})
	                                ), 
	                                React.createElement("button", {className: "btn btn-primary btn-sm pull-right", "data-widget": "collapse", "data-toggle": "tooltip", title: "Collapse"}, 
	                                    React.createElement("i", {className: "fa fa-minus"})
	                                )
	                            ), 

	                            React.createElement("i", {className: "fa fa-map-marker"}), 
	                            React.createElement("h3", {className: "box-title"}, 
	                                "Visitors"
	                            )
	                        ), 

	                        React.createElement("div", {className: "box-body", style: style}
	                        ), 

	                        React.createElement("div", {className: "box-footer no-border"}
	                        )
	                    )
	    			)
	    		}
	    	})

	    	return ContainerFive;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))     

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3),
	        __webpack_require__(5),
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(React,$){
	        var ControlsMenu = React.createClass({displayName: "ControlsMenu",
	            componentDidMount:function(){

	            },
	            render: function(){
	                var that = this;
	                return (
	                    React.createElement("aside", {className: "control-sidebar control-sidebar-dark control-sidebar-open"}, 
	                        /* Create the tabs */
	                        React.createElement("ul", {className: "nav nav-tabs nav-justified control-sidebar-tabs"}, 
	                            React.createElement("li", {className: "active"}, 
	                                React.createElement("a", {href: "#control-sidebar-theme-demo-options-tab", "data-toggle": "tab"}, React.createElement("i", {className: "fa fa-wrench"}))
	                            ), 
	                            React.createElement("li", null, React.createElement("a", {href: "#control-sidebar-home-tab", "data-toggle": "tab"}, React.createElement("i", {className: "fa fa-home"}))), 
	                            React.createElement("li", null, React.createElement("a", {href: "#control-sidebar-settings-tab", "data-toggle": "tab"}, React.createElement("i", {className: "fa fa-gears"})))
	                        ), 
	                        /* Tab panes */
	                        React.createElement("div", {className: "tab-content"}, 
	                            /* Home tab content */
	                            React.createElement("div", {className: "tab-pane", id: "control-sidebar-home-tab"}, 
	                                React.createElement("h3", {className: "control-sidebar-heading"}, "Recent Activity"), 
	                                React.createElement("ul", {className: "control-sidebar-menu"}, 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("i", {className: "menu-icon fa fa-birthday-cake bg-red"}), 
	                                            React.createElement("div", {className: "menu-info"}, 
	                                                React.createElement("h4", {className: "control-sidebar-subheading"}, "Langdons Birthday"), 
	                                                React.createElement("p", null, "Will be 23 on April 24th")
	                                            )
	                                        )
	                                    ), 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("i", {className: "menu-icon fa fa-user bg-yellow"}), 
	                                            React.createElement("div", {className: "menu-info"}, 
	                                                React.createElement("h4", {className: "control-sidebar-subheading"}, "Frodo Updated His Profile"), 
	                                                React.createElement("p", null, "New phone +1(800)555-1234")
	                                            )
	                                        )
	                                    ), 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("i", {className: "menu-icon fa fa-envelope-o bg-light-blue"}), 
	                                            React.createElement("div", {className: "menu-info"}, 
	                                                React.createElement("h4", {className: "control-sidebar-subheading"}, "Nora Joined Mailing List"), 
	                                                React.createElement("p", null, "nora@example.com")
	                                            )
	                                        )
	                                    ), 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("i", {className: "menu-icon fa fa-file-code-o bg-green"}), 
	                                            React.createElement("div", {className: "menu-info"}, 
	                                                React.createElement("h4", {className: "control-sidebar-subheading"}, "Cron Job 254 Executed"), 
	                                                React.createElement("p", null, "Execution time 5 seconds")
	                                            )
	                                        )
	                                    )
	                                ), 
	                                /* /.control-sidebar-menu */

	                                React.createElement("h3", {className: "control-sidebar-heading"}, "Tasks Progress"), 
	                                React.createElement("ul", {className: "control-sidebar-menu"}, 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("h4", {className: "control-sidebar-subheading"}, 
	                                        "Custom Template Design", 
	                                        React.createElement("span", {className: "label label-danger pull-right"}, "70%")
	                                      ), 
	                                            React.createElement("div", {className: "progress progress-xxs"}, 
	                                                React.createElement("div", {className: "progress-bar progress-bar-danger", style: "width: 70%"})
	                                            )
	                                        )
	                                    ), 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("h4", {className: "control-sidebar-subheading"}, 
	                                        "Update Resume", 
	                                        React.createElement("span", {className: "label label-success pull-right"}, "95%")
	                                      ), 
	                                            React.createElement("div", {className: "progress progress-xxs"}, 
	                                                React.createElement("div", {className: "progress-bar progress-bar-success", style: "width: 95%"})
	                                            )
	                                        )
	                                    ), 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("h4", {className: "control-sidebar-subheading"}, 
	                                        "Laravel Integration", 
	                                        React.createElement("span", {className: "label label-warning pull-right"}, "50%")
	                                      ), 
	                                            React.createElement("div", {className: "progress progress-xxs"}, 
	                                                React.createElement("div", {className: "progress-bar progress-bar-warning", style: "width: 50%"})
	                                            )
	                                        )
	                                    ), 
	                                    React.createElement("li", null, 
	                                        React.createElement("a", {href: "javascript::;"}, 
	                                            React.createElement("h4", {className: "control-sidebar-subheading"}, 
	                                        "Back End Framework", 
	                                        React.createElement("span", {className: "label label-primary pull-right"}, "68%")
	                                      ), 
	                                            React.createElement("div", {className: "progress progress-xxs"}, 
	                                                React.createElement("div", {className: "progress-bar progress-bar-primary", style: "width: 68%"})
	                                            )
	                                        )
	                                    )
	                                )
	                                /* /.control-sidebar-menu */

	                            ), 
	                            React.createElement("div", {id: "control-sidebar-theme-demo-options-tab", className: "tab-pane active"}, 
	                                React.createElement("div", null, 
	                                    React.createElement("h4", {className: "control-sidebar-heading"}, "Layout Options"), 
	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            React.createElement("input", {type: "checkbox", "data-layout": "fixed", className: "pull-right"}), " Fixed layout"), 
	                                        React.createElement("p", null, "Activate the fixed layout. You cant use fixed and" + " " +
	                                            "boxed layouts together")
	                                    ), 
	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            React.createElement("input", {type: "checkbox", "data-layout": "layout-boxed", className: "pull-right"}), " Boxed Layout"), 
	                                        React.createElement("p", null, "Activate the boxed layout")
	                                    ), 
	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            React.createElement("input", {type: "checkbox", "data-layout": "sidebar-collapse", className: "pull-right"}), " Toggle Sidebar"), 
	                                        React.createElement("p", null, "Toggle the left sidebars state (open or collapse)")
	                                    ), 
	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            React.createElement("input", {type: "checkbox", "data-enable": "expandOnHover", className: "pull-right"}), " Sidebar Expand on Hover"), 
	                                        React.createElement("p", null, "Let the sidebar mini expand on hover")
	                                    ), 
	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            React.createElement("input", {type: "checkbox", "data-controlsidebar": "control-sidebar-open", className: "pull-right"}), " Toggle Right Sidebar Slide"), 
	                                        React.createElement("p", null, "Toggle between slide over content and push content" + " " +
	                                            "effects"
	                                        )
	                                    ), 
	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            React.createElement("input", {type: "checkbox", "data-sidebarskin": "toggle", className: "pull-right"}), " Toggle Right Sidebar Skin"), 
	                                        React.createElement("p", null, "Toggle between dark and light skins for the right sidebar")
	                                    ), 
	                                    React.createElement("h4", {className: "control-sidebar-heading"}, "Skins"), 
	                                    React.createElement("ul", {className: "list-unstyled clearfix"}, 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-blue", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px; background: #367fa9;"}), 
	                                                    React.createElement("span", {className: "bg-light-blue", style: "display:block; width: 80%; float: left; height: 7px;"})
	                                                ), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #222d32;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin"}, "Blue")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-black", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", {style: "box-shadow: 0 0 2px rgba(0,0,0,0.1)", className: "clearfix"}, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px; background: #fefefe;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 7px; background: #fefefe;"})
	                                                ), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #222;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin"}, "Black")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-purple", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-purple-active"}), React.createElement("span", {className: "bg-purple", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #222d32;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin"}, "Purple")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-green", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-green-active"}), React.createElement("span", {className: "bg-green", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #222d32;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin"}, "Green")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-red", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-red-active"}), React.createElement("span", {className: "bg-red", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #222d32;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin"}, "Red")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-yellow", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-yellow-active"}), React.createElement("span", {className: "bg-yellow", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #222d32;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin"}, "Yellow")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-blue-light", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px; background: #367fa9;"}), 
	                                                    React.createElement("span", {className: "bg-light-blue", style: "display:block; width: 80%; float: left; height: 7px;"})
	                                                ), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #f9fafc;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin", style: "font-size: 12px"}, "Blue Light")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-black-light", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", {style: "box-shadow: 0 0 2px rgba(0,0,0,0.1)", className: "clearfix"}, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px; background: #fefefe;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 7px; background: #fefefe;"})
	                                                ), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #f9fafc;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin", style: "font-size: 12px"}, "Black Light")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-purple-light", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-purple-active"}), React.createElement("span", {className: "bg-purple", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #f9fafc;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin", style: "font-size: 12px"}, "Purple Light")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-green-light", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-green-active"}), React.createElement("span", {className: "bg-green", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #f9fafc;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin", style: "font-size: 12px"}, "Green Light")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-red-light", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-red-active"}), React.createElement("span", {className: "bg-red", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #f9fafc;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin", style: "font-size: 12px"}, "Red Light")
	                                        ), 
	                                        React.createElement("li", {style: "float:left; width: 33.33333%; padding: 5px;"}, 
	                                            React.createElement("a", {href: "javascript:void(0);", "data-skin": "skin-yellow-light", style: "display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)", 
	                                            className: "clearfix full-opacity-hover"}, 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 7px;", 
	                                                    className: "bg-yellow-active"}), React.createElement("span", {className: "bg-yellow", 
	                                                    style: "display:block; width: 80%; float: left; height: 7px;"})), 
	                                                React.createElement("div", null, React.createElement("span", {style: "display:block; width: 20%; float: left; height: 20px; background: #f9fafc;"}), 
	                                                    React.createElement("span", {style: "display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;"})
	                                                )
	                                            ), 
	                                            React.createElement("p", {className: "text-center no-margin", style: "font-size: 12px;"}, "Yellow Light")
	                                        )
	                                    )
	                                )
	                            ), 
	                            /* /.tab-pane */
	                            /* Stats tab content */
	                            React.createElement("div", {className: "tab-pane", id: "control-sidebar-stats-tab"}, "Stats Tab Content"), 
	                            /* /.tab-pane */
	                            /* Settings tab content */
	                            React.createElement("div", {className: "tab-pane", id: "control-sidebar-settings-tab"}, 
	                                React.createElement("form", {method: "post"}, 
	                                    React.createElement("h3", {className: "control-sidebar-heading"}, "General Settings"), 
	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            "Report panel usage", 
	                                            React.createElement("input", {type: "checkbox", className: "pull-right", checked: ""})
	                                        ), 
	                                        React.createElement("p", null, 
	                                            "Some information about this general settings option"
	                                        )
	                                    ), 
	                                    /* /.form-group */

	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            "Allow mail redirect", 
	                                            React.createElement("input", {type: "checkbox", className: "pull-right", checked: ""})
	                                        ), 
	                                        React.createElement("p", null, 
	                                            "Other sets of options are available"
	                                        )
	                                    ), 
	                                    /* /.form-group */

	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            "Expose author name in posts", 
	                                            React.createElement("input", {type: "checkbox", className: "pull-right", checked: ""})
	                                        ), 
	                                        React.createElement("p", null, 
	                                            "Allow the user to show his name in blog posts"
	                                        )
	                                    ), 
	                                    /* /.form-group */

	                                    React.createElement("h3", {className: "control-sidebar-heading"}, "Chat Settings"), 

	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            "Show me as online", 
	                                            React.createElement("input", {type: "checkbox", className: "pull-right", checked: ""})
	                                        )
	                                    ), 
	                                    /* /.form-group */

	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            "Turn off notifications", 
	                                            React.createElement("input", {type: "checkbox", className: "pull-right"})
	                                        )
	                                    ), 
	                                    /* /.form-group */

	                                    React.createElement("div", {className: "form-group"}, 
	                                        React.createElement("label", {className: "control-sidebar-subheading"}, 
	                                            "Delete chat history", 
	                                            React.createElement("a", {href: "javascript::;", className: "text-red pull-right"}, React.createElement("i", {className: "fa fa-trash-o"}))
	                                        )
	                                    )
	                                    /* /.form-group */
	                                )
	                            )
	                            /* /.tab-pane */
	                        )
	                    )
	                )
	            }
	        })

	        return ControlsMenu;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))     

/***/ },
/* 21 */
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
	        __webpack_require__(3),
	        __webpack_require__(5)
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
	            if(this.props.options.renderCallback){
	                this.props.options.renderCallback();
	            }
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
	        displayCrimeStats: function(data){
	            var that = this;

	            this.mapComponents.map.data.addGeoJson(data);

	            this.mapComponents.map.data.setStyle(function(feature) {
	                var color, status = feature.getProperty('status');
	                switch(status){
	                    case 'active':
	                        color = '#ff0000';
	                        break;
	                    case 'engaged':
	                        color = '#ffff00';
	                        break;
	                    case 'resolved':
	                        color = '#009933';
	                        break;
	                }
	                return(
	                    {
	                        icon: {
	                            scale: 12,
	                            path: google.maps.SymbolPath.CIRCLE,
	                            fillColor: color,
	                            fillOpacity: 0.35,
	                            strokeWeight: 0
	                        }
	                    }
	                );
	            });

	            var infoWindow = new google.maps.InfoWindow({
	                maxWidth:250
	            });

	            this.mapComponents.map.data.addListener('click', function (event) { 
	                var address = event.feature.getProperty('address'),
	                    occurrenceTime = new Date(event.feature.getProperty('occurrenceTime')),
	                    status = event.feature.getProperty('status');

	                var content = '<div> <strong>Address:</strong> '+address+'</div>';
	                    content += '<div><strong>Time of Occurrence:</strong> '+occurrenceTime+'</div>';
	                    content+= '<div><strong>Status:</strong> '+status+'</div>';

	                infoWindow.setPosition(event.latLng)
	                infoWindow.setContent(content);
	                infoWindow.open(that.mapComponents.map);
	            });

	            this.mapComponents.map.data.addListener('mouseout', function (event) { 
	                infoWindow.close();
	            });
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

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        exports,
	        __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(exports, $){
	    	exports.makeAjaxGet = function(url, successCallback){
	    		$.ajax({
	    		    url: url,
	    		    type: 'GET',
	    		    success: successCallback,
	    		    error: function(httpRequest, status, error){
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
	    		    error: function(httpRequest, status, error){
	    		        console.log(error);
	    		    }
	    		});
	    	};
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))    

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function (React) {
	        var StatTile = React.createClass({displayName: "StatTile",
	            getDefaultProps: function() {
	                return {
	                    color: 'bg-yellow',
	                    icon: 'ion-person-add',
	                    subject: 'Default Subject',
	                    stats: '0',
	                    //link: '/default/link'
	                }
	            },
	            render: function() {
	                var link = '',
	                    stats = React.createElement("h3", null, " ", this.props.stats, " ");

	                if(this.props.link) {
	                    link =
	                        React.createElement("a", {href: this.props.link, className: "small-box-footer"}, 
	                            "More info ", React.createElement("i", {className: "fa fa-arrow-circle-right"})
	                        );
	                }

	                if(this.props.stats.indexOf('%') !== -1) {
	                    var style = {
	                        fontSize: '20px'
	                    };

	                    stats =
	                        React.createElement("h3", null, 
	                            this.props.stats.replace(/%/g, ''), 
	                            React.createElement("sup", {style: style}, "%")
	                        )
	                }

	                return(
	                    React.createElement("div", {className: "col-lg-3 col-xs-6"}, 
	                        React.createElement("div", {className: "small-box "+this.props.theme}, 
	                            React.createElement("div", {className: "inner"}, 
	                                stats, 
	                                React.createElement("p", null, this.props.subject)
	                            ), 
	                            React.createElement("div", {className: "icon"}, 
	                                React.createElement("i", {className: "fa "+this.props.icon})
	                            ), 
	                            link
	                        )
	                    )
	                )
	            }
	        });

	        return StatTile;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(3)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function (React) {
	        var HeaderNotifications = React.createClass({displayName: "HeaderNotifications",

	            render: function () {
	                var that = this;

	                var notificationList = this.props.notifications.map(function (notificationDetails, iterator) {
	                    return (
	                        React.createElement("li", {key: "header-notification-item"+iterator}, 
	                            React.createElement("a", {href: "#"}, 
	                                React.createElement("i", {className: notificationDetails.className}), " ", notificationDetails.subject
	                            ), 
	                            React.createElement("a", {href: "#", onClick: that.props.notificationsCallback}, 
	                                React.createElement("i", null, "Acknowledge")
	                            )
	                        )
	                    )
	                });

	                return (
	                    React.createElement("ul", {className: "dropdown-menu"}, 
	                        React.createElement("li", {className: "header"}, "You have ", this.props.notifications.length, " notifications"), 
	                        React.createElement("li", null, 
	                            /* inner menu: contains the actual data */
	                            React.createElement("div", {className: "slimScrollDiv"}, 

	                                React.createElement("ul", {className: "menu"}, 
	                                    notificationList
	                                ), 
	                                
	                                React.createElement("div", {className: "slimScrollBar"}), 
	                                React.createElement("div", {className: "slimScrollRail"})
	                            )
	                        ), 
	                        React.createElement("li", {className: "footer"}, React.createElement("a", {href: "#"}, "View all"))
	                    )
	                )
	            }
	        });

	        return HeaderNotifications;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
]);