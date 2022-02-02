import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../../services/firebase/firebaseConfig';
import { images } from '../../../assets/db/images';
import {
	Button,
	Box,
	Typography,
	TextField,
	Radio,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { selectPictureStyle, pageContainerStyle } from './styles';

const NewPlayer = () => {
	let params = useParams();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [picture, setPicture] = useState(null);
	const [error, setError] = useState(null);
	let navigate = useNavigate();

	const handleRadioButtonChange = (event) => {
		setPicture(event.target.value);
	};

	const handleSubmite = async (event) => {
		event.preventDefault();
		try {
			await addDoc(collection(db, 'players'), {
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

	if (error) {
		return (
			<Box component='div' pt={3} textAlign='center'>
				<Typography variant='h6' component='div'>
					{error}
				</Typography>
			</Box>
		);
	}

	return (
		<Box component='div' pt={3} textAlign='center' sx={pageContainerStyle}>
			<form onSubmit={handleSubmite}>
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

export default NewPlayer;
