'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  currentPage: string;
}

export default function Sidebar({ currentPage }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Informes', icon: 'ri-bar-chart-line', path: '/dashboard' },
    { id: 'menu', label: 'Menú', icon: 'ri-restaurant-line', path: '/menu' },
    { id: 'comandas', label: 'Comandas', icon: 'ri-file-list-line', path: '/comandas' },
    { id: 'purchases', label: 'Compras', icon: 'ri-shopping-cart-line', path: '/purchases' },
    { id: 'categories', label: 'Categorías', icon: 'ri-folder-line', path: '/categories' },
    { id: 'clients', label: 'Clientes', icon: 'ri-user-line', path: '/clients' },
    { id: 'users', label: 'Usuarios', icon: 'ri-team-line', path: '/users' },
    { id: 'history', label: 'Historial', icon: 'ri-history-line', path: '/history' }
  ];

  return (
    <>
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen fixed left-0 top-0 z-40 hidden md:block`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-restaurant-2-fill text-green-600 text-xl"></i>
                </div>
                <span className="ml-2 font-bold text-gray-800">RestauAdmin</span>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <i className={`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line text-gray-600`}></i>
            </button>
          </div>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div
                className={`flex items-center px-4 py-3 mx-2 rounded-lg mb-1 cursor-pointer transition-colors ${
                  currentPage === item.id
                    ? 'bg-green-100 text-green-800 border-r-4 border-green-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                {!isCollapsed && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
              </div>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
              <i className="ri-user-line text-green-600"></i>
            </div>
            {!isCollapsed && (
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-800">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="flex justify-around py-2">
          {menuItems.slice(0, 5).map((item) => (
            <Link key={item.id} href={item.path}>
              <div className={`flex flex-col items-center py-2 px-1 cursor-pointer ${
                currentPage === item.id ? 'text-green-600' : 'text-gray-600'
              }`}>
                <i className={`${item.icon} text-lg`}></i>
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}