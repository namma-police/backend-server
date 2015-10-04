define(
	[
		'react',
		'./map-widget',
		'../common-functions'
	],
	function(React, MapWidget, commonFunctions){
		var PolicePage = React.createClass({
			getInitialState: function(){
				return {
					userId: this.props.userId,
					userType: this.props.userType,
					currentLocation: null,
					citizenDetails: {}
				}			
			},
			componentDidMount:function(){
				console.log('triggered once after initial render');
				var that = this;
				//this.props.userId+
				socket.on(this.props.userId+'-waiting-for-requests', function(postData){
					console.log(postData);
					that.setState({citizenDetails: postData});
				});
				
			},
			processAddress: function(placeInfo){
				var postData = {
					coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
				},
				successCallback = function(data){
					console.log(data);
				};
				commonFunctions.makeAjaxPost('/'+this.props.userType+'/location/update', postData, successCallback);

			},
			acknowledgeRequest: function(){
				var postData = {
					
				}
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
			    	<div id="PolicePage">
			    		<button id="logoutButton" onClick={this.logout}>logout</button>
			    		<div>
			    			Welcome, {this.state.userId}
			    		</div>
			    		<button id="acknowledge" onClick={this.acknowledgeRequest}>Acknowledge</button> 
			    		<input type="text" id="autocomplete" />
			    		<div id="map-container" style={style}>
			    			<MapWidget options = {mapOptions} />
			    		</div>
	 		    	</div>
			    );
		  	}
		});

		return PolicePage;
	}
);
