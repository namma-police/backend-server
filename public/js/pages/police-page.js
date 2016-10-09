define(
	[
		'react',
		'../components/header-bar/header-bar',
		'../components/map-widget',
		'../components/profile-card/profile-card',
		'../components/profile-card/profile-info-list',

		'../common-functions'
	],
	function(React, HeaderBar, MapWidget, ProfileCard, ProfileInfoList, commonFunctions){
		var PolicePage = React.createClass({
			getInitialState: function(){
				return {
					userId: this.props.userId,
					displayName: this.props.displayName,
					userType: this.props.userType,
					coordinates: [12.9759849, 77.6345852],
					activeIssues: [],
					engagedIssues: []
				}			
			},
			componentDidMount:function(){
				var that = this;
				var activeIssues = this.state.activeIssues;

				socket.emit('join', {userId: this.props.userId}); //Join unique room

				socket.on('waiting-for-requests', function(postData){
					activeIssues.push(postData);
					console.log(activeIssues);
					that.mapCrimeData(activeIssues);
					that.setState({
						citizenDetails: postData.citizenDetails,
						activeIssues: activeIssues
					});
				});

				this.getCurrentLocation();
				
			},
			getCurrentLocation: function(){
				var successCallback = function(data){
					console.log(data)
					this.refs.myMap.placeMarker(data.location.coordinates[1],data.location.coordinates[0]);
					this.getNearestIssues(data.location.coordinates);
					this.setState({
						coordinates: data.location.coordinates
					});
				}.bind(this);
				var that = this;
				setTimeout(function(){
					commonFunctions.makeAjaxGet('/location/police/'+that.state.userId, successCallback)
				},5000);
			},
			getNearestIssues: function(coordinates){
				var successCallback = function(data){
					console.log(data);
					this.mapCrimeData(data.activeIssues);
					
					this.setState({
						activeIssues: data.activeIssues,
						engagedIssues: data.engagedIssues
					})
				}.bind(this);

				commonFunctions.makeAjaxGet('police/issues?lat='+coordinates[1]+'&&lng='+coordinates[0], successCallback)
			},
			mapCrimeData: function(data){
				var geoJsonData = data.map(function(issueDetails) {
				    return {
				        type: 'Feature',
				        geometry: {
				            type: "Point",
				            coordinates: issueDetails.citizenDetails.location.coordinates
				        },
				        properties: {
				            address: issueDetails.citizenDetails.location.address,
				            occurrenceTime: issueDetails.occurrenceTime,
				            responseTime: issueDetails.responseTime,
				            status: issueDetails.status
				        }
				    }
				});

				var mapData = {
				    type: 'FeatureCollection',
				    features: geoJsonData
				}

				this.refs.myMap.displayCrimeStats(mapData);
			},
			updateLocation: function(placeInfo){
				var that = this;
				var postData = {
					userId: that.state.userId,
					coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
				},
				successCallback = function(data){
					console.log(data);
					this.setState({
						coordinates: postData.coordinates
					});
				}.bind(this);
				commonFunctions.makeAjaxPost('/police/location/update', postData, successCallback);

			},
			acknowledgeRequest: function(issueData){
				var that = this;
				console.log(issueData);
				issueData.citizenDetails.location.coordinates = issueData.citizenDetails.location.coordinates.reverse();
				var postData = {
					issueId: issueData.issueId,
					citizenDetails: issueData.citizenDetails,
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
			closeIssue: function(issueData){
				console.log(issueData);
				var postData = {
					issueId: issueData.issueId
				},
				successCallback = function(data){
					console.log(data);
					window.location.replace('/');
				}.bind(this);

				commonFunctions.makeAjaxPost('/help/acknowledge', postData, successCallback);	
			},
			logout: function(){
				window.location.replace('/logout');
			},
		  	render:function(){
		  		var that = this;

		  		var mapOptions = {
		  			displayMaps: true, 
		  			autocompleteInput: '#autocomplete',
		  			autocompleteCallback: this.updateLocation,
		  			latLng: this.state.coordinates,
		  			zoomLevel: 12,
		  			animateMarker: false
		  		};

		  		var engagedProfiles = this.state.engagedIssues.map(function(issueData, iterator){
		  			return (
		  				<ProfileCard 
		  					key={iterator}
		  					width={3}
		  					theme="bg-yellow"
		  					displayName={issueData.citizenDetails.displayName}
		  					description={issueData.citizenDetails.location.address}
		  					displayPicture= '../images/citizen.png'
		  					pictureAlignment= 'left' >

		  					<ProfileInfoList 
		  						list={[{
	                            	description: 'End Issue',
	                            	// stats: 31,
	                            	link: '#',
	                            	// badgeTheme: 'bg-blue'
	                        	}]} 
	                        	callback={that.closeIssue}
	                        	issueData={issueData}/>
		  				</ProfileCard>
		  			)
		  		});

		  		var activeProfiles = this.state.activeIssues.map(function(issueData, iterator){
		  			return (
		  				<ProfileCard 
		  					key={iterator}
		  					width={3}
		  					theme="bg-red"
		  					displayName={issueData.citizenDetails.displayName}
		  					description={issueData.citizenDetails.location.address}
		  					displayPicture= '../images/citizen.png'
		  					pictureAlignment= 'left'>

		  					<ProfileInfoList 
		  						list={[{
	                            	description: 'Help Citizen',
	                            	// stats: 31,
	                            	link: '#',
	                            	// badgeTheme: 'bg-blue'
	                        	}]} 
	                        	callback={that.acknowledgeRequest}
	                        	issueData={issueData}/>
	                    </ProfileCard>
		  			)
		  		});

			    return (

	 		    	<div className="wrapper" id="policePage">

	 		    		<HeaderBar 
	 		    			userId={this.state.userId} 
	 		    			displayName={this.state.displayName}
	 		    			userType={this.state.userType} />
    					
    					<div className="content-wrapper" id="content-wrapper">
    						<section className="content-header">
    							<h1>
    						        Dashboard
    						       	<small>This is only to test the APIs, use the android app</small>
    						    </h1>

    						</section>
    							<div className="row">
	    							{engagedProfiles}
    								{activeProfiles}
    							</div>

    						<section className="content-header">
    							<h4>Select an address to update your current location. New requests will show up on the map</h4>
    						</section>

    						<section className="content">
    							<div className="row">
    								<section className="col-lg-12 connectedSortable ui-sortable" >
										<div className="nav-tabs-custom">
						                    {/* Tabs within a box */}
						                    <ul className="nav nav-tabs pull-right ui-sortable-handle">
						                        <li className="active"><a href="#Map-chart" data-toggle="tab" aria-expanded="true">My Location</a></li>
						                        <li className="pull-left header"><i className="fa fa-map-marker"></i> Map</li>
						                    </ul>

						                    <div className="tab-content no-padding">
						                        <div className="chart tab-pane active" id="Map-chart">
						                        	<br />
						                        	<input type="text" id="autocomplete" />
						                        	<MapWidget options = {mapOptions} ref='myMap'/>
						                        </div>
						                    </div>
						                </div>
    								</section>
    							</div>
    						</section>

    					</div>

                        <footer className="main-footer">
                            <div className="pull-right hidden-xs">
                                <b>Version</b> 1.0.0
                            </div>
                            <strong>A <a href="http://namma-police.github.io">Namma Police</a> initiative. </strong>
                        </footer>
    				</div>


			    );
		  	}
		});

		return PolicePage;
	}
);
