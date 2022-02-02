const maincontainer = {
	position: 'relative',
	width: '250px',
	height: '320px',
	margin: '0 auto',
};

const thecard = {
	position: 'absolute',
	width: '100%',
	height: '100%',
	borderRadius: 2,
	border: '1px solid #000000',
	transformStyle: 'preserve-3d',
	transition: 'all 2s ease',
	'&: hover': {
		transform: 'rotateY(180deg)',
	},
};

const frontcard = {
	position: 'absolute',
	width: '100%',
	height: '100%',
	backfaceVisibility: 'hidden',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	backgroundSize: 'cover',
};

const backcard = {
	position: 'absolute',
	width: '100%',
	height: '100%',
	backfaceVisibility: 'hidden',
	backgroundImage: 'url("/assets/images/backcard.jpg")',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	backgroundSize: 'cover',
	transform: 'rotateY(180deg)',
};

export { thecard, frontcard, backcard, maincontainer };
