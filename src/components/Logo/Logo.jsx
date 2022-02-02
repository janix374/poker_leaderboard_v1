import React from 'react';
import { Box } from '@mui/material';
import { logoStyles } from './styles';

const Logo = () => {
	return (
		<Box sx={logoStyles} p={4}>
			<Box>
				<img
					src={window.location.origin + `/assets/images/30.jpg`}
					alt='logo'
				/>
			</Box>
			<Box>SPT</Box>
		</Box>
	);
};

export default Logo;
