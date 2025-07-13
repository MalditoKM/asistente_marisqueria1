
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: ''
  });
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Simular diferentes tipos de usuario
      if (email === 'superadmin@system.com') {
        router.push('/super-admin');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const handleRegisterRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!restaurantData.name.trim() || !restaurantData.email.trim() || 
        !restaurantData.password || !restaurantData.address.trim()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    if (restaurantData.password !== restaurantData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí se registraría el restaurante
    alert(`Restaurante "${restaurantData.name}" registrado exitosamente`);
    setShowRegisterModal(false);
    setRestaurantData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-restaurant-2-fill text-green-600 text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sistema de Restaurantes</h1>
            <p className="text-gray-600">Administra tu restaurante con facilidad</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email del Usuario
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-gray-400"></i>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="usuario@mirestaurante.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i className="ri-lock-line text-gray-400"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line text-gray-400 hover:text-gray-600`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              Iniciar Sesión
            </button>

            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              <i className="ri-store-2-line mr-2"></i>
              Registrar Nuevo Restaurante
            </button>
          </form>
        </div>
      </div>

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Registrar Nuevo Restaurante</h2>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            
            <form onSubmit={handleRegisterRestaurant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Restaurante *
                </label>
                <input
                  type="text"
                  required
                  value={restaurantData.name}
                  onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Mi Restaurante"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email del Administrador *
                </label>
                <input
                  type="email"
                  required
                  value={restaurantData.email}
                  onChange={(e) => setRestaurantData({...restaurantData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="admin@mirestaurante.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña *
                </label>
                <input
                  type="password"
                  required
                  value={restaurantData.password}
                  onChange={(e) => setRestaurantData({...restaurantData, password: e.target.value})}
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
                  value={restaurantData.confirmPassword}
                  onChange={(e) => setRestaurantData({...restaurantData, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección *
                </label>
                <textarea
                  required
                  value={restaurantData.address}
                  onChange={(e) => setRestaurantData({...restaurantData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={2}
                  placeholder="Dirección completa del restaurante"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={restaurantData.phone}
                  onChange={(e) => setRestaurantData({...restaurantData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="+1234567890"
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Registrar Restaurante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
