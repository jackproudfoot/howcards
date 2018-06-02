import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import ClearIcon from '@material-ui/icons/Clear'

const styles = theme => ({
	image: {
		maxWidth: '100%'
	}
});

class EditorImageBlock extends Component {
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
								<Tooltip title="Delete Image" placement="right">
									<IconButton className={this.props.classes.button} aria-label="Delete Image Block" onClick={this.deleteBlock}>
										<ClearIcon />
									</IconButton>
								</Tooltip>
							</Grid>;
		}
		
		return (
			<Grid container alignItems="center" spacing={0} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
				<Grid item xs={11}>
					<img src={this.props.content} alt="img" className={this.props.classes.image}/>
				</Grid>
				{deleteButton}
			</Grid>
			
		)
	}
}

EditorImageBlock.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorImageBlock);