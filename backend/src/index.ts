import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';
import groqRoutes from './routes/groq.js';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'Cornelia backend is running' });
});

app.use('/api/contact', contactRoutes);
app.use('/api/groq', groqRoutes);

app.listen(port, () => {
  console.log(`Backend service listening on http://localhost:${port}`);
});
