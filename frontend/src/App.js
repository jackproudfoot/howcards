import React, { Component } from 'react';

import Main from './Main'

class App extends Component {
	state = {
		
	}
	
	handleLoginSuccess = (response) => {
		sessionStorage.setItem('user', JSON.stringify(response));
		fetch('/api/auth/user/' + response.profileObj.email)
			.then(res => res.json())
			.then(user => this.setState({ user: user }));
	}
	
	handleLoginFailure = (response) => {
		console.log(response);
	}
	
	handleLogoutSuccess = (response) => {
		this.setState({user: undefined});
		sessionStorage.setItem('user', null)
	}
	
	handleLogoutFailure = (response) => {
		console.log(response);
	}
	
	//Store Authentication token to handle session login
	componentDidMount() {
		var token = JSON.parse(sessionStorage.getItem('user'));
		if (token !== null) {
			fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+token.tokenId)
				.then(res => res.json())
				.then(res => {
					if (res.aud !== "984851854765-cdu7ujm6nm2ttq6jvd11lrbfc0bcan64.apps.googleusercontent.com") {
						console.log('invalid user token')
						sessionStorage.setItem('user', null);
					}
					else {
						fetch('/api/auth/user/' + res.email)
							.then(res => res.json())
							.then(user => this.setState({ user: user }));
					}
				});	
		}
		
		fetch('/api/moderate/settings')
			.then(res => res.json())
			.then(settings => this.setState({ settings: settings }));
	}
	
	render() {
		
		 return (
			 	<div className="App">
			 			<Main user={this.state.user} settings={this.state.settings} handleLoginSuccess={this.handleLoginSuccess} handleLoginFailure={this.handleLoginFailure} handleLogoutSuccess={this.handleLogoutSuccess} handleLogoutFailure={this.handleLogoutFailure}/>
				 </div>
		 );
	 }
 }

export default App;
