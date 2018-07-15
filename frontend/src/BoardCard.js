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
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'

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
	
	moveCardForward = () => {
		console.log(this.props.index)
		this.props.moveCardForward(this.props.index)
	}
	
	moveCardBack = () => {
		console.log(this.props.index)
		this.props.moveCardBack(this.props.index)
	}
	
	addCard = () => {
		this.props.addCard(this.props.index);
	}
	
	removeCard = () => {
		this.props.removeCard(this.props.index);
	}
	
	render() {
		var cardOption;
		if (this.props.deckEditor) {
			if (this.props.removeCard !== undefined) {
				cardOption = 
					<Grid justify="center" alignItems="center" container spacing={8}>
						<Grid item xs={3} align="right">
							<Tooltip title="Move Card Forward">
								<IconButton aria-label="Move Card Forward" onClick={this.moveCardForward} disabled={this.props.index === 0}>
									<LeftIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						
						<Grid item xs={3} align="center">
							{this.props.index+1}
						</Grid>
			
						<Grid item xs={3} align="left">
							<Tooltip title="Move Card Back">
								<IconButton aria-label="Move Card Back" onClick={this.moveCardBack}>
									<RightIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						
						<Grid item xs={3} align="center">
							<Tooltip title="Remove Card" >
								<IconButton aria-label="Remove Card" onClick={this.removeCard}>
									<ClearIcon />
								</IconButton>
							</Tooltip>
						</Grid>
		</Grid>
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
		
		var facultyOnly;
		if (this.props.deckEditor && this.props.data.isFaculty) {
			facultyOnly = (
				<Typography variant="caption">
					This card can only be viewed by faculty.
				</Typography>
			)
		}
		
		var content = <Slide direction="down" in={true} mountOnEnter unmountOnExit>
				<Paper className={this.props.classes.paper}>
					<Typography className={this.props.classes.howto} color="textSecondary">
						How to
					</Typography>
		
					<Typography variant="headline" component="h2">
						{this.props.data.title}
					</Typography>
				
					{facultyOnly}
				
					{cardOption}
							
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