import { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Button } from '../shadcn/components/ui/button';
import { Input } from '../shadcn/components/ui/input';
import { Label } from '../shadcn/components/ui/label';

const API = 'http://localhost:3001';

interface OrderFormProps {
    onSuccess?: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
    const { customers, orders, setOrders } = useApp();
    const [form, setForm] = useState({
        customer_id: '',
        items: '',
        total_price: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.customer_id) {
            setError('Silakan pilih customer terlebih dahulu');
            return;
        }
        if (!form.items.trim()) {
            setError('Silakan isi menu items yang dipesan');
            return;
        }
        if (!form.total_price || Number(form.total_price) <= 0) {
            setError('Silakan masukkan total harga yang valid');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                customer_id: form.customer_id,
                items: form.items.split(',').map(i => i.trim()).filter(Boolean),
                total_price: Number(form.total_price)
            };
            const res = await axios.post(`${API}/orders`, payload);
            setOrders([...orders, res.data]);
            setForm({ customer_id: '', items: '', total_price: '' });
            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Terjadi kesalahan saat menambahkan order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 py-1">
            {error && (
                <div className="bg-destructive/10 text-destructive text-xs font-medium px-3 py-2 rounded-lg border border-destructive/20 animate-shake">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="space-y-1 md:col-span-3">
                    <Label htmlFor="customer_id" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Customer
                    </Label>
                    <select
                        id="customer_id"
                        className="h-8 w-full bg-background border border-border px-2.5 rounded-lg text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        value={form.customer_id}
                        onChange={e => setForm({ ...form, customer_id: e.target.value })}
                    >
                        <option value="">Pilih Customer...</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1 md:col-span-4">
                    <Label htmlFor="items" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Menu Items
                    </Label>
                    <Input
                        id="items"
                        className="w-full bg-background border-border h-8 text-sm"
                        placeholder="Contoh: Nasi Goreng"
                        value={form.items}
                        onChange={e => setForm({ ...form, items: e.target.value })}
                    />
                </div>

                <div className="space-y-1 md:col-span-3">
                    <Label htmlFor="total_price" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Total Harga (Rp)
                    </Label>
                    <Input
                        id="total_price"
                        type="number"
                        min="0"
                        className="w-full bg-background border-border h-8 text-sm"
                        placeholder="Contoh: 120000"
                        value={form.total_price}
                        onChange={e => setForm({ ...form, total_price: e.target.value })}
                    />
                </div>

                <div className="md:col-span-2">
                    <Button type="submit" className="w-full font-bold text-xs tracking-wide h-8" disabled={loading}>
                        {loading ? 'Menambahkan...' : 'Tambah Order'}
                    </Button>
                </div>
            </div>
        </form>
    );
}