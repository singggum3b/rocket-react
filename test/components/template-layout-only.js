export default class TemplateLayoutOnly extends React.Component {

	static displayName = "TemplateLayoutOnly";
	renderLayout(props,state) {
		console.log(this.constructor.defaultProps);
		return props.layout ? Reflect.ownKeys(props.layout).map((sectionName,index) => {
			return (
				<div key={`${sectionName}-${index}`} className={`section-${sectionName}`}>
					{
						props.layout[sectionName].map((cmpName) => this.props[cmpName])
					}
				</div>
			);
		}) : null;
	}

	buildComponent(props,state) {
		return (
			<div className="template-layout-only">
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
