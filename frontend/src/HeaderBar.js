import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { GoogleLogin, GoogleLogout } from 'react-google-login'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Divider from '@material-ui/core/Divider'

import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCardIcon from '@material-ui/icons/Add';
import AddDeckIcon from '@material-ui/icons/AddToPhotos';
import CardsIcon from '@material-ui/icons/WebAsset';
import PersonIcon from '@material-ui/icons/Person';
import ReviewIcon from '@material-ui/icons/RateReview';
import SupervisorIcon from '@material-ui/icons/SupervisorAccount';
import DecksIcon from '@material-ui/icons/FilterNone';
import SettingsIcon from '@material-ui/icons/Settings';

//import SearchBar from './SearchBar';

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	flex: {
		position: 'relative',
		left: 10,
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	drawer: {
		width: 200
	},
	primaryListButton: {
		color: theme.palette.secondary.main
	},
	secondaryListButton: {
		color: theme.palette.primary.light
	},
	link: {
		color: "white", 
		textDecoration: 'none'
	}
});

class HeaderBar extends Component {
	state = {
		anchorEl: null,
		drawer: false
	}
	
	toggleDrawer = (open) => {
		this.setState({drawer: !this.state.drawer})
	}
	
	handleLogoutMenuOpen = (event) => {
		this.setState({ anchorEl : event.currentTarget });
	}
	
	handleLogoutMenuClose = () => {
		this.setState({ anchorEl : null });
	}
	
	responseGoogle = (response) => {
		console.log(response)
	}
	
