import React, { useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { AnimatePresence, Reorder } from "framer-motion";
import { TodoContext } from "../../context/todos-ctx";
import { ThemeContext } from "../../context/theme-ctx";
import { AuthContext } from "../../context/auth-ctx";

const TodoList: React.FC = () => {
	const todoCtx = useContext(TodoContext);
	const themeCtx = useContext(ThemeContext);
	const authCtx = useContext(AuthContext);

	return (
		<Reorder.Group axis="y" values={todoCtx.todos} onReorder={todoCtx.setTodos} className="w-full mt-4 text-sm pb-12">
			<AnimatePresence>
				{todoCtx.todos.filter((t) => t.user === authCtx.activeUser!.id && t.completed === false).length === 0 ? (
					<div
						className={`
						${"fixed top-[50%] translate-y-[-50%] text-xl font-semibold flex justify-center items-center h- m-auto w-full transition-colors duration-200 ease-linear select-none"}
						${themeCtx.theme ? "text-slate-200" : "text-slate-700"}
					`}
					>
						<p>All tasks are completed!</p>
					</div>
				) : (
					todoCtx.todos
						.filter((t) => t.user === authCtx.activeUser!.id && t.completed === false)
						.map((t, i) => {
							return <TodoItem todo={t} key={t.id} index={i} />;
						})
				)}
			</AnimatePresence>
		</Reorder.Group>
	);
};

export default TodoList;
