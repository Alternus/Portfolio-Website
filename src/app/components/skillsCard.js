export class SkillsCard extends React.Component {
	render() {
		return(
			<div className="skills-Card">
				<h1 className="skills-List-Header">Programming Languages</h1>
				<SkillsList list={["Python3","C++","C#","Java","HTML, CSS, Javascript, PHP, mySQL",["ReactJS","Electron","Proton Native","React Native"]]} />
				<h1 className="skills-List-Header">Developer Tools</h1>
				<SkillsList list={["Atom","Visual Studio","Terminal","Git & Github","npm"]} />
				<h1 className="skills-List-Header">Experienced Systems</h1>
				<SystemsFlex />
			</div>
		);
	}
}

class SystemsFlex extends React.Component {
	render() {
		return(
			<div className="skills-Systems-Wrapper">
				<SystemOS os="Windows" />
				<SystemOS os="Linux" />
				<SystemOS os="Andriod" />
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

class SkillsList extends React.Component {
	render() {
		var list = [];
		for (var x of this.props.list) {
			if (Object.prototype.toString.call(x) === '[object Array]') {
				for (var y of x) {
					list.push(
						<a className="skills-List-Sub-Item">&gt; {y}</a>
					);
				}
			} else {
				list.push(
					<a className="skills-List-Item">&gt; {x}</a>
				);
			}
		}
		return(
			<div>
				{list}
			</div>
		);
	}
}
