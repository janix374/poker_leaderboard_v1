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
} from '@mui/material';
import { buttonStyle, linkStyle } from './styles';
import { Link } from 'react-router-dom';

const GamesLogicAdmin = ({ games, deleteGames }) => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Number</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Locations</TableCell>
						<TableCell>Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{games.map((game, index) => {
						return (
							<TableRow key={game.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell sx={linkStyle}>
									<Link to={`/games/${game.id}`}>
										{new Date(
											game.game.date_of_game.toMillis()
										).toLocaleDateString('en-US', options)}
									</Link>
								</TableCell>
								<TableCell>{game.game.location}</TableCell>
								<TableCell>
									<Button
										variant='contained'
										sx={buttonStyle}
										onClick={(event) => deleteGames(game.id)}
									>
										delete
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

GamesLogicAdmin.propTypes = {
	games: PropTypes.any.isRequired,
	deleteGames: PropTypes.func.isRequired,
};

export default GamesLogicAdmin;
