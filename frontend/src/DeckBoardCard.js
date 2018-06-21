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
		paddingRight: theme.spacing.unit,
    	paddingBottom: theme.spacing.unit,
	},
	paperstack: {
    	padding: theme.spacing.unit * 2,
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

function DeckBoardCard(props) {
	const { classes } = props;
	
	console.log(props.data._id)
	
	return (
		<Link style={{ color: "white", textDecoration: 'none' }} to={'/deck/' + props.data._id}>
			<Slide direction="down" in={true} mountOnEnter unmountOnExit>
			<Paper className={classes.paper}>
				<Paper elevation={1} className={classes.paperstack}>
					<Typography className={classes.howto} color="textSecondary">
						How to
					</Typography>
					<Typography variant="headline" component="h2">
						{props.data.title}
					</Typography>
				</Paper>
			</Paper>
			</Slide>
		</Link>
	)
}

DeckBoardCard.propTypes = {
	data: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DeckBoardCard);