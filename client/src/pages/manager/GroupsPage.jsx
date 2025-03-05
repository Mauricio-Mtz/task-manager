import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

import Sidebar from '@/components/elements/Sidebar'
import Navbar from '@/components/elements/navbar'
import GroupModal from '@/components/elements/groupModal'
import EnrollModal from '@/components/elements/enrollModal'
import CopyGroupId from '@/components/elements/copyGroupId'

import { useGroups } from '@/hooks/useGroups'
import { formatDate } from '@/utils/dateFormatter'

function GroupsPage() {
  const navigate = useNavigate()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [enrollModalOpen, setEnrollModalOpen] = useState(false)
  const {
    userGroups,
    createdGroups,
    error,
    handleGroupSubmit,
    handleEnrollGroup,
    handleDeleteGroup,
  } = useGroups()

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen pt-16">
        <Sidebar />
        <div className="flex-1 p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-400">Mi grupo</h1>
            <Button
              className="bg-slate-400 hover:bg-slate-500 cursor-pointer"
              onClick={() => setEnrollModalOpen(true)}
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Enrolar en grupo
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {userGroups.map((group) => (
              <Card
                key={group._id}
                onClick={() =>
                  navigate(`/manager/groupTasks/${group._id}`, {
                    state: { creatorId: group.creator_id, type: 'personal' },
                  })
                }
                className="bg-slate-400 hover:bg-slate-500 cursor-pointer"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{group.name_group}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">{group.description}</p>
                    <span className="text-sm">
                      Creado: {formatDate(group.created_at)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex-1 p-8 relative">
          <h1 className="text-3xl text-center font-bold text-slate-400 mb-6">
            Grupos creados
          </h1>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {createdGroups.map((group) => (
              <Card
                key={group._id}
                onClick={() =>
                  navigate(`/manager/groupTasks/${group._id}`, {
                    state: { creatorId: group.creator_id, type: 'group' },
                  })
                }
                className="bg-slate-400 hover:bg-slate-500 cursor-pointer"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{group.name_group}</CardTitle>
                  <button
                    className="bg-red-500 hover:bg-red-600 p-1 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteGroup(group._id)
                    }}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">{group.description}</p>
                    <span className="text-sm">
                      Creado: {formatDate(group.created_at)}
                    </span>
                    <CopyGroupId groupId={group._id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {error && (
            <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button
            className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg bg-slate-600"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <GroupModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={(data) => {
          handleGroupSubmit(data).then((success) => {
            if (success) setCreateModalOpen(false)
          })
        }}
      />

      <EnrollModal
        open={enrollModalOpen}
        onOpenChange={setEnrollModalOpen}
        onSubmit={(data) => {
          handleEnrollGroup(data).then((success) => {
            if (success) setEnrollModalOpen(false)
          })
        }}
      />
    </div>
  )
}

export default GroupsPage
