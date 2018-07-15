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
		
		var decks = [];
		var showFaculty = false;
		if (this.props.user !== undefined) {
			var atIndex = this.props.user.email.indexOf('@');
			
			if ((isNaN(parseInt(this.props.user.email.slice(atIndex - 2, atIndex), 10)) && this.props.user.email.slice(atIndex) === '@pingry.org') || this.props.user.admin || this.props.user.owner) {
				showFaculty = true;
			}
		}
		
		if (showFaculty) {
			decks = this.state.decks;
		}
		else {
			for (var i = 0; i < this.state.decks.length; i++) {
				console.log(this.state.decks[i])
				if (!this.state.decks[i].isFaculty) {
					decks.push(this.state.decks[i])
				}
			}
		}
		
		return (
			<DeckBoard user={this.props.user} decks={decks}/>
		)
	}
}
export default Home;