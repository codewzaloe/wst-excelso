import { useState } from 'react';
import { Search, Calendar, ClipboardList, FolderPlus } from 'lucide-react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, createColumnHelper, } from '@tanstack/react-table';
import { useApp } from '../context/AppContext';
import { Input } from '../shadcn/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '../shadcn/components/ui/table';
import OrderForm from './OrderForm';
import type { Order } from '../types';

const columnHelper = createColumnHelper<Order>();

export default function OrderList() {
    const { orders, customers } = useApp();
    const [searchQuery, setSearchQuery] = useState('');

    const getCustomerName = (id: string) =>
        customers.find(c => c.id === id)?.name || 'Customer Terhapus';

    const columns = [
        columnHelper.accessor(row => getCustomerName(row.customer_id), {
            id: 'customerName',
            header: 'Customer',
            cell: info => <span className="font-bold text-foreground">{info.getValue()}</span>,
        }),
        columnHelper.accessor('items', {
            header: 'Menu Items',
            cell: info => (
                <div className="flex flex-wrap gap-1">
                    {info.getValue().map((item, idx) => (
                        <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-secondary text-secondary-foreground border border-border"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            ),
        }),
        columnHelper.accessor('createdAt', {
            header: 'Tanggal',
            cell: info => (
                <span className="text-muted-foreground text-xs font-medium flex items-center gap-1.5">
                    {new Date(info.getValue()).toLocaleString('id-ID', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    })}
                </span>
            ),
        }),
        columnHelper.accessor('total_price', {
            header: () => <div className="text-right">Total Harga</div>,
            cell: info => (
                <div className="text-right font-black text-foreground">
                    Rp {info.getValue().toLocaleString('id-ID')}
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: orders,
        columns,
        state: {
            globalFilter: searchQuery,
        },
        onGlobalFilterChange: setSearchQuery,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const rows = table.getRowModel().rows;

    const filteredRevenue = rows.reduce((sum, row) => sum + row.original.total_price, 0);

    return (
        <div className="space-y-6">
            <div className="bg-card p-4 sm:p-5 rounded-2xl border border-border shadow-sm">
                <div className="border-b border-border pb-2 mb-3">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <FolderPlus className="w-4 h-4 text-accent" />
                        Tambah Order
                    </h3>
                </div>
                <OrderForm />
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card">
                    <div> <h2 className="text-xl font-bold text-foreground">Daftar Order</h2> </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Cari berdasarkan nama customer..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-9 bg-background border-border text-sm h-9 rounded-lg"
                        />
                    </div>
                </div>

                {rows.length === 0 ? (
                    <div className="p-12 text-center">
                        <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm font-medium">
                            {searchQuery ? 'Tidak ada order yang cocok' : 'Belum ada transaksi terdaftar'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border bg-muted/40">
                                        {headerGroup.headers.map(header => (
                                            <TableHead
                                                key={header.id}
                                                className="font-semibold text-xs uppercase tracking-wider text-muted-foreground h-11 px-6 align-middle"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow
                                        key={row.id}
                                        className="hover:bg-muted/30 border-b border-border transition-colors"
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} className="px-6 py-4 align-middle">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* Optional Footer Filter Sum */}
                {searchQuery && rows.length > 0 && (
                    <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between text-xs font-semibold px-6">
                        <span className="text-muted-foreground">Hasil Pencarian: {rows.length} transaksi</span>
                        <span className="text-foreground">Total Filtered: Rp {filteredRevenue.toLocaleString('id-ID')}</span>
                    </div>
                )}
            </div>
        </div>
    );
}