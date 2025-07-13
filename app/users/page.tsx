
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'vendedor' | 'mesero';
  password: string;
  isActive: boolean;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'vendedor1',
      email: 'vendedor@restaurant.com',
      fullName: 'María García',
      phone: '+1234567891',
      role: 'vendedor',
      password: 'vend123',
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      username: 'mesero1',
      email: 'mesero@restaurant.com',
      fullName: 'Carlos López',
      phone: '+1234567892',
      role: 'mesero',
      password: 'mes456',
      isActive: true,
      createdAt: '2024-01-15'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    role: 'mesero' as User['role'],
    password: '',
    confirmPassword: ''
  });

  const roleLabels = {
    vendedor: 'Vendedor',
    mesero: 'Mesero'
  };

  const rolePermissions = {
    vendedor: ['Crear comandas', 'Gestionar compras', 'Administrar clientes', 'Ver historial', 'Ver informes'],
    mesero: ['Crear comandas', 'Modificar historial de ventas']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.email.trim() || !formData.fullName.trim()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    if (!editingUser && (!formData.password || formData.password !== formData.confirmPassword)) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const newUser: User = {
      id: editingUser ? editingUser.id : Date.now().toString(),
      username: formData.username,
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
      role: formData.role,
      password: editingUser ? editingUser.password : formData.password,
      isActive: true,
      createdAt: editingUser ? editingUser.createdAt : new Date().toISOString().split('T')[0]
    };

    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? newUser : user));
    } else {
      setUsers([...users, newUser]);
    }

    setShowModal(false);
    setEditingUser(null);
    setFormData({
      username: '',
      email: '',
      fullName: '',
      phone: '',
      role: 'mesero',
      password: '',
      confirmPassword: ''
    });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      password: '',
      confirmPassword: ''
    });
    setShowModal(true);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Gestión de Usuarios" subtitle="Administra los usuarios del sistema" />
      
      <div className="flex">
        <Sidebar currentPage="users" />
        
        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm w-full"
                />
                <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8 w-full md:w-auto">
                <option value="">Todos los roles</option>
                <option value="vendedor">Vendedor</option>
                <option value="mesero">Mesero</option>
              </select>
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors w-full md:w-auto ${
                  showPasswords 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <i className={`ri-${showPasswords ? 'eye-off' : 'eye'}-line mr-2`}></i>
                {showPasswords ? 'Ocultar Contraseñas' : 'Ver Contraseñas'}
              </button>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors w-full md:w-auto"
            >
              <i className="ri-add-line mr-2"></i>
              Nuevo Usuario
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Contacto
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contraseña
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                        <div>
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {showPasswords ? user.password : '••••••••'}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'vendedor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {roleLabels[user.role]}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <i className="ri-edit-line text-sm"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Permisos por Rol</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <div key={role} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{roleLabels[role as keyof typeof roleLabels]}</h4>
                  <ul className="space-y-1">
                    {permissions.map((permission, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usuario *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="nombre_usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="usuario@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol *
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as User['role']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="mesero">Mesero</option>
                    <option value="vendedor">Vendedor</option>
                  </select>
                </div>

                {!editingUser && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña *
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Contraseña *
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({
                      username: '',
                      email: '',
                      fullName: '',
                      phone: '',
                      role: 'mesero',
                      password: '',
                      confirmPassword: ''
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer transition-colors"
                >
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
