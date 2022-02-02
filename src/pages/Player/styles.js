const imageStyle = {
	width: '80%',
	img: {
		width: '100%',
	},
};

const spanStyle = {
	fontWeight: '700',
	color: '#f95850',
};

const linkStyles = {
	a: {
		textDecoration: 'none',
		color: '#000000',
		fontSize: '1.5 rem',
		'&:hover': { textDecoration: 'underline', color: '#000000' },
		'&:visited': { color: '#000000' },
		'&:ctive': { color: '#000000' },
	},
	fontSize: '1.5 rem',
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'space-between',
	flexWrap: 'wrap',
};

const pageContainerStyle = {
	width: '80%',
	margin: '0px auto',
};

export { imageStyle, spanStyle, linkStyles, pageContainerStyle };
