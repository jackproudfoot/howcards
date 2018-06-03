import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import MediaQuery from 'react-responsive'

import Home from './Home';
import User from './User'
import Deck from './Deck'
import Viewer from './Viewer';
import Editor from './Editor';
import NewCard from './NewCard';
import NotFound from './NotFound';

class Main extends Component {
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' render={(props) => <Home {...props} user={this.props.user}/>} />
					<Route exact path='/cards' render={(props) => <Home {...props} user={this.props.user}/>} />
					<Route path='/new/card' render={(props) => <NewCard {...props} user={this.props.user} />} />
					<Route path='/card/:id' render={(props) => (
						<div>
							<MediaQuery minDeviceWidth={1224}>
								<Viewer {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<Viewer {...props} user={this.props.user} width={12}/>
							</MediaQuery>
						</div>
						
						
					)}/>
					<Route path='/deck/:id' render={(props) => (
						<div>
							<MediaQuery minDeviceWidth={1224}>
								<Deck {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<Deck {...props} user={this.props.user} width={12}/>
							</MediaQuery>
						</div>
						
						
					)}/>
					<Route path='/edit/:id' render={(props) => (
						<div>
							<MediaQuery minDeviceWidth={1224}>
								<Editor {...props} user={this.props.user} width={7}/>
							</MediaQuery>
							<MediaQuery maxDeviceWidth={1224}>
								<Editor {...props} user={this.props.user} width={12}/>
							</MediaQuery>
						</div>
						
						
					)}/>
					<Route path='/user/:id' render={(props) => <User {...props} user={this.props.user}/>} />
					<Route component={NotFound} />
				</Switch>
			</main>
		)
	}
}
export default Main;