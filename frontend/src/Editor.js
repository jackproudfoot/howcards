import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Route, Redirect } from 'react-router-dom'

import ApprovalMessage from './ApprovalMessage'

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
		  	owner: -1,
		  	images: 0,
		  	steps: [],
			approved: 1
		},
		selected: 0,
		saved: true,
		fetched: false
	};
	
	componentDidMount() {
		fetch('/api/card/' + this.props.match.params.id)
			.then(res => res.json())
			.then(card => this.setState({ card: card, fetched: true }));
	}
	
	changeCard = (card) => {
		card.approved = 2;
		this.setState({ card: card, saved: false });
	}
	
	addStep = () => {
		var newCard = this.state.card;
		newCard.steps.push({title: "", blocks: []})
		newCard.approved = 2;
		this.setState({ saved: false, card: newCard, selected: newCard.steps.length-1 });
	}
	
	componentWillUnmount() {
		clearTimeout(this.timer);
	}
	
	save = () => {
		if(this.props.user === undefined) window.location='/card/'+this.state.card._id;
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('card', JSON.stringify(this.state.card));
		fetch(('/api/save/c/'+this.state.card._id), {
  	  		method: "POST",
			body: data
  	  	})
		.then(res => res.json())
		.then(res => {
			this.setState({ card: res, saved: true })
		});
	}
	
	
	selectCard = (index) => {
		this.setState( { selected: index });
	}
	
	render() {	
		//If the user does not have permission to edit card redirect them to the home page
		var redirect;
		if (this.props.user === undefined) {
			redirect = 
			<Route exact path={"/edit/c/" + this.props.match.params.id} render={() => (
				<Redirect to={"/card/" + this.props.match.params.id}/>
			)} />;
		}
		else if (this.state.fetched && (this.props.user._id !== this.state.card.owner && this.props.user.moderator === false)) {
			redirect = 
			<Route exact path={"/edit/c" + this.props.match.params.id} render={() => (
				<Redirect to={"/card/" + this.props.match.params.id} />
			)} />;
		}
		
		var approvalMessage;
		if (this.props.user !== undefined && (this.props.user._id === this.state.card.owner || this.props.user.moderator === true)) {
			approvalMessage = <ApprovalMessage card={this.state.card} width={this.props.width}/>
		}
		
		return (
			<div className={this.props.classes.root}>
				{redirect}
				
				{approvalMessage}
				
				<EditorCard 
					card={this.state.card} 
					width={this.props.width}
					selected={this.state.selected} 
					selectCard={this.selectCard}
					changeCard={this.changeCard}
					addStep={this.addStep}
				/>
				
				
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