import React, { Component } from 'react';

import HeaderBar from './HeaderBar'
import Main from './Main'

class App extends Component {
	state = {
		user: {
			id: 1,
			moderator: true,
			admin: true,
			name: "Jack"
		}
	}
	
	
	handleLogout = () => {
		this.setState({user: undefined})
	}
	
	render() {
		 return (
			 	<div className="App">
			 			<HeaderBar user={this.state.user} handleLogout={this.handleLogout}/>
						<Main user={this.state.user}/>
				 </div>
		 );
	 }
 }

export default App;
