export type TaskStatus = 'Belum Dikerjakan' | 'Selesai';

export interface Task {
  id: string;
  title: string;        // Nama tugas
  course: string;       // Nama mata kuliah
  description: string;  // Deskripsi tugas
  deadline: string;     // Tanggal pengumpulan (deadline)
  status: TaskStatus;   // Status tugas (Belum Dikerjakan atau Selesai)
  colorTag?: string;    // Warna aksen visual mata kuliah
  createdAt?: string;   // Timestamp pembuatan
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id'> & { id?: string } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'TOGGLE_STATUS'; payload: { id: string } }
  | { type: 'RESET_TASKS' }
  | { type: 'LOAD_SAMPLE_TASKS' };

export const COURSE_PRESETS: { name: string; color: string }[] = [
  { name: 'Pemrograman Visual', color: '#6366F1' },       // Indigo
  { name: 'Kecerdasan Buatan', color: '#8B5CF6' },        // Purple
  { name: 'Basis Data Lanjut', color: '#0EA5E9' },        // Sky
  { name: 'Jaringan Komputer', color: '#10B981' },        // Emerald
  { name: 'Desain & Analisis Algoritma', color: '#F59E0B' }, // Amber
  { name: 'Interaksi Manusia & Komputer', color: '#EC4899' }, // Pink
  { name: 'Rekayasa Perangkat Lunak', color: '#14B8A6' },   // Teal
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Implementasi 7 React Hooks & FlatList',
    course: 'Pemrograman Visual',
    description: 'Menyelesaikan modul praktikum PTM 5: integrasi useState, useEffect, useMemo, useCallback, useRef, dan useReducer pada task manager.',
    deadline: '2026-11-15',
    status: 'Belum Dikerjakan',
    colorTag: '#6366F1',
    createdAt: '2026-11-09',
  },
  {
    id: 'task-2',
    title: 'Makalah Analisis Etika Autonomous AI Agents',
    course: 'Kecerdasan Buatan',
    description: 'Menyusun esai ilmiah 5 halaman mengenai dampak etis dan akuntabilitas agen cerdas otonom dalam arsitektur software.',
    deadline: '2026-11-18',
    status: 'Belum Dikerjakan',
    colorTag: '#8B5CF6',
    createdAt: '2026-11-08',
  },
  {
    id: 'task-3',
    title: 'Normalisasi Database 3NF & Query Analytics',
    course: 'Basis Data Lanjut',
    description: 'Mendesain schema relasional ter-normalisasi sampai bentuk BCNF serta optimasi indeks PostgreSQL untuk aggregation query.',
    deadline: '2026-11-12',
    status: 'Selesai',
    colorTag: '#0EA5E9',
    createdAt: '2026-11-05',
  },
  {
    id: 'task-4',
    title: 'Simulasi Multi-Area OSPF & Packet Capture',
    course: 'Jaringan Komputer',
    description: 'Konfigurasi routing protokol dinamis OSPF multi-area menggunakan Cisco Packet Tracer dan validasi routing table.',
    deadline: '2026-11-20',
    status: 'Belum Dikerjakan',
    colorTag: '#10B981',
    createdAt: '2026-11-07',
  },
  {
    id: 'task-5',
    title: 'Analisis Kompleksitas Asimptotik Dijkstra vs A*',
    course: 'Desain & Analisis Algoritma',
    description: 'Eksperimen benchmark runtime shortest path pada directed graph berbobot besar dan visualisasi grafik performa.',
    deadline: '2026-11-10',
    status: 'Selesai',
    colorTag: '#F59E0B',
    createdAt: '2026-11-04',
  },
];
