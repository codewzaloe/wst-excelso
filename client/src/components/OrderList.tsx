import { useApp } from '../context/AppContext';

export default function OrderList() {
    const { orders, customers } = useApp();

    const getCustomerName = (id: string) =>
        customers.find(c => c.id === id)?.name || 'Unknown';

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Daftar Order ({orders.length})</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada order</p>
            ) : (
                <div className="space-y-3">
                    {orders.map(o => (
                        <div key={o.id} className="border rounded p-3 text-sm">
                            <p><span className="font-semibold">Customer:</span> {getCustomerName(o.customer_id)}</p>
                            <p><span className="font-semibold">Items:</span> {o.items.join(', ')}</p>
                            <p><span className="font-semibold">Total:</span> Rp {o.total_price.toLocaleString('id-ID')}</p>
                            <p className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleString('id-ID')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}