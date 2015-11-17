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

	 		    	<div className="wrapper" style={style3}>
    					<HeaderBar />
    					
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
    								    icon = 'ion-stats-bars' 
    								    stats = {''+this.state.noOfCrimes}
    								    subject = 'Total crimes' 
    								    theme = 'bg-aqua' />
    								<StatTile 
    								    icon = 'ion-stats-bars' 
    								    stats = {''+this.state.resolvedIssues.length}
    								    subject = 'Resolved issues' 
    								    theme = 'bg-green' />
    								<StatTile 
    								    icon = 'ion-stats-bars' 
    								    stats = {''+this.state.engagedIssues.length}
    								    subject = 'Engaged issues' 
    								    theme = 'bg-yellow' />
    								<StatTile 
    								    icon = 'ion-stats-bars' 
    								    stats = {''+this.state.activeIssues.length}
    								    subject = 'Unresolved issues' 
    								    theme = 'bg-red' />
    							</div>
    							<div className="row">
    								<section className="col-lg-7 connectedSortable ui-sortable" >
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

                                    <section className="col-lg-5 connectedSortable ui-sortable">
                                        <ContainerFive />
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

                        {/*<ControlsMenu />*/}
    				</div>
			    );
		  	}
		});

		return StatsPage;
	}
);
