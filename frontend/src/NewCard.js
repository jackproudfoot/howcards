import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom'

class NewCard extends Component {
	state = { card: {}}
	
	componentDidMount() {
		
		const data = new FormData();
		data.append('id', this.props.user.id);
		fetch('/new/card', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json())
		.then(card => this.setState({ card: card }));
	}
	
	render() {
		console.log(this.state.card)
		if (this.state.card.id === undefined) return null;
		
		return (
			<Route exact path="/new/card" render={() => (
				<Redirect to={"/edit/"+this.state.card.id} />
			)} />
		)
		
	}
}
export default NewCard;