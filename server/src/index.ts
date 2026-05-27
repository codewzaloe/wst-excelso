import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customers';
import orderRoutes from './routes/orders';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Mini CRM API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});