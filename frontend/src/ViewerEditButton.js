import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

class ViewerEditButton extends Component {
	render() {
		return (
			<Link style={{ color: "white", textDecoration: 'none' }} to={'/edit/' + this.props.id}>
				<Tooltip placement="left" title="Edit">
					<Zoom in={true}>
						<Button variant="fab" color="primary" aria-label="Edit" className={this.props.classes.button}>
							<EditIcon />
						</Button>
					</Zoom>
				</Tooltip>
			</Link>
		)
	}
}

ViewerEditButton.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ViewerEditButton);