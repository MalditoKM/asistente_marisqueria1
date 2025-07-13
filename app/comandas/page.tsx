
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  tableNumber: string;
  items: OrderItem[];
  total: number;
  status: 'Pendiente' | 'En preparación' | 'Listo' | 'Completado';
  paymentStatus: 'Pendiente' | 'Pagado';
  createdAt: string;
  waiter: string;
}

export default function Comandas() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '#001',
      customerName: 'Carlos García',
      tableNumber: '5',
      items: [
        { id: '1', name: 'Hamburguesa Clásica', quantity: 2, price: 12.50, total: 25.00 },
        { id: '2', name: 'Papas Fritas', quantity: 1, price: 5.00, total: 5.00 }
      ],
      total: 30.00,
      status: 'En preparación',
      paymentStatus: 'Pendiente',
      createdAt: '2024-01-15 14:30',
      waiter: 'Carlos López'
    }
  ]);

  const [menuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Hamburguesa Clásica', price: 12.50, category: 'Principales' },
    { id: '2', name: 'Pizza Margherita', price: 15.00, category: 'Pizzas' },
    { id: '3', name: 'Ensalada César', price: 8.50, category: 'Ensaladas' },
    { id: '4', name: 'Papas Fritas', price: 5.00, category: 'Acompañantes' },
    { id: '5', name: 'Pasta Carbonara', price: 11.00, category: 'Pastas' },
    { id: '6', name: 'Sopa de Tomate', price: 6.50, category: 'Entradas' },
    { id: '7', name: 'Tacos de Pollo', price: 9.00, category: 'Principales' },
    { id: '8', name: 'Quesadillas', price: 7.50, category: 'Principales' },
    { id: '9', name: 'Coca Cola', price: 2.50, category: 'Bebidas' },
    { id: '10', name: 'Agua Mineral', price: 2.00, category: 'Bebidas' },
    { id: '11', name: 'Cerveza Corona', price: 4.50, category: 'Bebidas' },
    { id: '12', name: 'Tiramisu', price: 6.00, category: 'Postres' },
    { id: '13', name: 'Flan de Caramelo', price: 5.50, category: 'Postres' },
    { id: '14', name: 'Brownie', price: 5.00, category: 'Postres' },
    { id: '15', name: 'Nachos con Queso', price: 6.50, category: 'Entradas' },
    { id: '16', name: 'Alitas BBQ', price: 8.00, category: 'Entradas' }
  ]);

  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentWaiter] = useState('Carlos López'); // Usuario mesero actual

  const categories = ['Todas', 'Entradas', 'Principales', 'Pizzas', 'Pastas', 'Ensaladas', 'Postres', 'Bebidas', 'Acompañantes'];

  // Abrir automáticamente nueva comanda al cargar la página
  useEffect(() => {
    setShowNewOrderModal(true);
  }, []);

  const addItemToOrder = (menuItem: MenuItem) => {
    const existingItem = selectedItems.find(item => item.id === menuItem.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setSelectedItems([...selectedItems, {
        id: menuItem.id,
        name: menuItem.name,
        quantity: 1,
        price: menuItem.price,
        total: menuItem.price
      }]);
    }
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    } else {
      setSelectedItems(selectedItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      ));
    }
  };

  const getOrderTotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.total, 0);
  };

  const createOrder = () => {
    if (!tableNumber.trim() || selectedItems.length === 0) {
      alert('Por favor ingrese el número de mesa y seleccione al menos un plato');
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: `#${String(orders.length + 1).padStart(3, '0')}`,
      customerName: customerName.trim() || 'Cliente',
      tableNumber,
      items: selectedItems,
      total: getOrderTotal(),
      status: 'Pendiente',
      paymentStatus: 'Pendiente',
      createdAt: new Date().toLocaleString(),
      waiter: currentWaiter
    };

    setOrders([...orders, newOrder]);
    setShowNewOrderModal(false);
    setSelectedItems([]);
    setCustomerName('');
    setTableNumber('');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const filteredMenuItems = selectedCategory === 'Todas'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Sistema de Comandas" subtitle="Gestiona las órdenes del restaurante" />
      
      <div className="flex">
        <Sidebar currentPage="comandas" />
        
        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="w-full md:w-auto">
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8 w-full md:w-auto"
                defaultValue=""
              >
                <option value="">Filtrar por estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En preparación">En preparación</option>
                <option value="Listo">Listo</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors w-full md:w-auto"
            >
              <i className="ri-add-line mr-2"></i>
              Nueva Comanda
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comanda
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente/Mesa
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Mesero
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Platos
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                          <div className="text-sm text-gray-500">{order.createdAt}</div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Mesa {order.tableNumber}</div>
                          <div className="text-sm text-gray-500">{order.customerName}</div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">{order.waiter}</div>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-900">
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.quantity}x {item.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer pr-8 ${
                            order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                            order.status === 'Listo' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'En preparación' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En preparación">En preparación</option>
                          <option value="Listo">Listo</option>
                          <option value="Completado">Completado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Nueva Comanda</h2>
                  <p className="text-sm text-gray-600">Mesero: {currentWaiter}</p>
                </div>
                <button
                  onClick={() => {
                    setShowNewOrderModal(false);
                    setSelectedItems([]);
                    setCustomerName('');
                    setTableNumber('');
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row h-[calc(90vh-140px)]">
              <div className="flex-1 p-6 border-r border-gray-200 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Seleccionar Platos</h3>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                          selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredMenuItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => addItemToOrder(item)}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 cursor-pointer transition-all duration-200 transform hover:scale-105"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">${item.price.toFixed(2)}</span>
                            <div className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                              <i className="ri-add-line text-sm"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-96 p-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Comanda Actual</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Mesa *
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Cliente (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="Cliente Final"
                  />
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Platos en la Comanda ({selectedItems.length}):
                  </h4>
                  {selectedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <i className="ri-restaurant-line text-4xl text-gray-300 mb-2"></i>
                      <p className="text-gray-500 text-sm">La comanda está vacía.</p>
                      <p className="text-gray-400 text-xs">Selecciona platos del menú</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">${item.price.toFixed(2)} c/u</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded cursor-pointer hover:bg-red-200 transition-colors"
                            >
                              <i className="ri-subtract-line text-xs"></i>
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded cursor-pointer hover:bg-green-200 transition-colors"
                            >
                              <i className="ri-add-line text-xs"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>TOTAL:</span>
                    <span className="text-green-600">${getOrderTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={createOrder}
                    disabled={selectedItems.length === 0 || !tableNumber.trim()}
                    className={`w-full py-3 rounded-lg cursor-pointer transition-colors font-medium ${
                      selectedItems.length === 0 || !tableNumber.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <i className="ri-save-line mr-2"></i>
                    Guardar Comanda
                  </button>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <i className="ri-delete-bin-line mr-2"></i>
                    Limpiar Comanda
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
