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

const GamesLogic = ({ games }) => {
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
						<TableCell>No.</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Locations</TableCell>
						<TableCell>Number of players</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{games.map((game, index) => {
						return (
							<TableRow key={index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell sx={linkStyle}>
									<Link to={`/games/${game.id}`}>
										{new Date(
											game.game.date_of_game.toMillis()
										).toLocaleDateString('en-US', options)}
									</Link>
								</TableCell>
								<TableCell>{game.game.location}</TableCell>
								<TableCell>{game.game.player_in_game.length}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

GamesLogic.propTypes = {
	games: PropTypes.any.isRequired,
};

export default GamesLogic;
