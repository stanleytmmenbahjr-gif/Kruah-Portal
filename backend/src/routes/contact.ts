import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  return res.json({ success: true, received: { name, email, message } });
});

export default router;
