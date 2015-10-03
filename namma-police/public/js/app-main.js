define(
	[
		'react',
		'jquery',
		'./components/login-page',
		'./components/citizen-page',
		'./components/police-page'
		
	],function(React, $, LoginPage, CitizenPage, PolicePage){	
		console.log('Loaded the Home Page');
		var documentBody = document.body,
			userId = documentBody.getAttribute('data-userid'),
			userType = documentBody.getAttribute('data-user-type');

		if(userId === ''){
			React.render(<LoginPage />, document.getElementById('componentContainer'))
		}else if(userType === 'citizen'){
			React.render(<CitizenPage userId={userId} userType={userType}/>, document.getElementById('componentContainer'));
		}else if(userType === 'police'){
			React.render(<PolicePage userId={userId} userType={userType}/>, document.getElementById('componentContainer'));
		}
	}
);

//webpack --progress --colors --watch (for development)
//webpack -p (for production)