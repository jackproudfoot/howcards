import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import ViewerStep from './ViewerStep'

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

class ViewerSteps extends Component {
	state = { selected: 0 }
	
	render() {
		var steps = [];
		
		if (this.props.card.steps !== undefined) {
			for (var i = 0; i < this.props.card.steps.length; i++) {
				steps.push(
					<Grid item xs className={this.props.classes.grid} key={i}>
						<ViewerStep 
							index={i} 
							card={this.props.card} 
						/>
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

ViewerSteps.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ViewerSteps);