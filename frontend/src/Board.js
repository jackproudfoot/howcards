import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

import Grid from '@material-ui/core/Grid';

import BoardCard from './BoardCard';

const styles = theme => ({
	root: {
		flexGrow: 1,
		margin: 20,
		marginTop: 80
	},
	secondaryroot: {
		flexGrow: 1,
		marginTop: theme.spacing.unit * 2,
	},
	searchBar: {
		marginBottom: 20,
	}
});

class Board extends Component {
	state = { query: '' }
	
	handleSearch = (e) => {
		this.setState({ query: e.target.value })
	}
	
	render() {
		
		if (this.props.cards === undefined) return null;
		
		var cards = [];
		var search;
		if (!this.props.search) cards = this.props.cards;
		else {
			search = (
				<Grid container justify="center" spacing={8}>
					<Grid item xs={6}>
						<Input
							id="search"
							value={this.state.query}
							fullWidth
							onChange={e => this.handleSearch(e, this)}
							startAdornment={
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							}
						/>
					</Grid>
				</Grid>
			)
			
			for (var i = 0; i < this.props.cards.length; i++) {
				if (this.props.cards[i].title.toUpperCase().includes(this.state.query.toUpperCase())) {
					cards.push(this.props.cards[i]);
				}
			}
		}
	
		//Divide the cards into rows of three
		var rows = [];
		for (var i = 0; i < cards.length/3; i++) {
			if (cards[i*3+2] !== undefined) {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><BoardCard data={cards[i*3]} index={i*3} removeCard={this.props.removeCard} addCard={this.props.addCard} moveCardForward={this.props.moveCardForward} moveCardBack={this.props.moveCardBack} deckEditor={this.props.deckEditor}/></Grid>
						<Grid item xs><BoardCard data={cards[i*3+1]} index={i*3+1}  removeCard={this.props.removeCard} addCard={this.props.addCard} moveCardForward={this.props.moveCardForward} moveCardBack={this.props.moveCardBack} deckEditor={this.props.deckEditor}/></Grid>
						<Grid item xs><BoardCard data={cards[i*3+2]} index={i*3+2}  removeCard={this.props.removeCard} addCard={this.props.addCard} moveCardForward={this.props.moveCardForward} moveCardBack={this.props.moveCardBack} deckEditor={this.props.deckEditor}/></Grid>
					</Grid>
				);
			}
			else if (cards[i*3+1] !== undefined) {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><BoardCard data={cards[i*3]} index={i*3}  removeCard={this.props.removeCard} addCard={this.props.addCard} moveCardForward={this.props.moveCardForward} moveCardBack={this.props.moveCardBack} deckEditor={this.props.deckEditor}/></Grid>
							<Grid item xs><BoardCard data={cards[i*3+1]} index={i*3+1}  removeCard={this.props.removeCard} addCard={this.props.addCard} moveCardForward={this.props.moveCardForward} moveCardBack={this.props.moveCardBack} deckEditor={this.props.deckEditor}/></Grid>
					</Grid>
				);
			}
			else /*if (props.cards[i*3] != undefined)*/ {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><BoardCard data={cards[i*3]} index={i*3}  removeCard={this.props.removeCard} addCard={this.props.addCard} moveCardForward={this.props.moveCardForward} moveCardBack={this.props.moveCardBack} deckEditor={this.props.deckEditor}/></Grid>
					</Grid>
				);
			}
		
		}
	
	
	
		//Map each of the rows to a grid container
		return (
			<div className={(this.props.secondary) ? this.props.classes.secondaryroot : this.props.classes.root} >
				<div className={this.props.classes.searchBar}>
					{search}
				</div>
				<Grid container spacing={16}>
					{rows}
				</Grid>
			</div>
		)
	}
	
}

Board.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Board);