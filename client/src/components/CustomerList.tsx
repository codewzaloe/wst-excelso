import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Button } from '../shadcn/components/ui/button';

const API = 'http://localhost:3001';

export default function CustomerList() {
    const { customers, setOrders } = useApp();

    const loadOrdersByCustomer = async (customerId: string) => {
        const res = await axios.get(`${API}/orders?customer_id=${customerId}`);
        setOrders(res.data);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Daftar Customer ({customers.length})</h2>
            {customers.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada customer</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Nama</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">HP</th>
                            <th className="p-2 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c.id} className="border-t">
                                <td className="p-2">{c.name}</td>
                                <td className="p-2">{c.email}</td>
                                <td className="p-2">{c.phone}</td>
                                <td className="p-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => loadOrdersByCustomer(c.id)}
                                    >
                                        Lihat Order
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}