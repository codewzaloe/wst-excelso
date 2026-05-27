export type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
}

export type Order = {
    id: string;
    customer_id: string;
    items: string[];
    total_price: number;
    createdAt: string;
}