	render() {
		//Logic for handling login/logout buttons
		var headerButton = <GoogleLogin
								clientId="984851854765-cdu7ujm6nm2ttq6jvd11lrbfc0bcan64.apps.googleusercontent.com"
								onSuccess={this.props.handleLoginSuccess}
								onFailure={this.props.handleLoginFailure}
								render={(signIn) => {
									return <Button color="inherit" onClick={signIn.onClick}>Login</Button>;
								}}
							/>;
		
		
		if (this.props.user !== undefined) headerButton = <div>
			<IconButton 
				aria-label="More" 
				aria-owns={this.state.anchorEl ? 'logoutMenu' : null} 
				aria-haspopup="true"
			 	color="inherit"
				onClick={this.handleLogoutMenuOpen}
			>
				<MoreVertIcon/>
			</IconButton>
		
			<Menu
				id="logoutMenu"
				anchorEl={this.state.anchorEl}
				open={Boolean(this.state.anchorEl)}
				onClose={this.handleLogoutMenuClose}
			>
				
				<MenuItem><GoogleLogout
					buttonText="Logout"
					onLogoutSuccess={this.props.handleLogoutSuccess}
					onLogoutFailure={this.props.handleLogoutFailure}
					render={(signOut) => {
						return <div onClick={signOut.onClick}>Logout</div>
					}}
				/></MenuItem>
			</Menu>
			</div>;
	
		//If user is moderator show extra drawer options
		var moderatorOptions;
		if (this.props.user !== undefined && this.props.user.moderator) moderatorOptions = (
			<div>
			<Divider />
			<ListSubheader>Moderate</ListSubheader>
			
			<Link className={this.props.classes.link} to="/moderate/review">
			<ListItem button>
				<ListItemIcon>
					<ReviewIcon />
				</ListItemIcon>
					
				<ListItemText primary={<Typography variant="subheading" color='textSecondary'>Review Cards</Typography>}/>
			</ListItem>
			
			</Link>
			</div>
		);
		
		//If user is admin show extra drawer options
		var adminOptions;
		if (this.props.user !== undefined && this.props.user.admin) adminOptions = (
			<Link className={this.props.classes.link} to='/moderate/users'>
			<ListItem button>
				<ListItemIcon>
					<SupervisorIcon />
				</ListItemIcon>
					
				<ListItemText primary={<Typography variant="subheading" color='textSecondary'>Manage Moderators</Typography>}/>
			</ListItem>
			</Link>
		);
	
		//If user is owner show settings option on drawer
		var ownerOptions;
		if (this.props.user !== undefined && this.props.user.owner) ownerOptions = (
			<Link className={this.props.classes.link} to='/moderate/settings'>
			<ListItem button>
				<ListItemIcon>
					<SettingsIcon />
				</ListItemIcon>
					
				<ListItemText primary={<Typography variant="subheading" color='textSecondary'>Settings</Typography>}/>
			</ListItem>
			</Link>
		);
	
		//If user is logged in show their cards
		var userOptions;
		if (this.props.user !== undefined) {
			userOptions = 
				<Link to={'/user/' + this.props.user._id} className={this.props.classes.link}>
					<ListItem button>
			
						<ListItemIcon>
							<PersonIcon className={this.props.classes.secondaryListButton}/>
						</ListItemIcon>
						<ListItemText primary={<Typography variant="subheading" color='textSecondary'>Your Cards</Typography>}/>
						
					</ListItem>
				</Link>
			
		}
		
		//If the user is logged in allow them to create cards
		var newOptions = (
						<div>
							<ListSubheader>Create</ListSubheader>
					
							<Link to='/new/card' className={this.props.classes.link}>
							<ListItem button>
			
								<ListItemIcon>
									<AddCardIcon className={this.props.classes.primaryListButton}/>
								</ListItemIcon>
								<ListItemText primary={<Typography variant="subheading" color='textSecondary'>New Card</Typography>}/>
						
							</ListItem>
							</Link>
			
							<Link to='/new/deck' className={this.props.classes.link}>
							<ListItem button>
			
								<ListItemIcon>
									<AddDeckIcon className={this.props.classes.primaryListButton}/>
								</ListItemIcon>
								<ListItemText primary={<Typography variant="subheading" color='textSecondary'>New Deck</Typography>}/>
						
							</ListItem>
							</Link>
			
							<Divider />
						</div>
					);
		var showNewOptions = false;
		
		if (this.props.user !== undefined) {
			if (this.props.settings.moderatorsOnly) {
				if (this.props.user.moderator || this.props.user.admin || this.props.user.owner) {
					showNewOptions = true;
				}
			}
			else if (this.props.settings.domainRestriction) {
				var userdomain = this.props.user.email.slice(this.props.user.email.indexOf('@')+1);
				if (userdomain === this.props.settings.domain || this.props.user.moderator || this.props.user.admin || this.props.user.owner) {
					showNewOptions = true;
				}
			}
			else {
				showNewOptions = true;
			}
		}
	
		//Drawer UI
		var drawer = (
			<div className={this.props.classes.drawer}>
				<List>
					{showNewOptions ? newOptions : null}
					
					<ListSubheader>Discover</ListSubheader>
					
					<Link to="/" className={this.props.classes.link}>
					<ListItem button>
			
						<ListItemIcon>
							<CardsIcon className={this.props.classes.secondaryListButton}/>
						</ListItemIcon>
						<ListItemText primary={<Typography variant="subheading" color='textSecondary'>Cards</Typography>}/>
						
					</ListItem>
					</Link>
			
					<Link to="/decks" className={this.props.classes.link}>
					<ListItem button>
			
						<ListItemIcon>
							<DecksIcon className={this.props.classes.secondaryListButton}/>
						</ListItemIcon>
						<ListItemText primary={<Typography variant="subheading" color='textSecondary'>Decks</Typography>}/>
						
					</ListItem>
					</Link>
					
					{userOptions}
			
					{moderatorOptions}
					{adminOptions}
					{ownerOptions}
				</List>
			</div>
		);
	
		return (
			<div className={this.props.classes.root}>
				<AppBar>
					<Toolbar>
						<IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
							<MenuIcon/>
						</IconButton>
						<Typography align='left' variant="title" color="inherit" className={this.props.classes.flex}>
							<Link className={this.props.classes.link} to='/'>Howcards</Link>
						</Typography>
					
					
						{/*<SearchBar />*/}
					
						{headerButton}
					
					</Toolbar>
				</AppBar>
				
				<Drawer open={this.state.drawer} onClose={this.toggleDrawer}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer}
						onKeyDown={this.toggleDrawer}
					>
						{drawer}
					</div>
				</Drawer>
			</div>
		)
	}
	
}

HeaderBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(HeaderBar));