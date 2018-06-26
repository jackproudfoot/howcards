import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ApprovalMessage from './ApprovalMessage'
import ViewerCard from './ViewerCard';
import EditButton from './EditButton'


const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 70
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
	fab: {
		position: 'fixed',
		right: theme.spacing.unit * 2,
		bottom: theme.spacing.unit * 2
	}
});

class Viewer extends Component {
	state = {
		card: {
			approved: 1
		}
	}
	
	componentDidMount() {
		fetch('/api/card/' + this.props.match.params.id)
			.then(res => res.json())
			.then(card => this.setState({ card: card }));
	}
	
	render() {
		
		var editButton;
		if (this.props.user !== undefined && (this.props.user._id === this.state.card.owner || this.props.user.moderator === true)) {
			editButton = 
				<div className={this.props.classes.fab}>
					<Link style={{ color: "white", textDecoration: 'none' }} to={'/edit/c/' + this.state.card._id}>
						<EditButton id={this.state.card._id}/>
					</Link>
				</div>;
		}
		
		
		var approvalMessage;
		if (this.props.user !== undefined && (this.props.user._id === this.state.card.owner || this.props.user.moderator === true) && !this.state.card.approved) {
			approvalMessage = <ApprovalMessage card={this.state.card} width={this.props.width}/>
		}
		
		return (
			<div className={this.props.classes.root}>
				{approvalMessage}
			
				<ViewerCard card={this.state.card} width={this.props.width}/>
				
				{editButton}
			</div>
		)
	}
}

Viewer.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Viewer);