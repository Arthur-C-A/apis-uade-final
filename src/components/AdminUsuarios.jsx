import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import { logout } from '../services/auth';

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            {children}
            <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

const AdminUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({ username: '', password: '', role: 'admin' });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
            setError(null);
        } catch (error) {
            setError('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleCreateUser = () => {
        setIsEditing(false);
        setCurrentUser({ username: '', password: '', role: 'admin' });
        setShowModal(true);
    };

    const handleEditUser = (user) => {
        setIsEditing(true);
        setCurrentUser({ ...user, password: '' });
        setShowModal(true);
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                setError('Error al eliminar el usuario. ' + (error.response?.data?.message || ''));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const { password, ...updateData } = currentUser;
                await updateUser(currentUser._id, updateData);
            } else {
                await createUser(currentUser);
            }
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            setError('Error al guardar el usuario. ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Cargando usuarios...</div></div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Administración de Usuarios</h1>
                    <div className="space-x-4">
                        <Link to="/menuAdmin" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Volver al Menú
                        </Link>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                <div className="flex justify-end items-center mb-8">
                  <button onClick={handleCreateUser} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Crear Usuario</button>
                </div>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEditUser(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                        <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="username" value={currentUser.username} onChange={handleInputChange} placeholder="Nombre de usuario" className="w-full p-2 border rounded" required />
                        {!isEditing && (
                        <input type="password" name="password" value={currentUser.password} onChange={handleInputChange} placeholder="Contraseña" className="w-full p-2 border rounded" required />
                        )}
                        <select name="role" value={currentUser.role} onChange={handleInputChange} className="w-full p-2 border rounded text-black">
                            <option value="admin">Admin</option>
                        </select>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">{isEditing ? 'Actualizar' : 'Crear'}</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminUsuarios; 