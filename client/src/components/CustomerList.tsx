import { useState } from 'react';
import { Search, UserCheck, Receipt } from 'lucide-react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, createColumnHelper, } from '@tanstack/react-table';
import { useApp } from '../context/AppContext';
import { Button } from '../shadcn/components/ui/button';
import { Input } from '../shadcn/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '../shadcn/components/ui/table';
import CustomerOrdersDialog from './CustomerOrdersDialog';
import type { Customer } from '../types';

const columnHelper = createColumnHelper<Customer>();

export default function CustomerList() {
    const { customers, orders } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);

    const loadOrdersByCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsOrdersOpen(true);
    };

    // Define TanStack Table Columns
    const columns = [
        columnHelper.accessor('name', {
            header: 'Nama',
            cell: info => <span className="font-semibold text-foreground">{info.getValue()}</span>,
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => <span className="text-muted-foreground">{info.getValue()}</span>,
        }),
        columnHelper.accessor('phone', {
            header: 'No. Handphone',
            cell: info => <span className="text-muted-foreground font-mono text-xs">{info.getValue()}</span>,
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <div className="text-right">Aksi</div>,
            cell: info => (
                <div className="text-right">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadOrdersByCustomer(info.row.original)}
                        className="hover:bg-accent hover:text-accent-foreground border-border text-xs gap-1.5 h-8 px-3 rounded-lg"
                    >
                        <Receipt className="w-3.5 h-3.5" />
                        Lihat Order
                    </Button>
                </div>
            ),
        }),
    ];

    // Initialize TanStack Table
    const table = useReactTable({
        data: customers,
        columns,
        state: {
            globalFilter: searchQuery,
        },
        onGlobalFilterChange: setSearchQuery,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const rows = table.getRowModel().rows;

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Daftar Customer</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Kelola data pelanggan Warung Kuliner</p>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                            placeholder="Cari nama, email, atau HP..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-9 bg-background border-border text-sm h-9 rounded-lg"
                        />
                    </div>
                </div>

                {rows.length === 0 ? (
                    <div className="p-12 text-center">
                        <UserCheck className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm font-medium">
                            {searchQuery ? 'Tidak ada customer yang cocok' : 'Belum ada customer terdaftar'}
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
            </div>

            <CustomerOrdersDialog
                open={isOrdersOpen}
                onOpenChange={setIsOrdersOpen}
                customer={selectedCustomer}
                orders={orders}
            />
        </div>
    );
}