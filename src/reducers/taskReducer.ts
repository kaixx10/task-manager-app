import { Task, TaskAction, INITIAL_TASKS } from '@/types/task';

/**
 * Reducer untuk mengelola state daftar tugas mahasiswa.
 * Sesuai ketentuan Soal 5:
 * - ADD_TASK: menambahkan tugas baru
 * - DELETE_TASK: menghapus tugas berdasarkan id
 * - TOGGLE_STATUS: mengubah status tugas (Belum Dikerjakan <-> Selesai)
 * - RESET_TASKS: menghapus seluruh data tugas
 */
export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        id: action.payload.id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title: action.payload.title.trim(),
        course: action.payload.course.trim(),
        description: action.payload.description.trim(),
        deadline: action.payload.deadline.trim(),
        status: action.payload.status || 'Belum Dikerjakan',
        colorTag: action.payload.colorTag || '#6366F1',
        createdAt: action.payload.createdAt || new Date().toISOString().split('T')[0],
      };
      // Letakkan tugas baru di paling atas (LIFO)
      return [newTask, ...state];
    }

    case 'DELETE_TASK': {
      return state.filter((task) => task.id !== action.payload.id);
    }

    case 'TOGGLE_STATUS': {
      return state.map((task) => {
        if (task.id === action.payload.id) {
          const nextStatus = task.status === 'Belum Dikerjakan' ? 'Selesai' : 'Belum Dikerjakan';
          return { ...task, status: nextStatus };
        }
        return task;
      });
    }

    case 'RESET_TASKS': {
      // Menghapus seluruh data tugas sesuai instruksi PTM 5
      return [];
    }

    case 'LOAD_SAMPLE_TASKS': {
      // Memulihkan tugas contoh awal
      return [...INITIAL_TASKS];
    }

    default:
      return state;
  }
}
