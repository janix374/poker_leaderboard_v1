import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { footerStyles } from './styles';

const Footer = () => {
	return (
		<Box p={4} sx={footerStyles}>
			<Box component='div' p={2}>
				<img src={window.location.origin + `/assets/images/aa.jpg`} alt='aa' />
			</Box>
			<Box component='div' p={2}>
				{' '}
				<Typography variant='body1' component='p'>
					<Link
						to='https://github.com/janix374'
						target='_blank'
						rel='noopener noreferrer'
					>
						Visit: janix374
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
