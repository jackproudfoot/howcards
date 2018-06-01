import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';

import CardEditorSteps from './CardEditorSteps';

const styles = theme => ({
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2,
		width: '66%'
	},
	titleGrid: {
		paddingBottom: theme.spacing.unit * 2,
	}
});

class EditorCard extends Component {
	constructor(props) {
		super(props);
		
		this.state = {}
	}
	
	render() {
		return (
			<Paper className={this.props.classes.paper}>
					
					{/* Title Input */}
					<Grid container alignItems="flex-end" spacing={24} className={this.props.classes.titleGrid}>
						<Grid item align="right">
							<Typography variant="headline" color="textSecondary">
								How to
							</Typography>
						</Grid>
						<Grid item xs align="left">
							<TextField
								required
								placeholder={this.props.card.title}
								label="Title"
								fullWidth
								margin="normal"
							/>
						</Grid>
					</Grid>

					<Divider/>
					
					<CardEditorSteps steps={this.props.card.steps} selectCard={this.props.selectCard} selected={this.props.selected}/>
								
				</Paper>
		)
	}
}

EditorCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorCard);