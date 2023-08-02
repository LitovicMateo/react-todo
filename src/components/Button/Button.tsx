import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext } from "react";
import { ModalContext, ModalState } from "../../context/modal-ctx";

const Button: React.FC = () => {

	const modalCtx = useContext(ModalContext)


	const newTaskHandler = () => {
		modalCtx.changeState(ModalState.add)
	};

	return (
		<div onClick={newTaskHandler} className=" cursor-pointer lg:hidden  flex justify-center items-center fixed origin-center left-[50%] translate-x-[-50%] bottom-[1em] z-100 rounded-full bg-slate-300 shadow-slate-950 shadow-lg select-none active:scale-110 transition-all duration-200 ease-in-out">
			<AddCircleOutlineIcon fontSize="large" className="text-slate-700 text-center " />
		</div>
	);
};

export default Button;
