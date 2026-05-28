import { useState } from 'react';
import axios from 'axios';
import { UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../shadcn/components/ui/button';
import { Input } from '../shadcn/components/ui/input';
import { Label } from '../shadcn/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '../shadcn/components/ui/dialog';

const API = 'http://localhost:3001';

interface CustomerFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CustomerForm({ open, onOpenChange }: CustomerFormProps) {
    const { setCustomers, customers } = useApp();
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            setError('Semua field wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${API}/customers`, form);
            setCustomers([...customers, res.data]);
            setForm({ name: '', email: '', phone: '' });
            onOpenChange(false);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Terjadi kesalahan saat menambahkan customer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card border-border rounded-2xl shadow-xl">
                <DialogHeader className="pb-2 border-b border-border">
                    <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                        <UserPlus className="w-5 h-5 text-accent" />
                        Tambah Customer
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm font-medium px-3 py-2 rounded-lg border border-destructive/20 animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Nama Lengkap
                        </Label>
                        <Input
                            id="name"
                            className="w-full bg-background border-border"
                            placeholder="Contoh: Budi Susanto"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            className="w-full bg-background border-border"
                            placeholder="Contoh: budi@gmail.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Nomor HP
                        </Label>
                        <Input
                            id="phone"
                            className="w-full bg-background border-border"
                            placeholder="Contoh: 081234567890"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4 py-5 font-semibold text-sm tracking-wide" disabled={loading}>
                        {loading ? 'Menambahkan...' : 'Tambah Customer'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}