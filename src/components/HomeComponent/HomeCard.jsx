import React from 'react';
import {
	Card,
	CardActionArea,
	CardMedia,
	Typography,
	Button,
	CardContent,
	CardActions,
} from '@mui/material';
import { homeCardStyle } from './styles';

const HomeCard = () => {
	return (
		<Card sx={homeCardStyle}>
			<CardActionArea>
				<CardMedia
					component='img'
					height='300'
					image={window.location.origin + `/assets/images/pokerrule.jpg`}
					alt='green iguana'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						Na vikendici kod Badze
					</Typography>
					<Typography variant='body1' color='text.secondary'>
						Turnament rules: The process of gaining points in tournaments is: If
						the tournament has 4 participants, the first gets 4 points, the
						second 3 points and so on.
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default HomeCard;
