export interface TodoItemI {
	id: string;
	task: string;
	label?: string;
	date: Date;
	priority: Priority;
	user: string;
	completed: boolean
}

export enum Priority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
}