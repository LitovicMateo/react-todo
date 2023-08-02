import React, { useContext } from "react";
import Modal from "../ModalScreens/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContext, ModalState } from "../../context/modal-ctx";

interface Props {
	// onClick: (open: boolean, mode: string) => void;
	children?: React.ReactNode;
}

const Backdrop: React.FC<Props> = ({ children }) => {
	const modalCtx = useContext(ModalContext);

	const modalHandler = () => {
		modalCtx!.changeState(ModalState.close);
	};

	return (
		<>
			<div
				className={`${"w-full h-screen bg-gray-800 fixed top-0 z-1000 transition-all duration-200 ease-linear flex justify-end"} 
				${modalCtx.open ? "left-0" : "left-[-100%]"}`}
			>
				<CloseIcon
					fontSize="large"
					className={`
					${" m-3 text-slate-200 active:scale-105 transition-all ease-linear duration-800 cursor-pointer"}`}
					onClick={modalHandler}
				/>
			</div>
			<Modal />
		</>
	);
};

export default Backdrop;
