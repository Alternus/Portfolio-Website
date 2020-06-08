export class ToggleSwitch extends React.Component {
	render() {
		return(
			<label className="switch">
				<input type="checkbox" onChange={e => this.props.callBack(this.props.variable,e)} />
				<span className="slider"></span>
			</label>
		);
	}
}
