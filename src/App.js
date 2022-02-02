import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './components/ScrollToTop/ScrollToRop';
import {
	Home,
	AdminDashboard,
	LogIn,
	NavigationBar,
	Player,
	Game,
	NotFound,
	EditPlayer,
	NewPlayer,
	NewGame,
	Games,
	Footer,
	PokerTutorial,
} from './pages';
import PrivateRout from './services/auth/PrivateRout';
import { AuthProvider } from './hooks/AuthContext';
import { containerStyle } from './styles/styles';

const theme = createTheme({
	typography: {
		fontFamily: ['Open Sans', 'Roboto', 'Nunito'].join(','),
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<CssBaseline />
				<ScrollToTop />
				<AuthProvider>
					<NavigationBar />
					<Box sx={containerStyle}>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='poker' element={<PokerTutorial />} />
							<Route path='loginadimin' element={<LogIn />} />
							<Route path='player'>
								<Route path=':playerID' element={<Player />} />
								<Route path='*' element={<NotFound />} />
							</Route>
							<Route path='games'>
								<Route path='' element={<Games />} />
								<Route path=':gameID' element={<Game />} />
							</Route>
							<Route path='admindashboard' element={<PrivateRout />}>
								<Route path='' element={<AdminDashboard />} />
								<Route path=':editplayerID' element={<EditPlayer />} />
								<Route path='newplayer' element={<NewPlayer />} />
								<Route path='newgame' element={<NewGame />} />
							</Route>
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Box>
					<Footer />
				</AuthProvider>
			</Router>
		</ThemeProvider>
	);
};

export default App;
