import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import Card from './EditorCard';

const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 70
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	}
});

class CardViewer extends Component {
	state = {}
	
	componentDidMount() {
		fetch('/card/' + this.props.match.params.id)
			.then(res => res.json())
			.then(card => this.setState( card ));
	}
	
	render() {
		console.log(this.state);
		return (
			<div className={this.props.classes.root}>
				<Paper className={this.props.classes.paper}>
					<Typography variant="headline" component="h1" color="textSecondary">
						How to
					</Typography>
					<Typography variant="headline" component="h1">
						{this.state.title}
					</Typography>
				</Paper>
				<Card data={this.state} />
			</div>
		)
	}
}

CardViewer.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardViewer);