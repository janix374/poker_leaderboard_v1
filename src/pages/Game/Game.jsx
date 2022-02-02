import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import {
	Grid,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Paper,
	Box,
	Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
	tableStyle,
	pageContainerStyle,
	avatatStyle,
	imageAvatarStayle,
} from './styles';

const Game = () => {
	let params = useParams();
	const [game, setGame] = useState(null);
	const [playersDB, setPlayersDB] = useState([]);
	const [error, setError] = useState(null);

	const getGame = async () => {
		try {
			const unsub = await onSnapshot(
				doc(db, 'games', `${params.gameID}`),
				(doc) => {
					setGame(doc.data());
				}
			);
			return unsub;
		} catch (error) {
			setError('No document!');
		}
	};

	const allPlayers = async () => {
		try {
			const q = await query(collection(db, 'players'));
			const unsub = await onSnapshot(q, (snapshot) => {
				setPlayersDB(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						player: doc.data().name,
						picture: doc.data().picture,
					}))
				);
			});
			return unsub;
		} catch (error) {
			setError('No players in DB');
		}
	};

	const findPlayersName = (playerId) => {
		const result = playersDB.find(({ id }) => id === playerId);
		return { player: result.player, picture: result.picture };
	};

	useEffect(() => {
		const subscriberPromise = allPlayers();
		return async () => {
			const subscriber = await subscriberPromise;
			subscriber();
		};
	}, []);

	useEffect(() => {
		const subscriberPromise = getGame();
		return async () => {
			const subscriber = await subscriberPromise;
			subscriber();
		};
	}, []);

	if (error) {
		return (
			<Box component='div' pt={3} textAlign='center'>
				<Typography variant='h6' component='div'>
					{error}
				</Typography>
			</Box>
		);
	}

	if (playersDB.length === 0 || !game) {
		return (
			<Box component='div' pt={3} textAlign='center'>
				<Typography variant='h6' component='div'>
					Loading...
				</Typography>
			</Box>
		);
	}

	return (
		<Box sx={pageContainerStyle}>
			<Grid container spacing={2} pt={5}>
				<Grid item xs={12}>
					<Typography variant='h6' component='h6'>
						Location: {game.location}
					</Typography>
					<Typography variant='h6' component='h6'>
						Name of game: {game.game_name}
					</Typography>
					<Typography variant='h6' component='h6'>
						Date of game:{' '}
						{new Date(game.date_of_game.toMillis()).toLocaleDateString('en-US')}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>Player</TableCell>
									<TableCell>Points</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{game.players.map((player) => {
									return (
										<TableRow key={player.player_id}>
											<TableCell sx={avatatStyle}>
												<Avatar
													alt={player.picture}
													src={
														window.location.origin +
														`/assets/images/${
															findPlayersName(player.player_id).picture
														}.jpg`
													}
													sx={imageAvatarStayle}
												/>
											</TableCell>
											<TableCell sx={tableStyle}>
												<Link to={`/player/${player.player_id}`}>
													{findPlayersName(player.player_id).player}
												</Link>
											</TableCell>
											<TableCell>{player.points}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Game;
