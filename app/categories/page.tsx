
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Category {
  id: string;
  name: string;
  dishCount: number;
  color: string;
  icon: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Entradas', dishCount: 8, color: 'bg-blue-500', icon: 'ri-bowl-line' },
    { id: '2', name: 'Principales', dishCount: 15, color: 'bg-red-500', icon: 'ri-restaurant-line' },
    { id: '3', name: 'Pizzas', dishCount: 12, color: 'bg-orange-500', icon: 'ri-cake-2-line' },
    { id: '4', name: 'Pastas', dishCount: 10, color: 'bg-yellow-500', icon: 'ri-git-fork-line' },
    { id: '5', name: 'Ensaladas', dishCount: 6, color: 'bg-green-500', icon: 'ri-leaf-line' },
    { id: '6', name: 'Postres', dishCount: 7, color: 'bg-pink-500', icon: 'ri-cake-line' },
    { id: '7', name: 'Bebidas', dishCount: 20, color: 'bg-cyan-500', icon: 'ri-cup-line' },
    { id: '8', name: 'Acompañantes', dishCount: 5, color: 'bg-purple-500', icon: 'ri-knife-line' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: 'bg-blue-500',
    icon: 'ri-folder-line'
  });

  const availableColors = [
    { value: 'bg-blue-500', label: 'Azul', class: 'bg-blue-500' },
    { value: 'bg-red-500', label: 'Rojo', class: 'bg-red-500' },
    { value: 'bg-green-500', label: 'Verde', class: 'bg-green-500' },
    { value: 'bg-yellow-500', label: 'Amarillo', class: 'bg-yellow-500' },
    { value: 'bg-purple-500', label: 'Morado', class: 'bg-purple-500' },
    { value: 'bg-pink-500', label: 'Rosa', class: 'bg-pink-500' },
    { value: 'bg-orange-500', label: 'Naranja', class: 'bg-orange-500' },
    { value: 'bg-cyan-500', label: 'Cian', class: 'bg-cyan-500' },
    { value: 'bg-gray-500', label: 'Gris', class: 'bg-gray-500' }
  ];

  const availableIcons = [
    { value: 'ri-restaurant-line', label: 'Restaurante' },
    { value: 'ri-bowl-line', label: 'Bowl' },
    { value: 'ri-cake-line', label: 'Pastel' },
    { value: 'ri-cake-2-line', label: 'Pizza' },
    { value: 'ri-cup-line', label: 'Copa' },
    { value: 'ri-leaf-line', label: 'Hoja' },
    { value: 'ri-git-fork-line', label: 'Tenedor' },
    { value: 'ri-knife-line', label: 'Cuchillo' },
    { value: 'ri-folder-line', label: 'Carpeta' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('El nombre de la categoría es obligatorio');
      return;
    }

    const newCategory: Category = {
      id: editingCategory ? editingCategory.id : Date.now().toString(),
      name: formData.name,
      color: formData.color,
      icon: formData.icon,
      dishCount: editingCategory ? editingCategory.dishCount : 0
    };

    if (editingCategory) {
      setCategories(categories.map(cat => cat.id === editingCategory.id ? newCategory : cat));
    } else {
      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', color: 'bg-blue-500', icon: 'ri-folder-line' });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestión de Categorías" subtitle="Organiza los platos por categorías" />
      
      <div className="flex">
        <Sidebar currentPage="categories" />
        
        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar categorías..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm w-full md:w-80"
              />
              <div className="absolute left-3 top-3.5 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400 text-sm"></i>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg whitespace-nowrap cursor-pointer transition-colors shadow-sm font-medium"
            >
              <i className="ri-add-line mr-2 text-lg"></i>
              Nueva Categoría
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group relative">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition-all duration-200 hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 flex items-center justify-center ${category.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                      <i className={`${category.icon} text-white text-2xl`}></i>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </h3>
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                        <i className="ri-restaurant-line text-xs"></i>
                        <span className="font-medium">{category.dishCount} platos</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(category)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer transition-colors shadow-sm bg-white"
                        title="Editar"
                      >
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full cursor-pointer transition-colors shadow-sm bg-white"
                        title="Eliminar"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Botón para agregar nueva categoría */}
            <div 
              onClick={() => setShowModal(true)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md border-2 border-dashed border-gray-300 hover:border-green-500 p-6 transition-all duration-200 hover:scale-105 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 group-hover:bg-green-100 rounded-2xl transition-colors duration-200">
                  <i className="ri-add-line text-gray-400 group-hover:text-green-600 text-3xl transition-colors duration-200"></i>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-500 group-hover:text-green-600 transition-colors">
                    Agregar
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-green-500 transition-colors">
                    Nueva categoría
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Estadísticas de Categorías</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-folder-line text-blue-600 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
                <p className="text-gray-500 font-medium">Total Categorías</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-restaurant-line text-green-600 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {categories.reduce((sum, cat) => sum + cat.dishCount, 0)}
                </p>
                <p className="text-gray-500 font-medium">Total Platos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-orange-600 text-2xl"></i>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(categories.reduce((sum, cat) => sum + cat.dishCount, 0) / categories.length) || 0}
                </p>
                <p className="text-gray-500 font-medium">Promedio por Categoría</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nombre de la Categoría *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Ej: Entradas, Principales, Postres..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Color de la Categoría
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({...formData, color: color.value})}
                        className={`w-12 h-12 rounded-lg ${color.class} transition-all duration-200 ${
                          formData.color === color.value 
                            ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' 
                            : 'hover:scale-105'
                        }`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Ícono de la Categoría
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {availableIcons.map((icon) => (
                      <button
                        key={icon.value}
                        type="button"
                        onClick={() => setFormData({...formData, icon: icon.value})}
                        className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                          formData.icon === icon.value 
                            ? 'border-green-500 bg-green-50 text-green-600' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-600'
                        }`}
                        title={icon.label}
                      >
                        <i className={`${icon.value} text-2xl`}></i>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vista previa */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Vista Previa:</p>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 flex items-center justify-center ${formData.color} rounded-lg`}>
                      <i className={`${formData.icon} text-white text-xl`}></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{formData.name || 'Nombre de la categoría'}</p>
                      <p className="text-sm text-gray-500">0 platos</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setFormData({ name: '', color: 'bg-blue-500', icon: 'ri-folder-line' });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer transition-colors font-medium shadow-sm"
                >
                  {editingCategory ? 'Actualizar' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
