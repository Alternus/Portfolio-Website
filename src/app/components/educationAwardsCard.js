export class EducationAwardsCard extends React.Component {
	render() {
		return(
			<div className="educationAwards-Card" id={this.props.id}>
				<h1 className="skills-List-Header" >Current College Courses</h1>
				<a className="skills-List-Item" >&gt; Specialist Mathematics - Major</a>
				<a className="skills-List-Item" >&gt; Specialist Methods - Major</a>
				<a className="skills-List-Item" >&gt; Programming - Major</a>
				<a className="skills-List-Item" >&gt; Networking and Cyber Security - Minor</a>
				<a className="skills-List-Item" >&gt; Ancient History - Major</a>
				<a className="skills-List-Item" >&gt; English Literature - Minor</a>
				<h1 className="skills-List-Header" >Awards & Competitions</h1>
				<a className="skills-List-Item" >&gt; Lockheed Martin Code Quest 2019</a>
				<a className="skills-List-Sub-Item" >&gt; 3rd Place</a>
				<a className="skills-List-Item" >&gt; Lockheed Martin Cyber Quest 2019</a>
				<a className="skills-List-Sub-Item" >&gt; 1st Place Nationally</a>
				<a className="skills-List-Sub-Item" >&gt; 6th Place Internationally</a>
				<a className="skills-List-Item" >&gt; UNSW Code ProgComp 2019</a>
				<a className="skills-List-Sub-Item" >&gt; Credit</a>
			</div>
		);
	}
}
