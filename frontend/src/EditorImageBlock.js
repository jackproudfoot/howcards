import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'

import ClearIcon from '@material-ui/icons/Clear'
import UpArrowIcon from '@material-ui/icons/KeyboardArrowUp'
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown'

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
	
	moveBlockUp = () => {
		var newStep = this.props.step;
		var temp = newStep.blocks[this.props.index];
		newStep.blocks[this.props.index] = newStep.blocks[this.props.index-1]
		newStep.blocks[this.props.index-1] = temp
		this.props.changeStep(newStep)
	}
	
	moveBlockDown = () => {
		var newStep = this.props.step;
		var temp = newStep.blocks[this.props.index];
		newStep.blocks[this.props.index] = newStep.blocks[this.props.index+1]
		newStep.blocks[this.props.index+1] = temp
		this.props.changeStep(newStep)
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
		
		//If the step is currently being edited or hovered over show option to move step
		var moveBlockUp;
		if (this.state.deleteBlock) {
			moveBlockUp = <Tooltip title="Move Image Up" placement="right">
							<div><IconButton className={this.props.classes.button} disabled={this.props.index === 0} aria-label="Move Image Up" onClick={this.moveBlockUp}>
								<UpArrowIcon />
							</IconButton></div>
						</Tooltip>;
		}
		var moveBlockDown;
		if (this.state.deleteBlock) {
			moveBlockDown = <Tooltip title="Move Image Down" placement="right">
							<div><IconButton className={this.props.classes.button} disabled={this.props.index === this.props.step.blocks.length-1} aria-label="Move Image Down" onClick={this.moveBlockDown}>
								<DownArrowIcon />
							</IconButton></div>
						</Tooltip>;
		}
		
		return (
			<Grid container alignItems="center" spacing={0} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
				<Grid item xs={11}>
					<img src={this.props.content} alt="img" className={this.props.classes.image}/>
				</Grid>
				<Grid item xs>
					<Grid container direction="column" alignItems="center" spacing={8}>
						<Grid item xs>
							{moveBlockUp}
						</Grid>
						<Grid item xs>
							{deleteButton}
						</Grid>
						<Grid item xs>
							{moveBlockDown}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			
		)
	}
}

EditorImageBlock.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorImageBlock);