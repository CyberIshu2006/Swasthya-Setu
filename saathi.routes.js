import { Router } from 'express';
import { sendSaathiMessage } from './saathi.service.js';

const router = Router();

router.post('/chat', async (req, res, next) => {
  try {
    const result = await sendSaathiMessage({
      message: req.body?.message,
      history: req.body?.history,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
