import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import MediaQuery from 'react-responsive'

import HeaderBar from './HeaderBar'
import Home from './Home';
import User from './User'
import DeckViewer from './DeckViewer'
import DeckEditor from './DeckEditor'
import Decks from './Decks'
import Viewer from './Viewer';
import Editor from './Editor';
import NewCard from './NewCard';
import NewDeck from './NewDeck';
import CardApproval from './CardApproval'
import ManageModerators from './ManageModerators'
import Settings from './Settings'
import NotFound from './NotFound';

class Main extends Component {
	render() {
		
		return (
			<main>
				<Switch>
					<Route exact path='/' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={true} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<Home {...props} user={this.props.user}/>
						</div> 
					)}/>
					<Route exact path='/cards' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={true} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<Home {...props} user={this.props.user}/>
						</div> 
					)}/>
					<Route exact path='/decks' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={true} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<Decks {...props} user={this.props.user}/>
						</div>
					)} />
					<Route path='/new/card' render={(props) => (
						<div>
			 				<NewCard {...props} user={this.props.user} settings={this.props.settings} />
						</div>
					)} />

					<Route path='/new/deck' render={(props) => (
						<div>
			 				<NewDeck {...props} user={this.props.user} settings={this.props.settings} />
						</div>
					)} />
					<Route path='/card/:id' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={false} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<MediaQuery minDeviceWidth={1224}>
								<Viewer {...props} user={this.props.user} settings={this.props.settings} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<Viewer {...props} user={this.props.user} settings={this.props.settings} width={12}/>
							</MediaQuery>
						</div>
						
						
					)}/>
					<Route path='/deck/:id' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={false} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<MediaQuery minDeviceWidth={1224}>
								<DeckViewer {...props} user={this.props.user} settings={this.props.settings} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<DeckViewer {...props} user={this.props.user} settings={this.props.settings} width={12}/>
							</MediaQuery>
						</div>
						
						
					)}/>
					<Route path='/edit/d/:id' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={false} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<MediaQuery minDeviceWidth={1224}>
								<DeckEditor {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<DeckEditor {...props} user={this.props.user} width={12}/>
							</MediaQuery>
						</div>
						
						
					)}/>
					<Route path='/edit/c/:id' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={false} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<MediaQuery minDeviceWidth={1224}>
								<Editor {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<Editor {...props} user={this.props.user} width={12}/>
							</MediaQuery>
						</div>
						
						
					)}/>
					<Route path='/user/:id' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={true} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<User {...props} user={this.props.user}/>
						</div>
					)} />
					<Route path='/moderate/review' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={true} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<MediaQuery minDeviceWidth={1224}>
								<CardApproval {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<CardApproval {...props} user={this.props.user} width={12}/>
							</MediaQuery>
							
						</div>
					)} />
					<Route path='/moderate/users' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={true} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<MediaQuery minDeviceWidth={1224}>
								<ManageModerators {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<ManageModerators {...props} user={this.props.user} width={12}/>
							</MediaQuery>
							
						</div>
					)} />
					<Route path='/moderate/settings' render={(props) => (
						<div>
			 				<HeaderBar user={this.props.user} settings={this.props.settings} handleLoginSuccess={this.props.handleLoginSuccess} handleLoginFailure={this.props.handleLoginFailure} home={true} handleLogoutSuccess={this.props.handleLogoutSuccess} handleLogoutFailure={this.props.handleLogoutFailure}/>
							<MediaQuery minDeviceWidth={1224}>
								<Settings {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<Settings {...props} user={this.props.user} width={12}/>
							</MediaQuery>
							
						</div>
					)} />
					<Route component={NotFound} />
				</Switch>
			</main>
		)
	}
}
export default Main;