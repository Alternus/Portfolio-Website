
export class Navbar extends React.Component {
	constructor (props){
		super(props);
		this.state = { selectedElement: "projects" };
		this.scrollTo = this.scrollTo.bind(this);
	}
	scrollTo(element) {
		if (element == "Education & Awards") {
			element = "education-awards";
		}
		element = element.toLowerCase();
		this.setState({ selectedElement: element});
		var pagePart = document.getElementById(element);
		pagePart.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "nearest"
		});
	}
	render() {
		return(
			<div className="navBar">
				<div className="navBar-Objects-Wrapper">
					<NavbarObject name="Projects" scrollTo={this.scrollTo} selectedElement={this.state.selectedElement} />
					<NavbarObject name="Skills" scrollTo={this.scrollTo} selectedElement={this.state.selectedElement} />
					<NavbarObject name="Education & Awards" scrollTo={this.scrollTo} selectedElement={this.state.selectedElement} />
					<NavbarObject name="Contact" scrollTo={this.scrollTo} selectedElement={this.state.selectedElement} />
				</div>
			</div>
		);
	}
	componentDidMount() {
		var options = {
      root: document.querySelector('#page-Wrapper'),
      rootMargin: '0px',
      threshold: 0.99
    }
		var skillsCallback = ((entries,o) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.setState({selectedElement: entry.target.id});
				}
			});
		})
		var observer = new IntersectionObserver(skillsCallback, options);
		function observe() {
			observer.observe( document.querySelector('#projects'));
			observer.observe( document.querySelector('#skills'));
			observer.observe( document.querySelector('#education-awards'));
			observer.observe( document.querySelector('#contact'));
		}
		window.addEventListener("load", (event) => {
			observe();
		}, false);
	}
}


class NavbarObject extends React.Component {
	render () {
		var isActive = "";
		var nameForSelection = this.props.name.toLowerCase();
		if(this.props.name ==  "Education & Awards") {
				nameForSelection = "education-awards";
		}
		if (this.props.selectedElement == nameForSelection) {
			isActive = "active";
		}
		return (
			<div className="navBar-Object-Wrapper">
				<input type="button" className="navBar-Input" id={"navBar-"+this.props.name} name="navBar" onClick={e => this.props.scrollTo(this.props.name,e)} />
				<label htmlFor={"navBar-"+this.props.name} className={"navBar-Object "+isActive}>
					<a>{this.props.name}</a>
				</label>
			</div>
		);
	}
}
