export default class TemplateDefault extends React.Component {

	static displayName = "TemplateDefault";
	renderLayout(props,state) {
		console.log(this.constructor.defaultProps);
		return Reflect.ownKeys(props.layout).map((sectionName,index) => {
			return (
				<div key={`${sectionName}-${index}`} className={`section-${sectionName}`}>
					{
						props.layout[sectionName].map((cmpName) => this.props[cmpName])
					}
				</div>
			);
		});
	}

	buildComponent(props,state) {
		return (
			<div className="template-default">
				<h1>Hello</h1>
				{
					this.renderLayout(props, state)
				}
			</div>
		);
	}

	render() {
		console.log(this.props);
		return this.buildComponent(this.props,this.state);
	}
}
