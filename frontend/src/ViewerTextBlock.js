import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'

const styles = theme => ({
	
});

class EditorTextBlock extends Component {
	render() {
		return (
			<Typography>
				{this.props.content}
			</Typography>
			
		)
	}
}

EditorTextBlock.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorTextBlock);