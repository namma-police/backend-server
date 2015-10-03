define(
	[
		'./routes/auth-api', 
		'./routes/citizen-api',
		'./routes/police-api'
	],
	function(authApi, citizenApi, policeApi){
		function initialize(expressInstance, io, socket){
			
			authApi.initialize(expressInstance, io, socket);
			citizenApi.initialize(expressInstance, io, socket);
			policeApi.initialize(expressInstance, io, socket);
		}
		return {
			initialize: initialize
		}
	}
);