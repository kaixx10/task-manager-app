import { Task, TaskAction } from '@/types/task';

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload, ...state];
    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.payload.id);
    case 'TOGGLE_STATUS':
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, status: t.status === 'Selesai' ? 'Belum Dikerjakan' : 'Selesai' }
          : t
      );
    case 'RESET_TASKS':
      return [];
    default:
      return state;
  }
}
