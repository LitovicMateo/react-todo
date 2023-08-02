import React, { useContext } from "react";
import { TodoContext } from "../../context/todos-ctx";
import { ModalContext, ModalState } from "../../context/modal-ctx";

const DeleteForm = () => {
	const todoCtx = useContext(TodoContext);
	const modalCtx = useContext(ModalContext);

	const closeModal = () => {
		modalCtx.changeState(ModalState.close);
	};

	const deleteTask = (id: string) => {
		todoCtx.delete(id);
		modalCtx.changeState(ModalState.close);
	};
	return (
		<div className=" py-4 px-2">
			<h2 className=" text-lg text-center">Are you sure you want to delete this task?</h2>
			<div className=" flex justify-between gap-2 px-2 mt-4">
				<button className=" w-[100%] text-sm bg-slate-700 rounded-md py-2 active:bg-slate-600 select-none" onClick={closeModal}>
					Cancel
				</button>
				<button
					className=" w-[100%] text-sm bg-[crimson] rounded-md py-2 active:bg-slate-600 select-none"
					onClick={deleteTask.bind(this, todoCtx.todoToEdit[0].id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteForm;
