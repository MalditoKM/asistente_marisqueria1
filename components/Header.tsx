
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  subtitle?: string;
  restaurantName?: string;
}

export default function Header({ title, subtitle, restaurantName = "Mi Restaurante" }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();

  const notifications = [
    { id: 1, title: 'Nueva comanda', message: 'Mesa 5 - Hamburguesa Clásica', time: '5 min', type: 'info' },
    { id: 2, title: 'Pago completado', message: 'Comanda #001 - $30.00', time: '10 min', type: 'success' },
    { id: 3, title: 'Stock bajo', message: 'Quedan 3 unidades de Pan', time: '1 hora', type: 'warning' }
  ];

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <>
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1 text-sm md:text-base">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg relative"
              >
                <i className="ri-notification-line text-gray-600 text-lg"></i>
                {notificationsEnabled && notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationsEnabled}
                          onChange={(e) => setNotificationsEnabled(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-6 rounded-full transition-colors ${
                          notificationsEnabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                            notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
                          }`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notificationsEnabled && notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                              <p className="text-gray-600 text-sm">{notification.message}</p>
                              <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        {notificationsEnabled ? 'No hay notificaciones' : 'Notificaciones desactivadas'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap cursor-pointer transition-colors"
            >
              <i className="ri-logout-box-line mr-1 md:mr-2"></i>
              <span className="hidden md:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </>
  );
}
