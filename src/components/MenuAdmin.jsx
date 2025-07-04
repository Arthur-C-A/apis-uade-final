import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const MenuAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="absolute top-8 right-8">
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-10" style={{
          textShadow: '2px 2px 4px #000, 0px 0px 8px #000'
        }}>Menú de Administración</h1>
        <div className="space-x-8">
          <Link to="/admin-platos">
            <button className="bg-black text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300">
              Platos
            </button>
          </Link>
          <Link to="/admin-usuarios">
            <button className="bg-black text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300">
              Usuarios
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuAdmin; 