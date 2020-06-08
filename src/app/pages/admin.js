import { ToggleSwitch } from '../ui-elements/toggle-switch.js';

export class Admin extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			username: '',
			password: '',
			loginError: '',
			oldPassword: '',
			newPassword1: '',
			newPassword2: '',
			messageID: 0,
			showDelete: false,
			adminPageData: [],
		}
		this.callAPI = this.callAPI.bind(this);
		this.deleteMessage = this.deleteMessage.bind(this);
		this.toggleDelete = this.toggleDelete.bind(this);
		this.updateAdminPageData = this.updateAdminPageData.bind(this);
	}

	updateAdminPageData(data) {
		this.setState({adminPageData: data});

		document.getElementById("loginForm-Username").value = "";
		document.getElementById("loginForm-Password").value = "";

		document.getElementById("login-Form").style["transform"] = "translateY(-100vh)";
		document.getElementById("admin-dashboard").style["transform"] = "translateY(0vh)";
	}

	callAPI(methodType) {
		const axios = require('axios');

		event.preventDefault();

		var formData = new FormData();

		switch (methodType){
			case 'login':
				formData.append('type', 'login');
				formData.append('username', this.state.username);
				formData.append('password', this.state.password);
				break;
			case 'delete':
				formData.append('type', 'delete');
				formData.append('id', this.state.messageID);
				break;
			case 'update':
				if (this.state.newPassword1 == this.state.newPassword2) {
					formData.append('type', 'update');
					formData.append('newPassword', this.state.newPassword1);
					formData.append('oldPassword', this.state.oldPassword);
					document.getElementById('updateForm-New').value = "";
					document.getElementById('updateForm-ConfirmNew').value = "";
					document.getElementById('loginForm-OldPassword').value = "";
				}
				break;
		}
		for (var pair of formData.entries()) {
			console.log(pair[0]+ ', ' + pair[1]);
		}
		axios({
				method: 'post',
				url: '/api/admin.php',
				data: formData,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			if (Array.isArray(response["data"])) {
				console.log(response["data"]);
				this.updateAdminPageData(response["data"]);
			} else {
				switch(response["data"]) {
					case "Login Error [0]":
						console.log(response["data"]);
						this.setState({loginError: "Username field is incomplete"});
						break;
					case "Login Error [1]":
						console.log(response["data"]);
						this.setState({loginError: "Password field is incomplete"});
						break;
					case "Login Error [2]":
						console.log(response["data"]);
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

	deleteMessage(id) {
		this.setState({messageID: id}, () => {
			this.callAPI('delete');
		});
	}

	toggleDelete(variable) {
		if (variable) {
			this.setState({showDelete: false});
		}
		else {
			console.log("WHY");
			this.setState({showDelete: true});
		}
	}

	render () {
		return (
			<div className="admin-PageWrapper">
				<form className="login-Form" id="login-Form">
					<p className="login-ErrorText">{this.state.loginError}</p>
					<input type="text" className="login-Input-Field" id="loginForm-Username" placeholder="Username" onChange={e => this.setState({ username: e.target.value })} />
					<input type="password" className="login-Input-Field" id="loginForm-Password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
					<input type="submit" className="login-Submit-Button" value="Login" onClick={e => this.callAPI('login',e)} />
				</form>
				<div id="admin-dashboard">
					{(this.state.adminPageData).map((data, index) => (
						<MessageCard data={data} deleteMessage={this.deleteMessage} showDelete={this.state.showDelete} key={data['id']}/>
					))}
					<div className="admin-RightDash">
						<input type="password" className="updateLogin-Input-Field" id="updateForm-New" placeholder="new password" onChange={e => this.setState({ newPassword1: e.target.value })} />
						<input type="password" className="updateLogin-Input-Field" id="updateForm-ConfirmNew" placeholder="Confirm new password" onChange={e => this.setState({ newPassword2: e.target.value })} />
						<input type="password" className="updateLogin-Input-Field" id="loginForm-OldPassword" placeholder="Old Password" onChange={e => this.setState({ oldPassword: e.target.value })} />
						<input type="submit" className="updateLogin-Submit-Button" value="Update Password" onClick={e => this.callAPI('update',e)} />
						<div className="admin-toggleDelete-Wrapper">
							<h3>Delete Button Visability</h3>
							<ToggleSwitch callBack={this.toggleDelete} variable={this.state.showDelete}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount(){
		document.title = "Admin Portal";

		// Run an auto check to determine if already logged in
		const axios = require('axios');
		var formData = new FormData();
		axios({
				method: 'post',
				url: '/api/admin.php',
				data: formData,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			if (Array.isArray(response["data"]) && this.state.adminPageData.length == 0) {
				this.updateAdminPageData(response["data"]);
			}
		}.bind(this))
		.catch(function (response) {
				console.log(response)
		});
	}
}

class MessageCard extends React.Component {
	render () {
		var time = new Date(this.props.data["timestamp"]);
		time.setHours(time.getHours() - 2);
		var showDelete = [];
		var displayValue = 'none';
		if (this.props.showDelete) {
			var displayValue = 'block';
		}
		for (var i = 0; i < document.getElementsByClassName('admin-Delete-Button').length; i++) {
			document.getElementsByClassName('admin-Delete-Button')[i].style.display = displayValue
		}
		return (
			<div className="admin-MessageCard">
				<img src="../../assets/icons/close.png" className="admin-Delete-Button" id="admin-Delete-Button" onClick={e => this.props.deleteMessage(this.props.data['id'],e)} />
				<p>Name: {this.props.data["name"]} | Email: {this.props.data["email"]} | {time.toLocaleString()}</p>
				<p>{this.props.data["message"]} </p>
			</div>
		);
	}
}
