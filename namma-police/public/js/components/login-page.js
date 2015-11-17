define(
	[
		'react',
		'../common-functions'
	],
	function(React, commonFunctions){
		var LoginPage = React.createClass({
			getInitialState: function(){
				return {
					userName:'ashwin'
				}			
			},
			componentDidMount:function(){
				console.log('triggered once after initial render');
			},
			verifyCitizenPhone: function(){
				var citizenPhone = document.getElementById('citizenPhone').value;
				var postData = {
					phone: citizenPhone
				},
				successcallback = function(data){
					console.log(data);
				}
				commonFunctions.makeAjaxPost('/citizen/phone/verify', postData, successcallback);

			},
			verifyPoliceId: function(){
				var policeid = document.getElementById('policeIdInput').value;
				var postData = {
					userId: policeid
				},
				successcallback = function(data){
					console.log(data);
				}
				commonFunctions.makeAjaxPost('/police/id/verify', postData, successcallback);
			},
			registerCitizen: function(){
				var displayName = document.getElementById('citizenDisplayNameInput').value,
					phone = document.getElementById('citizenPhone').value,
					email = document.getElementById('citizenEmailInput').value,
					password = document.getElementById('citizenPassword').value;

				var postData = {
					displayName: displayName,
					phone: phone,
					email: email,
					password: password
				},
				successcallback = function(data){
					console.log(data);
					window.location.replace('/');
				};

				commonFunctions.makeAjaxPost('/citizen/signup', postData, successcallback);

			},
			registerPolice: function(){
				var displayName = document.getElementById('policeDisplayNameInput').value,
					policeId = document.getElementById('policeIdInput').value,
					phone = document.getElementById('policePhone').value,
					email = document.getElementById('policeEmailInput').value,
					password = document.getElementById('policePassword').value;

				var postData = {
					displayName: displayName,
					userId: policeId,
					phone: phone,
					email: email,
					password: password
				},
				successcallback = function(data){
					console.log(data);
					window.location.replace('/');
				};

				commonFunctions.makeAjaxPost('/police/signup', postData, successcallback);
			},
			loginCitizen: function(){
				var phone = document.getElementById('citizenLoginPhone').value,
					password = document.getElementById('citizenLoginPassword').value;

				var postData = {
					phone: phone,
					password: password
				},
				successcallback = function(data){
					console.log(data);
					//window.location.replace('/');
				}
				commonFunctions.makeAjaxPost('/citizen/login', postData, successcallback);
			},
			loginPolice: function(){
				var policeId = document.getElementById('policeLoginId').value,
					password = document.getElementById('policeLoginPassword').value;

				var postData = {
					userId: policeId,
					password: password
				},
				successcallback = function(data){
					console.log(data);
					//window.location.replace('/');
				}
				commonFunctions.makeAjaxPost('/police/login', postData, successcallback);
			},
		  	render:function(){
		  		var that = this;
			    return (
			    	<div id="homePage">
			    		<h2 id="mainHeader">Welcome to Namma-Police</h2>
			    		
			    		<div id="main" className="section group">
			    			<div id="contentWrapper1" className="section group">
					     		<div id="citizenLogin" className="column loginSection">
					     			<h5>Existing citizen?</h5>
					     			<h3 className="loginHeader">Login</h3>
					     			<p className="inputClassOne">
					     				<input className type = "text" id="citizenLoginPhone" placeholder="User-name"/>
						     		</p>
						     		<p className="inputClassOne">
						     			<input type= "password" id = "citizenLoginPassword" placeholder="Password"/>
						     		</p>
						     		<div onClick={that.loginCitizen} className="buttonClassOne" id="citizenLoginButton">Login</div>		
						     		<div id = "loginErrMsg"></div>
						     	</div>

			     	     		<div id="policeLogin" className="column loginSection">
			     	     			<h5>Existing police?</h5>
			     	     			<h3 className="loginHeader">Login</h3>
			     		    		<p className="inputClassOne">
			     		     			<input type = "text" id="policeLoginId" placeholder="User-name"/>
			     		     		</p>
			     		     		<p className="inputClassOne">
			     		     			<input type= "password" id = "policeLoginPassword" placeholder="Password"/>
			     		     		</p>
			     		     		<div onClick={that.loginPolice} className="buttonClassOne" id="policeLoginButton">Login</div>		
			     		     		<div id = "loginErrMsg"></div>
			     		     	</div>
			     		    </div>
			     		    <div id="contentWrapper2" className="section group">
					     		<div id="citizenSignup" className="column signupSection">
					     			<h5>Are you a new citizen?</h5>
					     			<h3 className="signupHeader">Sign Up!</h3>
					     			<p className="inputClassOne" >
					     				<input type="text" id="citizenDisplayNameInput" placeholder="Your full name"/>
					     			</p>
					     			<p className="inputClassOne" >
					     				<input type="text" id="citizenPhone" placeholder="Enter your phone" onBlur={that.verifyCitizenPhone} />
					     				<div id="signupNameMsg"></div>
					     			</p>
					     			<p className="inputClassOne" >
					     				<input type="text" id="citizenEmailInput" placeholder="Enter your email" />
					     				<br/><br/>
					     				<input type="password" id="citizenPassword" placeholder="Enter your password" />
					   					<div id="signupPwMsg"></div>
					     			</p>
					     			<div onClick={that.registerCitizen} className="buttonClassOne" id="citizenSignupButton">Sign Up!</div>	
					     		</div>

					     		<div id="policeSignup" className="column signupSection">
					     			<h5>Are you a new police?</h5>
					     			<h3 className="signupHeader">Sign Up!</h3>
					     			<p className="inputClassOne" >
					     				<input type="text" id="policeDisplayNameInput" placeholder="Your full name"/>
					     			</p>
					     			<p className="inputClassOne" >
					     				<input type="text" id="policeIdInput" placeholder="Your ID" onBlur={that.verifyPoliceId}/>
					     			</p>
					     			<p className="inputClassOne" >
					     				<input type="text" id="policePhone" placeholder="Enter your phone"/>
					     				<div id="signupNameMsg"></div>
					     			</p>
					     			<p className="inputClassOne" >
					     				<input type="text" id="policeEmailInput" placeholder="Enter your email" />
					     				<br/><br/>
					     				<input type="password" id="policePassword" placeholder="Enter your password" />
					   					<div id="signupPwMsg"></div>
					     			</p>
					     			<div onClick={that.registerPolice} className="buttonClassOne" id="policeSignupButton">Sign Up!</div>	
					     		</div>
					     	</div>
				     		<div id="bgImg"></div>
				     		<div className="overlay"></div>
				     	</div>	
	 		    	</div>
			    );
		  	}
		});
		return LoginPage;
	}
)
