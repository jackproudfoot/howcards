import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import DeckViewerCard from './DeckViewerCard';

import TextField from '@material-ui/core/TextField'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import Board from './Board'

import EditorSaveButton from './EditorSaveButton'


const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 70
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
	fab: {
		position: 'fixed',
		right: theme.spacing.unit * 2,
		bottom: theme.spacing.unit * 2
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
	},
});

class DeckViewer extends Component {
	state = {
		deck: {
			id: this.props.match.params.id,
			owner: -1,
			title: "",
			description: "",
			cards: []
		},
		saved: true,
		fetched: false
	}
	
	changeTitle = (e) => {
		var newDeck = this.state.deck;
		newDeck.title = e.target.value;
		this.setState({ deck: newDeck, saved: false });
	}
	
	changeDescription = (e) => {
		var newDeck = this.state.deck;
		newDeck.description = e.target.value;
		this.setState({ deck: newDeck, saved: false });
	}
	
	addCard = (index) => {
		var newDeck = this.state.deck;
		newDeck.cards.push(this.state.cards[index]);
		var newCards = this.state.cards;
		newCards.splice(index, 1);
		this.setState({ deck: newDeck, cards: newCards, saved: false });
	}
	
	removeCard = (index) => {
		var newCards = this.state.cards;
		newCards.push(this.state.deck.cards[index]);
		
		var newDeck = this.state.deck;
		newDeck.cards.splice(index, 1)
		
		this.setState({ deck: newDeck, cards: newCards, saved: false });
	}
	
	save = () => {
		if(this.props.user === undefined) window.location='/';
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('deck', JSON.stringify(this.state.deck));
		fetch(('/api/save/d/'+this.state.deck._id), {
  	  		method: "POST",
			body: data
  	  	})
		.then(res => res.json())
		.then(res => {
			this.setState({ deck: res, saved: true })
		});
	}
	
	componentDidMount() {
  	  	fetch('/api/deck/'+this.props.match.params.id)
        .then(res => res.json())
        .then(deck => this.setState({ deck: deck, fetched: true }));
  	  	fetch('/api/board')
        .then(res => res.json())
        .then(cards => this.setState({ cards }));
	}
	
	render() {
		var redirect;
		if (this.state.fetched && this.props.user === undefined) {
			redirect = 
			<Route exact path={"/edit/d/" + this.props.match.params.id} render={() => (
				<Redirect to={"/deck/"+ this.props.match.params.id} />
			)} />;
		}
		else if (this.state.fetched && (this.props.user.id !== this.state.deck.owner && this.props.user.moderator === false)) {
			redirect = 
			<Route exact path={"/edit/d/" + this.props.match.params.id} render={() => (
				<Redirect to={"/deck/"+ this.props.match.params.id} />
			)} />;
		}
		
		var cards = [];
		for (var i = 0; i < this.state.deck.cards.length; i++) {
			cards.push(<DeckViewerCard card={this.state.deck.cards[0]} width={this.props.width} key={i}/>);
		}
		
		
		
		var addCards = this.state.cards;
		if (addCards !== undefined) {
			for (var j = 0; j < addCards.length; j++) {
				for (var z = 0; z < this.state.deck.cards.length; z++) {
					if (this.state.deck.cards[z]._id === addCards[j]._id) {
						addCards.splice(j, 1);
						j--;
						break;
					}
				}
			}
		}
		
		return (
			<div className={this.props.classes.root}>
			{redirect}
				
				<Grid justify="center" container spacing={8}>
					<Grid item xs={this.props.width}>
						<Paper elevation={4} className={this.props.classes.title}>
							<Typography variant="subheading" color="textSecondary">How to</Typography>
							
							<TextField
								required
								value={this.state.deck.title}
								onChange={e => this.changeTitle(e, this)}
								label="Title"
								fullWidth
								margin="normal"
							/>
			
							<Divider className={this.props.classes.titleDivider}/>
			
							<TextField
								multiline
								value={this.state.deck.description}
								onChange={e => this.changeDescription(e, this)}
								label="Description"
								fullWidth
								margin="normal"
							/>
						</Paper>
					</Grid>
				</Grid>
				
				<Board user={this.props.user} cards={this.state.deck.cards} deckEditor={true} removeCard={this.removeCard}/>
								
				<Divider />
								
				<Board user={this.props.user} cards={addCards} deckEditor={true} addCard={this.addCard}/>
				
				<div className={this.props.classes.fab}>
					<EditorSaveButton deck={this.state.deck} saved={this.state.saved} handleSave={this.save}/>
				</div>	
				
			</div>
		)
	}
}
DeckViewer.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DeckViewer);