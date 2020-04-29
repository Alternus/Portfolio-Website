import { Home } from './pages/home.js';
import { Admin } from './pages/admin.js';
import { BrowserRouter ,Switch, Route } from 'react-router-dom';

class WebPage extends React.Component {
	render () {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route exact path='/admin' component={Admin}></Route>
				</Switch>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(
	<WebPage/>,
	document.getElementById('main')
);
