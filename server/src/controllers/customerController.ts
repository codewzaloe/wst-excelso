import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDB, writeDB } from '../utils/db';

export const addCustomer = (req: Request, res: Response) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'name, email, dan phone wajib diisi' });
    }

    const db = readDB();

    const exists = db.customers.find(c => c.email === email);
    if (exists) {
        return res.status(409).json({ error: 'Email sudah terdaftar' });
    }

    const newCustomer = {
        id: uuidv4(),
        name,
        email,
        phone,
        createdAt: new Date().toISOString()
    };

    db.customers.push(newCustomer);
    writeDB(db);

    return res.status(201).json(newCustomer);
};

export const getCustomers = (req: Request, res: Response) => {
    const db = readDB();
    return res.json(db.customers);
};