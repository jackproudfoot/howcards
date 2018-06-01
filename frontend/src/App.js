import React, { Component } from 'react';

import HeaderBar from './HeaderBar'
import Main from './Main'


class App extends Component {
	
	render() {
		 return (
			 	<div className="App">
			 			<HeaderBar />
						<Main />
				 </div>
		 );
	 }
 }

export default App;
