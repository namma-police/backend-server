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
					policeid: policeid
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
					policeId: policeId,
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
					window.location.replace('/');
				}
				commonFunctions.makeAjaxPost('/citizen/login', postData, successcallback);
			},
			loginPolice: function(){
				var policeId = document.getElementById('policeLoginId').value,
					password = document.getElementById('policeLoginPassword').value;

				var postData = {
					policeId: policeId,
					password: password
				},
				successcallback = function(data){
					console.log(data);
					window.location.replace('/');
				}
				commonFunctions.makeAjaxPost('/police/login', postData, successcallback);
			},
		  	render:function(){
		  		var style={
		  			top: '-200px',
		  			left: '400px',
		  			position: 'relative'
		  		},
		  		that = this;

			    return (
			    	<div id="loginPage">
			    		<div id="citizenSignup">
			    			<div>Citizen Display Name: <input type="text" id="citizenDisplayNameInput" /> </div>
			    			<div>Citizen phone: <input type="text" id="citizenPhone" onBlur={that.verifyCitizenPhone}/></div>
			    			<div>Citizen email: <input type="text" id="citizenEmailInput" /></div>
			    			<div>Citizen password: <input type="password" id="citizenPassword" /></div>
			    			<button type="submit" id="citizenSignupButton" onClick={that.registerCitizen}>Register</button>
			    		</div>
			    		<div id="policeSignup">
			    			<div>Police ID: <input type="text" id="policeIdInput"  onBlur={that.verifyPoliceId}/> </div>
			    			<div>Police display name: <input type="text" id="policeDisplayNameInput" /> </div>
			    			<div>Police phone: <input type="text" id="policePhone" /></div>
			    			<div>Police email: <input type="text" id="policeEmailInput" /></div>
			    			<div>Police password: <input type="password" id="policePassword" /></div>
			    			<button type="submit" id="policeSignupButton" onClick={that.registerPolice}> register</button>
			    		</div>
			    		<div style={style}>
				    		<div id="citizenLogin">
				    			<div>Citizen Login with phone: <input type="text" id="citizenLoginPhone" /> </div>
				    			<div>Password: <input type="password" id="citizenLoginPassword" /> </div>
				    			<button type="submit" id="citizenLoginButton" onClick={that.loginCitizen}>Register</button>
				    		</div>

				    		<div id="policeLogin">
				    			<div>Police Login with id: <input type="text" id="policeLoginId" /> </div>
				    			<div>Password: <input type="password" id="policeLoginPassword" /> </div>
				    			<button type="submit" id="policeLoginButton" onClick={that.loginPolice}>Register</button>
				    		</div>
				    	</div>	
	 		    	</div>
			    );
		  	}
		});

		return LoginPage;
	}
);
