import React, { useContext, useState, useEffect, createContext } from 'react';
import {
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from '@firebase/auth';
import { auth } from '../services/firebase/firebaseConfig';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, [currentUser]);

	const value = {
		currentUser,
		signup,
		login,
		logout,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.any,
};
