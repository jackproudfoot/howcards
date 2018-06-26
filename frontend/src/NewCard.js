import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom'

class NewCard extends Component {
	state = { card: {} }
	
	componentDidMount() {
		if (this.props.user !== undefined) {
			const data = new FormData();
			data.append('id', this.props.user._id);
			fetch('/api/new/card', {
				method: "POST",
				body: data
			 })
			 .then(res => res.json())
			 .then(card => this.setState({ card: card }));
		}
	}
	
	render() {
		if (this.state.card._id === undefined) return null;
		
		if (this.props.settings.moderatorsOnly) {
			if (!this.props.user.moderator && !this.props.user.admin && !this.props.user.owner) {
				return (
					<Route exact path="/new/card" render={() => (
						<Redirect to={"/"+this.state.card._id} />
					)} />
				)
			}
		}		
		else if (this.props.settings.domainRestriction) {
			var userdomain = this.props.user.email.slice(this.props.user.email.indexOf('@')+1);
			
			if (userdomain !== this.props.settings.domain && (!this.props.user.moderator && !this.props.user.admin && !this.props.user.owner)) {
				return (
					<Route exact path="/new/card" render={() => (
						<Redirect to={"/"+this.state.card._id} />
					)} />
				)
			}
		}
		
		return (
			<Route exact path="/new/card" render={() => (
				<Redirect to={"/edit/c/"+this.state.card._id} />
			)} />
		)
		
	}
}
export default NewCard;