import Tilt from 'react-tilt';

export class Projects extends React.Component {
	constructor (props){
		var projects = require("../project-data.json");
		super(props);
		this.state = { selectedProject: (Object.keys(projects))[0], projects: projects, menuState: "projects", };
		this.selectProject = this.selectProject.bind(this);
	}
	selectProject(project) {
		this.setState({selectedProject: project});
		if (this.state.menuState == "projects") {
			document.getElementById("project-DetailsCard").style["transform"] = "translateY(0)";
			this.setState({menuState: "projectDetails"});
		} else {
			document.getElementById("project-DetailsCard").style["transform"] = "translateY(-100vh)";
			this.setState({menuState: "projects"});
		}
	}
	render() {
		return(
			<div className="project-pageWrapper" id={this.props.id}>
			{(Object.keys(this.state.projects)).map((name, index) => (
				<ProjectCard
					project={name}
					projectName={this.state.projects[name]["displayName"]}
					banner={this.state.projects[name]["banner"]}
					forked={this.state.projects[name]["forked"]}
					private={this.state.projects[name]["private"]}
					selectProject={this.selectProject}
					key={"projectCardKey-"+name}
				/>
			))}
			<ProjectDetailsCard projectName={this.state.selectedProject} selectProject={this.selectProject} projectInfo={this.state.projects} />
			</div>
		);
	}
}

class ProjectCard extends React.Component {
	render () {
		var tag = [];
		if (this.props.forked == "true") {
			tag = [ <a className="project-Forked-Tag" key={"projectCardForkedKey-"+this.props.projectName}>Forked</a> ];
		}
		if (this.props.private == "true") {
			tag = [ <a className="project-Private-Tag" key={"projectCardPrivateKey-"+this.props.projectName}>Private</a> ];
		}
		return (
			<div className="project-Card">
				<Tilt options={{ max : 20, scale: 1, reverse: true }} >
					<div className="project-Click-Wrapper" onClick={e => this.props.selectProject(this.props.project,e)} />
						<img src={this.props.banner} className="project-Banner" />
						{tag}
				</Tilt>
				<p className="project-Name">{this.props.projectName}</p>
			</div>
		);
	}
}

class ProjectDetailsCard extends React.Component {
	constructor (props){
		super(props);
		this.state = { enlargeImage: true };
		this.toggleImage = this.toggleImage.bind(this);
	}
	toggleImage() {
		if (this.state.enlargeImage) {
			this.setState({ enlargeImage: false});
			document.getElementById("project-Details-Banner").style["height"] = "calc(91.5vh - 120px)";
			document.getElementById("project-Details-Banner").style["width"] = "auto";
		} else {
			this.setState({ enlargeImage: true});
			document.getElementById("project-Details-Banner").style["height"] = "256px";
			document.getElementById("project-Details-Banner").style["width"] = "auto";
		}
	}

	render() {
		if(this.props.projectName != "") {
			var projectInfo = this.props.projectInfo[this.props.projectName];
		} else {
			var projectInfo = this.props.projectInfo[this.props.projectName];
		}
		return (
			<div className="project-DetailsCard" id="project-DetailsCard" >
				{/*<img src="./assets/icons/left-chevron.png" className="project-Left-Arrow"/>*/}
				<img src={projectInfo["banner"]} className="project-Details-Banner" />
				{/*<img src="./assets/icons/right-chevron.png" className="project-Right-Arrow"/>*/}
				<p className="project-Details-Name">{projectInfo["displayName"]}</p>
				<div className="project-Details-InfoPanel">
					<h1 className="project-Details-InfoPanel-Header">Latest Release: <a className="highlight">{projectInfo["latestRelease"]}</a></h1>
					<h1 className="project-Details-InfoPanel-Header">Dev Team Size: <a className="highlight">{projectInfo["devTeamSize"]}</a></h1>
					<h1 className="project-Details-InfoPanel-Header">Languages</h1>
					{(projectInfo["languages"]).map((language, index) => (
						<li className="project-Details-InfoPanel-ListItem">&gt; {language}</li>
					))}

					{(() => {
						// Renders Frameworks header if any frameworks where used
						if (projectInfo["frameworks"].length >= 1) {
							return <h1 className="project-Details-InfoPanel-Header">Frameworks</h1>
						} else {
							return <div />
						}
					})()}

					{(projectInfo["frameworks"]).map((framework, index) => (
						<li className="project-Details-InfoPanel-ListItem">&gt; {framework}</li>
					))}
				</div>
				<div className="project-DescriptionWrapper" >
					<h2>{projectInfo["projectDescriptionHeader"]}</h2>
					<p>{projectInfo["projectDescription"]}</p>
				</div>
				<div className="project-Return" onClick={e => this.props.selectProject(this.props.projectName,e)}>
					<img src="./assets/icons/left-chevron.png" className="project-ReturnIcon"/>
					<a className="project-ReturnText">Return</a>
				</div>
				<div className="project-GithubCard" onClick={e => window.open(projectInfo["githubLink"],'_blank')} >
					<a className="project-LinkText">View On Github</a>
					<img src="./assets/icons/github.png" className="project-LinkIcon"/>
				</div>
				<div className="project-DownloadCard" onClick={e => window.open(projectInfo["downloadLink"])}>
					<a className="project-LinkText">Download Latest</a>
					<img src="./assets/icons/download.png" className="project-LinkIcon"/>
				</div>
			</div>
		)
	}
}
