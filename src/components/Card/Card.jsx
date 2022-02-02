import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { thecard, frontcard, backcard, maincontainer } from './styles';

const Card = ({ picture }) => {
	return (
		<Box sx={maincontainer}>
			<Box sx={thecard}>
				<Box
					sx={frontcard}
					style={{ backgroundImage: `url("/assets/images/${picture}.jpg")` }}
				></Box>
				<Box sx={backcard}></Box>
			</Box>
		</Box>
	);
};

Card.propTypes = {
	picture: PropTypes.string.isRequired,
};

export default Card;
