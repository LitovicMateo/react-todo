import React, { useContext } from "react";
import { TodoItemI } from "../../models/todo-item";
import { Reorder } from "framer-motion";
import { ThemeContext } from "../../context/theme-ctx";
import { TodoContext } from "../../context/todos-ctx";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ModalContext, ModalState } from "../../context/modal-ctx";
import { AuthContext } from "../../context/auth-ctx";

interface Props {
	todo: TodoItemI;
	index: number;
}

const TodoItem: React.FC<Props> = ({ todo, index }) => {
	const themeCtx = useContext(ThemeContext);
	const todoCtx = useContext(TodoContext);
	const modalCtx = useContext(ModalContext);
	const authCtx = useContext(AuthContext);

	const onCompleteHandler = (id: string) => {
		todoCtx.complete(id);
		authCtx.completeTask(todoCtx.todos.filter(t => t.completed === true && t.user === authCtx.activeUser!.id).length)
	};

	const onEditHandler = (id: string) => {
		modalCtx.changeState(ModalState.edit);
		todoCtx.setEdit(id);
	};

	const onDeleteHandler = (id: string) => {
		modalCtx.changeState(ModalState.delete);
		todoCtx.setEdit(id);
	};

	return (
		<Reorder.Item
			drag
			value={todo}
			layout
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ type: "tween", duration: 0.15, delay: index * 0.015 + 0.02 }}
			className={`
				${"  sm:w-[50%] max-w-xl min-w-[200px] select-none rounded-md max-h-12 w-4/5 m-auto h-[60px] mb-4 transition-colors ease-linear duration-200"}
				${themeCtx.theme ? "bg-slate-200 hover:bg-slate-100" : "bg-slate-600 hover:bg-slate-400"}
				`}
		>
			<div className=" grid grid-cols-[auto_5fr_auto] w-[100%] content-center items-center py-1 h-[100%] px-2 gap-4">
				<div className="flex justify-center items-center">
					<button
						onClick={onCompleteHandler.bind(this, todo.id)}
						className={`
					${"flex-none w-4 h-4 rounded-full transition-colors duration-300"}
					${themeCtx.theme ? "bg-slate-500 hover:bg-slate-700 " : "bg-slate-200 hover:bg-slate-100 "}
					`}
					></button>
				</div>

				<div
					className={`
					${" flex flex-col justify-center items-start text-sm transition-colors duration-200 ease-linear text-ellipsis ... overflow-hidden max-w-[350px] "}
					`}
				>
					<span
						className={`
							${themeCtx.theme ? "text-slate-600" : "text-slate-200"} 
							${" inline-block transition-colors duration-200 ease-linear leading-4 capitalize "}`}
					>
						{todo.task}
					</span>
					<span className=" text-xs text-slate-400">
						{todo.label} {!!todo.label && todo.label!.trim().length > 0 && todo.date ? "|" : ""}{" "}
						{todo.date.toDateString().slice(4, 10)}
					</span>
				</div>

				<div className="flex flex-col">
					<EditIcon
						onClick={onEditHandler.bind(this, todo.id)}
						fontSize="small"
						className={`${
							themeCtx.theme ? "text-slate-600" : "text-slate-200"
						} ${"transition-colors duration-200 ease-linear"}`}
					/>
					<DeleteForeverIcon
						onClick={onDeleteHandler.bind(this, todo.id)}
						fontSize="small"
						className={`${
							themeCtx.theme ? " text-[crimson]" : "text-red-300"
						} ${"transition-colors duration-200 ease-linear"}`}
					/>
				</div>
			</div>
		</Reorder.Item>
	);
};

export default TodoItem;
