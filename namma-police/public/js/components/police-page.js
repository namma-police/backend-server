define(
	[
		'react',
		'./header-bar/header-bar',
		'./control-panel',
		'./containers/container-one',
		'./containers/container-five',
		'./controls-menu',
		'./map-widget',
		'../common-functions'
	],
	function(React, HeaderBar, ControlPanel, ContainerOne, ContainerFive,ControlsMenu, MapWidget, commonFunctions){
		var PolicePage = React.createClass({
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

	 		    	<div className="wrapper" style={style3}>
	 		    		<HeaderBar 
	 		    			userId={this.state.userId} 
	 		    			displayName={this.state.displayName}
	 		    			userType={this.state.userType} 
	 		    			notificationsCallback={this.acknowledgeRequest} />
    					
    					<div className="content-wrapper" style={style2}>
    						<section className="content-header">
    							<h1>
    						        Dashboard
    						       	<small>Control panel</small>
    						    </h1>
    							{/*<ol className="breadcrumb">
    								<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
    								<li className="active">Dashboard</li>
    							</ol>*/}
    							<button id="acknowledge" onClick={this.acknowledgeRequest}>Respond</button>
    							<button  onClick={this.closeIssue}>End issue</button>
                                <ControlPanel />
    						</section>

    						<section className="content">
    							<div className="row">
    								<section className="col-lg-12 connectedSortable ui-sortable" >
										<div className="nav-tabs-custom">
						                    {/* Tabs within a box */}
						                    <ul className="nav nav-tabs pull-right ui-sortable-handle">
						                        <li className=""><a href="#revenue-chart" data-toggle="tab" aria-expanded="false">Area</a></li>
						                        <li className="active"><a href="#Map-chart" data-toggle="tab" aria-expanded="true">Donut</a></li>
						                        <li className="pull-left header"><i className="fa fa-map-marker"></i> Map</li>
						                    </ul>
						                    <div className="tab-content no-padding">
						                        {/* Morris chart - Map */}
						                        <div className="chart tab-pane" id="revenue-chart" style={style1}>

						                        </div>
						                        <div className="chart tab-pane active" id="Map-chart" style={style1}>
						                        	<br />
						                        	<input type="text" id="autocomplete" />
						                        	<MapWidget options = {mapOptions} ref='myMap'/>
						                        </div>
						                    </div>
						                </div>
    								</section>

                                    {/*<section className="col-lg-5 connectedSortable ui-sortable">
                                        <ContainerFive />
                                    </section>*/}
    							</div>
    						</section>

    					</div>

                        <footer className="main-footer">
                            <div className="pull-right hidden-xs">
                                <b>Version</b> 1.0.0
                            </div>
                            <strong>A <a href="http://namma-police.github.io">Namma Police</a> initiative. </strong>
                        </footer>

                        {/*<ControlsMenu />*/}
    				</div>


			    );
		  	}
		});

		return PolicePage;
	}
);
