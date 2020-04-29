export class SkillsCard extends React.Component {
	render() {
		return(
			<div className="skills-Card" id={this.props.id}>
				<h1 className="skills-List-Header">Programming Languages</h1>
				<li className="skills-List-Item">&gt; Python3</li>
				<li className="skills-List-Item">&gt; C++</li>
				<li className="skills-List-Item">&gt; C#</li>
				<li className="skills-List-Item">&gt; HTML, CSS, Javascript, PHP, NodeJS,  PostgreSQL</li>
				<li className="skills-List-Sub-Item">&gt; ReactJS</li>
				<li className="skills-List-Sub-Item">&gt; Electron</li>
				<h1 className="skills-List-Header">Developer Tools</h1>
				<li className="skills-List-Item">&gt; Atom</li>
				<li className="skills-List-Item">&gt; Visual Studio</li>
				<li className="skills-List-Item">&gt; Terminal</li>
				<li className="skills-List-Item">&gt; Git & Github</li>
				<li className="skills-List-Item">&gt; npm</li>
				<h1 className="skills-List-Header">Experienced Systems</h1>

				<div className="skills-Systems-Wrapper">
				<SystemOS os="Linux" />
					<SystemOS os="Windows" />

				</div>
			</div>
		);
	}
}

class SystemOS extends React.Component {
	render() {
		return(
			<div className="skills-OS-Wrapper">
				<img className="skills-OS-Icon" src={"./assets/icons/"+this.props.os+".png"} />
				<p>{this.props.os}</p>
			</div>
		);
	}
}
