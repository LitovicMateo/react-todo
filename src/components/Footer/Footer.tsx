import React, {useContext} from "react";
import Button from "../Button/Button";
import { ModalContext } from "../../context/modal-ctx";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../../context/auth-ctx";
import { ThemeContext } from "../../context/theme-ctx";


const Footer: React.FC = () => {

	const modalCtx = useContext(ModalContext)
	const authCtx = useContext(AuthContext)
	const themeCtx = useContext(ThemeContext)

	const logoutHandler = () => {
		modalCtx.close();
		authCtx.logout();
		themeCtx.setDark()
	}

	return (
		<div className={`
			${"z-10 flex justify-center items-center fixed bottom-0 left-0 w-full bg-slate-700 h-[60px] text-gray-200 text-2xl font-bold select-none"}
			`}>
			{!modalCtx.open && authCtx.isLoggedIn && <Button />}
			{authCtx.isLoggedIn && <LogoutIcon onClick={logoutHandler} className=" fixed right-4" fontSize="medium"  />}
		</div>
	);
};

export default Footer;
