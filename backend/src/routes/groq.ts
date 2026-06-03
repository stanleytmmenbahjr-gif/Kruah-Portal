import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  return res.json({ answer: `This is a placeholder response for the Groq assistant. Message received: ${message}` });
});

export default router;
