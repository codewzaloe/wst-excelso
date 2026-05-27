import fs from 'fs';
import path from 'path';
import { Database } from '../models/types';

const DB_PATH = path.join(__dirname, '../../db.json');

export const readDB = (): Database => {
    if (!fs.existsSync(DB_PATH)) {
        const empty: Database = { customers: [], orders: [] };
        fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2));
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
};

export const writeDB = (data: Database): void => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};