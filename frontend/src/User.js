import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import red from '@material-ui/core/colors/red'
import yellow from '@material-ui/core/colors/yellow'
import green from '@material-ui/core/colors/green'

import DeckBoard from './DeckBoard';
import Board from './Board';

const styles = (theme) => ({
	firstBoard: {
		margin: 20,
		marginTop: theme.spacing.unit * 10
	},
	secondaryBoard: {
		margin: 20,
		marginTop: theme.spacing.unit * 2
	},
	cardHeader: {
		marginTop: 10,
		marginLeft: 20
	},
	
});

class User extends Component {
	state = {
		cards: [],
		decks: []
	}
	
	componentDidMount() {
  	  	fetch('/user/'+ this.props.match.params.id)
        .then(res => res.json())
        .then(user => this.setState({ cards: user.cards, decks: user.decks }));
	}
	
	render() {
		var deckBoard;
		if (this.state.decks.length > 0) deckBoard = 
			<div className={this.props.classes.firstBoard}>
				<Typography variant="subheading">Decks</Typography>
				<DeckBoard user={this.props.user} decks={this.state.decks} secondary={true}/>
			</div>;
			
		
		var deniedApprovalCards = [];
		var pendingApprovalCards = [];
		var approvedCards = [];
		
		for (var i = 0; i < this.state.cards.length; i++) {
			if (this.state.cards[i].approved === 0 ) deniedApprovalCards.push(this.state.cards[i]);
			else if (this.state.cards[i].approved === 1 ) approvedCards.push(this.state.cards[i]);
			else if (this.state.cards[i].approved === 2 ) pendingApprovalCards.push(this.state.cards[i]);
		}
		
		var cardHeader;
		if (this.state.cards.length > 0) {
			if (deckBoard === undefined) cardHeader = <Typography variant="subheading">Cards</Typography>
			else cardHeader = (
				<div>
					<Divider />
					<Typography variant="subheading" className={this.props.classes.cardHeader}>Cards</Typography>
				</div>
			)
		}
		
		var deniedApproval;
		if (deniedApprovalCards.length > 0) {
			deniedApproval = 
			<div className={deckBoard === undefined ? this.props.classes.firstBoard : this.props.classes.secondaryBoard}>
				<Typography variant="caption" style={{color: red[500]}}>Denied Approval</Typography>
				<Board user={this.props.user} cards={deniedApprovalCards} secondary={true}/>
			</div>
		}
		
		var pendingApproval;
		if (pendingApprovalCards.length > 0) {
			if (deniedApproval === undefined) {
				pendingApproval = 
					<div className={this.props.classes.firstBoard}>
						<Typography variant="caption" style={{color: yellow[600]}}>Pending Approval</Typography>
						<Board user={this.props.user} cards={pendingApprovalCards} secondary={true}/>
					</div>
			}
			else {
				console.log('hello')
				pendingApproval = 
					<div>
						<Divider />
						<div className={this.props.classes.secondaryBoard}>
							<Typography variant="caption" style={{color: yellow[700]}}>Pending Approval</Typography>
							<Board user={this.props.user} cards={pendingApprovalCards} secondary={true}/>
						</div>
					</div>
			}
		}
		
		var approved;
		if (pendingApprovalCards.length > 0) {
			if (deniedApproval === undefined && pendingApproval === undefined) {
				approved = 
					<div className={this.props.classes.firstBoard}>
						<Typography variant="caption" style={{color: green[500]}}>Approved</Typography>
						<Board user={this.props.user} cards={approvedCards} secondary={true}/>
					</div>
			}
			else {
				console.log('hello')
				approved = 
					<div>
						<Divider />
						<div className={this.props.classes.secondaryBoard}>
							<Typography variant="caption" style={{color: green[500]}}>Approved</Typography>
							<Board user={this.props.user} cards={approvedCards} secondary={true}/>
						</div>
					</div>
			}
		}
		
		
		return (
			<div>
				{deckBoard}
				{cardHeader}
				{deniedApproval}
				{pendingApproval}
				{approved}
			</div>
		)
	}
}
User.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(User);