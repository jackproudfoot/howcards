import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import DeckBoardCard from './DeckBoardCard';

const styles = theme => ({
	root: {
		flexGrow: 1,
		margin: 10,
		marginTop: 80
	},
	secondaryroot: {
		flexGrow: 1,
		marginTop: theme.spacing.unit * 2,
	}
});

class DeckBoard extends Component {
	render() {
		
		if (this.props.decks === undefined) return null;
		
		/* THERE IS PROBABLY A BETTER WAY TO DO THIS */
	
		//Divide the cards into rows of three
		var rows = [];
		for (var i = 0; i < this.props.decks.length/3; i++) {
			if (this.props.decks[i*3+2] !== undefined) {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><DeckBoardCard data={this.props.decks[i*3]} /></Grid>
						<Grid item xs><DeckBoardCard data={this.props.decks[i*3+1]} /></Grid>
						<Grid item xs><DeckBoardCard data={this.props.decks[i*3+2]} /></Grid>
					</Grid>
				);
			}
			else if (this.props.decks[i*3+1] !== undefined) {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><DeckBoardCard data={this.props.decks[i*3]} /></Grid>
						<Grid item xs><DeckBoardCard data={this.props.decks[i*3+1]} /></Grid>
					</Grid>
				);
			}
			else /*if (props.decks[i*3] != undefined)*/ {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><DeckBoardCard data={this.props.decks[i*3]} /></Grid>
					</Grid>
				);
			}
		
		}
	
	
	
		//Map each of the rows to a grid container
		return (
			<div className={(this.props.secondary) ? this.props.classes.secondaryroot : this.props.classes.root} >
				<Grid container spacing={16}>
					{rows}
				</Grid>
			</div>
		)
	}
	
}

DeckBoard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DeckBoard);