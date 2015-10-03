define(['react'],function(React){
	var HomePage = React.createClass({
		getInitialState: function(){
			return {
				userName:'ashwin'
			}			
		},
		componentDidMount:function(){
			console.log('triggered once after initial render');
		},
	  	render:function(){
		    return (
		    	<div id="homePage">
		    		Welcome, {this.state.userName}
 		    	</div>
		    );
	  	}
	});

	return HomePage;
});
