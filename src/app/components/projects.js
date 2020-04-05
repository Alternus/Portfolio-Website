import Tilt from 'react-tilt';

export class Projects extends React.Component {
	render() {
		return(
			<div className="project-pageWrapper">
				<ProjectCard projectName="Mandelbrot Set" />
				<ProjectCard projectName="Coinspot API Node Module" forked="True" />
				<ProjectCard projectName="Firefox Dark Theme Plugin" />
				<ProjectCard projectName="Prometheus" />

			</div>
		);
	}
}

class ProjectCard extends React.Component {
	render () {
		var tag = [];
		if (this.props.forked == "True") {
			tag = [
				<a className="project-Forked-Tag">Forked</a>
			]
		}
		return (
			<div className="project-Card">
				<Tilt options={{ max : 20, scale: 1, reverse: true }} >
					<div className="project-Click-Wrapper" />
						<img src={"./assets/projectBanners/"+((this.props.projectName).toLowerCase()).replace(/ /g,"-")+".png"} className="project-Banner" />
						{tag}
				</Tilt>
				<a className="project-Name">{this.props.projectName}</a>
			</div>
		);
	}
}
