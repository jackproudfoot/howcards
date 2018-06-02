import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Board from './Board';
import Viewer from './Viewer';
import Editor from './Editor';
import NotFound from './NotFound';

const user = {
	id: 1,
	name: "Jack"
}

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' render={(props) => <Board {...props} user={user} />} />
			<Route path='/card/:id' render={(props) => <Viewer {...props} user={user} />} />
			<Route path='/edit/:id' render={(props) => <Editor {...props} user={user} />} />
			<Route component={NotFound} />
		</Switch>
	</main>
)
export default Main;