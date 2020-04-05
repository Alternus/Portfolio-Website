
export class Navbar extends React.Component {
	render() {
		return(
			<div className="navBar">
				<div className="navBar-Objects-Wrapper">
					<NavbarObject name="Projects" active="active" />
					<NavbarObject name="Skills" active="" />
					<NavbarObject name="Education & Awards" active="" />
					<NavbarObject name="Contact" active="" />
				</div>
			</div>
		);
	}
}


class NavbarObject extends React.Component {
	render () {
		return (
			<div className="navBar-Object-Wrapper">
				<input type="button" className="navBar-Input" id={"navBar-"+this.props.name} name="navBar" />
				<label htmlFor={"navBar-"+this.props.name} className={"navBar-Object "+this.props.active}>
					<a>{this.props.name}</a>
				</label>
			</div>
		);
	}
}
