'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastVisit: string;
  status: 'Activo' | 'Inactivo';
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Carlos García',
      email: 'carlos@email.com',
      phone: '+1 234-567-8901',
      address: 'Calle 123, Ciudad',
      totalOrders: 15,
      totalSpent: 245.50,
      lastVisit: '2024-01-15',
      status: 'Activo'
    },
    {
      id: '2',
      name: 'María López',
      email: 'maria@email.com',
      phone: '+1 234-567-8902',
      address: 'Avenida 456, Ciudad',
      totalOrders: 8,
      totalSpent: 156.30,
      lastVisit: '2024-01-12',
      status: 'Activo'
    },
    {
      id: '3',
      name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '+1 234-567-8903',
      address: 'Plaza 789, Ciudad',
      totalOrders: 22,
      totalSpent: 387.90,
      lastVisit: '2024-01-10',
      status: 'Activo'
    },
    {
      id: '4',
      name: 'Ana Martínez',
      email: 'ana@email.com',
      phone: '+1 234-567-8904',
      address: 'Carrera 321, Ciudad',
      totalOrders: 3,
      totalSpent: 45.20,
      lastVisit: '2023-12-20',
      status: 'Inactivo'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newClient: Client = {
      id: editingClient ? editingClient.id : Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      totalOrders: editingClient ? editingClient.totalOrders : 0,
      totalSpent: editingClient ? editingClient.totalSpent : 0,
      lastVisit: editingClient ? editingClient.lastVisit : new Date().toISOString().split('T')[0],
      status: editingClient ? editingClient.status : 'Activo'
    };

    if (editingClient) {
      setClients(clients.map(client => client.id === editingClient.id ? newClient : client));
    } else {
      setClients([...clients, newClient]);
    }

    setShowModal(false);
    setEditingClient(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setClients(clients.map(client => 
      client.id === id 
        ? { ...client, status: client.status === 'Activo' ? 'Inactivo' : 'Activo' }
        : client
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="clients" />
      
      <div className="flex-1 ml-64">
        <Header title="Gestión de Clientes" subtitle="Administra la base de datos de clientes" />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar clientes..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8">
                <option value="">Todos los estados</option>
                <option value="Activo">Activos</option>
                <option value="Inactivo">Inactivos</option>
              </select>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
            >
              <i className="ri-add-line mr-2"></i>
              Nuevo Cliente
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Órdenes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Gastado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Visita
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                            <i className="ri-user-line text-green-600"></i>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.address}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.email}</div>
                        <div className="text-sm text-gray-500">{client.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {client.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${client.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.lastVisit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleStatus(client.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                            client.status === 'Activo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {client.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedClient(client)}
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <i className="ri-eye-line"></i>
                          </button>
                          <button
                            onClick={() => handleEdit(client)}
                            className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(client.id)}
                            className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Nombre del cliente"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="cliente@email.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="+1 234-567-8900"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Dirección del cliente"
                  maxLength={500}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingClient(null);
                    setFormData({ name: '', email: '', phone: '', address: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer transition-colors"
                >
                  {editingClient ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Perfil del Cliente</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <i className="ri-user-line text-green-600 text-2xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedClient.name}</h3>
                  <p className="text-gray-600">{selectedClient.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Total de Órdenes</p>
                  <p className="text-2xl font-bold text-green-600">{selectedClient.totalOrders}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Total Gastado</p>
                  <p className="text-2xl font-bold text-green-600">${selectedClient.totalSpent.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Información de Contacto</p>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-900"><i className="ri-phone-line mr-2"></i>{selectedClient.phone}</p>
                  <p className="text-gray-900"><i className="ri-map-pin-line mr-2"></i>{selectedClient.address}</p>
                  <p className="text-gray-900"><i className="ri-calendar-line mr-2"></i>Última visita: {selectedClient.lastVisit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}