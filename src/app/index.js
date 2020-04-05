import { Navbar } from './components/navbar.js';
import { Projects } from './components/projects.js';
import { SkillsCard } from './components/skillsCard.js';
import { ContactCard } from './components/contact.js';
import { EducationAwardsCard } from './components/educationAwardsCard.js';

class WebPage extends React.Component {
	render () {
		return (
			<div>
				<Navbar />
				<div className="page-Wrapper">
					<Projects />
					<SkillsCard />
					<EducationAwardsCard />
					<ContactCard />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<WebPage/>,
	document.getElementById('main')
);
