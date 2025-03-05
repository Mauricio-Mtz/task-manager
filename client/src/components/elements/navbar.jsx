import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

//Componente para la navegacion de la aplicacion, de momento con solo dos direcciones, dashboard y login
const Navbar = () => {
    const token = localStorage.getItem('token');
    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    return (
        <nav className="bg-slate-600 py-4 px-8 flex justify-between items-center rounded-b-lg">
            <div className="text-slate-300 text-lg font-bold">
                <Link to="/">Task Manager</Link>
            </div>
            <ul className="flex space-x-4 items-center">
                {token && (
                    <Link to="/manager/dashboard" className="text-slate-300 hover:text-gray-300">Dashboard</Link>
                )}
                <li>
                    {!token && (
                        <Link to="/auth/Login" className="p-2 rounded-md text-slate-100 bg-slate-500 hover:bg-slate-600">Accede</Link>
                    )}
                </li>
                {token && (
                    <Button className="bg-red-400 hover:bg-red-500 cursor-pointer text-slate-100" onClick={()=>{handleLogOut()}} >Cerrar sesión</Button>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;