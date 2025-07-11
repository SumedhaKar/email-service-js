const express = require('express');
const { EmailService } = require('./EmailService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const emailService = new EmailService();

app.post('/send', async (req, res) => {
  const { to, subject, body, requestId } = req.body;

  try {
    const result = await emailService.sendEmail(to, subject, body, requestId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Email send failed', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});