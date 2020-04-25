export class SkillsCard extends React.Component {
	render() {
		return(
			<div className="skills-Card" id={this.props.id}>
				<h1 className="skills-List-Header">Programming Languages</h1>
				<a className="skills-List-Item">&gt; Python3</a>
				<a className="skills-List-Item">&gt; C++</a>
				<a className="skills-List-Item">&gt; C#</a>
				<a className="skills-List-Item">&gt; Java</a>
				<a className="skills-List-Item">&gt; HTML, CSS, Javascript, PHP, mySQL</a>
				<a className="skills-List-Sub-Item">&gt; ReactJS</a>
				<a className="skills-List-Sub-Item">&gt; Electron</a>
				<a className="skills-List-Sub-Item">&gt; Proton Native</a>
				<a className="skills-List-Sub-Item">&gt; React Native</a>

				<h1 className="skills-List-Header">Developer Tools</h1>
				<a className="skills-List-Item">&gt; Atom</a>
				<a className="skills-List-Item">&gt; Visual Studio</a>
				<a className="skills-List-Item">&gt; Terminal</a>
				<a className="skills-List-Item">&gt; Git & Github</a>
				<a className="skills-List-Item">&gt; npm</a>
				<h1 className="skills-List-Header">Experienced Systems</h1>

				<div className="skills-Systems-Wrapper">
					<SystemOS os="Windows" />
					<SystemOS os="Linux" />
					<SystemOS os="Andriod" />
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
				<a>{this.props.os}</a>
			</div>
		);
	}
}
