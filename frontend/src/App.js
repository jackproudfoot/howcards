import React, { Component } from 'react';

import Main from './Main'

class App extends Component {
	state = {
		/*user: {
			id: 1,
			googleId: '108005168715097953515',
			moderator: true,
			admin: true,
			name: "Jack"
		}*/
	}
	
	handleLoginSuccess = (response) => {
		sessionStorage.setItem('user', JSON.stringify(response));
		fetch('/auth/user/' + response.googleId)
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
					if (res.aud !== "538060071841-5re2m26t7j4ld0qbl60dt0cfg0fek943.apps.googleusercontent.com") {
						console.log('invalid user token')
						sessionStorage.setItem('user', null);
					}
					else {
						fetch('/auth/user/' + res.googleId)
							.then(res => res.json())
							.then(user => this.setState({ user: user }));
					}
				});	
		}
	}
	
	render() {
		 return (
			 	<div className="App">
			 			<Main user={this.state.user} handleLoginSuccess={this.handleLoginSuccess} handleLoginFailure={this.handleLoginFailure} handleLogoutSuccess={this.handleLogoutSuccess} handleLogoutFailure={this.handleLogoutFailure}/>
				 </div>
		 );
	 }
 }

export default App;
