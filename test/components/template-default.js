export default class TemplateDefault extends React.Component {

	renderLayout(props,state) {
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
				<h1>Hello</h1>
				{
					this.renderLayout(props, state)
				}
			</div>
		);
	}

	render() {
		return this.buildComponent(this.props,this.state);
	}
}
