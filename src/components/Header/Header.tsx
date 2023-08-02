import { useContext } from "react";
import { ThemeContext } from "../../context/theme-ctx";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import CheckIcon from "@mui/icons-material/Check";
import { ModalContext, ModalState } from "../../context/modal-ctx";
import { AuthContext } from "../../context/auth-ctx";

const Header = () => {
	const themeCtx = useContext(ThemeContext);
	const modalCtx = useContext(ModalContext);
	const authCtx = useContext(AuthContext);

	const openGoalSetter = () => {
		modalCtx.changeState(ModalState.goal);
	};

	return (
		<div
			className={` 
				${" select-none flex justify-center items-center w-full sticky top-0 left-0 h-[60px] text-2xl font-bold transition-colors duration-200 ease-linear"}
				${"bg-slate-700 text-gray-200"}
				`}
		>
			<h1>ReactTodo</h1>
			{authCtx.isLoggedIn && (
				<span onClick={openGoalSetter} className="  fixed top-3 left-3 text-gray-200 text-base font-normal cursor-pointer">
					{authCtx.completed >= authCtx.activeUser!.dailyGoal ? (
						<CheckIcon fontSize="medium" className="text-gray-200" />
					) : (
						authCtx.completed + "/" + authCtx.activeUser!.dailyGoal
					)}
				</span>
			)}
			{authCtx.isLoggedIn && (
				<button className=" fixed top-1.5 right-3 text-slate-100 transition-all duration-200 ease-linear" onClick={themeCtx.setter}>
					{themeCtx.theme ? <WbSunnyIcon fontSize="medium" /> : <ModeNightIcon fontSize="medium" />}
				</button>
			)}
		</div>
	);
};

export default Header;
