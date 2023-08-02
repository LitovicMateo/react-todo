import React, { createContext, useState } from 'react'

interface contextProps {
	open: boolean;
	changeState: (arg0: ModalState) => void;
	mode: string;
	setAdd: () => void;
	setEdit: () => void;
	close: () => void;
}

export enum ModalState {
	add = "add",
	edit = "edit",
	goal = "goal",
	close = "close",
	delete = "delete",
	login = "login"
}


const ModalContext = createContext<contextProps>({open: false, mode: '', changeState: () => {}, close: () => {}, setEdit: () => {}, setAdd: () => {}} );

const ModalProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [mode, setMode] = useState('')

	const changeState = (state: ModalState) => {
		setIsOpen(prev => !prev);
		setMode(state)
	}

	const closeModal = () => {
		setIsOpen(false)
		setMode("close")
	}

	const setAdd = () => {
		setMode('add')
	}

	const setEdit = () => {
		setMode('edit')
	}

	return(
		<ModalContext.Provider value={{open: isOpen, changeState: changeState, mode: mode, setAdd: setAdd, setEdit: setEdit, close: closeModal }}>
			{children}
		</ModalContext.Provider>
	)
}

export { ModalContext, ModalProvider }