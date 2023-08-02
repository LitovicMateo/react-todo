import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";

import { useContext } from "react";
import { ThemeContext } from "./context/theme-ctx";
import Backdrop from "./components/Modal/Backdrop";
import { AuthContext } from "./context/auth-ctx";
import AuthScreen from "./components/AuthPrompt/AuthPrompt";

function App() {
	const themeCtx = useContext(ThemeContext);
	const authCtx = useContext(AuthContext);

	return (
		<div className={`${themeCtx.theme ? "bg-slate-600" : "bg-slate-100"}`}>
			<div className=""></div>
			<Header />
			<div
				className={`
				${themeCtx.theme ? "bg-slate-600" : "bg-slate-100"}  
				${"py-2 overflow-scroll h-screen no-scrollbar transition-colors duration-200 ease-linear"}`}
			>
				{!authCtx.isLoggedIn ? <AuthScreen /> : <TodoList />}
			</div>
			<Footer />
			<Backdrop />
		</div>
	);
}

export default App;
