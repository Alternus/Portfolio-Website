export class ContactCard extends React.Component {
	render() {
		return(
			<div className="contactCard">
				<h1 className="contact-Header" >Contact</h1>
				<h4 className="contact-Text" > Have a inquiry or want to work together? </h4>
				<input type="text" className="contact-Input-Field" placeholder="Name"/>
				<input type="text" className="contact-Input-Field" placeholder="Email"/>
				<textarea type="text" className="contact-Message-Input-Field" placeholder="Message"/>
			</div>
		);
	}
}
