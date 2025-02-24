/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const GroupModal = ({ open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    name_group: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name_group: '',
      description: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-400">
        <DialogHeader>
          <DialogTitle>Nuevo Grupo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name_group">Nombre del grupo</Label>
            <Input
              id="name_group"
              value={formData.name_group}
              onChange={(e) =>
                setFormData({ ...formData, name_group: e.target.value })
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
          <Button className="bg-slate-500 hover:bg-slate-600" type="submit">
            Crear Grupo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GroupModal