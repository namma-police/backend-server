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
					displayName: this.props.displayName,
					userType: this.props.userType,
					coordinates: ['12.934689', '77.61206400000003'],
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
				var that = this;
				var postData = {
					userId: that.state.userId,
					coordinates: [placeInfo.geometry.location.lat(),placeInfo.geometry.location.lng()]
				},
				successCallback = function(data){
					console.log(data);
					this.setState({coordinates: postData.coordinates});
				}.bind(this);
				commonFunctions.makeAjaxPost('/'+this.props.userType+'/location/update', postData, successCallback);

			},
			acknowledgeRequest: function(){
				var citizenDetails = this.state.citizenDetails,
					that = this;
				var postData = {
					citizenDetails: {
						userId: citizenDetails.userId,
						displayName: citizenDetails.displayName,
						coordinates: citizenDetails.location.coordinates
					},
					policeDetails: {
						userId: that.state.userId,
						displayName: that.state.displayName,
						coordinates: that.state.coordinates
					}
				},
				successCallback = function(data){
					console.log(data);
				}.bind(this);

				commonFunctions.makeAjaxPost('/request/acknowledge', postData, successCallback);

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
			    			user type: {this.state.userType}
			    		</div>
			    		<div>	
			    			user id: {this.state.userId}
			    		</div>
			    		<div>
			    			display name: {this.state.displayName}
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
