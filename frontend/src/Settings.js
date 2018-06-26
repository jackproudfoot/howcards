import React, { Component } from 'react'

import { Route, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Divider from '@material-ui/core/Divider'

import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
	root: {
		margin: 10,
		marginTop: 70
	},
	paper: {
		margin: theme.spacing.unit,
		padding: theme.spacing.unit * 2
	},
	settingsOption: {
		margin: theme.spacing.unit
	},
	button: {
	    margin: theme.spacing.unit,
	}
});

class Settings extends Component {
	state = {moderatorsOnly: false, domainRestriction: false, domain: '', changeOwner: false, owner: '', saved: true}
	
	handleChange = name => event => {
		this.setState({ [name]: event.target.checked, saved: false });
	}
	
	changeDomain = (event) => {
		this.setState({ domain: event.target.value, saved: false  })
	}
	
	changeOwner = (event) => {
		this.setState({ owner: event.target.value, saved: false  })
	}
	
	save = () => {
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('settings', JSON.stringify(this.state));
		fetch('/api/moderate/changeSettings', {
  	  		method: "POST",
			body: data
  	  	})
		.then(res => this.setState({ saved: true }));
	}
	
	deleteBlanks = () => {
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		fetch('/api/moderate/deleteBlanks', {
  	  		method: "POST",
			body: data
  	  	});
	}
	
	componentDidMount() {
		fetch('/api/moderate/settings')
			.then(res => res.json())
			.then(res => this.setState( res ));
	}
	
	render() {
		//Redirect if not logged in or no privelages
		var redirect;
		if (this.props.user === undefined || (!this.props.user.owner)) {
			redirect = 
			<Route exact path="/moderate/settings/" render={() => (
				<Redirect to="/" />
			)} />;
		}
		
		var domainOption;
		if (this.state.domainRestriction) {
			domainOption = (
				<Grid item xs className={this.props.classes.settingsOption}>
					<Grid container direction="row" alignItems="center" justify="center" spacing={8}>
						<Grid item xs={1} />
						<Grid item xs={2}>Domain</Grid>
		
						<Grid item xs>
							<TextField
								fullWidth
								onChange={e => this.changeDomain(e)}
								value={this.state.domain}
							/>
						</Grid>
					</Grid>
				</Grid>
			)
		}
		
		var ownerOption;
		if (this.state.changeOwner) {
			ownerOption = (
				<Grid item xs className={this.props.classes.settingsOption}>
					<Grid container direction="row" alignItems="center" justify="center" spacing={8}>
						<Grid item xs={1} />
						<Grid item xs={2}>Owner</Grid>
		
						<Grid item xs>
							<TextField
								fullWidth
								onChange={e => this.changeOwner(e)}
								value={this.state.owner}
							/>
						</Grid>
					</Grid>
				</Grid>
			)
		}
		
		return (
			<div className={this.props.classes.root}>
				{redirect}
			
				<Grid container spacing={16} justify="center">
					<Grid item xs={this.props.width}>
						<Paper className={this.props.classes.paper}>
							<Grid container direction="column">
								
								<Grid item xs className={this.props.classes.settingsOption}>
									<div>
										<Typography variant="headline">Settings</Typography>
									</div>
								</Grid>
								
								<Grid item xs className={this.props.classes.settingsOption}>
									<Grid container direction="row" alignItems="center" justify="center" spacing={8}>
										<Grid item xs>Only Moderators May Create Cards</Grid>
										
										<Grid item xs={2}>
											<Switch
												checked={this.state.moderatorsOnly}
												onChange={this.handleChange('moderatorsOnly')}
												value="Moderators Only"
											/>
										</Grid>
									</Grid>
								</Grid>
			
								<Grid item xs className={this.props.classes.settingsOption}>
									<Grid container direction="row" alignItems="center" justify="center" spacing={8}>
										<Grid item xs>Domain Restriction</Grid>
										
										<Grid item xs={2}>
											<Switch
												checked={this.state.domainRestriction}
												onChange={this.handleChange('domainRestriction')}
												value="Domain Restriction"
											/>
										</Grid>
									</Grid>
								</Grid>
												
								{domainOption}
								
								<Divider />
									
								<Grid item xs className={this.props.classes.settingsOption}>
									<Grid container direction="row" alignItems="center" justify="center" spacing={8}>
										<Grid item xs>Change Owner</Grid>
						
										<Grid item xs={2}>
											<Switch
												checked={this.state.changeOwner}
												onChange={this.handleChange('changeOwner')}
												value="Change Owner"
											/>
										</Grid>
									</Grid>
								</Grid>
												
								{ownerOption}
								
								<Divider />
								
								<Grid item xs className={this.props.classes.settingsOption}>
									<Grid container direction="row" alignItems="center" align="center" spacing={8}>
										<Grid item xs>
											<Button variant="outlined" color="primary" onClick={this.save} className={this.props.classes.button} disabled={this.state.saved}>
        										Save Settings
     						   				</Button>
										</Grid>
								
										<Grid item xs>
											<Button variant="outlined" color="secondary" onClick={this.deleteBlanks} className={this.props.classes.button}>
        										Delete Blanks
     						   				</Button>
										</Grid>
									</Grid>
								</Grid>
						
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</div>
		)
	}
}


Settings.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);