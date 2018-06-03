import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import BoardCard from './BoardCard';

const styles = {
	root: {
		flexGrow: 1,
		margin: 10,
		marginTop: 80
	}
}

class Board extends Component {
	render() {
		
		if (this.props.cards === undefined) return null;
		
		/* THERE IS PROBABLY A BETTER WAY TO DO THIS */
	
		//Divide the cards into rows of three
		var rows = [];
		for (var i = 0; i < this.props.cards.length/3; i++) {
			if (this.props.cards[i*3+2] !== undefined) {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><BoardCard data={this.props.cards[i*3]} /></Grid>
						<Grid item xs><BoardCard data={this.props.cards[i*3+1]} /></Grid>
						<Grid item xs><BoardCard data={this.props.cards[i*3+2]} /></Grid>
					</Grid>
				);
			}
			else if (this.props.cards[i*3+1] !== undefined) {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><BoardCard data={this.props.cards[i*3]} /></Grid>
						<Grid item xs><BoardCard data={this.props.cards[i*3+1]} /></Grid>
					</Grid>
				);
			}
			else /*if (props.cards[i*3] != undefined)*/ {
				rows.push(
					<Grid container spacing={16} key={i}>
						<Grid item xs><BoardCard data={this.props.cards[i*3]} /></Grid>
					</Grid>
				);
			}
		
		}
	
	
	
		//Map each of the rows to a grid container
		return (
			<div className={this.props.classes.root} >
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