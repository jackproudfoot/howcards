import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import EditorStep from './EditorStep'


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

class EditorSteps extends Component {
	state = { selected: 0 }
	
	changeStep = (step, index) => {
		var newCard = this.props.card;
		newCard.steps[index] = step;
		this.props.changeCard(newCard);
	}
	
	deleteStep = (index) => {
		var newCard = this.props.card;
		newCard.steps.splice(index, 1);
		this.props.changeCard(newCard);
	}
	
	moveStepUp = (index) => {
		var newCard = this.props.card;
		var temp = newCard.steps[index];
		newCard.steps[index] = newCard.steps[index-1]
		newCard.steps[index-1] = temp
		this.props.changeCard(newCard)
	}
	
	moveStepDown = (index) => {
		var newCard = this.props.card;
		var temp = newCard.steps[index];
		newCard.steps[index] = newCard.steps[index+1]
		newCard.steps[index+1] = temp
		this.props.changeCard(newCard)
	}
	
	render() {
		var steps = [];
		
		if (this.props.card.steps !== undefined) {
			for (var i = 0; i < this.props.card.steps.length; i++) {
				steps.push(
					<Grid item xs className={this.props.classes.grid} key={i}>
						<EditorStep 
							index={i} 
							card={this.props.card} 
							elevation={i === this.props.selected ? 1 : 0} 
							selectCard={this.props.selectCard}
							changeStep={this.changeStep} 
							changeCard={this.props.changeCard}
							deleteStep={this.deleteStep}
							moveStepUp={this.moveStepUp}
							moveStepDown={this.moveStepDown}
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

EditorSteps.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorSteps);