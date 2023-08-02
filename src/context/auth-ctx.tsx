import React, { createContext, useState } from "react";
import {User} from '../models/user-model'

const USERS = [
	{
		id: "1",
		username: "Mateo",
		password: "mateomateo",
		dailyCompleted: 0,
		dailyGoal: 6,
		isLoggedIn: false,
	},
	{
		id: "2",
		username: "Lea",
		password: "lealea",
		dailyCompleted: 0,
		dailyGoal: 8,
		isLoggedIn: false,
	},
];

const AuthContext = createContext<{ 
		isLoggedIn: boolean;
		activeUser: User | undefined;
		completed: number,
		createUser: (user: User) => void,
		completeTask: (n: number) => void,
		login: (u: string, p: string) => void; 
		logout: () => void; 
		validate: (user: User) => boolean 
		}>(
			{
		isLoggedIn: false,
		activeUser: USERS[0],
		completed: 0,
		createUser: (user: User) => {},
		completeTask: (n: number) => {},
		login: (u: string, p: string) => {},
		logout: () => {},
		validate: (user: User) => false,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [users, setUsers] = useState<User[]>(USERS);
	const [completed, setCompleted] = useState(0);
	const [activeUser, setActiveUser] = useState<User | undefined>();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = (username: string, password: string) => {
		const user = users.find((u) => u.username === username);

		if (user) {
			if (password === user.password) {
				user.isLoggedIn = true;
				setUsers((prev) =>
					prev.map((u) => {
						if (u.id === user.id) {
							return user;
						} else {
							return u;
						}
					})
				);
				setCompleted(user.dailyCompleted)
				setIsLoggedIn(true);
				setActiveUser(user)
			}
		}
	};

	const logout = () => {
		setIsLoggedIn(false);
		setUsers(u => u.map(us => {
			if (activeUser!.id === us.id) {
				us.dailyCompleted = completed;
				return us;
			} else {
				return us
			}
		}))
		setActiveUser(undefined)
	};

	const completedTasks = (n: number) => {
		setCompleted(n)
	}

	const createUser = (user: User) => {

		setUsers(prev => [...prev, user])
	}

	const checkIfUserExist = (user: User) => {
		const exist = users.find(u => u.username === user.username)
		if (exist) {
			return true
		} else {
			return false
		}

	}

	return <AuthContext.Provider value={	{ 
		isLoggedIn: isLoggedIn, 
		login: login, 
		logout: logout,
		createUser: createUser,
		validate: checkIfUserExist,
		activeUser: activeUser, 
		completed: completed, 
		completeTask: completedTasks }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
