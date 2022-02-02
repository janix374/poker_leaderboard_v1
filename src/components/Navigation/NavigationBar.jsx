import React, { useState } from 'react';
import {
	Toolbar,
	Box,
	AppBar,
	Typography,
	Button,
	Menu,
	MenuItem,
} from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Link } from 'react-router-dom';
import { navStyleLink } from './styles';
import { useAuth } from '../../hooks/AuthContext';

const NavigationBar = () => {
	const { currentUser, logout } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Box sx={{ flexGrow: 1 }} mb={5}>
			<AppBar position='fixed'>
				<Toolbar>
					<Box>
						<Button
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
							variant='contained'
						>
							<DehazeIcon />
						</Button>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							sx={navStyleLink}
						>
							<Link to='/'>
								<MenuItem onClick={handleClose}>HOME</MenuItem>
							</Link>
							<Link to='/poker'>
								<MenuItem onClick={handleClose}>POKER TUTORIAL</MenuItem>
							</Link>
							{currentUser ? (
								<Link to='/admindashboard'>
									<MenuItem onClick={handleClose}>ADMINDASHBOARD</MenuItem>
								</Link>
							) : (
								<Link to='/loginadimin'>
									<MenuItem onClick={handleClose}>LOG IN</MenuItem>
								</Link>
							)}
						</Menu>
					</Box>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					></Typography>
					{currentUser ? (
						<Button color='inherit' onClick={logout}>
							LOG OUT
						</Button>
					) : (
						''
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavigationBar;
