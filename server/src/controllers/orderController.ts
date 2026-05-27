import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDB, writeDB } from '../utils/db';

export const addOrder = (req: Request, res: Response) => {
    const { customer_id, items, total_price } = req.body;

    if (!customer_id || !items || !Array.isArray(items) || total_price === undefined) {
        return res.status(400).json({ error: 'customer_id, items[], dan total_price wajib diisi' });
    }

    const db = readDB();

    const customerExists = db.customers.find(c => c.id === customer_id);
    if (!customerExists) {
        return res.status(404).json({ error: 'Customer tidak ditemukan' });
    }

    const newOrder = {
        id: uuidv4(),
        customer_id,
        items,
        total_price,
        createdAt: new Date().toISOString()
    };

    db.orders.push(newOrder);
    writeDB(db);

    return res.status(201).json(newOrder);
};

export const getOrders = (req: Request, res: Response) => {
    const { customer_id } = req.query;
    const db = readDB();

    const orders = customer_id
        ? db.orders.filter(o => o.customer_id === customer_id)
        : db.orders;

    return res.json(orders);
};