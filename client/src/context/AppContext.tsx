import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Customer, Order } from '../types';

interface AppContextType {
    customers: Customer[];
    orders: Order[];
    setCustomers: (c: Customer[]) => void;
    setOrders: (o: Order[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    return (
        <AppContext.Provider value={{ customers, orders, setCustomers, setOrders }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used inside AppProvider');
    return ctx;
};