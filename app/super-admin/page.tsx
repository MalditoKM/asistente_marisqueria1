'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Restaurant {
  id: string;
  name: string;
  adminEmail: string;
  adminPassword: string;
  address: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  totalSales: number;
  totalOrders: number;
}

export default function SuperAdmin() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'Restaurante La Plaza',
      adminEmail: 'admin@laplaza.com',
      adminPassword: 'plaza123',
      address: 'Av. Principal 123, Centro',
      phone: '+1234567890',
      isActive: true,
      createdAt: '2024-01-01',
      totalSales: 15420.50,
      totalOrders: 324
    },
    {
      id: '2',
      name: 'Pizzería Roma',
      adminEmail: 'admin@pizzeriaroma.com',
      adminPassword: 'roma456',
      address: 'Calle Roma 456, Norte',
      phone: '+1234567891',
      isActive: true,
      createdAt: '2024-01-15',
      totalSales: 8750.25,
      totalOrders: 198
    },
    {
      id: '3',
      name: 'Café Central',
      adminEmail: 'admin@cafecentral.com',
      adminPassword: 'cafe789',
      address: 'Plaza Central 789, Downtown',
      phone: '+1234567892',
      isActive: false,
      createdAt: '2024-02-01',
      totalSales: 3250.00,
      totalOrders: 87
    }
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showPasswordsVisible, setShowPasswordsVisible] = useState(false);

  const handleLogout = () => {
    router.push('/');
  };

  const toggleRestaurantStatus = (id: string) => {
    setRestaurants(restaurants.map(restaurant =>
      restaurant.id === id ? { ...restaurant, isActive: !restaurant.isActive } : restaurant
    ));
  };

  const handleDeleteRestaurant = (id: string) => {
    if (confirm('¿Está seguro de eliminar este restaurante? Esta acción no se puede deshacer.')) {
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    }
  };

  const accessRestaurant = (restaurant: Restaurant) => {
    // Simular acceso al sistema del restaurante
    alert(`Accediendo al sistema de "${restaurant.name}" como Super Admin`);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel Super Administrador</h1>
            <p className="text-gray-600 mt-1">Gestión global de restaurantes</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
          >
            <i className="ri-logout-box-line mr-2"></i>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-lg">
                <i className="ri-store-2-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Restaurantes</p>
                <p className="text-2xl font-bold text-gray-900">{restaurants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-lg">
                <i className="ri-check-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-2xl font-bold text-gray-900">{restaurants.filter(r => r.isActive).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 rounded-lg">
                <i className="ri-money-dollar-circle-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ventas Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${restaurants.reduce((sum, r) => sum + r.totalSales, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-500 rounded-lg">
                <i className="ri-file-list-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Órdenes Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {restaurants.reduce((sum, r) => sum + r.totalOrders, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Restaurantes Registrados</h3>
              <button
                onClick={() => setShowPasswordsVisible(!showPasswordsVisible)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  showPasswordsVisible 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <i className={`ri-${showPasswordsVisible ? 'eye-off' : 'eye'}-line mr-2`}></i>
                {showPasswordsVisible ? 'Ocultar Contraseñas' : 'Ver Contraseñas'}
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Administrador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estadísticas
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
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                        <div className="text-sm text-gray-500">Registrado: {restaurant.createdAt}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{restaurant.adminEmail}</div>
                        <div className="text-sm text-gray-500">
                          Contraseña: {showPasswordsVisible ? restaurant.adminPassword : '••••••••'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{restaurant.address}</div>
                        <div className="text-sm text-gray-500">{restaurant.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-green-600">${restaurant.totalSales.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">{restaurant.totalOrders} órdenes</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleRestaurantStatus(restaurant.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                          restaurant.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {restaurant.isActive ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRestaurant(restaurant)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                          title="Ver detalles"
                        >
                          <i className="ri-eye-line text-sm"></i>
                        </button>
                        <button
                          onClick={() => accessRestaurant(restaurant)}
                          className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-lg cursor-pointer transition-colors"
                          title="Acceder al sistema"
                        >
                          <i className="ri-login-box-line text-sm"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteRestaurant(restaurant.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                          title="Eliminar restaurante"
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
      </div>

      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Detalles del Restaurante</h2>
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Nombre</p>
                  <p className="text-gray-900">{selectedRestaurant.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Estado</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedRestaurant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedRestaurant.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Email del Administrador</p>
                <p className="text-gray-900">{selectedRestaurant.adminEmail}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Contraseña</p>
                <p className="text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                  {selectedRestaurant.adminPassword}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Dirección</p>
                <p className="text-gray-900">{selectedRestaurant.address}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Teléfono</p>
                <p className="text-gray-900">{selectedRestaurant.phone}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Ventas Totales</p>
                  <p className="text-green-600 font-semibold">${selectedRestaurant.totalSales.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Órdenes Totales</p>
                  <p className="text-blue-600 font-semibold">{selectedRestaurant.totalOrders}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Fecha de Registro</p>
                <p className="text-gray-900">{selectedRestaurant.createdAt}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => accessRestaurant(selectedRestaurant)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer transition-colors"
              >
                <i className="ri-login-box-line mr-2"></i>
                Acceder al Sistema
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}