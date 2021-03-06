import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Zoom from '@material-ui/core/Zoom'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

import ViewerSteps from './ViewerSteps'

const styles = theme => ({
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2,
	},
	titleDivider: {
		marginTop: theme.spacing.unit,
	},
	button: {
		margin: theme.spacing.unit
	},
	textfield: {
		margin: theme.spacing.unit * 2
	}
});

class ViewerCard extends Component {
	state = {approvalMessage: ''}
	
	changeMessage = (e) => {
		this.setState({approvalMessage: e.target.value});
	}
	
	approveCard = () => {
		this.props.approve(this.props.index, this.state.approvalMessage);
		this.setState({approvalMessage: ''})
	}
	
	denyCard = () => {
		this.props.deny(this.props.index, this.state.approvalMessage);
		this.setState({approvalMessage: ''})
	}
	
	editCard = () => {
		window.location = "/edit/c/" + this.props.card._id
	}
	
	render() {
		
		var facultyOnly;
		if (this.props.approval && this.props.card.isFaculty) {
			facultyOnly = (
				<Typography variant="caption">
					This card can only be viewed by faculty.
				</Typography>
			)
		}
		
		var approval;
		if (this.props.approval) {
			approval = (
				<div>
					<Divider />
					
					<div className={this.props.classes.textfield}>
					<TextField
						fullWidth
						multiline
						value={this.state.approvalMessage}
						onChange={e => this.changeMessage(e)}
						label="Approval Message"
					/>
					</div>
			
					<Grid container spacing={8} justify="space-around">
						<Grid item>
							<Tooltip title="Approve" placement="right">
							<IconButton onClick={this.approveCard} className={this.props.classes.button} style={{color: green[500]}}>
								<CheckIcon />
							</IconButton>
							</Tooltip>
						</Grid>
				
						<Grid item>
							<Tooltip title="Deny" placement="right">
							<IconButton onClick={this.denyCard} className={this.props.classes.button} style={{color: red[500]}}>
								<ClearIcon />
							</IconButton>
							</Tooltip>
						</Grid>
						
						<Grid item xs={1}>
							<Tooltip title="Edit" placement="right">
							<IconButton onClick={this.editCard} className={this.props.classes.button}>
								<EditIcon />
							</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</div>
			)
		}
		
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
						
						<Typography variant="subheading" color="textSecondary">
							{this.props.card.description}
						</Typography>
						
						{facultyOnly}
						
						<ViewerSteps 
							card={this.props.card}
						/>
							
						{approval}
						
					</Paper>
					</Zoom>
				</Grid>
			</Grid>
			
		)
	}
}

ViewerCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ViewerCard);