import Tilt from 'react-tilt';

export class Projects extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			selectedProject: "",
		};
		this.selectProject = this.selectProject.bind(this);
	}
	selectProject(project) {
		this.setState({selectedProject: project});
	}
	render() {
		var projects = require("../project-data.json");
		return(
			<div className="project-pageWrapper">
			{(Object.keys(projects)).map((name, index) => (
				<ProjectCard projectName={projects[name]["displayName"]} banner={projects[name]["banner"]} forked={projects[name]["forked"]} />
			))}
			</div>
		);
	}
}

class ProjectCard extends React.Component {
	render () {
		var tag = [];
		if (this.props.forked == "true") {
			tag = [ <a className="project-Forked-Tag">Forked</a> ];
		}
		return (
			<div className="project-Card">
				<Tilt options={{ max : 20, scale: 1, reverse: true }} >
					<div className="project-Click-Wrapper" />
						<img src={this.props.banner} className="project-Banner" />
						{tag}
				</Tilt>
				<a className="project-Name">{this.props.projectName}</a>
			</div>
		);
	}
}

class ProjectDetailsCard extends React.Component {
	render() {
		return (
			<div className="project-DetailsCard">
				<img src="./assets/icons/left-chevron.png" className="project-Left-Arrow"/>
				<img src={"./assets/projectBanners/"+((this.props.projectName).toLowerCase()).replace(/ /g,"-")+".png"} className="project-Details-Banner" />
				<img src="./assets/icons/right-chevron.png" className="project-Right-Arrow"/>
				<a className="project-Details-Name">{this.props.projectName}</a>
				<div className="project-Details-InfoPanel">
					<a className="project-Details-InfoPanel-Header">Latest Release:<a className="highlight"> v1.0.0</a></a>
					<a className="project-Details-InfoPanel-Header">Dev Team Size: <a className="highlight">2</a></a>
					<h1 className="project-Details-InfoPanel-Header">Languages</h1>
					<a className="project-Details-InfoPanel-ListItem">&gt; HTML, CSS, Javascript</a>
					<a className="project-Details-InfoPanel-ListItem">&gt; Python3</a>
					<h1 className="project-Details-InfoPanel-Header">Frameworks</h1>
					<a className="project-Details-InfoPanel-ListItem">&gt; Electron</a>
					<a className="project-Details-InfoPanel-ListItem">&gt; ReactJS</a>
					<a className="project-Details-InfoPanel-ListItem">&gt; Proton Native</a>
					<a className="project-Details-InfoPanel-ListItem">&gt; React Native</a>
				</div>
				<div className="project-DescriptionWrapper" >
					<h2>CryptoCurrency Portfolio Management and Auto-Trading Suite</h2>
					<a>Prometheus utilises realtime price and portfolio holdings tracking on multiple leading Australian Cryptocurrency Exchanges. </a>
					<a>Originally written with ReactJS and Electron for Linux based operating systems, Prometheus was ported to Proton Native and React Native supporting both Desktop and Mobile Devices</a>
				</div>
				<div className="project-Return">
					<img src="./assets/icons/left-chevron.png" className="project-ReturnIcon"/>
					<a className="project-ReturnText">Return</a>
				</div>
				<div className="project-GithubCard">
					<a className="project-LinkText">View On Github</a>
					<img src="./assets/icons/github.png" className="project-LinkIcon"/>
				</div>
				<div className="project-DownloadCard">
					<a className="project-LinkText">Download Latest</a>
					<img src="./assets/icons/download.png" className="project-LinkIcon"/>
				</div>
			</div>
		)
	}
}
