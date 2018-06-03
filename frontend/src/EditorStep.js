import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import TextField from '@material-ui/core/TextField'

import Typography from '@material-ui/core/Typography'

import EditorTextBlock from './EditorTextBlock'
import EditorImageBlock from './EditorImageBlock'

import EditorStepActions from './EditorStepActions'

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'

import ClearIcon from '@material-ui/icons/Clear'
import UpArrowIcon from '@material-ui/icons/KeyboardArrowUp'
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown'

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 2
	},
	grid: {
		width: '100%',
	},
	paper: {	
		margin: theme.spacing.unit,
    	padding: theme.spacing.unit * 2
	},
	arrows: {
		marginRight: theme.spacing.unit * 2
	}
});

class EditorStep extends Component {
	constructor(props) {
		super(props);
		
		this.state = { showDelete: this.props.elevation }
	}
	
	changeTitle = (e) => {
		var newStep = this.props.card.steps[this.props.index];
		newStep.title = e.target.value;
		this.props.changeStep(newStep, this.props.index);
	}
	
	addText = () => {
		var newCard = this.props.card;
		newCard.steps[this.props.index].blocks.push({type: 'text', content: ''});
		this.props.changeCard(newCard);
	}
	
	addImage = () => {
		var newCard = this.props.card;
		newCard.steps[this.props.index].blocks.push({type: 'image', content: `/public/${newCard.id}/${newCard.images}.jpg`});
		newCard.images++;
		this.props.changeCard(newCard);
	}
	
	changeTextBlock = (e, index) => {
		var newStep = this.props.card.steps[this.props.index];
		newStep.blocks[index].content = e.target.value;
		this.props.changeStep(newStep, this.props.index);
	}
	
	showDelete = () => {
		this.setState({ showDelete: 1 })
	}
	
	hideDelete = () => {
		this.setState({ showDelete: this.props.elevation })
	}
	
	moveStepUp = () => {
		this.props.moveStepUp(this.props.index);
	}
	
	moveStepDown = () => {
		this.props.moveStepDown(this.props.index);
	}
	
	deleteStep = () => {
		this.props.deleteStep(this.props.index);
	}
	
	deleteBlock = (index) =>{
		var newStep = this.props.card.steps[this.props.index];
		newStep.blocks.splice(index, 1);
		this.props.changeStep(newStep, this.props.index);
	}
	
	render() {
		var blocks = [];
		
		var step = this.props.card.steps[this.props.index];
		
		if (step !== undefined) {
			for (var i = 0; i < step.blocks.length; i++) {
				if (step.blocks[i].type === 'text') {
					blocks.push(
						<Grid item xs key={i}>
							<EditorTextBlock 
								index={i} 
								step={step}
								content={step.blocks[i].content} 
								changeText={this.changeTextBlock} 
								changeStep={this.props.changeStep}
								deleteBlock={this.deleteBlock}
							/>
						</Grid>
					);
				}
				else if(step.blocks[i].type === 'image') {
					blocks.push(
						<Grid item xs key={i}>
							<EditorImageBlock 
								index={i} 
								step={step}
								content={step.blocks[i].content}
								changeStep={this.props.changeStep}
								deleteBlock={this.deleteBlock}
							/>
						</Grid>
					);
				}
				
			}
		} 
		
		//If the step is currently being edited or hovered over show delete option
		var deleteStep;
		if (this.state.showDelete === 1) {
			deleteStep = <Tooltip title="Delete Step" placement="right">
							<IconButton className={this.props.classes.button} aria-label="Delete Step" onClick={this.deleteStep}>
								<ClearIcon />
							</IconButton>
						</Tooltip>;
		}
		
		//If the step is currently being edited or hovered over show option to move step
		var moveStepUp;
		if (this.state.showDelete === 1) {
			moveStepUp = <Tooltip title="Move Step Up" placement="left">
							<div><IconButton className={this.props.classes.button} disabled={this.props.index === 0} aria-label="Move Step Up" onClick={this.moveStepUp}>
								<UpArrowIcon />
							</IconButton></div>
						</Tooltip>;
		}
		var moveStepDown;
		if (this.state.showDelete === 1) {
			moveStepDown = <Tooltip title="Move Step Down" placement="left">
							<div><IconButton className={this.props.classes.button} disabled={this.props.index === this.props.card.steps.length-1} aria-label="Move Step Up" onClick={this.moveStepDown}>
								<DownArrowIcon />
							</IconButton></div>
						</Tooltip>;
		}
		
		//If the step is currenly being edited show menu to add text and image
		var editorStepActions;
		if (this.props.elevation === 1) {
			editorStepActions = <Grid item xs><EditorStepActions card={this.props.card} addText={this.addText} addImage={this.addImage} /></Grid>
		}
		
		return (
			<Paper align='left' className={this.props.classes.paper} elevation={this.props.elevation} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete} onClick={e => this.props.selectCard(this.props.index, e)}>
				<Grid container spacing={0}>

					<Grid className={this.props.classes.arrows} item xs={1}>
						<Grid direction="column" container spacing={8}>
							<Grid item xs>
								{moveStepUp}
							</Grid>
							<Grid item xs>
								{moveStepDown}
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs>
						<div>
							<Typography variant="title">
								Step {this.props.index+1}
							</Typography>
							<TextField
								required
								value={step.title}
								onChange={this.changeTitle}
								label="Step Title"
								margin="normal"
							/>
						</div>
					</Grid>
					<Grid item xs={1}>
						{deleteStep}
					</Grid>
				</Grid>
				
				<Divider />
				
					<Grid direction="column" container spacing={16}>
						{blocks}
						{editorStepActions}
					</Grid>
				
			</Paper>
		)
	}
}

EditorStep.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditorStep);