import React, { Component } from 'react';

import Board from './Board';

class Home extends Component {
	state = {
		cards: []
	}
	
	componentDidMount() {
  	  	fetch('/api/board')
        .then(res => res.json())
        .then(cards => this.setState({ cards }));
	}
	
	render() {
		return (
			<Board user={this.props.user} cards={this.state.cards}/>
		)
	}
}
export default Home;