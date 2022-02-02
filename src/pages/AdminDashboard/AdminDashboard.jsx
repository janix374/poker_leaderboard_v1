import React, { useState } from 'react';
import { Box } from '@mui/material';
import PGLogicAdmin from '../../components/PGLogicAdmin/PGLogicAdmin';
import { pageContainerStyle } from './styles';

const AdminDashboard = () => {
	return (
		<Box component='div' pt={5} sx={pageContainerStyle}>
			<PGLogicAdmin />
		</Box>
	);
};

export default AdminDashboard;
