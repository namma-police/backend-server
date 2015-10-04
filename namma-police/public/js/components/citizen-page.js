define(
	[
		'react',
		'./map-widget',
		'../common-functions'
	],
	function(React, MapWidget, commonFunctions){
		var CitizenPage = React.createClass({
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
					userId: this.props.userId,
					displayName: 'Anantha',
					coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
				},
				successCallback = function(data){
					console.log(data);
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
			    	<div id="CitizenPage">
			    		<button id="logoutButton" onClick={this.logout}>logout</button>
			    		<div>
			    			Welcome, {this.state.userId}
			    		</div>
			    			
			    		<input type="text" id="autocomplete" />
			    		<div id="map-container" style={style}>
			    			<MapWidget options = {mapOptions} />
			    		</div>
	 		    	</div>
			    );
		  	}
		});

		return CitizenPage;
	}
);
