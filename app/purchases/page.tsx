'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Purchase {
  id: string;
  supplier: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  totalAmount: number;
  date: string;
  status: 'Pendiente' | 'Recibido' | 'Cancelado';
  invoiceNumber: string;
}

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: '1',
      supplier: 'Distribuidora Alimentaria XYZ',
      items: [
        { name: 'Carne de Res', quantity: 10, unitPrice: 12.50, total: 125.00 },
        { name: 'Pollo Fresco', quantity: 8, unitPrice: 8.00, total: 64.00 }
      ],
      totalAmount: 189.00,
      date: '2024-01-15',
      status: 'Recibido',
      invoiceNumber: 'INV-001'
    },
    {
      id: '2',
      supplier: 'Verduras Frescas S.A.',
      items: [
        { name: 'Tomates', quantity: 15, unitPrice: 3.20, total: 48.00 },
        { name: 'Lechuga', quantity: 20, unitPrice: 1.50, total: 30.00 },
        { name: 'Cebollas', quantity: 5, unitPrice: 2.80, total: 14.00 }
      ],
      totalAmount: 92.00,
      date: '2024-01-14',
      status: 'Pendiente',
      invoiceNumber: 'INV-002'
    },
    {
      id: '3',
      supplier: 'Lácteos Premium',
      items: [
        { name: 'Queso Mozzarella', quantity: 6, unitPrice: 8.50, total: 51.00 },
        { name: 'Leche Fresca', quantity: 12, unitPrice: 2.20, total: 26.40 }
      ],
      totalAmount: 77.40,
      date: '2024-01-13',
      status: 'Recibido',
      invoiceNumber: 'INV-003'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [formData, setFormData] = useState({
    supplier: '',
    invoiceNumber: '',
    items: [{ name: '', quantity: 1, unitPrice: 0 }]
  });

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.supplier.trim() || !formData.invoiceNumber.trim()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const totalAmount = formData.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      supplier: formData.supplier,
      items: formData.items.map(item => ({
        ...item,
        total: item.quantity * item.unitPrice
      })),
      totalAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Pendiente',
      invoiceNumber: formData.invoiceNumber
    };

    setPurchases([newPurchase, ...purchases]);
    setShowModal(false);
    setFormData({
      supplier: '',
      invoiceNumber: '',
      items: [{ name: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const updateStatus = (id: string, newStatus: Purchase['status']) => {
    setPurchases(purchases.map(purchase => 
      purchase.id === id ? { ...purchase, status: newStatus } : purchase
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Recibido': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusOptions: Purchase['status'][] = ['Pendiente', 'Recibido', 'Cancelado'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="purchases" />
      
      <div className="flex-1 ml-64">
        <Header title="Gestión de Compras" subtitle="Administra las compras a proveedores" />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar compras..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-8">
                <option value="">Todos los estados</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
            >
              <i className="ri-add-line mr-2"></i>
              Nueva Compra
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Compra
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proveedor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
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
                  {purchases.map((purchase) => (
                    <tr key={purchase.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{purchase.invoiceNumber}</div>
                          <div className="text-sm text-gray-500">{purchase.date}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{purchase.supplier}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {purchase.items.length} productos
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${purchase.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={purchase.status}
                          onChange={(e) => updateStatus(purchase.id, e.target.value as Purchase['status'])}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer pr-8 ${getStatusColor(purchase.status)}`}
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedPurchase(purchase)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Nueva Compra</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proveedor *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Nombre del proveedor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Factura *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="INV-001"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Productos
                  </label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-green-200 transition-colors"
                  >
                    <i className="ri-add-line mr-1"></i>
                    Agregar Producto
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <input
                          type="text"
                          required
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Nombre del producto"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          required
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Cant."
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          required
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Precio"
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm font-medium text-center">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1">
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-lg font-semibold">
                  Total: ${formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({
                      supplier: '',
                      invoiceNumber: '',
                      items: [{ name: '', quantity: 1, unitPrice: 0 }]
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
                  Crear Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Detalle de Compra {selectedPurchase.invoiceNumber}</h2>
              <button
                onClick={() => setSelectedPurchase(null)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Proveedor</p>
                  <p className="text-gray-900">{selectedPurchase.supplier}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Fecha</p>
                  <p className="text-gray-900">{selectedPurchase.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Productos</p>
                <div className="space-y-2">
                  {selectedPurchase.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium text-green-600">${item.total.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-bold text-green-600">${selectedPurchase.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}