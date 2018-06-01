import React from 'react';
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//import SearchBar from './SearchBar';

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		position: 'relative',
		left: 10,
		flex: 1
	}
}

function HeaderBar(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar>
				<Toolbar>
					<Typography align='left' variant="title" color="inherit" className={classes.flex}>
						<Link style={{ color: "white", textDecoration: 'none' }} to='/'>Howcards</Link>
					</Typography>
					
					
					{/*<SearchBar />*/}
					
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

HeaderBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderBar);