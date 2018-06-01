import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import CardEditorStep from './CardEditorStep'

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 2
	},
	grid: {
		width: '100%',
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
});

class CardEditorSteps extends Component {
	state = { selected: 0 }
	
	render() {
		var steps = [];
		
		if (this.props.steps !== undefined) {
			for (var i = 0; i < this.props.steps.length; i++) {
				steps.push(
					<Grid item xs className={this.props.classes.grid} key={i}>
						<CardEditorStep index={i+1} elevation={i === this.props.selected ? 1 : 0} selectCard={this.props.selectCard} step={this.props.steps[i]}/>
					</Grid>
				);
			}
		}
		
		
		return (
			<div className={this.props.classes.root}>
				<Grid container spacing={0} direction="column" align='center'>
					{steps}
				</Grid>
			</div>
		)
	}
}

CardEditorSteps.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardEditorSteps);