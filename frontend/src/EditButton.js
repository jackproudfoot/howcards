import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

import EditIcon from '@material-ui/icons/Edit'

import Zoom from '@material-ui/core/Zoom'

const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	}
})

class EditButton extends Component {
	render() {
		return (
			<Tooltip placement="left" title="Edit">
					<Zoom in={true}>
						<Button variant="fab" color="primary" aria-label="Edit" className={this.props.classes.button}>
							<EditIcon />
						</Button>
					</Zoom>
			</Tooltip>
		)
	}
}

EditButton.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditButton);