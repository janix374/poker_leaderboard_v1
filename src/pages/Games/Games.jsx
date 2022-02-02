import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	FormControl,
	InputLabel,
	NativeSelect,
} from '@mui/material';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import GamesLogic from '../../components/PGLogic/GamesLogic/GamesLogic';
import { pageContainerStyle } from './styles';

const Games = () => {
	const [players, setPlayers] = useState(null);
	const [games, setGames] = useState(null);
	const [arrayPlayers, setArrayPlayers] = useState('mjJgB6TXIst6LJUf2Fil');
	const [error, setError] = useState(null);

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
			const q = await query(
				collection(db, 'games'),
				orderBy('date_of_game', 'desc')
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
			setError(true);
		}
	};

	const handleChange = async (e) => {
		try {
			let q;
			if (e.target.value == 'all') {
				q = await query(
					collection(db, 'games'),
					orderBy('date_of_game', 'desc')
				);
			} else {
				q = await query(
					collection(db, 'games'),
					where('player_in_game', 'array-contains', e.target.value)
				);
			}

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

	return (
		<Box component='div' mt={5} pt={5} sx={pageContainerStyle}>
			<Box component='div'>
				<Typography align='center' variant='h4' component='h4'>
					All Games
				</Typography>
			</Box>
			<Box sx={{ minWidth: 120 }} pb={5} pt={3}>
				<FormControl fullWidth>
					<InputLabel variant='standard' htmlFor='uncontrolled-native'>
						Filter
					</InputLabel>
					{players && (
						<NativeSelect name='player_id' onChange={handleChange}>
							<option value={'all'}>All Players</option>
							{players.map((item) => {
								return (
									<option key={item.id} value={item.id}>
										{item.player.name}
									</option>
								);
							})}
						</NativeSelect>
					)}
				</FormControl>
			</Box>
			<Box component='div'>{games ? <GamesLogic games={games} /> : ''}</Box>
		</Box>
	);
};

export default Games;
