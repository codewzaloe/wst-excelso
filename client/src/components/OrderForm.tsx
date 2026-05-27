import { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Button } from '../shadcn/components/ui/button';

const API = 'http://localhost:3001';

export default function OrderForm() {
    const { customers, orders, setOrders } = useApp();
    const [form, setForm] = useState({
        customer_id: '',
        items: '',
        total_price: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const payload = {
                customer_id: form.customer_id,
                items: form.items.split(',').map(i => i.trim()),
                total_price: Number(form.total_price)
            };
            const res = await axios.post(`${API}/orders`, payload);
            setOrders([...orders, res.data]);
            setForm({ customer_id: '', items: '', total_price: '' });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Terjadi kesalahan');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Tambah Order</h2>
            {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <select
                    className="w-full border p-2 rounded text-sm"
                    value={form.customer_id}
                    onChange={e => setForm({ ...form, customer_id: e.target.value })}
                >
                    <option value="">Pilih Customer</option>
                    {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <input
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Items (pisah koma, contoh: Nasi Goreng, Es Teh)"
                    value={form.items}
                    onChange={e => setForm({ ...form, items: e.target.value })}
                />
                <input
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Total Harga (Rp)"
                    type="number"
                    value={form.total_price}
                    onChange={e => setForm({ ...form, total_price: e.target.value })}
                />
                <Button type="submit" className="w-full">
                    Tambah Order
                </Button>
            </form>
        </div>
    );
}