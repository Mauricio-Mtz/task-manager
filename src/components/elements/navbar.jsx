import { Link } from 'react-router-dom';

//Componente para la navegacion de la aplicacion, de momento con solo dos direcciones, dashboard y login
const Navbar = () => {
    return (
        <nav className="bg-gray-600 py-4 px-8 flex justify-between items-center rounded-b-lg">
            <div className="text-white text-lg font-bold">
                <Link to="/">Task Manager</Link>
            </div>
            <ul className="flex space-x-4 mt-2">
                <li>
                    <Link to="/manager/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                </li>
                <li>
                    <Link to="/Login" className="text-white hover:text-gray-300">Accede</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;