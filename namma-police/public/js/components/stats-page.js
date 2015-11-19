define(
	[
		'react',
		'./header-bar/header-bar',
		'./control-panel',
		'./containers/container-one',
		'./containers/container-five',
		'./controls-menu',
		'./page-widgets/stat-tile',
		'./map-widget',
		'../common-functions'
	],
	function(React, HeaderBar, ControlPanel, ContainerOne, ContainerFive, ControlsMenu, StatTile, MapWidget, commonFunctions){
		var StatsPage = React.createClass({
			getInitialState: function(){
				return {
					userId: this.props.userId,
					displayName: this.props.displayName,
					userType: this.props.userType,
					coordinates: null,
					noOfCrimes: '0',
					activeIssues: [],
					engagedIssues: [],
					resolvedIssues: [],
					averageResponseTime: 0
				}			
			},
			componentDidMount:function(){
				console.log('triggered once after initial render');
			},
			millisToMinutesAndSeconds: function(millis) {
			  	var minutes = Math.floor(millis / 60000);
			  	var seconds = ((millis % 60000) / 1000).toFixed(0);
			  	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
			},
			getCrimeData: function(){
				var successCallback = function(data){
					console.log(data);
					this.refs.myMap.displayCrimeStats(data);
					var activeIssues = [], engagedIssues = [], resolvedIssues = [], responseTimes = [];
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
						if(crimeData.properties.responseTime){
							responseTimes.push(crimeData.properties.responseTime - crimeData.properties.occurrenceTime);
						}	
					});

					var totalResponseTime = 0, averageResponseTime;
					for(var i=0; i<responseTimes.length;i++){
						totalResponseTime = totalResponseTime + responseTimes[i]
					}
					averageResponseTime = parseInt(totalResponseTime/responseTimes.length);
					
					averageResponseTime = this.millisToMinutesAndSeconds(averageResponseTime);

					this.setState({
						noOfCrimes: data.features.length,
						activeIssues: activeIssues,
						engagedIssues: engagedIssues,
						resolvedIssues: resolvedIssues,
						averageResponseTime: averageResponseTime
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
		  			zoomLevel: 12,
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

	 		    	<div className="wrapper" style={style3}>
    					<HeaderBar 
    						userId={this.state.userId} 
    						displayName={this.state.displayName}
    						userType={this.state.userType} />
    					
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
                                <ControlPanel />
    						</section>

    						<section className="content">
    							<div className="row">
    								<StatTile 
    								    icon = 'fa-star' 
    								    stats = {''+this.state.noOfCrimes}
    								    subject = 'Reported issues' 
    								    theme = 'bg-aqua' />
    								<StatTile 
    								    icon = 'fa-trophy' 
    								    stats = {''+this.state.resolvedIssues.length}
    								    subject = 'Resolved issues' 
    								    theme = 'bg-green' />
    								<StatTile 
    								    icon = 'fa-hourglass-end' 
    								    stats = {''+this.state.engagedIssues.length}
    								    subject = 'Engaged issues' 
    								    theme = 'bg-yellow' />
    								<StatTile 
    								    icon = 'fa-bolt' 
    								    stats = {''+this.state.activeIssues.length}
    								    subject = 'Unresolved issues' 
    								    theme = 'bg-red' />
    							</div>
    							<div className="row">
    								<section className="col-lg-12 connectedSortable ui-sortable" >
										<div className="nav-tabs-custom">
						                    {/* Tabs within a box */}
						                    <ul className="nav nav-tabs pull-right ui-sortable-handle">
						                        <li className=""><a href="#revenue-chart" data-toggle="tab" aria-expanded="false">Stats</a></li>
						                        <li className="active"><a href="#Map-chart" data-toggle="tab" aria-expanded="true">Area</a></li>
						                        <li className="pull-left header"><i className="fa fa-map-marker"></i> Map</li>
						                    </ul>
						                    <div className="tab-content no-padding">
						                        {/* Morris chart - Map */}
						                        <div className="chart tab-pane" id="revenue-chart" style={style1}>
						                        	<br /> <br />
						                        	<StatTile 
						                        	    icon = 'fa-clock-o' 
						                        	    stats = {this.state.averageResponseTime+''}
						                        	    subject = 'Average response time (in minutes)' 
						                        	    theme = 'bg-blue' />
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

		return StatsPage;
	}
);
