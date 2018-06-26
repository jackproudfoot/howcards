import React, { Component } from 'react';


import DeckBoard from './DeckBoard';

class Home extends Component {
	state = {
		decks: []
	}
	
	componentDidMount() {
  	  	fetch('/api/deck/all')
        .then(res => res.json())
        .then(decks => this.setState({ decks }));
	}
	
	render() {
		
		return (
			<DeckBoard user={this.props.user} decks={this.state.decks}/>
		)
	}
}
export default Home;