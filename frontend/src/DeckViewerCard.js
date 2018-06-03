import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Zoom from '@material-ui/core/Zoom'

import ViewerSteps from './ViewerSteps'

const styles = theme => ({
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2,
	},
	titleDivider: {
		marginTop: theme.spacing.unit,
	},
});

class DeckViewerCard extends Component {
	
	render() {
		
		return (
			<Grid container justify="center" spacing={16}>
				<Grid item xs={this.props.width}>
					<Zoom in={true}>
					<Paper className={this.props.classes.paper}>
						<Typography variant="headline" component="h1" color="textSecondary">
							How to
						</Typography>
						<Typography variant="headline" component="h1">
							{this.props.card.title}
						</Typography>
						
						<Divider className={this.props.classes.titleDivider} />		
						
						<ViewerSteps 
							card={this.props.card}
						/>
						
					</Paper>
					</Zoom>
				</Grid>
			</Grid>
			
		)
	}
}

DeckViewerCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DeckViewerCard);