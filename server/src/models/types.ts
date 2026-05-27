export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
}

export interface Order {
    id: string;
    customer_id: string;
    items: string[];
    total_price: number;
    createdAt: string;
}

export interface Database {
    customers: Customer[];
    orders: Order[];
}