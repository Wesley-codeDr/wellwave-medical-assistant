// Dados mockados para o dashboard de anamnese digital
// Baseado no PRD - Sistema de Anamnese Digital para Emergência

export interface Task {
  id: string;
  title: string;
  syndrome: Syndrome;
  priority: 'baixa' | 'media' | 'alta' | 'critica';
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  dueAt?: Date;
  assignedTo?: string;
  notes?: string;
  patientAge?: number;
  patientGender?: 'M' | 'F';
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    respiratoryRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
  };
  scores?: {
    heart?: number;
    curb65?: number;
    qsofa?: number;
  };
}

export type Syndrome = 
  | 'Dor torácica'
  | 'Cefaleia' 
  | 'Dispneia'
  | 'Dor abdominal'
  | 'Febre';

export type TaskStatus = 
  | 'entrada'
  | 'em_atendimento'
  | 'aguardando_exame'
  | 'reavaliacao_programada'
  | 'alta_transferencia'
  | 'concluido';

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  wipLimit?: number;
}

// Síndromes disponíveis conforme PRD
export const SYNDROMES: Syndrome[] = [
  'Dor torácica',
  'Cefaleia',
  'Dispneia', 
  'Dor abdominal',
  'Febre'
];

// Colunas do Kanban conforme PRD
export const COLUMNS: Column[] = [
  {
    id: 'entrada',
    title: 'Entrada',
    tasks: []
  },
  {
    id: 'em_atendimento',
    title: 'Em Atendimento',
    tasks: []
  },
  {
    id: 'aguardando_exame',
    title: 'Aguardando Exame',
    tasks: []
  },
  {
    id: 'reavaliacao_programada',
    title: 'Reavaliação Programada',
    tasks: []
  },
  {
    id: 'alta_transferencia',
    title: 'Alta/Transferência',
    tasks: []
  },
  {
    id: 'concluido',
    title: 'Concluído',
    tasks: []
  }
];

// Dados mockados de tarefas
export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Paciente com dor torácica aguda',
    syndrome: 'Dor torácica',
    priority: 'alta',
    status: 'entrada',
    createdAt: new Date('2024-01-15T08:30:00'),
    updatedAt: new Date('2024-01-15T08:30:00'),
    patientAge: 45,
    patientGender: 'M',
    vitalSigns: {
      bloodPressure: '140/90',
      heartRate: 95,
      respiratoryRate: 18,
      temperature: 37.2,
      oxygenSaturation: 98
    },
    notes: 'Dor precordial há 2 horas, irradia para braço esquerdo'
  },
  {
    id: '2',
    title: 'Cefaleia intensa com fotofobia',
    syndrome: 'Cefaleia',
    priority: 'media',
    status: 'em_atendimento',
    createdAt: new Date('2024-01-15T09:15:00'),
    updatedAt: new Date('2024-01-15T09:45:00'),
    patientAge: 32,
    patientGender: 'F',
    vitalSigns: {
      bloodPressure: '120/80',
      heartRate: 78,
      respiratoryRate: 16,
      temperature: 36.8,
      oxygenSaturation: 99
    },
    notes: 'Cefaleia há 6 horas, náuseas, sem vômitos'
  },
  {
    id: '3',
    title: 'Dispneia aos esforços',
    syndrome: 'Dispneia',
    priority: 'alta',
    status: 'aguardando_exame',
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    patientAge: 67,
    patientGender: 'M',
    vitalSigns: {
      bloodPressure: '160/95',
      heartRate: 110,
      respiratoryRate: 24,
      temperature: 37.5,
      oxygenSaturation: 92
    },
    scores: {
      curb65: 2
    },
    notes: 'Dispneia progressiva há 3 dias, tosse seca'
  },
  {
    id: '4',
    title: 'Dor abdominal em fossa ilíaca direita',
    syndrome: 'Dor abdominal',
    priority: 'alta',
    status: 'reavaliacao_programada',
    createdAt: new Date('2024-01-15T07:45:00'),
    updatedAt: new Date('2024-01-15T11:00:00'),
    dueAt: new Date('2024-01-15T13:00:00'),
    patientAge: 28,
    patientGender: 'F',
    vitalSigns: {
      bloodPressure: '110/70',
      heartRate: 88,
      respiratoryRate: 20,
      temperature: 38.1,
      oxygenSaturation: 97
    },
    notes: 'Dor abdominal há 8 horas, náuseas, febre'
  },
  {
    id: '5',
    title: 'Febre alta com mal-estar geral',
    syndrome: 'Febre',
    priority: 'media',
    status: 'alta_transferencia',
    createdAt: new Date('2024-01-15T06:30:00'),
    updatedAt: new Date('2024-01-15T12:15:00'),
    patientAge: 15,
    patientGender: 'M',
    vitalSigns: {
      bloodPressure: '100/60',
      heartRate: 105,
      respiratoryRate: 22,
      temperature: 39.2,
      oxygenSaturation: 96
    },
    notes: 'Febre há 2 dias, cefaleia, mialgia'
  },
  {
    id: '6',
    title: 'Dor torácica atípica',
    syndrome: 'Dor torácica',
    priority: 'baixa',
    status: 'concluido',
    createdAt: new Date('2024-01-14T16:20:00'),
    updatedAt: new Date('2024-01-14T18:45:00'),
    patientAge: 55,
    patientGender: 'F',
    vitalSigns: {
      bloodPressure: '130/85',
      heartRate: 72,
      respiratoryRate: 16,
      temperature: 36.9,
      oxygenSaturation: 99
    },
    scores: {
      heart: 3
    },
    notes: 'Dor torácica atípica, sem irradiação, melhora com repouso'
  }
];

// Função para distribuir tarefas nas colunas
export function getInitialColumns(): Column[] {
  const columns: Column[] = COLUMNS.map(col => ({ ...col, tasks: [] as Task[] }));
  
  MOCK_TASKS.forEach(task => {
    const column = columns.find(col => col.id === task.status);
    if (column) {
      column.tasks.push(task);
    }
  });
  
  return columns;
}

// Função para obter estatísticas do dashboard
export function getDashboardStats(columns: Column[]) {
  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const tasksByPriority = columns.reduce((acc, col) => {
    col.tasks.forEach(task => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  const tasksBySyndrome = columns.reduce((acc, col) => {
    col.tasks.forEach(task => {
      acc[task.syndrome] = (acc[task.syndrome] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalTasks,
    tasksByPriority,
    tasksBySyndrome,
    columns: columns.map(col => ({
      id: col.id,
      title: col.title,
      count: col.tasks.length
    }))
  };
}
