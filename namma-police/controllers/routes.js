define(
	[
		'./routes/auth-api', 
	],
	function(authApi){
		function initialize(expressInstance){
			
			authApi.initialize(expressInstance);
		}
		return {
			initialize: initialize
		}
	}
);