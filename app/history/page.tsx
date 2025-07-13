
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface OrderHistory {
  id: string;
  orderNumber: string;
  customerName: string;
  tableNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'Pendiente' | 'En preparación' | 'Listo' | 'Completado' | 'Cancelado';
  paymentStatus: 'Pendiente' | 'Pagado' | 'Cancelado';
  createdAt: string;
  completedAt?: string;
}

export default function History() {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([
    {
      id: '1',
      orderNumber: '#001',
      customerName: 'Carlos García',
      tableNumber: '5',
      items: [
        { name: 'Hamburguesa Clásica', quantity: 2, price: 12.50 },
        { name: 'Papas Fritas', quantity: 1, price: 5.00 }
      ],
      total: 30.00,
      status: 'Completado',
      paymentStatus: 'Pagado',
      createdAt: '2024-01-15 14:30',
      completedAt: '2024-01-15 15:00'
    },
    {
      id: '2',
      orderNumber: '#002',
      customerName: 'María López',
      tableNumber: '2',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: 15.00 },
        { name: 'Coca Cola', quantity: 2, price: 2.50 }
      ],
      total: 20.00,
      status: 'Completado',
      paymentStatus: 'Pendiente',
      createdAt: '2024-01-15 14:15',
      completedAt: '2024-01-15 14:45'
    },
    {
      id: '3',
      orderNumber: '#003',
      customerName: 'Juan Pérez',
      tableNumber: '8',
      items: [
        { name: 'Ensalada César', quantity: 1, price: 8.50 },
        { name: 'Pasta Carbonara', quantity: 1, price: 11.00 }
      ],
      total: 19.50,
      status: 'En preparación',
      paymentStatus: 'Pendiente',
      createdAt: '2024-01-15 14:25'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItems, setEditingItems] = useState<Array<{name: string; quantity: number; price: number}>>([]);

  const updatePaymentStatus = (orderId: string, paymentStatus: OrderHistory['paymentStatus']) => {
    setOrderHistory(orderHistory.map(order =>
      order.id === orderId ? { ...order, paymentStatus } : order
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este registro del historial?')) {
      setOrderHistory(orderHistory.filter(order => order.id !== id));
    }
  };

  const handleEditOrder = (order: OrderHistory) => {
    setSelectedOrder(order);
    setEditingItems([...order.items]);
    setShowEditModal(true);
  };

  const updateItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setEditingItems(editingItems.filter((_, i) => i !== index));
    } else {
      setEditingItems(editingItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const saveOrderChanges = () => {
    if (selectedOrder) {
      const newTotal = editingItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      const updatedOrder = {
        ...selectedOrder,
        items: editingItems,
        total: newTotal
      };
      
      setOrderHistory(orderHistory.map(order =>
        order.id === selectedOrder.id ? updatedOrder : order
      ));
      
      setShowEditModal(false);
      setSelectedOrder(null);
      setEditingItems([]);
    }
  };

  const printTicket = (order: OrderHistory) => {
    const restaurantName = "Mi Restaurante"; // Esto vendría de la configuración
    const ticketContent = `
      ================================
      ${restaurantName.toUpperCase()}
      ================================
      
      Comanda: ${order.orderNumber}
      Mesa: ${order.tableNumber}
      Cliente: ${order.customerName}
      Fecha: ${order.createdAt}
      
      --------------------------------
      DETALLE DE LA ORDEN
      --------------------------------
      ${order.items.map(item => 
        `${item.quantity}x ${item.name.padEnd(20)} $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n      ')}
      
      --------------------------------
      TOTAL: $${order.total.toFixed(2)}
      --------------------------------
      
      Estado: ${order.status}
      Pago: ${order.paymentStatus}
      
      ¡Gracias por su visita!
      ================================
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Ticket - ${order.orderNumber}</title>
            <style>
              body { font-family: 'Courier New', monospace; font-size: 12px; margin: 20px; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${ticketContent}</pre>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return 'bg-red-100 text-red-800';
      case 'En preparación': return 'bg-yellow-100 text-yellow-800';
      case 'Listo': return 'bg-blue-100 text-blue-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'Pagado': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Historial de Ventas" subtitle="Registro completo de todas las comandas" />
      
      <div className="flex">
        <Sidebar currentPage="history" />
        
        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Buscar comandas..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm w-full"
                />
                <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8 w-full md:w-auto">
                <option value="">Todos los estados</option>
                <option value="Completado">Completado</option>
                <option value="En preparación">En preparación</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8 w-full md:w-auto">
                <option value="">Estado de pago</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
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
                      Platos
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pago
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderHistory.map((order) => (
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
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updatePaymentStatus(order.id, e.target.value as OrderHistory['paymentStatus'])}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer pr-8 ${getPaymentColor(order.paymentStatus)}`}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Pagado">Pagado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                            title="Ver detalles"
                          >
                            <i className="ri-eye-line text-sm"></i>
                          </button>
                          <button
                            onClick={() => printTicket(order)}
                            className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors"
                            title="Imprimir ticket"
                          >
                            <i className="ri-printer-line text-sm"></i>
                          </button>
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-lg cursor-pointer transition-colors"
                            title="Editar pedido"
                          >
                            <i className="ri-edit-line text-sm"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                            title="Eliminar"
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
      </div>

      {selectedOrder && !showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Detalle de Comanda {selectedOrder.orderNumber}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Mesa</p>
                  <p className="text-gray-900">{selectedOrder.tableNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Cliente</p>
                  <p className="text-gray-900">{selectedOrder.customerName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Platos Ordenados</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-bold text-green-600">${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Estado</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Pago</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => printTicket(selectedOrder)}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 whitespace-nowrap cursor-pointer transition-colors"
                >
                  <i className="ri-printer-line mr-2"></i>
                  Imprimir Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Editar Comanda {selectedOrder.orderNumber}</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Platos en el Pedido</p>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {editingItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateItemQuantity(index, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded cursor-pointer hover:bg-red-200"
                        >
                          <i className="ri-subtract-line text-xs"></i>
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(index, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded cursor-pointer hover:bg-green-200"
                        >
                          <i className="ri-add-line text-xs"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Nuevo Total</p>
                  <p className="text-lg font-bold text-green-600">
                    ${editingItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveOrderChanges}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
