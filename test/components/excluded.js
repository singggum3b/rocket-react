const Excluded = function(props) {
	console.log(props);
	const comments = `<!-- Excluded -->`;
	return (
		<div dangerouslySetInnerHTML={{__html: comments}}></div>
	);
};

Excluded.displayName = "ProductDetail";

export default Excluded;
