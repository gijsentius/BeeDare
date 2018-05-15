import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<Router>
				<nav>
					<div class="nav-wrapper amber darken-1">
						<Link to="/"><a href="#" class="brand-logo">Logo</a></Link>
						<ul id="nav-mobile" class="right hide-on-med-and-down">
							<li><Link to="/">Sass</Link></li>
							<li><Link to="/">Components</Link></li>
							<li><Link to="/">JavaScript</Link></li>
						</ul>
					</div>
				</nav>

				{/* <Route exact path="/" component={Home} />
      	<Route path="/about" component={About} />
      	<Route path="/topics" component={Topics} /> */}
			</Router>
		);
	}
}

export default App;
