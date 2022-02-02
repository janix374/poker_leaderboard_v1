import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Box,
	Radio,
	TextField,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { images } from '../../../assets/db/images';
import { formStyles, selectPictureStyle, playerPictureStyle } from './styles';

const EditPlayer = () => {
	let params = useParams();
	const [error, setError] = useState(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState(null);
	let navigate = useNavigate();

	const handleRadioButtonChange = (event) => {
		setPicture(event.target.value);
	};

	const getPlayer = async () => {
		const docRef = doc(db, 'players', `${params.editplayerID}`);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setName(docSnap.data().name);
			setDescription(docSnap.data().description);
			setPicture(docSnap.data().picture);
		} else {
			setError('No such document!');
		}
	};

	const updatePlayer = async (event) => {
		event.preventDefault();
		try {
			const docRef = doc(db, 'players', params.editplayerID);
			updateDoc(docRef, {
				name,
				description,
				picture,
			});
			setDescription('');
			setName('');
			navigate('/admindashboard');
		} catch (error) {
			setError('error, something went wrong!');
		}
	};

	useEffect(() => {
		getPlayer();
	}, []);

	if (error) {
		return (
			<div>
				<p>{error}</p>
			</div>
		);
	}

	if (!name) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<Box component='div' pt={3} sx={formStyles} textAlign='center'>
			<form onSubmit={updatePlayer}>
				<Box sx={playerPictureStyle} component='div'>
					<img src={window.location.origin + `/assets/images/${picture}.jpg`} />
				</Box>
				<Box mt={2}>
					<TextField
						required
						id='outlined-basic'
						label='name'
						variant='outlined'
						value={name}
						onChange={(event) => setName(event.target.value)}
						inputProps={{
							maxLength: 15,
						}}
					/>
				</Box>
				<Box mt={2} mb={2}>
					<TextField
						required
						id='outlined-basic'
						label='description'
						variant='outlined'
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						inputProps={{
							maxLength: 50,
						}}
					/>
				</Box>
				<Box mt={2} mb={2}>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel1a-content'
							id='panel1a-header'
						>
							<Typography variant='body1' component='p'>
								Select an image
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box sx={selectPictureStyle}>
								{images.map((image) => {
									return (
										<div key={image.id}>
											<img
												src={
													window.location.origin +
													`/assets/images/${image.picture}.jpg`
												}
											/>
											<Radio
												checked={picture === image.picture}
												onChange={handleRadioButtonChange}
												value={image.picture}
												name='radio-buttons'
											/>
										</div>
									);
								})}
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>
				<Button variant='contained' type='submit'>
					Submit
				</Button>
			</form>
		</Box>
	);
};

export default EditPlayer;
