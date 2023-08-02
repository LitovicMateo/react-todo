import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-ctx";
import { User } from "../../models/user-model";

const AuthScreen = () => {
	const authCtx = useContext(AuthContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [goal, setGoal] = useState(0);
	const [error, setError] = useState('');
	const [view, setView] = useState("login");

	const loginHandler = (ev: React.FormEvent) => {
		ev.preventDefault();
		if (view === "login") {
			authCtx.login(username, password);
		
		} else {
			
			const newUser: User = {
				username,
				password,
				id: Math.random().toString(),
				dailyCompleted: 0,
				dailyGoal: goal,
				isLoggedIn: false,
			};
			const exists = authCtx.validate(newUser)
			if (exists) {
				setError("Username is already taken!");
				return;
			}
			authCtx.createUser(newUser);
			setUsername('')
			setError('')
			setPassword('')
			setView('login')
		}
	};

	const changeViewHandler = () => {
		if (view === "login") {
			setView("signup");
		} else {
			setView("login");
		}
	};
	return (
		<div className=" h-[85%] flex flex-col justify-end items-center gap-1 ">
			{view === "login" ? (
				<form className=" flex m-auto flex-col gap-2 w-[80%] h-fit" onSubmit={loginHandler} action="">
					<input
					value={username}
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						className=" rounded-sm h-[30px] text-sm text-slate-700 placeholder-gray-300 px-2"
						type="text"
					/>
					<input
					value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						className=" rounded-sm h-[30px] text-sm text-slate-700 placeholder-gray-300 px-2"
						type="password"
					/>
					<button className=" text-sm bg-slate-700 rounded-md py-2 active:bg-slate-600 text-slate-200 font-bold select-non select-none">
						{view === "login" ? "Log In" : "Sign Up"}
					</button>
				</form>
			) : (
				<form className=" flex m-auto flex-col gap-2 w-[80%] h-fit" onSubmit={loginHandler} action="">
					<input
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						className=" rounded-sm h-[30px] text-sm text-slate-700 placeholder-gray-300 px-2"
						type="text"
					/>
					{error && <span className=" text-red-300 text-center ">{error}</span>}
					<input
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						className=" rounded-sm h-[30px] text-sm text-slate-700 placeholder-gray-300 px-2"
						type="password"
					/>
					<input
						placeholder="Daily goal"
						onChange={(e) => setGoal(+e.target.value)}
						className=" rounded-sm h-[30px] text-sm text-slate-700 placeholder-gray-300 px-2"
						type="number"
					/>
					<button className=" text-sm bg-slate-700 rounded-md py-2 active:bg-slate-600 text-slate-200 font-bold select-non select-none">
						{view === "login" ? "Log In" : "Sign Up"}
					</button>
				</form>
			)}
			<button
				onClick={changeViewHandler}
				className=" text-sm  rounded-md active:bg-slate-600 text-slate-400 font-bold select-non select-none"
			>
				{view === "login" ? "Create new user" : "Log in to an existing account"}
			</button>
		</div>
	);
};

export default AuthScreen;
