import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MediaQuery from 'react-responsive'

import Grid from '@material-ui/core/Grid';

import EditorCard from './EditorCard';
import EditorSaveButton from './EditorSaveButton'

const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 70,
	},
	fab: {
		position: 'fixed',
		right: theme.spacing.unit * 2,
		bottom: theme.spacing.unit * 2
	},
});

class Editor extends Component {
	state = { 
		card:{
			id: this.props.match.params.id,
			title: "",
			description: "",
		  	author: "",
		  	images: 0,
		  	steps: []
		},
		selected: 0,
		saved: true
	};
	
	componentDidMount() {
		fetch('/card/' + this.props.match.params.id)
			.then(res => res.json())
			.then(card => this.setState({ card: card }));
	}
	
	changeCard = (card) => {
		this.setState({ card: card, saved: false });
	}
	
	addStep = () => {
		var newCard = this.state.card;
		newCard.steps.push({title: "", blocks: []})
		this.setState({ saved: false, card: newCard, selected: newCard.steps.length-1 });
	}
	
	componentWillUnmount() {
		clearTimeout(this.timer);
	}
	
	save = () => {
		this.timer = setTimeout(() => {
			this.setState({ saved: true });
		}, 2000);
	}
	timer = undefined;
	
	
	selectCard = (index) => {
		this.setState( { selected: index });
	}
	
	render() {	
		return (
			<div className={this.props.classes.root}>
				{/* Card Width for Computer */}
				<MediaQuery minDeviceWidth={1224}>
					<EditorCard 
						card={this.state.card} 
						width={7}
						selected={this.state.selected} 
						selectCard={this.selectCard}
						changeCard={this.changeCard}
						addStep={this.addStep}
					/>
				</MediaQuery>
				{/* Card Width for Mobile */}
				<MediaQuery maxDeviceWidth={1224}>
					<EditorCard 
						card={this.state.card} 
						width={12}
						selected={this.state.selected} 
						selectCard={this.selectCard} 
						changeCard={this.changeCard}
						addStep={this.addStep}
					/>
				</MediaQuery>
				
				<div className={this.props.classes.fab}>
					<EditorSaveButton card={this.state.card} saved={this.state.saved} handleSave={this.save}/>
				</div>	
				
			</div>
		)
	}
}

Editor.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Editor);