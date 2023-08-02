export interface User {
		id: string,
		username: string,
		password: string,
		dailyCompleted: number,
		dailyGoal: number,
		isLoggedIn: boolean,
}