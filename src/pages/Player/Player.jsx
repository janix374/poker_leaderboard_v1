import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	doc,
	getDoc,
	collection,
	query,
	where,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import { Grid, Box, Typography } from '@mui/material';
import Card from '../../components/Card/Card';
import Logo from '../../components/Logo/Logo';
import GamesLogic from '../../components/PGLogic/GamesLogic/GamesLogic';
import { Link } from 'react-router-dom';
import { spanStyle, linkStyles, pageContainerStyle } from './styles';

const Player = () => {
	let params = useParams();
	const [player, setPlayer] = useState(null);
	const [games, setGames] = useState(null);
	const [error, setError] = useState(null);

	const getPlayer = async () => {
		const docRef = doc(db, 'players', `${params.playerID}`);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setPlayer(docSnap.data());
		} else {
			setError('No such document!');
		}
	};

	const getGamesByPlayerId = async () => {
		try {
			let q = await query(
				collection(db, 'games'),
				where('player_in_game', 'array-contains', `${params.playerID}`)
			);
			const unsub = await onSnapshot(q, (snapshot) => {
				setGames(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						game: doc.data(),
					}))
				);
			});
			return unsub;
		} catch (error) {
			setError('something went wrong!');
		}
	};

	useEffect(() => {
		getPlayer();
	}, []);

	useEffect(() => {
		const subscriberPromise = getGamesByPlayerId();
		return async () => {
			const subscriber = await subscriberPromise;
			subscriber();
		};
	}, []);

	if (error) {
		return (
			<div>
				<p>{error}</p>
			</div>
		);
	}

	if (!player) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<Box sx={pageContainerStyle}>
			<Grid container spacing={2} pt={5}>
				<Grid item xs={12}>
					<Logo />
				</Grid>
				<Grid item xs={12} sm={6} mt={3}>
					{player.picture ? <Card picture={player.picture} /> : ''}
				</Grid>
				<Grid item xs={12} sm={6} mt={3}>
					<Typography variant='h6' component='h6'>
						<Box component='span' sx={spanStyle}>
							Poker Player
						</Box>
					</Typography>
					<Typography variant='body1' component='p' mt={2}>
						Name:{' '}
						<Box component='span' sx={spanStyle}>
							{player.name}
						</Box>
					</Typography>
					<Typography variant='body1' component='p' mt={2}>
						Description:{' '}
						<Box component='span' sx={spanStyle}>
							{player.description}
						</Box>
					</Typography>
				</Grid>
				<Grid item xs={12} pt={4} mt={4}>
					<Typography variant='h6' component='h6' textAlign='center'>
						Games
					</Typography>
					<Box p={4} sx={linkStyles}>
						{games ? <GamesLogic games={games} /> : ''}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Player;
