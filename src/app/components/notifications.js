export class NotificationBox extends React.Component {
	closeNotification() {
		document.getElementById("notification-Box").style["transform"] = "translateX(500px)";
	}
	render() {
		return(
			<div className="notification-Box" id="notification-Box">
				<NotificationCard closeNotification={this.closeNotification} header={this.props.header} message={this.props.message}/>
			</div>
		);
	}
	componentDidMount() {
		setTimeout(
		function() {
			document.getElementById("notification-Box").style["transform"] = "translateX(0)";
		}, 1);
		setTimeout(
			function() {
				document.getElementById("notification-Box").style["transform"] = "translateX(500px)";
			}, this.props.timeout * 1000);
	}
}

class NotificationCard extends React.Component {
	render() {
		return(
			<div className="notification-Card">
				<img src="../../assets/icons/close.png" className="notification-Close-Button" onClick={e => this.props.closeNotification(e)} />
				<h4 className="notification-Header">{this.props.header}</h4>
				<p className="notification-Message">{this.props.message}</p>
			</div>
		);
	}
}
