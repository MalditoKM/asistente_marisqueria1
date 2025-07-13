
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('dia');
  
  const stats = [
    { title: 'Platos del Menú', value: '45', icon: 'ri-restaurant-line', color: 'bg-blue-500' },
    { title: 'Comandas Hoy', value: '23', icon: 'ri-file-list-line', color: 'bg-green-500' },
    { title: 'Clientes Activos', value: '156', icon: 'ri-user-line', color: 'bg-purple-500' },
    { title: 'Ventas del Día', value: '$1,245', icon: 'ri-money-dollar-circle-line', color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: '#001', table: 'Mesa 5', items: 3, total: '$45.00', status: 'En preparación', time: '14:30' },
    { id: '#002', table: 'Mesa 2', items: 2, total: '$28.50', status: 'Completado', time: '14:15' },
    { id: '#003', table: 'Mesa 8', items: 4, total: '$67.20', status: 'Pendiente', time: '14:25' },
    { id: '#004', table: 'Mesa 1', items: 1, total: '$15.00', status: 'Completado', time: '14:10' },
  ];

  const topSellingDishes = [
    { name: 'Hamburguesa Clásica', category: 'Principales', sales: 23, price: '$12.50' },
    { name: 'Pizza Margherita', category: 'Pizzas', sales: 18, price: '$15.00' },
    { name: 'Ensalada César', category: 'Ensaladas', sales: 15, price: '$8.50' },
    { name: 'Pasta Carbonara', category: 'Pastas', sales: 12, price: '$11.00' },
  ];

  const leastSellingDishes = [
    { name: 'Sopa de Cebolla', category: 'Entradas', sales: 2, price: '$6.50' },
    { name: 'Risotto de Hongos', category: 'Principales', sales: 3, price: '$14.00' },
    { name: 'Tarta de Manzana', category: 'Postres', sales: 4, price: '$7.00' },
    { name: 'Agua Mineral', category: 'Bebidas', sales: 5, price: '$2.00' },
  ];

  const getSalesDataForDate = (date: string) => {
    // Simular datos basados en la fecha seleccionada
    const baseValues = [120, 450, 680, 220];
    return {
      labels: ['6 AM', '12 PM', '6 PM', '12 AM'],
      values: baseValues.map(val => val + Math.floor(Math.random() * 100))
    };
  };

  const getSalesDataForPeriod = () => {
    if (selectedPeriod === 'dia') {
      return getSalesDataForDate(selectedDate);
    } else if (selectedPeriod === 'mes') {
      return { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], values: [3200, 4500, 3800, 5200] };
    } else {
      return { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], values: [12000, 15000, 13500, 16800, 18200, 20500] };
    }
  };

  const currentSalesData = getSalesDataForPeriod();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Informes" subtitle="Resumen general del restaurante" />
      
      <div className="flex">
        <Sidebar currentPage="dashboard" />
        
        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center ${stat.color} rounded-lg`}>
                    <i className={`${stat.icon} text-white text-lg md:text-xl`}></i>
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Ventas por Período</h3>
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex space-x-2">
                      {['dia', 'mes', 'año'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedPeriod(period)}
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                            selectedPeriod === period 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                    {selectedPeriod === 'dia' && (
                      <div className="flex items-center space-x-2">
                        <i className="ri-calendar-line text-gray-500"></i>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="h-64 flex items-end justify-between space-x-2">
                  {currentSalesData.values.map((value, index) => {
                    const maxValue = Math.max(...currentSalesData.values);
                    const height = (value / maxValue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-green-500 rounded-t-md mb-2 flex items-end justify-center pb-2"
                          style={{ height: `${height}%`, minHeight: '20px' }}
                        >
                          <span className="text-white text-xs font-medium">${value}</span>
                        </div>
                        <span className="text-xs text-gray-600">
                          {currentSalesData.labels[index]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Comandas Recientes</h3>
              </div>
              <div className="p-4 md:p-6">
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 text-sm">{order.id}</span>
                          <span className="text-gray-600 text-sm">-</span>
                          <span className="text-gray-600 text-sm">{order.table}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{order.items} platos</span>
                          <span className="text-xs font-medium text-green-600">{order.total}</span>
                          <span className="text-xs text-gray-500">{order.time}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                        order.status === 'En preparación' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Platos Más Vendidos</h3>
              </div>
              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  {topSellingDishes.map((dish, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold text-sm">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{dish.name}</p>
                          <p className="text-xs text-gray-500">{dish.category} - {dish.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 text-sm">{dish.sales}</p>
                        <p className="text-xs text-gray-500">vendidos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Platos Menos Vendidos</h3>
              </div>
              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  {leastSellingDishes.map((dish, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{dish.name}</p>
                          <p className="text-xs text-gray-500">{dish.category} - {dish.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 text-sm">{dish.sales}</p>
                        <p className="text-xs text-gray-500">vendidos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
