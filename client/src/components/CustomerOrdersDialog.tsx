import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../shadcn/components/ui/dialog';
import { Utensils, Receipt, Landmark, Calendar } from 'lucide-react';
import type { Customer, Order } from '../types';

interface CustomerOrdersDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: Customer | null;
    orders: Order[];
}

export default function CustomerOrdersDialog({ open, onOpenChange, customer, orders }: CustomerOrdersDialogProps) {
    const customerOrders = customer
        ? orders.filter(o => o.customer_id === customer.id)
        : [];

    const totalSpend = customerOrders.reduce((sum, order) => sum + order.total_price, 0);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-card border-border rounded-xl shadow-xl">
                <DialogHeader className="pb-4 border-b border-border">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2.5">
                        <Utensils className="w-5 h-5 text-accent" />
                        Riwayat Order
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground mt-1">
                        Daftar transaksi untuk customer <strong className="text-foreground">{customer?.name}</strong>
                    </DialogDescription>
                </DialogHeader>

                {customerOrders.length === 0 ? (
                    <div className="py-12 text-center">
                        <Receipt className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm font-medium text-muted-foreground">Belum ada riwayat order untuk customer ini.</p>
                    </div>
                ) : (
                    <div className="space-y-5 pt-4">
                        {/* Customer Spend Summary */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="flex items-center gap-2">
                                <Landmark className="w-4 h-4 text-accent" />
                                <span className="text-sm font-semibold text-muted-foreground">Total Pengeluaran</span>
                            </div>
                            <span className="text-lg font-black text-foreground">
                                Rp {totalSpend.toLocaleString('id-ID')}
                            </span>
                        </div>

                        {/* Order Cards Scrollable List */}
                        <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1">
                            {customerOrders.map(o => (
                                <div key={o.id} className="p-4 border border-border rounded-xl bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors hover:bg-muted/10">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3 text-accent" />
                                            {new Date(o.createdAt).toLocaleString('id-ID', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </p>
                                        <p className="text-sm font-bold text-foreground">
                                            {o.items.join(', ')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-extrabold text-foreground">
                                            Rp {o.total_price.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
