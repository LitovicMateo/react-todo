import React, { useContext, useState } from 'react'
import { TodoContext } from '../../context/todos-ctx'
import { ModalContext, ModalState } from '../../context/modal-ctx'

const Goal = () => {

	const [goal, setGoal] = useState(1)
	const todoCtx = useContext(TodoContext)
	const modalCtx = useContext(ModalContext)

	const goalHandler = (ev: React.FormEvent) => {
		ev.preventDefault();
		todoCtx.goalSetter(goal);
		modalCtx.changeState(ModalState.close)

	}
	return (
		<form className=" flex m-auto flex-col gap-2 w-[80%] h-fit" onSubmit={goalHandler} >
			<input onChange={e => setGoal(+e.target.value)}  className=" rounded-sm h-[30px] text-sm text-slate-700 placeholder-gray-300 px-2" type="number" name="" id="" />
			<button className=" text-sm bg-slate-700 rounded-md py-2 active:bg-slate-600 select-none" type="submit">Set your daily goal</button>
		</form>
	)
}

export default Goal