import React, { createContext, useState } from "react";
import { Priority, TodoItemI } from "../models/todo-item";

interface contextProps {
	todos: TodoItemI[];
	add: (todo: TodoItemI) => void;
	edit: (todo: TodoItemI) => void;
	complete: (id: string) => void;
	delete: (id: string) => void;
	setEdit: (id: string) => void;
	setTodos: (...arg0: any) => void;
	count: number;
	goal: number;
	todoToEdit: TodoItemI[];
	goalSetter: (arg0: number) => void;
}

const TODOS: TodoItemI[] = [
	{
		id: "1",
		user: "1",
		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "2",
		user: "2",
		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "3",
		user: "1",

		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "4",
		user: "2",

		task: "Create Todo",
		label: "Fitness",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "5",
		user: "2",

		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "6",
		user: "1",

		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "7",
		user: "1",

		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "8",
		user: "1",

		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "9",
		user: "2",

		task: "Create Todo",
		label: "Fitness",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
	{
		id: "10",
		user: "1",

		task: "Create Todo",
		priority: Priority.HIGH,
		date: new Date(),
		completed: false,
	},
];

const TodoContext = createContext<contextProps>({
	todos: TODOS,
	count: 0,
	goal: 5,
	todoToEdit: [],
	setTodos: () => {},
	add: () => {},
	edit: () => {},
	delete: () => {},
	complete: () => {},
	setEdit: () => {},
	goalSetter: () => {},
});

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [todos, setTodos] = useState<TodoItemI[]>(TODOS);
	const [toEdit, setToEdit] = useState<TodoItemI[]>([]);
	const [count, setCount] = useState<number>(0);
	const [goal, setGoal] = useState<number>(8);

	const addTask = (todo: TodoItemI) => {
		setTodos((prevT) => [todo, ...prevT]);
	};

	const completeTask = (id: string) => {
		const cmpTd = todos.find((t) => t.id === id);
		if (!cmpTd) {
			return
		}
		const updatedArr = todos.map((todo) => {
			if (todo.id === id) {
				cmpTd!.completed = true;
				return cmpTd;
			} else {
				return todo;
			}})
		setTodos(updatedArr)
		setCount((prevCount) => prevCount + 1);
	};

	const editTask = (todo: TodoItemI) => {
		console.log(todo);
		const newArray = todos.map((t) => {
			if (t.id === todo.id) {
				return { ...todo };
			} else {
				return t;
			}
		});

		console.table(newArray);
		setTodos(newArray);
	};

	const deleteTask = (id: string) => {
		setTodos((prev) => {
			return prev.filter((t) => t.id !== id);
		});
	};

	const setEdit = (id: string) => {
		const todo = todos.filter((t) => t.id === id);
		console.table(todo);
		if (todo.length !== 1) {
			return;
		}
		setToEdit(todo);
	};

	const goalHandler = (goal: number) => {
		setGoal(goal);
	};

	return (
		<TodoContext.Provider
			value={{
				todos: todos,
				setTodos: setTodos,
				add: addTask,
				complete: completeTask,
				edit: editTask,
				delete: deleteTask,
				setEdit: setEdit,
				count: count,
				goal: goal,
				goalSetter: goalHandler,
				todoToEdit: toEdit,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export { TodoContext, TodoProvider };
