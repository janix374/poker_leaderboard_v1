import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
	collection,
	serverTimestamp,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import PlayersLogic from './PlayersLogic/PlayersLogic';
import { Link } from 'react-router-dom';
import { linkStyle } from './styles';

const PGLogic = () => {
	const [players, setPlayers] = useState(null);
	const [games, setGames] = useState(null);
	const [error, setError] = useState(false);

	const allPlayers = async () => {
		try {
			const q = await query(collection(db, 'players'), orderBy('name'));
			const unsub = await onSnapshot(q, (snapshot) => {
				setPlayers(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						player: doc.data(),
					}))
				);
			});
			return unsub;
		} catch (error) {
			setError(true);
		}
	};

	const allGames = async () => {
		try {
			const q = await query(collection(db, 'games'));
			const unsub = await onSnapshot(q, (snapshot) => {
				const playersInGame = snapshot.docs.map((doc) => ({
					players: doc.data().players,
				}));
				let playerPoints = playersInGame.reduce(
					(previousValue, currentValue) => {
						return [...previousValue, ...currentValue.players];
					},
					[]
				);
				setGames(playerPoints);
			});
			return unsub;
		} catch (error) {
			setError(true);
		}
	};

	useEffect(() => {
		const subscriberPromise = allPlayers();
		return async () => {
			const subscriber = await subscriberPromise;
			subscriber();
		};
	}, []);

	useEffect(() => {
		const subscriberPromise = allGames();
		return async () => {
			const subscriber = await subscriberPromise;
			subscriber();
		};
	}, []);

	if (error) {
		return (
			<Box component='div' pt={3} pb={5}>
				<Typography variant='h4' component='p'>
					Something went wrong...
				</Typography>
			</Box>
		);
	}

	return (
		<Box component='div' pt={3} pb={5}>
			<Typography variant='h4' component='h4'>
				POKER LEADERBOARD
			</Typography>
			<Box component='div' mb={5} mt={4}>
				{players && games ? (
					<PlayersLogic players={players} games={games} />
				) : (
					''
				)}
			</Box>
			<Box component='div' pt={5} pb={5} sx={linkStyle}>
				<Typography variant='h4' component='h4'>
					<Link to='/games'>ALL POKER TURNAMENTS</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default PGLogic;
