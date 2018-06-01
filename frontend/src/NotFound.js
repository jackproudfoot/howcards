import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class NotFound extends Component {
	render() {
		return (
			<div>
				<h1>404 Page Not Found</h1>
				<Redirect to="/" />
			</div>
		)
	}
			
}
export default NotFound;