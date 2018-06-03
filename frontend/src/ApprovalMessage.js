import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'

import red from '@material-ui/core/colors/red'
import yellow from '@material-ui/core/colors/yellow'

const styles = theme => ({
	title: {
		marginTop: theme.spacing.unit * 4,
    	padding: theme.spacing.unit * 2
	},
	denied: {
		color: red[500]
	},
	pending: {
		color: yellow[700]
	}
});

class ApprovalMessage extends Component {	
	render() {
		var approvalMessage;
		if (this.props.card.approved === 0) approvalMessage = (
			<div>
				<Typography variant="headline" className={this.props.classes.denied}>Denied Approval</Typography>
				<Typography>{this.props.card.approvalMessage}</Typography>
			</div>
		)
		else if (this.props.card.approved === 2) approvalMessage = (
			<div>
				<Typography variant="headline" className={this.props.classes.pending}>Pending Approval</Typography>
				<Typography>{this.props.card.approvalMessage}</Typography>
			</div>
		)
		
		if (this.props.card.approved === 1 ) return null;
		
		return (
			<Grid container justify="center" spacing={8}>
				<Grid item xs={this.props.width}>
					<Paper className={this.props.classes.title}>
						{approvalMessage}
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

ApprovalMessage.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ApprovalMessage);