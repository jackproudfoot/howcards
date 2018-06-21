import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'

import Grid from '@material-ui/core/Grid'

import Slide from '@material-ui/core/Slide';

import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
	howto: {
		marginBottom: 16,
		fontSize: 16
	},
	author: {
		float: 'right',
		marginBottom: 16
	}
});

class BoardCard extends Component{
	state = {showOption: 0}
	
	showDelete = () => {
		if (this.props.deckEditor) this.setState({ showOption: 1 })
	}
	
	hideDelete = () => {
		if (this.props.deckEditor) this.setState({ showOption: 0 })
	}
	
	addCard = () => {
		this.props.addCard(this.props.index);
	}
	
	removeCard = () => {
		this.props.removeCard(this.props.index);
	}
	
	render() {
		var cardOption;
		if (this.props.deckEditor && this.state.showOption === 1) {
			if (this.props.removeCard !== undefined) {
				cardOption = 
				<Tooltip title="Remove Card" placement="right">
					<IconButton aria-label="Remove Card" onClick={this.removeCard}>
						<ClearIcon />
					</IconButton>
				</Tooltip>;
			}
			else if (this.props.addCard !== undefined) {
				cardOption = 
				<Tooltip title="Add Card" placement="right">
					<IconButton aria-label="Add Card" onClick={this.addCard}>
						<AddIcon />
					</IconButton>
				</Tooltip>;
			}
			
		}
		
		var content = <Slide direction="down" in={true} mountOnEnter unmountOnExit>
				<Paper className={this.props.classes.paper} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
					<Grid container spacing={8}>
						<Grid item xs>
							<Typography className={this.props.classes.howto} color="textSecondary">
								How to
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<div>{cardOption}</div>
						</Grid>
					
					</Grid>
					<Typography variant="headline" component="h2">
						{this.props.data.title}
						</Typography>
				
				</Paper>
			</Slide>;
		
		if (this.props.deckEditor) return <div>{content}</div>;
		return (
			<Link style={{ color: "white", textDecoration: 'none' }} to={'/card/' + this.props.data._id}>
				{content}
			</Link>
		)
	}
}

BoardCard.propTypes = {
	data: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BoardCard);