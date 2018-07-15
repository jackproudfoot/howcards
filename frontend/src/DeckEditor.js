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

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '@material-ui/core/Button'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import TrashIcon from '@material-ui/icons/Delete'


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
		fetched: false,
		isFaculty: false,
		delete: false
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
		newDeck.isFaculty = newDeck.isFaculty || this.state.cards[index].isFaculty;
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
		
		for (var i = 0; i < newDeck.cards.length; i++) {
			if (newDeck.cards[i].isFaculty) {
				newDeck.isFaculty = true;
			}
			else if (i === newDeck.cards.length - 1) {
				newDeck.isFaculty = false;
			}
		}
		
		this.setState({ deck: newDeck, cards: newCards, saved: false });
	}
	
	moveCardForward = (index) => {
		if (index > 0) {
			var newCards = this.state.deck.cards;
			
			var tempCard = newCards[index-1];
			newCards[index-1] = newCards[index];
			newCards[index] = tempCard;
			
			var newDeck = this.state.deck;
			newDeck.cards = newCards;
			this.setState({ deck: newDeck, saved: false })
		}
	}
	
	moveCardBack = (index) => {
		if (index+1 < this.state.deck.cards.length) {
			var newCards = this.state.deck.cards;
			
			var tempCard = newCards[index+1];
			newCards[index+1] = newCards[index];
			newCards[index] = tempCard;
			
			var newDeck = this.state.deck;
			newDeck.cards = newCards;
			this.setState({ deck: newDeck, saved: false })
		}
	}
	
	save = () => {
		if(this.props.user === undefined) window.location='/';
		
		console.log(this.state.deck.isFaculty)
		
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
        .then(cards => {
			var newCards = [];
			var showFaculty = false;
			if (this.props.user !== undefined) {
				var atIndex = this.props.user.email.indexOf('@');
			
				if ((isNaN(parseInt(this.props.user.email.slice(atIndex - 2, atIndex), 10)) && this.props.user.email.slice(atIndex) === '@pingry.org') || this.props.user.admin || this.props.user.owner) {
					showFaculty = true;
				}
			}
		
			if (showFaculty) {
				newCards = cards;
			}
			else {
				for (var i = 0; i < cards.length; i++) {
					if (!cards[i].isFaculty) {
						newCards.push(cards[i])
					}
				}
			}
			
        	this.setState({ cards: newCards })
        });
	}
	
	deleteDeck = () => {
		this.setState({delete: true})
	}
	
	cancelDelete = () => {
		this.setState({delete: false})
	}
	
	handleDelete = () => {
		this.setState({delete: false})
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		fetch('/api/deck/delete/'+this.state.deck._id, {
  	  		method: "POST",
			body: data
  	  	})
		.then(res => {window.location="/"});
	}
	
	render() {
		var facultyOnly;
		if (this.state.deck.isFaculty) {
			facultyOnly = (
				<Typography variant="caption">
					This deck can only be viewed by faculty.
				</Typography>
			)
		}
		
		var redirect;
		if (this.state.fetched && this.props.user === undefined) {
			redirect = 
			<Route exact path={"/edit/d/" + this.props.match.params.id} render={() => (
				<Redirect to={"/deck/"+ this.props.match.params.id} />
			)} />;
		}
		else if (this.state.fetched && (this.props.user._id !== this.state.deck.owner && this.props.user.moderator === false)) {
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
				
			<Dialog
				open={this.state.delete}
				onClose={this.cancelDelete}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete Card?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this deck? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.cancelDelete} color="primary">
						Cancel
					</Button>
					<Button onClick={this.handleDelete} color="primary" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
				
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
								
							{facultyOnly}
							
							<Grid container justify="flex-end" alignItems="center" spacing={0}>
								<Grid item xs={1}>
									<Tooltip title="Delete Deck" placement="right">
										<IconButton onClick={this.deleteDeck}>
											<TrashIcon />
										</IconButton>
									</Tooltip>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				
				<Board user={this.props.user} cards={this.state.deck.cards} deckEditor={true} removeCard={this.removeCard} moveCardForward={this.moveCardForward} moveCardBack={this.moveCardBack}/>
								
				<Divider />
								
				<Board user={this.props.user} cards={addCards} search={true} deckEditor={true} addCard={this.addCard}/>
				
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