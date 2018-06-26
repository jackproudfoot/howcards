import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'

import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'

import ViewerTextBlock from './ViewerTextBlock'
import ViewerImageBlock from './ViewerImageBlock'

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit
	},
	grid: {
		width: '100%',
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
	divider: {
		marginTop: theme.spacing.unit * 4
	},
	stepTitle: {
		marginBottom: theme.spacing.unit
	}
});

class ViewerStep extends Component {
	render() {
		var blocks = [];
		
		var step = this.props.card.steps[this.props.index];
		
		if (step !== undefined) {
			for (var i = 0; i < step.blocks.length; i++) {
				if (step.blocks[i].type === 'text') {
					blocks.push(
						<Grid item xs key={i}>
							<ViewerTextBlock 
								index={i} 
								content={step.blocks[i].content}
							/>
						</Grid>
					);
				}
				else if(step.blocks[i].type === 'image') {
					blocks.push(
						<Grid item xs key={i}>
							<ViewerImageBlock 
								index={i} 
								content={step.blocks[i].content}
							/>
						</Grid>
					);
				}
				
			}
		} 
		
		//Don't show step divider if it's last step
		return (
			<Paper align='left' className={this.props.classes.paper} elevation={0}>
				<Grid container spacing={0}>
					<Grid item xs>
						<div>
							<Typography variant="title">
								Step {this.props.index+1}
							</Typography>
							<Typography variant="subheading" color="textSecondary" className={this.props.classes.stepTitle}>
								{step.title}
							</Typography>
						</div>
					</Grid>
					
				</Grid>
				
				
				
				<Grid direction="column" container spacing={16}>
					{blocks}
				</Grid>
				
			</Paper>
		)
	}
}

ViewerStep.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ViewerStep);