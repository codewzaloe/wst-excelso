import { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Button } from '../shadcn/components/ui/button';

const API = 'http://localhost:3001';

export default function CustomerForm() {
    const { setCustomers, customers } = useApp();
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(`${API}/customers`, form);
            setCustomers([...customers, res.data]);
            setForm({ name: '', email: '', phone: '' });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Terjadi kesalahan');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Tambah Customer</h2>
            {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Nama"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Nomor HP"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                <Button type="submit" className="w-full">
                    Tambah Customer
                </Button>
            </form>
        </div>
    );
}