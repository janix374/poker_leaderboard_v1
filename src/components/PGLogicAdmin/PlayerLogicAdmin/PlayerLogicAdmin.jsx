import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	TableContainer,
	TableHead,
	Table,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Avatar,
} from '@mui/material';
import {
	plyersTable,
	buttonStyle,
	linkStyle,
	imageAvatarStayle,
	avatatStyle,
} from './styles';
import { Link } from 'react-router-dom';

const PlayerLogicAdmin = ({ players, handlePlayerEdit }) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table' sx={plyersTable}>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Edit/Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{players.map((player) => {
						return (
							<TableRow key={player.id}>
								<TableCell sx={avatatStyle}>
									<Avatar
										alt={player.player.picture}
										src={
											window.location.origin +
											`/assets/images/${player.player.picture}.jpg`
										}
										sx={imageAvatarStayle}
									/>
								</TableCell>
								<TableCell sx={linkStyle}>
									<Link to={`/player/${player.id}`}>{player.player.name}</Link>
								</TableCell>

								<TableCell>
									<Button
										variant='contained'
										sx={buttonStyle}
										onClick={(event) => handlePlayerEdit(player.id)}
									>
										edit
									</Button>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

PlayerLogicAdmin.propTypes = {
	players: PropTypes.any.isRequired,
	handlePlayerEdit: PropTypes.func.isRequired,
};

export default PlayerLogicAdmin;
