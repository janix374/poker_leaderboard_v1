import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import {
	collection,
	serverTimestamp,
	onSnapshot,
	orderBy,
	deleteDoc,
	doc,
	query,
} from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import PlayerLogicAdmin from './PlayerLogicAdmin/PlayerLogicAdmin';
import GamesLogicAdmin from './GamesLogicAdmin/GamesLogicAdmin';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from './styles';

const PGLogicAdmin = () => {
	const [players, setPlayers] = useState();
	const [games, setGames] = useState();
	let navigate = useNavigate();

	const allPlayers = async () => {
		try {
			const q = await query(collection(db, 'players'));
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
			console.log(error);
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
			console.log(error);
		}
	};

	const deleteGames = async (gamesId) => {
		try {
			const gamesDoc = doc(db, 'games', gamesId);
			await deleteDoc(gamesDoc);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePlayerEdit = (id) => {
		navigate(`${id}`);
	};

	const handlePlayerNew = () => {
		if (players) {
			return navigate('newplayer');
		} else {
			return;
		}
	};

	const handleGameNew = () => {
		navigate('newgame');
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
		<Box component='div'>
			<Box component='div' mt={5} pb={5}>
				<Button variant='contained' onClick={handlePlayerNew} sx={buttonStyle}>
					New Player
				</Button>
				{players ? (
					<PlayerLogicAdmin
						players={players}
						handlePlayerEdit={handlePlayerEdit}
					/>
				) : (
					''
				)}
			</Box>
			<Box component='div' pt={5}>
				<Button variant='contained' onClick={handleGameNew} sx={buttonStyle}>
					New Game
				</Button>
				{games ? (
					<GamesLogicAdmin
						games={games}
						deleteGames={deleteGames}
						players={players}
					/>
				) : (
					''
				)}
			</Box>
		</Box>
	);
};

export default PGLogicAdmin;
