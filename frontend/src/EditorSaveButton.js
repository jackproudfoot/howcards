import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

import green from '@material-ui/core/colors/green'

import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'

import Tooltip from '@material-ui/core/Tooltip'

import Zoom from '@material-ui/core/Zoom'

const styles = theme => ({
	root: {
		display: 'flex',
		alignItems: 'center'
	},
	wrapper: {
		margin: theme.spacing.unit,
		position: 'relative'
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700]
		}
	},
	fabProgress: {
		color: green[500],
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1
	}
});

class EditorSaveButton extends Component {
	state = {
		loading: false
	};
	
	handleClick = () => {
		if (!this.state.loading) {
			this.setState({
				loading: true
			});
			this.props.handleSave();
		}
	}
	
	componentWillReceiveProps() {
		this.setState({ loading: false });
	}
	
	render() {
		console.log(this.state.loading)
		const buttonClassname = classNames({
			[this.props.classes.buttonSuccess]: this.props.saved
		})
		
		//Code for the floating action button
		var button = <div className={this.props.classes.wrapper}>
						<Tooltip placement="left" title={!this.props.saved ? "Save" : "Finish"}>
							<Button
								variant="fab"
								color="primary"
								className={buttonClassname}
								onClick={this.handleClick}
							>
								{this.props.saved ? <CheckIcon /> : <SaveIcon />}
							</Button>
						</Tooltip>
						{this.state.loading && <CircularProgress size={68} className={this.props.classes.fabProgress} />}
					</div>;
		
		//Logic for returning to card viewer
		var linkWrapper;
		if (this.props.saved) {
			linkWrapper = <Link to={"/card/"+this.props.card.id}>{button}</Link>;
		}
		else {
			linkWrapper = button;
		}
		
		return (
			<div className={this.props.classes.root}>
				<Zoom in={true}>
					{linkWrapper}
				</Zoom>
			</div>
		)
	}
}

EditorSaveButton.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(EditorSaveButton);