import React, { createContext, useState} from 'react'

interface contextProps {
	theme: boolean;
	setter: () => void
	setDark: () => void
}

const ThemeContext = createContext<contextProps>({theme: true, setter: () => {}, setDark: () => {}});

const ThemeProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
	const [isDarkTheme, setIsDarkTheme] = useState(true)

	const toggleTheme = () => {
		setIsDarkTheme(prevTheme => !prevTheme)
	}

	const setDark = () => {
		setIsDarkTheme(true)
	}

	return(
		<ThemeContext.Provider value={{theme: isDarkTheme, setter: toggleTheme, setDark: setDark}}>
			{children}
		</ThemeContext.Provider>
	)
}

export { ThemeContext, ThemeProvider }