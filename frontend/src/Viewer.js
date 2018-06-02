import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MediaQuery from 'react-responsive'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import ViewerCard from './ViewerCard';
import ViewerEditButton from './ViewerEditButton'

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
	},
});

class CardViewer extends Component {
	state = {
		card: {}
	}
	
	componentDidMount() {
		fetch('/card/' + this.props.match.params.id)
			.then(res => res.json())
			.then(card => this.setState({ card: card }));
	}
	
	render() {
		
		var editButton;
		if (this.props.user.id === this.state.card.owner) {
			editButton = 
				<div className={this.props.classes.fab}>
					<ViewerEditButton id={this.state.card.id}/>
				</div>;
		}
		
		console.log(this.state);
		return (
			<div className={this.props.classes.root}>
				<MediaQuery minDeviceWidth={1224}>
					<ViewerCard card={this.state.card} width={7}/>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={1224}>
					<ViewerCard card={this.state.card} width={12}/>
				</MediaQuery>
				
				{editButton}
			</div>
		)
	}
}

CardViewer.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardViewer);