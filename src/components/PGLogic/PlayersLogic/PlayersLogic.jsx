import React from 'react';
import PropTypes from 'prop-types';
import {
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
	linkStyle,
	avatatStyle,
	imageAvatarStayle,
} from './styles';
import { Link } from 'react-router-dom';

const PlayersLogic = ({ players, games }) => {
	const result = players.map((item) => {
		const sum = sumOfPoints(item.id);
		const number = numberOfGames(item.id);
		item['sum'] = sum || 0;
		item['number_of_game'] = number || 0;
		return item;
	});

	function sumOfPoints(id) {
		if (games.length > 0) {
			const filterGames = games.filter((item) => item.player_id == id);
			if (filterGames.length > 0) {
				return filterGames
					.map((item) => item.points)
					.reduce((sum, val) => sum + val);
			} else {
				return 0;
			}
		}
	}

	function numberOfGames(id) {
		if (games.length > 0) {
			return games.filter((item) => item.player_id == id).length;
		}
	}

	return (
		<TableContainer component={Paper}>
			<Table aria-label='simple table' sx={plyersTable}>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Player</TableCell>
						<TableCell align='center'>Points</TableCell>
						<TableCell align='center'>Number of Games</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{result.map((player) => {
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
								<TableCell align='center'>{player.sum}</TableCell>
								<TableCell align='center'>{player.number_of_game}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

PlayersLogic.propTypes = {
	players: PropTypes.any.isRequired,
	games: PropTypes.any.isRequired,
};

export default PlayersLogic;
