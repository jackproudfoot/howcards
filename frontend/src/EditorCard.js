import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import TrashIcon from '@material-ui/icons/Delete'

import TextField from '@material-ui/core/TextField';

import Zoom from '@material-ui/core/Zoom'

import EditorSteps from './EditorSteps';

const styles = theme => ({
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2,
	},
	titleGrid: {
		paddingBottom: theme.spacing.unit * 2,
	},
	button: {
		margin: theme.spacing.unit
	}
});

class EditorCard extends Component {
	state = {delete: false}
	
	changeTitle = (e) => {
		var newCard = this.props.card;
		newCard.title = e.target.value;
		this.props.changeCard(newCard);
	}
	
	changeDescription = (e) => {
		var newCard = this.props.card;
		newCard.description = e.target.value;
		this.props.changeCard(newCard);
	}
	
	deleteCard = () => {
		this.setState({delete: true})
	}
	
	cancelDelete = () => {
		this.setState({delete: false})
	}
	
	handleDelete = () => {
		this.setState({delete: false})
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		fetch('/api/card/delete/'+this.props.card._id, {
  	  		method: "POST",
			body: data
  	  	})
		.then(res => {window.location="/"});
	}
	
	toggleFacultyOnly = () => {
		var newCard = this.props.card;
		newCard.isFaculty = !newCard.isFaculty;
		this.props.changeCard(newCard);
	}
	
	render() {
		var facultyOnly;
		if(this.props.card.isFaculty !== undefined && this.props.user !== undefined && ((isNaN(parseInt(this.props.user.email.slice(this.props.user.email.indexOf('@') - 2, this.props.user.email.indexOf('@')), 10))  && this.props.user.email.slice(this.props.user.email.indexOf('@')) === '@pingry.org') || this.props.user.admin || this.props.user.owner)) {
			facultyOnly = (
			<Grid item xs={1}>
				<FormControlLabel 
					control={
						<Switch
 							checked={this.props.card.isFaculty}
							onChange={e => this.toggleFacultyOnly(e, this)}
							value="facultyOnly"
						/>
					}
					label="Faculty Only"
				/>
			</Grid>
			)
		}
		
		return (
			<div>
			
			<Dialog
				open={this.state.delete}
				onClose={this.cancelDelete}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete Card?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this card? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.cancelDelete} color="primary">
						Cancel
					</Button>
					<Button onClick={this.handleDelete} color="primary" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			
			<Grid container justify="center" spacing={16}>
				<Grid item xs={this.props.width}>
					<Zoom in={true}>
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
									value={this.props.card.title}
									onChange={e => this.changeTitle(e, this)}
									label="Title"
									fullWidth
									margin="normal"
								/>
							</Grid>
						</Grid>
					
						<TextField
							multiline
							value={this.props.card.description}
							onChange={e => this.changeDescription(e, this)}
							label="Description"
							fullWidth
							margin="normal"
						/>
								
						<Divider/>
					
						<EditorSteps 
							card={this.props.card} 
							selected={this.props.selected}
							selectCard={this.props.selectCard}
							changeCard={this.props.changeCard}
							changeStep={this.props.changeStep} 
						/>
					
						<Divider />
					
						<Grid container align="center" spacing={0}>
							{facultyOnly}
							
							<Grid item xs>
								<Button variant="outlined" color="primary" className={this.props.classes.button} onClick={this.props.addStep}>
									Add Step
								</Button>
							</Grid>
							
							<Grid item xs={1}>
								<Tooltip title="Delete Card" placement="right">
									<IconButton onClick={this.deleteCard}>
										<TrashIcon />
									</IconButton>
								</Tooltip>
							</Grid>
						</Grid>

					</Paper>
					</Zoom>		
							
				</Grid>
			</Grid>
							
			</div>
		)
	}
}

EditorCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorCard);