import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const PORT = process.env.PORT || 3000;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server work!');
});

app.post('/api/payment', (req, res) => {
  const { amount, order_id } = req.body;

  const liqpayData = {
    version: 3,
    public_key: PUBLIC_KEY,
    action: 'pay',
    currency: 'UAH',
    description: 'Тестовая оплата',
    amount: amount,
    order_id: order_id,
    result_url: 'https://client-1.up.railway.app/payment',
    server_url: 'https://server-1.up.railway.app/api/payment-webhook',
  };

  const data = Buffer.from(JSON.stringify(liqpayData)).toString('base64');

  const signature = crypto
    .createHash('sha1')
    .update(PRIVATE_KEY + data + PRIVATE_KEY)
    .digest('base64');

  res.json({ data, signature });
});

app.post('/api/payment-webhook', (req, res) => {
  const { data, signature } = req.body;

  const expectedSignature = crypto
    .createHash('sha1')
    .update(PRIVATE_KEY + data + PRIVATE_KEY)
    .digest('base64');

  if (expectedSignature !== signature) {
    return res.status(403).json({ error: 'Invalid signature' });
  }

  const decoder = Buffer.from(data, 'base64').toString('utf-8');
  const paymenInfo = JSON.parse(decoder);
  const status = paymenInfo.status;

  console.log('Payment status:', status);

  res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Server listen ${PORT}`));
