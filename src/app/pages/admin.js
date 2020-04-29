export class Admin extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			username: '',
			password: '',
			loginError: '',
			adminPageData: [],
		}
		this.submitForm = this.submitForm.bind(this);
		this.updateAdminPageData = this.updateAdminPageData.bind(this);
	}

	updateAdminPageData(data) {
		this.setState({adminPageData: data});

		document.getElementById("loginForm-Username").value = "";
		document.getElementById("loginForm-Password").value = "";

		document.getElementById("login-Form").style["transform"] = "translateY(-100vh)";
		document.getElementById("admin-dashboard").style["transform"] = "translateY(0vh)";
	}

	submitForm() {
		const axios = require('axios');

		event.preventDefault();

		let formData = new FormData();
		formData.append('username', this.state.username);
		formData.append('password', this.state.password);

		axios({
				method: 'post',
				url: '/api/admin.php',
				data: formData,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			if (Array.isArray(response["data"])) {
				this.updateAdminPageData(response["data"]);
			} else {
				switch(response["data"]) {
					case "Login Error [0]":
						this.setState({loginError: "Username field is incomplete"});
						break;
					case "Login Error [1]":
						this.setState({loginError: "Password field is incomplete"});
						break;
					case "Login Error [2]":
						this.setState({loginError: "Username or Password is incorrect"});
						break;
					default:
						console.log(response["data"]);
						this.setState({loginError: "Something went seriously wrong..."});
				}
			}
		}.bind(this))
		.catch(function (response) {
				console.log(response)
		});
	}

	render () {
		return (
			<div className="admin-PageWrapper">
				<form className="login-Form" id="login-Form">
					<p className="login-ErrorText">{this.state.loginError}</p>
					<input type="text" className="login-Input-Field" id="loginForm-Username" placeholder="Username" onChange={e => this.setState({ username: e.target.value })} />
					<input type="password" className="login-Input-Field" id="loginForm-Password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
					<input type="submit" className="login-Submit-Button" value="Login" onClick={e => this.submitForm(e)} />
				</form>
				<div id="admin-dashboard">
					{(this.state.adminPageData).map((data, index) => (
						<MessageCard data={data} />
					))}
				</div>
			</div>
		);
	}
	componentDidMount(){
		document.title = "Admin Portal";
	}
}

class MessageCard extends React.Component {
	render () {
		var time = new Date(this.props.data["timestamp"]);
		time.setHours(time.getHours() - 2);
		return (
			<div className="admin-MessageCard">
				<p>Name: {this.props.data["name"]} | Email: {this.props.data["email"]} | {time.toLocaleString()}</p>
				<p>{this.props.data["message"]} </p>
			</div>
		);
	}
}
