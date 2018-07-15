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
		var cards = [];
		var showFaculty = false;
		if (this.props.user !== undefined) {
			var atIndex = this.props.user.email.indexOf('@');
			
			if ((isNaN(parseInt(this.props.user.email.slice(atIndex - 2, atIndex), 10)) && this.props.user.email.slice(atIndex) === '@pingry.org') || this.props.user.admin || this.props.user.owner) {
				showFaculty = true;
			}
		}
		
		if (showFaculty) {
			cards = this.state.cards;
		}
		else {
			for (var i = 0; i < this.state.cards.length; i++) {
				if (!this.state.cards[i].isFaculty) {
					cards.push(this.state.cards[i])
				}
			}
		}
		
		
		
		return (
			<Board user={this.props.user} search={true} cards={cards}/>
		)
	}
}
export default Home;