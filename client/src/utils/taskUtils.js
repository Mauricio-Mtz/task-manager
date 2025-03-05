export const groupTasksByStatus = (tasks) => {
  return {
    in_progress: tasks.filter((task) => task.status === 'in_progress'),
    paused: tasks.filter((task) => task.status === 'paused'),
    in_revision: tasks.filter((task) => task.status === 'in_revision'),
    done: tasks.filter((task) => task.status === 'done'),
  }
}

export const columns = [
  { id: 'in_progress', title: 'En Progreso', color: 'bg-yellow-100' },
  { id: 'paused', title: 'Pausadas', color: 'bg-orange-200' },
  { id: 'in_revision', title: 'En revision', color: 'bg-slate-200' },
  { id: 'done', title: 'Completadas', color: 'bg-green-100' },
]
