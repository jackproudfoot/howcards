import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import TextField from '@material-ui/core/TextField'

import Typography from '@material-ui/core/Typography'

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
	image: {
		maxWidth: '100%'
	}
});

class CardEditorStep extends Component {
	render() {
		var blocks = [];
		
		if (this.props.step !== undefined) {
			for (var i = 0; i < this.props.step.blocks.length; i++) {
				if (this.props.step.blocks[i].type === 'text') {
					blocks.push(
						<Grid item xs key={i}>
							<TextField
								required
								defaultValue={this.props.step.blocks[i].content}
								margin="normal"
								fullWidth
								multiline
							/>
						</Grid>
					);
				}
				else if(this.props.step.blocks[i].type === 'image') {
					blocks.push(
						<Grid item xs key={i}>
							<img src={this.props.step.blocks[i].content} alt="img" className={this.props.classes.image}/>
						</Grid>
					);
				}
				
			}
		}
		
		
		return (
			<Paper align='left' className={this.props.classes.paper} elevation={this.props.elevation} onClick={e => this.props.selectCard(this.props.index, e)}>
				<Typography variant="title">
					Step {this.props.index}
				</Typography>
				<TextField
					required
					defaultValue={this.props.step.title}
					label="Step Title"
					margin="normal"
				/>
				<Divider />
				
					<Grid direction="column" container spacing={16}>
						{blocks}
					</Grid>
				
			</Paper>
		)
	}
}

CardEditorStep.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardEditorStep);