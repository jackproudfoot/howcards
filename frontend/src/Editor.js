import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import EditorMenu from './EditorMenu'

import EditorCard from './EditorCard';

const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 70,
	}
});

class Editor extends Component {
	//State for new card
	state = {
		selected: 0,
		card: {
			id: this.props.match.params.id,
			author: "Jack",
			title: "Print",
			images: 0,
			steps: []
		}
	}
	
	addStep = () => {
		var newCard = this.state.card;
		newCard.steps.push({title: "", blocks: []})
		this.setState({ card: newCard });
	}
	
	addText = () => {
		var newCard = this.state.card;
		newCard.steps[this.state.selected].blocks.push({type: 'text', content: ''});
		this.setState({ card: newCard });
	}
	
	addImage = () => {
		var newCard = this.state.card;
		newCard.steps[this.state.selected].blocks.push({type: 'image', content: `/public/${newCard.id}/${newCard.images}.jpg`});
		newCard.images++;
		this.setState({ card: newCard });
	}
	
	save = () => {
		
	}
	
	selectCard = (index) => {
		this.setState( { selected: index-1 });
	}
	
	componentDidMount() {
		fetch('/card/' + this.props.match.params.id)
			.then(res => res.json())
			.then(card => this.setState({ card: card }));
	}
	
	render() {
		return (
			<div className={this.props.classes.root}>
				<Grid container spacing={8}>
					
					<Grid item xs={9} align='right'>
						<EditorCard card={this.state.card} selectCard={this.selectCard} selected={this.state.selected}/>
					</Grid>
			
					<Grid item xs>
						<EditorMenu addStep={this.addStep} addText={this.addText} addImage={this.addImage} save={this.save} card={this.state.card}/>
					</Grid>
				</Grid>
			</div>
		)
	}
}

Editor.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Editor);