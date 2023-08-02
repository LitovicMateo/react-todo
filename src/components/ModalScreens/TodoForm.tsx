import React, { FormEvent, useContext, useState } from "react";
import { ModalContext, ModalState } from "../../context/modal-ctx";
import { TodoItemI } from "../../models/todo-item";
import { TodoContext } from "../../context/todos-ctx";
import { Priority } from "../../models/todo-item";
import { AuthContext } from "../../context/auth-ctx";

const TodoForm = () => {
	const modalCtx = useContext(ModalContext);
	const todoCtx = useContext(TodoContext);
	const authCtx = useContext(AuthContext);

	const [task, setTask] = useState(modalCtx.mode === "edit" ? todoCtx.todoToEdit[0].task : "");
	const [label, setLabel] = useState(modalCtx.mode === "edit" ? todoCtx.todoToEdit[0].label : "");
	const [priority, setPriority] = useState<Priority>(modalCtx.mode === "edit" ? todoCtx.todoToEdit[0].priority : Priority.HIGH);
	const [date, setDate] = useState(modalCtx.mode === "edit" ? todoCtx.todoToEdit[0].date : new Date());
	const [taskError, setTaskError] = useState<string | null>(null);
	const [dateError, setDateError] = useState<string | null>(null);

	const submitFormHandler = (ev: FormEvent) => {
		ev.preventDefault();
		setTaskError(null);
		setDateError(null);

		// validation

		if (task.trim().length === 0) {
			setTaskError("Task cannot be empty!");
			return;
		}

		const currentDate = new Date().setHours(0, 0, 0, 0);
		const chosenDate = date.setHours(0, 0, 0, 0);
		if (chosenDate < currentDate) {
			setDateError("This date has already passed!");
			return;
		}
		console.log("Form submitted!", task, label, priority, date.toDateString());
		const newTask: TodoItemI = {
			task,
			user: authCtx.activeUser!.id,
			label,
			priority,
			date: date,
			id: modalCtx.mode === "edit" ? todoCtx.todoToEdit[0].id : Math.random().toString(),
			completed: false
		};

		if (modalCtx.mode === "edit") {
			todoCtx.edit(newTask);
		} else {
			todoCtx.add(newTask);
		}
		modalCtx.changeState(ModalState.close);
		setTaskError(null);
		setDateError(null);
		setTask("");
		setLabel("");
		setDate(new Date());
	};

	return (
		<div>
			<form onSubmit={submitFormHandler} className=" flex m-auto flex-col gap-2 w-[80%] h-fit" action="">
				<input
					placeholder="Enter the task"
					onChange={(e) => setTask(e.target.value)}
					className=" rounded-sm h-[30px] text-sm text-slate-700 placeholder-gray-300 px-2"
					value={task}
					type="text"
					name=""
					id="task"
				/>
				{taskError && <p className=" text-red-300 text-xs text-center">{taskError}</p>}
				<input
					placeholder="Enter the label"
					onChange={(e) => setLabel(e.target.value)}
					className=" rounded-sm h-[30px] text-sm text-slate-700 px-2 placeholder-gray-300"
					value={label}
					type="text"
					name=""
					id="label"
				/>
				<select
					value={priority}
					className=" rounded-sm h-[30px] text-sm text-slate-700 px-2"
					name=""
					id="priority"
					onChange={(e) => setPriority(e.target.value as Priority)}
				>
					<option value={Priority.HIGH}> High</option>
					<option value={Priority.MEDIUM}>Medium</option>
					<option value={Priority.LOW}>Low</option>
				</select>
				<input
					className=" rounded-sm h-[30px] text-sm text-slate-700 px-2"
					type="date"
					value={date.toISOString().slice(0, 10)}
					onChange={(e) => setDate(new Date(e.target.value))}
					name=""
					id="date"
				/>
				{dateError && <p className=" text-red-300 text-xs text-center">{dateError}</p>}

				<button className=" text-sm bg-slate-700  rounded-md py-2 active:bg-slate-600 select-none" type="submit">
					{modalCtx.mode === "edit" ? "Edit the Task" : "Add new Task"}
				</button>
			</form>
		</div>
	);
};

export default TodoForm;
