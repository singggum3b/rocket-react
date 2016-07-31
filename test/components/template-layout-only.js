export default class TemplateLayoutOnly extends React.Component {

	static displayName = "TemplateLayoutOnly";
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
			<div>
				<h1>Hello TemplateLayoutOnly</h1>
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
