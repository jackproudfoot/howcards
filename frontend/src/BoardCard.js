import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

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

function BoardCard(props) {
	const { classes } = props;
	console.log(props.data);
	return (
		<Link style={{ color: "white", textDecoration: 'none' }} to={'/card/' + props.data.id}>
		<Paper className={classes.paper}>
			<Typography className={classes.howto} color="textSecondary">
				How to
			</Typography>
			<Typography variant="headline" component="h2">
				{props.data.title}
			</Typography>
			
			{/*<Typography className={classes.author} color="textSecondary">
				{props.data.author}
			</Typography>*/}
				
		</Paper>
		</Link>
	)
}

BoardCard.propTypes = {
	data: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BoardCard);