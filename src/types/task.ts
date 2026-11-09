export type TaskStatus = 'Belum Dikerjakan' | 'Selesai';

export interface Task {
  id: string;
  title: string; // nama tugas
  course: string; // mata kuliah
  description: string; // deskripsi
  deadline: string; // format YYYY-MM-DD
  status: TaskStatus;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'TOGGLE_STATUS'; payload: { id: string } }
  | { type: 'RESET_TASKS' };

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Aplikasi Task Manager React Native',
    course: 'Pemrograman Visual',
    description: 'Membuat aplikasi manajemen tugas dengan Props dan React Hooks.',
    deadline: '2026-11-15',
    status: 'Belum Dikerjakan',
  },
  {
    id: 'task-2',
    title: 'Makalah Etika Kecerdasan Buatan',
    course: 'Kecerdasan Buatan',
    description: 'Esai 5 halaman tentang dampak etis agen cerdas otonom.',
    deadline: '2026-11-18',
    status: 'Belum Dikerjakan',
  },
  {
    id: 'task-3',
    title: 'Normalisasi Database sampai BCNF',
    course: 'Basis Data Lanjut',
    description: 'Mendesain skema relasional ternormalisasi dan optimasi indeks.',
    deadline: '2026-11-12',
    status: 'Selesai',
  },
  {
    id: 'task-4',
    title: 'Simulasi OSPF Multi-Area',
    course: 'Jaringan Komputer',
    description: 'Konfigurasi OSPF di Packet Tracer dan validasi routing table.',
    deadline: '2026-11-20',
    status: 'Belum Dikerjakan',
  },
  {
    id: 'task-5',
    title: 'Analisis Kompleksitas Dijkstra vs A*',
    course: 'Desain & Analisis Algoritma',
    description: 'Benchmark runtime shortest path pada graf berbobot besar.',
    deadline: '2026-11-10',
    status: 'Selesai',
  },
];
