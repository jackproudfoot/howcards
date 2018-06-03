import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	image: {
		maxWidth: '100%'
	}
});

class ViewerImageBlock extends Component {
	render() {
		return (
			<img src={this.props.content} alt="img" className={this.props.classes.image}/>
		)
	}
}

ViewerImageBlock.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ViewerImageBlock);