import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import ClearIcon from '@material-ui/icons/Clear'

const styles = theme => ({
	
});

class EditorTextBlock extends Component {
	state = {deleteBlock: 0}
	
	showDelete = () => {
		this.setState({ deleteBlock: 1});
	}
	
	hideDelete = () => {
		this.setState({ deleteBlock: 0 });
	}
	
	deleteBlock = () => {
		this.props.deleteBlock(this.props.index);
	}
	
	render() {
		var deleteButton;
		if (this.state.deleteBlock) {
			deleteButton = <Grid item xs={1}>
								<Tooltip title="Delete Text" placement="right">
									<IconButton className={this.props.classes.button} aria-label="Delete Text Block" onClick={this.deleteBlock}>
										<ClearIcon />
									</IconButton>
								</Tooltip>
							</Grid>;
		}
		
		return (
			<Grid container spacing={0} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
				<Grid item xs>
					<TextField
						required
						value={this.props.content}
						onChange={e => this.props.changeText(e, this.props.index)}
						margin="normal"
						fullWidth
						multiline
					/>
				</Grid>
				{deleteButton}
			</Grid>
			
		)
	}
}

EditorTextBlock.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorTextBlock);