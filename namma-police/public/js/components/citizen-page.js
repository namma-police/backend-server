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
		  		style = {
		  			width: '600px',
		  			height: '400px'
		  		};
			    return (
			    	<div id="CitizenPage">
			    		<button id="logoutButton" onClick={this.logout}>logout</button>
			    		<div>
			    			user type: {this.state.userType}
			    		</div>
			    		<div>	
			    			user id: {this.state.userId}
			    		</div>
			    		<div>
			    			display name: {this.state.displayName}
			    		</div>
			    			
			    		<input type="text" id="autocomplete" />
			    		<div id="map-container" style={style}>
			    			<MapWidget options = {mapOptions} ref='myMap'/>
			    		</div>
	 		    	</div>
			    );
		  	}
		});

		return CitizenPage;
	}
);
