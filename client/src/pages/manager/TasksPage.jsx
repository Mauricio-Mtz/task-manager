import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Sidebar from '@/components/elements/Sidebar'
import Navbar from '@/components/elements/navbar'
import TaskModal from '@/components/elements/taskModal'

import { useTasks, useUsers } from '@/hooks/index'
import { formatDate } from '@/utils/dateFormatter'
import { groupTasksByStatus, columns } from '@/utils/taskUtils'

function TasksPage() {
  const location = useLocation()
  const type = location.state?.type
  const { groupId } = useParams()
  const { usersByGroup } = useUsers({ groupId })
  const creatorId = location.state?.creatorId
  const user = JSON.parse(localStorage.getItem('user'))

  const [modalOpen, setModalOpen] = useState(false)
  const { tasks, error, createTask, deleteTask, updateTaskStatus } =
    useTasks(groupId)

  const handleTaskSubmit = async (taskData) => {
    const success = await createTask(taskData)
    if (success) {
      setModalOpen(false)
    }
  }

  const handleChangeStatus = async (result) => {
    if (!result.destination || !result.source) return
    const { source, destination, draggableId } = result

    if (source.droppableId === destination.droppableId) return

    await updateTaskStatus(draggableId, destination.droppableId)
  }

  const tasksByStatus = groupTasksByStatus(tasks)

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 relative">
          <h1 className="text-3xl text-center font-bold text-slate-400 mb-6">
            Tablero de Tareas
          </h1>

          <DragDropContext onDragEnd={handleChangeStatus}>
            <div className="flex gap-4 overflow-x-auto min-h-[calc(100vh-200px)]">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className={`flex-1 min-w-[300px] ${column.color} rounded-lg p-4`}
                >
                  <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
                  <Droppable droppableId={column.id} type="task">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-col gap-4 min-h-[200px] ${
                          snapshot.isDraggingOver ? 'bg-opacity-50' : ''
                        }`}
                      >
                        {tasksByStatus[column.id].map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                            isDragDisabled={user._id !== task.user_id}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...(user._id === task.user_id
                                  ? provided.draggableProps
                                  : {})}
                                {...(user._id === task.user_id
                                  ? provided.dragHandleProps
                                  : {})}
                                className={`${
                                  snapshot.isDragging ? 'opacity-50' : ''
                                }`}
                              >
                                <Card className="bg-white shadow-sm">
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base">
                                      {task.name_task}
                                    </CardTitle>
                                    <button
                                      className="bg-red-500 hover:bg-red-600 p-1 rounded-md"
                                      onClick={() => deleteTask(task.id)}
                                    >
                                      <Trash className="h-4 w-4 text-white" />
                                    </button>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-sm text-gray-600">
                                      Fecha límite: {formatDate(task.dead_line)}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>

          {error && (
            <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {(location.pathname === '/manager/userTasks' ||
            user._id === creatorId) && (
            <Button
              className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg bg-slate-600"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="h-6 w-6" />
            </Button>
          )}

          <TaskModal
            open={modalOpen}
            users={usersByGroup}
            type={type}
            onOpenChange={setModalOpen}
            onSubmit={handleTaskSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default TasksPage
