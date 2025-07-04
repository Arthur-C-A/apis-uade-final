import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDishes, createDish, updateDish, deleteDish } from '../services/api';
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

const CATEGORY_OPTIONS = ['Entradas', 'Pizzas', 'Pastas', 'Postres'];

const AdminPlatos = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentDish, setCurrentDish] = useState({ title: '', price: '', category: 'Entradas', description: '', imageUrl: '', ingredients: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [modalError, setModalError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            setLoading(true);
            const response = await getDishes();
            setDishes(response.data);
            setError(null);
        } catch (error) {
            setError('Error al cargar los platos');
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
        if (name === 'ingredients') {
          setCurrentDish({ ...currentDish, [name]: value.split(',').map(item => item.trim()) });
        } else if (name === 'price') {
          setCurrentDish({ ...currentDish, [name]: parseInt(value) || '' });
        } else {
          setCurrentDish({ ...currentDish, [name]: value });
        }
    };

    const handleCreateDish = () => {
        setIsEditing(false);
        setCurrentDish({ title: '', price: '', category: 'Entradas', description: '', imageUrl: '', ingredients: [] });
        setModalError(null);
        setShowModal(true);
    };

    const handleEditDish = (dish) => {
        setIsEditing(true);
        setCurrentDish({ ...dish, ingredients: dish.ingredients.join(', ') });
        setModalError(null);
        setShowModal(true);
    };

    const handleDeleteDish = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este plato?')) {
            try {
                await deleteDish(id);
                fetchDishes();
            } catch (error) {
                setError('Error al eliminar el plato');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dishData = {
                ...currentDish,
                ingredients: Array.isArray(currentDish.ingredients) ? currentDish.ingredients : currentDish.ingredients.split(',').map(s => s.trim())
            };
            if (isEditing) {
                await updateDish(currentDish._id, dishData);
            } else {
                await createDish(dishData);
            }
            setShowModal(false);
            setModalError(null);
            fetchDishes();
        } catch (error) {
            setModalError('Error al guardar el plato. ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Cargando platos...</div></div>;
    
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Administración de Platos</h1>
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
                <button onClick={handleCreateDish} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Crear Plato</button>
            </div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dishes.map((dish) => (
                            <tr key={dish._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dish.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dish.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${dish.price.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEditDish(dish)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                    <button onClick={() => handleDeleteDish(dish._id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onClose={() => { setShowModal(false); setModalError(null); }}>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">{isEditing ? 'Editar Plato' : 'Crear Plato'}</h3>
                {modalError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2">{modalError}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" value={currentDish.title} onChange={handleInputChange} placeholder="Título" className="w-full p-2 border rounded" required />
                    <input type="number" name="price" value={currentDish.price} onChange={handleInputChange} placeholder="Precio" className="w-full p-2 border rounded" required />
                    <select name="category" value={currentDish.category} onChange={handleInputChange} className="w-full p-2 border rounded text-black">
                        {CATEGORY_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <textarea name="description" value={currentDish.description} onChange={handleInputChange} placeholder="Descripción" className="w-full p-2 border rounded" required />
                    <input type="text" name="imageUrl" value={currentDish.imageUrl} onChange={handleInputChange} placeholder="URL de la Imagen" className="w-full p-2 border rounded" required />
                    <input type="text" name="ingredients" value={Array.isArray(currentDish.ingredients) ? currentDish.ingredients.join(', ') : currentDish.ingredients} onChange={handleInputChange} placeholder="Ingredientes (separados por comas)" className="w-full p-2 border rounded" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">{isEditing ? 'Actualizar' : 'Crear'}</button>
                </form>
            </Modal>
          </div>
        </div>
    );
};

export default AdminPlatos; 