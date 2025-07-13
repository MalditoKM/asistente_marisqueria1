'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Dish {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

export default function Menu() {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: '1',
      name: 'Hamburguesa Clásica',
      price: 12.50,
      category: 'Principales',
      description: 'Hamburguesa de carne con queso, lechuga y tomate'
    },
    {
      id: '2',
      name: 'Pizza Margherita',
      price: 15.00,
      category: 'Pizzas',
      description: 'Pizza tradicional con tomate, mozzarella y albahaca fresca'
    },
    {
      id: '3',
      name: 'Ensalada César',
      price: 8.50,
      category: 'Ensaladas',
      description: 'Lechuga romana, pollo, crutones y aderezo césar'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  const categories = ['Entradas', 'Principales', 'Pizzas', 'Pastas', 'Ensaladas', 'Postres', 'Bebidas'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price || !formData.category) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newDish: Dish = {
      id: editingDish ? editingDish.id : Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description
    };

    if (editingDish) {
      setDishes(dishes.map(dish => dish.id === editingDish.id ? newDish : dish));
    } else {
      setDishes([...dishes, newDish]);
    }

    setShowModal(false);
    setEditingDish(null);
    setFormData({ name: '', price: '', category: '', description: '' });
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      price: dish.price.toString(),
      category: dish.category,
      description: dish.description
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este plato?')) {
      setDishes(dishes.filter(dish => dish.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestión de Menú" subtitle="Administra los platos de tu restaurante" />
      
      <div className="flex">
        <Sidebar currentPage="menu" />
        
        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Buscar platos..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm w-full"
                />
                <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8 w-full md:w-auto">
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors w-full md:w-auto"
            >
              <i className="ri-add-line mr-2"></i>
              Agregar Plato
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {dishes.map((dish) => (
              <div key={dish.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{dish.name}</h3>
                    <span className="text-lg font-bold text-green-600">${dish.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {dish.category}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(dish)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(dish.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingDish ? 'Editar Plato' : 'Agregar Nuevo Plato'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Plato *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Ingrese el nombre del plato"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio en Dólares *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="0.00"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Descripción del plato"
                  maxLength={500}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingDish(null);
                    setFormData({ name: '', price: '', category: '', description: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer transition-colors"
                >
                  {editingDish ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}