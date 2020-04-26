import { Navbar } from './components/navbar.js';
import { Projects } from './components/projects.js';
import { SkillsCard } from './components/skillsCard.js';
import { ContactCard } from './components/contact.js';
import { EducationAwardsCard } from './components/educationAwardsCard.js';

class WebPage extends React.Component {
	render () {
		const { Client } = require('pg');

		const client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: true,
		});

		client.connect();

		client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
			if (err) throw err;
				for (let row of res.rows) {
					console.log(JSON.stringify(row));
				}
				client.end();
		});

		return (
			<div>
				<Navbar />
				<div className="page-Wrapper" id="page-Wrapper" >
					<Projects id="projects" />
					<SkillsCard id="skills" />
					<EducationAwardsCard id="education-awards" />
					<ContactCard id="contact" />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<WebPage/>
	, document.getElementById('main')
);
