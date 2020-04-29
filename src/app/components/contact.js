export class ContactCard extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			name: '',
			email: '',
			message: '',
			contactError: '',
		}
		this.submitForm = this.submitForm.bind(this);
	}
	submitForm() {
		const axios = require('axios');
		event.preventDefault();
		let formData = new FormData();
		formData.append('name', this.state.name)
		formData.append('email', this.state.email)
		formData.append('message', this.state.message)

		axios({
				method: 'post',
				url: '/api/messages.php',
				data: formData,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			switch(response["data"]) {
				case "Contact Error [0]":
					this.setState({contactError: "Name field is incomplete"});
					break;
				case "Contact Error [1]":
					this.setState({contactError: "Email field is incomplete"});
					break;
				case "Contact Error [2]":
					this.setState({contactError: "Message field is incomplete"});
					break;
				case "Contact Success":
					document.getElementById("contactForm-Name").value = "";
					document.getElementById("contactForm-Email").value = "";
					document.getElementById("contactForm-Message").value = "";
					this.setState({contactError: ""});
					break;
				default:
				console.log("PHP SERVER ERROR - 2");
					console.log(response);
					this.setState({loginError: "Something went seriously wrong..."});
			}
		}.bind(this))
		.catch(function (response) {
				console.log("PHP SERVER ERROR");
				console.log(response)
		});
	}

	render() {
		return(
			<div className="contactCard" id={this.props.id}>
				<h1 className="contact-Header" >Contact</h1>
				<h4 className="contact-Text" > Have a inquiry or want to work together? </h4>
				<h4 className="contact-Error">{this.state.contactError}</h4>
				<form>
					<input type="text" className="contact-Input-Field" id="contactForm-Name" placeholder="Name" onChange={e => this.setState({ name: e.target.value })}/>
					<input type="text" className="contact-Input-Field" id="contactForm-Email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })}/>
					<textarea type="text" className="contact-Message-Input-Field" id="contactForm-Message" placeholder="Message" onChange={e => this.setState({ message: e.target.value })}/>
					<input type="submit" className="contact-Submit-Button" onClick={e => this.submitForm(e)} />
				</form>
			</div>
		);
	}
}
