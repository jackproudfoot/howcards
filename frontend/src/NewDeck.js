import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom'

class NewDeck extends Component {
	state = { deck: {}}
	
	componentDidMount() {
		
		const data = new FormData();
		data.append('id', this.props.user.id);
		fetch('/new/deck', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json())
		.then(deck => this.setState({ deck: deck }));
	}
	
	render() {
		if (this.state.deck.id === undefined) return null;
		
		return (
			<Route exact path="/new/deck" render={() => (
				<Redirect to={"/edit/d/"+this.state.deck.id} />
			)} />
		)
		
	}
}
export default NewDeck;