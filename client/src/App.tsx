import { useEffect } from 'react';
import axios from 'axios';
import { AppProvider, useApp } from './context/AppContext';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';

const API = 'http://localhost:3001';

function Dashboard() {
  const { setCustomers, setOrders } = useApp();

  useEffect(() => {
    axios.get(`${API}/customers`).then(r => setCustomers(r.data));
    axios.get(`${API}/orders`).then(r => setOrders(r.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Mini CRM - Warung Kuliner
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerForm />
        <OrderForm />
        <CustomerList />
        <OrderList />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}