import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import DeckViewerCard from './DeckViewerCard';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 70
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
	title: {
		marginTop: theme.spacing.unit * 4,
    	padding: theme.spacing.unit * 2
	},
	titleDivider: {
		marginBottom: theme.spacing.unit * 2
	},
	deckBoard: {
		marginTop: theme.spacing.unit
	}
});

class Deck extends Component {
	state = {
		deck: {
			id: this.props.match.params.id,
			owner: -1,
			title: "",
			description: "",
			cards: []
		}
	}
	
	componentDidMount() {
  	  	fetch('/deck/'+this.props.match.params.id)
        .then(res => res.json())
        .then(deck => this.setState({ deck }));
	}
	
	render() {
		var cards = [];
		for (var i = 0; i < this.state.deck.cards.length; i++) {
			cards.push(<DeckViewerCard card={this.state.deck.cards[0]} width={this.props.width} key={i}/>);
		}
		
		return (
			<div className={this.props.classes.root}>
				<Grid justify="center" container spacing={8}>
					<Grid item xs={this.props.width}>
						<Paper elevation={4} className={this.props.classes.title}>
							<Typography variant="subheading" color="textSecondary">How to</Typography>
							<Typography variant="headline">{this.state.deck.title}</Typography>
			
							<Divider className={this.props.classes.titleDivider}/>
			
							<Typography>{this.state.deck.description}</Typography>
						</Paper>
					</Grid>
				</Grid>
				
			{cards}
				
			</div>
		)
	}
}
Deck.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Deck);