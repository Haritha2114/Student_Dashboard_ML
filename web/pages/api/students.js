import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'students_processed.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load data' });
  }
}
