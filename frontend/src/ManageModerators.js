import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import TextField from '@material-ui/core/TextField'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import AddIcon from '@material-ui/icons/Add'


import Name from './ManageModeratorsName'

const styles = theme => ({
	root: {
		margin: 10,
		marginTop: 80
	},
	admin: {	
		margin: theme.spacing.unit,
		marginBottom: theme.spacing.unit * 2,
    	padding: theme.spacing.unit * 2
	},
	paper: {	
		margin: theme.spacing.unit,
		padding: theme.spacing.unit * 2
	},
	title: {
		marginBottom: theme.spacing.unit * 4
	}
});

class ManageModerators extends Component {
	state = { users: [], newAdmin: '', newModerator: '' };
	
	componentDidMount() {
  	  	fetch('/moderate/users')
        .then(res => res.json())
        .then(users => this.setState({ users: users }));
	}
	
	changeAdmin = (e) => {
		this.setState({ newAdmin: e.target.value })
	}
	
	changeModerator = (e) => {
		this.setState({ newModerator: e.target.value })
	}
	
	addAdmin = () => {
		var newUser = {
			moderator: true,
			admin: true,
			owner: false,
			email: this.state.newAdmin
		};
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('user', JSON.stringify(newUser));
		fetch('/moderate/user/permissions', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json())
		.then(res => {
			if (res._id !== undefined) {
				var newUsers = this.state.users;
				newUsers.push(res);
				
				this.setState({users: newUsers, newAdmin: ''})
			}
			else {
				this.setState({newAdmin: ''});
			}
		});
		
		
	}
	
	addModerator = () => {
		var newUser = {
			moderator: true,
			admin: false,
			owner: false,
			email: this.state.newModerator
		};
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('user', JSON.stringify(newUser));
		fetch('/moderate/user/permissions', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json())
		.then(res => {
			if (res._id !== undefined) {
				var newUsers = this.state.users;
				newUsers.push(res);
				
				this.setState({users: newUsers, newModerator: ''})
			}
			else {
				this.setState({newModerator: ''});
			}
		});
	}
	
	deleteModerator = (key) => {
		var newUser = this.state.users[key];
		newUser.moderator = false;
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('user', JSON.stringify(newUser));
		fetch('/moderate/user', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json());
		
		var newUsers = this.state.users;
		newUsers[key] = newUser;
		this.setState({users: newUsers})
	}
	
	deleteAdmin = (key) => {
		var newUser = this.state.users[key];
		newUser.admin = false;
		
		const data = new FormData();
		data.append('token', JSON.parse(sessionStorage.getItem('user')).tokenId);
		data.append('user', JSON.stringify(newUser));
		fetch('/moderate/user', {
  	  		method: "POST",
			body: data
  	  	})
        .then(res => res.json());
		
		var newUsers = this.state.users;
		newUsers[key] = newUser;
		this.setState({users: newUsers})
	}
	
	render() {
		//Redirect if not logged in or no privelages
		var redirect;
		if (this.props.user === undefined || (!this.props.user.admin && !this.props.user.owner)) {
			redirect = 
			<Route exact path="/moderate/users/" render={() => (
				<Redirect to="/" />
			)} />;
		}
		
		var moderators = [];
		var admins = []
		//Owner option to manage admins
		var manageAdmins;
		if (this.props.user !== undefined && this.props.user.owner) {
			for (var i = 0; i < this.state.users.length; i++) {
				
				if (this.state.users[i].admin && !this.state.users[i].owner) {
					admins.push(<Grid item xs key={i}><Name email={this.state.users[i].email} index={i} delete={this.deleteAdmin} /></Grid>)
				}
				else if (this.state.users[i].moderator && !this.state.users[i].owner) {
					moderators.push(<Grid item xs key={i}><Name email={this.state.users[i].email} index={i} delete={this.deleteModerator} /></Grid>)
				}
			}
			
			manageAdmins = (
			<div>
				<Paper elevation={0} className={this.props.classes.admin}>
					<Typography variant="headline" className={this.props.classes.title}>
						Manage Admins
					</Typography>
				
					<Grid container spacing={16} direction="column">
						{admins}
						
						<Grid item xs>
							<Grid container spacing={8}>
								<Grid item xs>
									<TextField 
										fullWidth
										label="New Admin"
										value={this.state.newAdmin}
										onChange={(e) => this.changeAdmin(e)}
									/>
								</Grid>
								<Grid item xs={1}>
									<Tooltip title="Add Admin" placement="right">
										<IconButton className={this.props.classes.button} aria-label="Add Admin" onClick={this.addAdmin}>
											<AddIcon />
										</IconButton>
									</Tooltip>
								</Grid>
						
							</Grid>
							
						</Grid>
					</Grid>
						
				</Paper>
				
				<Divider />
			</div>
			)
		}
		else {
			for (var j = 0; j < this.state.users.length; j++) {
				if (this.state.users[j].moderator && !this.state.users[j].admin) {
					moderators.push(<Grid item xs key={j}><Name email={this.state.users[j].email} index={j} delete={this.deleteModerator} /></Grid>)
				}
			}
		}
		
		
		return (
			<div className={this.props.classes.root}>
				{redirect}
				
				<Grid justify="center" container spacing={16}>
					<Grid item xs={this.props.width}>
						<Paper className={this.props.classes.paper}>
							
							{manageAdmins}
		
				
							<Paper elevation={0} className={this.props.classes.paper}>
								<Typography variant="headline" className={this.props.classes.title}>
									Manage Moderators
								</Typography>
				
								<Grid container spacing={16} direction="column">
									{moderators}
									
									<Grid item xs>
										<Grid container spacing={8}>
											<Grid item xs>
												<TextField 
													fullWidth
													label="New Moderator"
													value={this.state.newModerator}
													onChange={(e) => this.changeModerator(e)}
												/>
											</Grid>
											<Grid item xs={1}>
												<Tooltip title="Add Moderator" placement="right">
													<IconButton className={this.props.classes.button} aria-label="Add Moderator" onClick={this.addModerator}>
														<AddIcon />
													</IconButton>
												</Tooltip>
											</Grid>
					
										</Grid>
						
									</Grid>
								</Grid>
							</Paper>
							
						</Paper>
					</Grid>
				</Grid>
				
			</div>
		)
	}
}

ManageModerators.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ManageModerators);