import React, { useRef, useState, useEffect } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { formStyle } from './styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const LogIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [loading, setloading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const { login } = useAuth();

	useEffect(() => {
		if (submitting) {
			navigate('/admindashboard');
		}
	}, [submitting]);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError('');
			setloading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			setSubmitting(true);
		} catch (error) {
			setError(error.message);
		}
		setloading(false);
	}

	return (
		<Box
			component='form'
			sx={formStyle}
			textAlign='center'
			onSubmit={handleSubmit}
		>
			{error && <Alert severity='error'>{error}</Alert>}
			<TextField
				required
				fullWidth
				variant='outlined'
				label='Email Address'
				name='email'
				autoComplete='email'
				inputRef={emailRef}
				id='email'
			/>
			<TextField
				required
				fullWidth
				variant='outlined'
				name='password'
				label='Password'
				type='password'
				id='password'
				autoComplete='current-password'
				inputRef={passwordRef}
			/>
			<Button variant='outlined' type='submit' disabled={loading}>
				Log in
			</Button>
		</Box>
	);
};

export default LogIn;
