import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon, HomeIcon, ListTodoIcon, BarChartIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

//Componente para la navegacion dentro del dashboard, de momento con solo tres secciones: dashboard, tareas y estadisticas
//Ninguna pantalla cuenta con contenido
export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  //Constante con las rutas de las secciones del dashboard
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HomeIcon className="w-5 h-5" />,
      path: '/manager/dashboard',
    },
    {
      title: 'Tareas',
      icon: <ListTodoIcon className="w-5 h-5" />,
      path: '/manager/userTasks',
    },
    {
      title: 'Grupos',
      icon: <BarChartIcon className="w-5 h-5" />,
      path: '/manager/groups',
    },
  ]

  return (
    <div className="fixed left-4 top-4 z-20">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-20 left-8 bg-slate-600 hover:bg-accent"
          >
            <MenuIcon className="h-5 w-5 text-slate-300"/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] bg-slate-600">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold text-slate-300">Task Manager</SheetTitle>
          </SheetHeader>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? 'default' : 'ghost'}
                className="w-full justify-start gap-2 text-lg h-12 hover:bg-slate-700 text-slate-300"
                onClick={() => {
                  navigate(item.path)
                }}
              >
                {item.icon}
                {item.title}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Sidebar
