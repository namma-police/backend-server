define(
	[
		'react',
		'jquery',
		'./components/home-page',
		'./components/login-page'
	],function(React, $, HomePage, LoginPage){	
		console.log('Loaded the Home Page');
		var documentBody = document.body,
			userId = documentBody.getAttribute('data-userid');
			userType = documentBody.getAttribute('data-user-type');

		if(userId === ''){
			React.render(<LoginPage />, document.getElementById('componentContainer'))
		}else{
			React.render(<HomePage userId={userId} userType={userType}/>, document.getElementById('componentContainer'));
		}
	}
);

//webpack --progress --colors --watch (for development)
//webpack -p (for production)