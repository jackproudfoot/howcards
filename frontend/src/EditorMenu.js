import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip'

import TextIcon from '@material-ui/icons/TextFields'
import ImageIcon from '@material-ui/icons/InsertPhoto'
import StepIcon from '@material-ui/icons/AddBox'
import SaveIcon from '@material-ui/icons/Save'

const styles = theme => ({
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit/2,
		width: theme.spacing.unit*6,
		position: 'fixed'
	},
	button: {
		color: theme.palette.secondary.light
	},
	stepbutton: {
		color: theme.palette.secondary.main
	},
	savebutton: {
		color: theme.palette.primary.main
	},
	input: {
	    display: 'none',
	},
});

class EditorMenu extends Component {
	addImage = () => {
		console.log(this.uploadInput);
		
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', parseInt(this.props.card.images));
		data.append('id', this.props.card.id)
		
		fetch('/upload', {
			method: 'POST',
			body: data,
		}).then((response) => {
			response.json().then((body) => {
				console.log("upload complete");
				this.props.addImage();
			});
		});
	}
	
	render() {
		return (
			<Paper className={this.props.classes.paper}>
				
				<Grid container direction="column" spacing={0}>
					
					<Grid item xs>
						<Tooltip title="Add Step" placement="right">
							<IconButton className={this.props.classes.stepbutton} aria-label="Add Step" onClick={this.props.addStep}>
								<StepIcon />
							</IconButton>
						</Tooltip>
					</Grid>
					<Divider />
					
					<Grid item xs>
						<Tooltip title="Add Text to Step" placement="right">
							<IconButton className={this.props.classes.button} aria-label="Add Text to Step" onClick={this.props.addText}>
								<TextIcon />
							</IconButton>
						</Tooltip>
					</Grid>
					
					<Grid item xs>
						<Tooltip title="Add Image to Step" placement="right">
							<div>
								<input accept="image/*" className={this.props.classes.input} id="upload-image" type="file" ref={(ref) => { this.uploadInput = ref; }} onChange={this.addImage}/>
      	  						<label htmlFor="upload-image">
        							<IconButton color="primary" className={this.props.classes.button} component="span">
          								<ImageIcon />
        							</IconButton>
      	  						</label>
							</div>
						</Tooltip>
					</Grid>
					<Divider />
					
					<Grid item xs>
						<Tooltip title="Save Card" placement="right">
							<IconButton className={this.props.classes.savebutton} aria-label="Save Card" onClick={this.props.save}>
								<SaveIcon />
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</Paper>
		)
	}
}

EditorMenu.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles)(EditorMenu);