/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function EnrollModal({ open, onOpenChange, onSubmit }) {
  const [enrollData, setEnrollData] = useState({
    code: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(enrollData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-400">
        <DialogHeader>
          <DialogTitle>Enrolar a un grupo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Código del grupo</Label>
            <Input
              id="code"
              type="text"
              value={enrollData.code}
              onChange={(e) =>
                setEnrollData((prev) => ({
                  ...prev,
                  code: e.target.value,
                }))
              }
              placeholder="Ingresa el código del grupo"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Enrolar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}