import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
	margin: {
		margin: theme.spacing.unit,
		width: '100%',
		'&:after': {
			//borderBottomColor: green[500]
			width: '150%'
		}
	},
	input: {
		color: 'white'
	}
});

function SearchBar(props) {
	const { classes } = props;
	
	return (
		<div>
			<FormControl className={classes.margin}>
				<Input
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					}
					className={props.classes.input}
				/>
			</FormControl>
		</div>
	)
}

SearchBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);