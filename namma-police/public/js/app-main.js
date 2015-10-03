define(['react','./components/home-page'],function(React,HomePage){	
	console.log('Loaded the Home Page');
	React.render(<HomePage />, document.getElementById('componentContainer'));
});

//webpack --progress --colors --watch (for development)
//webpack -p (for production)