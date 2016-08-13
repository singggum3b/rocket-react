class Top extends React.Component {

	render() {
		console.log(this.props);
		return (
			<div>Top</div>
		);
	}

}

class TopMenu extends Top {

}

TopMenu.displayName = "TopMenu";

export default TopMenu;
