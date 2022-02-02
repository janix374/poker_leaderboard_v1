import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { pageContainerStyle } from './styles';

const NotFound = () => {
	return (
		<Box sx={pageContainerStyle}>
			<p>404</p>
		</Box>
	);
};

export default NotFound;
