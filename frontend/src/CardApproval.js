import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import ViewerCard from './ViewerCard';


const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 70
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
});

class CardApproval extends Component {
	state = { cards: [] }
	
	componentDidMount() {
		fetch('/api/moderate/cards')
			.then(res => res.json())
			.then(cards => this.setState({ cards }));
	}
	
	approve = (key, message) => {
		var newCard = this.state.cards[key];
		newCard.approvalMessage = message;
		newCard.approved = true;
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('card', JSON.stringify(newCard));
		fetch('/api/moderate/card', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json());
		
		var newCards = this.state.cards;
		newCards.splice(key, 1);
		this.setState({ card: newCards });
	}
	
	deny = (key, message) => {
		var newCard = this.state.cards[key];
		newCard.approvalMessage = message;
		newCard.approved = false;
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('card', JSON.stringify(newCard));
		fetch('/api/moderate/card', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json());
		
		var newCards = this.state.cards;
		newCards.splice(key, 1);
		this.setState({ card: newCards });
	}
	
	render() {
		var redirect;
		if (this.props.user === undefined || (!this.props.user.moderator && !this.props.user.admin && !this.props.user.owner)) {
			redirect = 
			<Route exact path="/moderate/review/" render={() => (
				<Redirect to="/" />
			)} />;
		}
		
		
		var cards = []
		for (var i = 0; i < this.state.cards.length; i++) {
			cards.push(<ViewerCard key={i} index={i} card={this.state.cards[i]} approve={this.approve} deny={this.deny} width={this.props.width} approval={true} />);
		}
		
		
		return (
			<div className={this.props.classes.root}>
				{redirect}
				{cards}
			</div>
		)
	}
}

CardApproval.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardApproval);