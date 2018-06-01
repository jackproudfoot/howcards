import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Board from './Board';
import CardViewer from './CardViewer';
import Editor from './Editor';
import NotFound from './NotFound';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Board} />
			<Route path='/card/:id' component={CardViewer} />
			<Route path='/edit/:id' component={Editor} />
			<Route component={NotFound} />
		</Switch>
	</main>
)
export default Main;