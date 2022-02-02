import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db, storage } from '../../../services/firebase/firebaseConfig';
import {
	Button,
	Box,
	TextField,
	Typography,
	InputLabel,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import {
	addfieledStyle,
	marginStyle,
	formControlPlayer,
	formControlPoints,
	pageContainerStyle,
} from './styles';

const NewGame = () => {
	const pointsArry = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const [startDate, setStartDate] = useState(new Date());
	const [location, setLocation] = useState('');
	const [gameName, setGameName] = useState('');
	const [formValues, setFormValues] = useState([{ points: '', player_id: '' }]);
	const [playersDB, setPlayersDB] = useState([]);
	const [addPlayer, setAddPlayer] = useState(null);
	const [error, setError] = useState(null);
	let navigate = useNavigate();

	let handleChange = (i, e) => {
		let newFormValues = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
		const arrayformValues = newFormValues.map((item) => item.player_id);
		setAddPlayer(arrayformValues);
	};

	let addFormFields = () => {
		setFormValues([...formValues, { points: '', player_id: '' }]);
	};

	let removeFormFields = (i) => {
		let newFormValues = [...formValues];
		newFormValues.splice(i, 1);
		setFormValues(newFormValues);
	};

	const handleSubmite = async (event) => {
		event.preventDefault();
		let playerInGame = formValues.map((a) => a.player_id);
		try {
			await addDoc(collection(db, 'games'), {
				date_of_game: startDate,
				location: location,
				players: formValues,
				game_name: gameName,
				player_in_game: playerInGame,
			});
			navigate('/admindashboard');
		} catch (error) {
			setError('error, something went wrong!');
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
					}))
				);
			});
			return unsub;
		} catch (error) {
			setError('error, something went wrong!');
		}
	};

	useEffect(() => {
		const subscriberPromise = allPlayers();
		return async () => {
			const subscriber = await subscriberPromise;
			subscriber();
		};
	}, []);

	if (playersDB.length === 0) {
		return (
			<Box component='div' pt={3} textAlign='center'>
				<Typography variant='h6' component='div'>
					Loading...
				</Typography>
			</Box>
		);
	}

	return (
		<Box component='div' pt={3} textAlign='center' sx={pageContainerStyle}>
			<form onSubmit={handleSubmite}>
				<Box mt={2}>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
					/>
				</Box>
				<Box mt={2} mb={2}>
					<TextField
						required
						id='outlined-basic'
						label='Game name'
						variant='outlined'
						value={gameName}
						onChange={(event) => setGameName(event.target.value)}
						inputProps={{
							maxLength: 20,
						}}
					/>
				</Box>
				<Box mt={2} mb={2}>
					<TextField
						required
						id='outlined-basic'
						label='Location of game'
						variant='outlined'
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						inputProps={{
							maxLength: 20,
						}}
					/>
				</Box>
				<Box mt={5} mb={5}>
					<Typography variant='h5' component='h5'>
						Player/Points
					</Typography>
					<Button
						variant='contained'
						type='button'
						onClick={() => addFormFields()}
						sx={marginStyle}
					>
						Add Fields
					</Button>
					{formValues.map((element, index) => (
						<Box sx={addfieledStyle} key={index}>
							<FormControl sx={formControlPlayer}>
								<InputLabel id='demo-simple-select-label'>Players</InputLabel>
								<Select
									required
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									name='player_id'
									value={element.player_id || ''}
									onChange={(e) => handleChange(index, e)}
								>
									{playersDB.map((item) => {
										return (
											<MenuItem
												value={item.id}
												key={item.id}
												disabled={addPlayer && addPlayer.includes(item.id)}
											>
												{item.player}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<FormControl sx={formControlPoints}>
								<InputLabel id='demo-simple-select-label'>Points</InputLabel>
								<Select
									// required
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									name='points'
									value={element.points || ''}
									onChange={(e) => handleChange(index, e)}
								>
									{pointsArry.map((item) => {
										return (
											<MenuItem value={item} key={item}>
												{item}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<Button
								variant='contained'
								type='button'
								onClick={() => removeFormFields(index)}
							>
								<RemoveCircleOutlineIcon />
							</Button>
						</Box>
					))}
				</Box>
				<Box mt={5}>
					<Button variant='contained' type='submit'>
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default NewGame;
