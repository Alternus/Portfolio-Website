export class EducationAwardsCard extends React.Component {
	render() {
		return(
			<div className="educationAwards-Card" id={this.props.id}>
				<h1 className="skills-List-Header" >Current College Courses</h1>
				<li className="skills-List-Item" >&gt; Specialist Mathematics - Major</li>
				<li className="skills-List-Item" >&gt; Specialist Methods - Major</li>
				<li className="skills-List-Item" >&gt; Programming - Major</li>
				<li className="skills-List-Item" >&gt; Networking and Cyber Security - Minor</li>
				<li className="skills-List-Item" >&gt; Ancient History - Major</li>
				<li className="skills-List-Item" >&gt; English Literature - Minor</li>
				<h1 className="skills-List-Header" >Awards & Competitions</h1>
				<li className="skills-List-Item" >&gt; Lockheed Martin Code Quest 2019 | Team Size - 3</li>
				<li className="skills-List-Sub-Item" >&gt; 3rd Place</li>
				<li className="skills-List-Item" >&gt; Lockheed Martin Cyber Quest 2019 | Team Size - 3</li>
				<li className="skills-List-Sub-Item" >&gt; 1st Place Nationally</li>
				<li className="skills-List-Sub-Item" >&gt; 6th Place Internationally</li>
				<li className="skills-List-Item" >&gt; UNSW Code ProgComp 2019 | Team Size - 2</li>
				<li className="skills-List-Sub-Item" >&gt; Credit</li>
			</div>
		);
	}
}
