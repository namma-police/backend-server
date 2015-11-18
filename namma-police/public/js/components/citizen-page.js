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
		var CitizenPage = React.createClass({
			getInitialState: function(){
				return {
					userId: this.props.userId,
					displayName: this.props.displayName,
					userType: this.props.userType,
					coordinates: null,
					issueId: null
				}			
			},
			componentDidMount:function(){
				var that = this;
				socket.on(this.props.userId+'-waiting-for-help', function(postData){
					that.setState({policeDetails: postData.policeDetails, issueId: postData.issueId});
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
				
				if(document.getElementById('helpButton').checked){
					commonFunctions.makeAjaxPost('/help/request', postData, successCallback);
				}else{
					commonFunctions.makeAjaxPost('/'+this.props.userType+'/location/update', postData, successCallback);
				}	
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
    						userType={this.state.userType} />
    					
    					<div className="content-wrapper" style={style2}>
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

		return CitizenPage;
	}
);
