import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import ClearIcon from '@material-ui/icons/Clear'


const styles = theme => ({
	item: {
		height: 40
	}
});

class ManageModeratorsName extends Component {
	state = {showDelete: false}
	
	showDelete = () => {
		this.setState({showDelete: true})
	}
	
	hideDelete = () => {
		this.setState({showDelete: false})
	}
	
	deleteName = () => {
		this.props.delete(this.props.index)
	}
	
	render() {
		var deleteName;
		if (this.state.showDelete === true) {
			deleteName = <Tooltip title="Remove Privelages" placement="right">
			<IconButton className={this.props.classes.button} aria-label="Remove Privelages" onClick={this.deleteName}>
								<ClearIcon />
							</IconButton>
						</Tooltip>;
		}
		
		return (
			<div onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete} className={this.props.classes.root}>
			<Grid container spacing={8} alignItems="center" className={this.props.classes.item}>
				<Grid item xs>
					<div>
						{this.props.email}
					</div>
				</Grid>
						
				<Grid item xs={2}>
					{deleteName}
				</Grid>
			</Grid>
			</div>
		)
	}
}

ManageModeratorsName.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ManageModeratorsName);