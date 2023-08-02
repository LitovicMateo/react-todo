import React, { useContext } from "react";
import { ModalContext } from "../../context/modal-ctx";
import TodoForm from "./TodoForm";
import DeleteForm from "./DeleteForm";
import Options from "../Modal/Options";
import Goal from "./Goal";

const Modal: React.FC = () => {
	const modalCtx = useContext(ModalContext);

	return (
		<div
			className={`
		${"fixed top-[50%] translate-y-[-50%] z-2000 h-fit py-8 px-0 w-[80%] max-w-[400px] "}
		${modalCtx.open ? "  left-[50%] translate-x-[-50%] " : " fixed top-[-100%] left-[-100%]"}
		${" border-solid border-slate-200 rounded-md border-[1px] "}
		${" flex flex-col justify-center items-center"}
		${" text-slate-200 text-4xl font-bold select-none"}
		${" transition-all duration-200 ease-linear"}
		`}
		>
			{modalCtx.mode === "add" && <TodoForm />}
			{modalCtx.mode === "edit" && <TodoForm />}
			{modalCtx.mode === "delete" && <DeleteForm />}
			{modalCtx.mode === "options" && <Options />}
			{modalCtx.mode === "goal" && <Goal />}

		</div>
	);
};

export default Modal;
