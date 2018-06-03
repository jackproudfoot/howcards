import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

import Slide from '@material-ui/core/Slide';

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
	return (
		<Link style={{ color: "white", textDecoration: 'none' }} to={'/card/' + props.data.id}>
			<Slide direction="down" in={true} mountOnEnter unmountOnExit>
			<Paper className={classes.paper}>
				<Typography className={classes.howto} color="textSecondary">
					How to
				</Typography>
				<Typography variant="headline" component="h2">
					{props.data.title}
					</Typography>
				
			</Paper>
			</Slide>
		</Link>
	)
}

BoardCard.propTypes = {
	data: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BoardCard);