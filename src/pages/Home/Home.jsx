import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PGLogic from '../../components/PGLogic/PGLogic';
import HomeCard from '../../components/HomeComponent/HomeCard';
import { picture, pictureText, homePageContent } from './styles';

const Home = () => {
	return (
		<Box component='div' pt={5}>
			<Box component='div' mt={5} sx={homePageContent}>
				<PGLogic />
			</Box>
			<Box p={4}>
				<Typography gutterBottom variant='h4' component='h4' textAlign='center'>
					EVENTS
				</Typography>
				<HomeCard />
			</Box>
		</Box>
	);
};

export default Home;
