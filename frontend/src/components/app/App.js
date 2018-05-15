import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<Router>
				<nav>
					<div class="nav-wrapper">
						<a href="#" class="brand-logo">Logo</a>
						<ul id="nav-mobile" class="right hide-on-med-and-down">
							<li><a href="sass.html">Sass</a></li>
							<li><a href="badges.html">Components</a></li>
							<li><a href="collapsible.html">JavaScript</a></li>
						</ul>
					</div>
				</nav>

				<Route exact path="/" component={Home} />
      	<Route path="/about" component={About} />
      	<Route path="/topics" component={Topics} />
			</Router>
		);
	}
}

export default App;
