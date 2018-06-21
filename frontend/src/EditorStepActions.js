import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit
	},
	button: {
		margin: theme.spacing.unit
	},
	input: {
	    display: 'none',
	},
});

class EditorStepActions extends Component {
	addImage = () => {
		console.log(this.uploadInput);
		
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', this.props.card.images);
		data.append('id', this.props.card._id)
		
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
			<div className={this.props.classes.root}>
				<Divider />
				
				<Grid container spacing={16} align="center">
					<Grid item xs>
						<Button color="secondary" className={this.props.classes.button} onClick={this.props.addText}>
							Add Text
						</Button>
					</Grid>
					<Grid item xs>
						<input accept="image/*" className={this.props.classes.input} id="flat-button-file" type="file" ref={(ref) => { this.uploadInput = ref; }} onChange={this.addImage} />
						<label htmlFor="flat-button-file">
							<Button color="secondary" component="span" className={this.props.classes.button}>
								Add Image
							</Button>
						</label>
					</Grid>
				</Grid>
			</div>
		)
	}
}

EditorStepActions.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorStepActions);