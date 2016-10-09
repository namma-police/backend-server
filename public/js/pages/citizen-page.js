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
		var CitizenPage = React.createClass({
			getInitialState: function(){
				return {
					userId: this.props.userId,
					displayName: this.props.displayName,
					userType: this.props.userType,
					coordinates: null,
					issueId: null,
					issues:  [],

				}			
			},//sage weil ceph collusus megastore spanner smit shah
			componentDidMount:function(){
				var that = this;
				var issues = this.state.issues;

				socket.emit('join', {userId: this.props.userId});
				
				socket.on('waiting-for-help', function(postData){
					console.log(postData);
					issues.push(postData);
					that.mapCrimeData(issues);
					
					that.setState({
						issueId: postData.issueId,
						issues: issues
					});
				});
			},
			mapCrimeData: function(data){
				var geoJsonData = data.map(function(issueDetails) {
				    return {
				        type: 'Feature',
				        geometry: {
				            type: "Point",
				            coordinates: issueDetails.policeDetails.location.coordinates
				        },
				        properties: {
				            address: issueDetails.policeDetails.location.address,
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
			processAddress: function(placeInfo){
				var postData = {
					userId: this.props.userId,
					displayName: this.props.displayName,
					coordinates: [Number(placeInfo.geometry.location.lat()),Number(placeInfo.geometry.location.lng())]
				},
				successCallback = function(data){
					console.log(data);
					this.setState({coordinates: postData.coordinates})
				}.bind(this);
				
				if(document.getElementById('helpButton').checked){
					commonFunctions.makeAjaxPost('/help/request', postData, successCallback);
				}else{
					commonFunctions.makeAjaxPost('/'+this.props.userType+'/location/update', postData, successCallback);
				}	
			},
			closeIssue: function(issueData){
				var that = this;
				var postData = {
					issueId: issueData.issueId
				},
				successCallback = function(data){
					console.log(data);
					window.location.replace('/');
				}.bind(this);

				commonFunctions.makeAjaxPost('/help/acknowledge', postData, successCallback);	
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
		  			autocompleteCallback: this.processAddress,
		  			latLng: [12.9759849, 77.6345852],  
		  			zoomLevel: 12,
		  			animateMarker: false
		  		},

		  		style3 = {
		  			backgroundColor: 'white'
		  		},
		  		that = this;

		  		var engagedProfiles = this.state.issues.map(function(issueData, iterator){
		  			return (
		  				<ProfileCard 
		  					key={iterator}
		  					width={3}
		  					theme="bg-yellow"
		  					displayName={issueData.policeDetails.displayName}
		  					description={issueData.policeDetails.location.address}
		  					displayPicture= '../images/police.png'
		  					pictureAlignment= 'left' >

		  					<ProfileInfoList 
		  						list={[{
	                            	description: 'End Issue',
	                            	stats: issueData.policeDetails.phone,
	                            	link: '#',
	                            	badgeTheme: 'bg-blue'
	                        	}]} 
	                        	callback={that.closeIssue}
	                        	issueData={issueData}/>
		  				</ProfileCard>
		  			)
		  		});
			    return (

	 		    	<div className="wrapper" style={style3}>
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
    							{/*<ol className="breadcrumb">
    								<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
    								<li className="active">Dashboard</li>
    							</ol>*/}
    							<label>
    								Request help
    								<input type="radio" id="helpButton" name="toggleOperations" value="help" readOnly/>
    							</label>
    							<br />
    							<label>
    								Update location
    								<input type="radio" id="updateButton" name="toggleOperations" value="update" defaultChecked readOnly/>
    							</label>
    							<br />
    							<button  onClick={this.closeIssue}>End issue</button>
    						</section>

    						<div className="row">
	    						{engagedProfiles}
    						</div>

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

		return CitizenPage;
	}
);
