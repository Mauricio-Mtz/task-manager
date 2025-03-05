/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

const TaskModal = ({ open, users, type, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    name_task: '',
    description: '',
    dead_line: '',
    status: 'in_progress',
    category: '',
    user_id: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name_task: '',
      description: '',
      dead_line: '',
      status: 'in_progress',
      category: '',
      user_id: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-400">
        <DialogHeader>
          <DialogTitle>Nueva Tarea</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name_task">Nombre de la tarea</Label>
            <Input
              id="name_task"
              value={formData.name_task}
              onChange={(e) =>
                setFormData({ ...formData, name_task: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dead_line">Fecha límite</Label>
            <Input
              id="dead_line"
              type="datetime-local"
              value={formData.dead_line}
              onChange={(e) =>
                setFormData({ ...formData, dead_line: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
              value={formData.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent className="bg-slate-400">
                <SelectItem className="hover:bg-slate-500" value="in_progress">En Progreso</SelectItem>
                <SelectItem className="hover:bg-slate-500" value="paused">Pausada</SelectItem>
                <SelectItem className="hover:bg-slate-500" value="revision">En Revisión</SelectItem>
                <SelectItem className="hover:bg-slate-500" value="done">Completada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoría</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>
          {type === "group" && (
            <div className="grid gap-2">
              <Label htmlFor="assigned_user">Asignar Usuario</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, user_id: value })
                }
                value={formData.assigned_user}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent className="bg-slate-400">
                  {users.map((user) => (
                    <SelectItem
                      key={user._id}
                      className="hover:bg-slate-500"
                      value={user._id}
                    >
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button className="bg-slate-500 hover:bg-slate-600" type="submit">
            Guardar Tarea
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TaskModal
