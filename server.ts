import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'data.json');

app.use(express.json());

// --- Database Logic (Simple JSON File) ---
const getInitialData = () => ({
  match: {
    team1: { name: 'CSK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png' },
    team2: { name: 'MI', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png' },
    date: '2026-04-05',
    time: '07:30 PM',
    venue: 'Wankhede Stadium, Mumbai',
  },
  bookings: []
});

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(getInitialData(), null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
};

const saveData = (data: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- API Routes ---

// Get current match and bookings (Public/Admin)
app.get('/api/data', (req, res) => {
  res.json(readData());
});

// Update match (Admin only - in a real app, add auth middleware)
app.post('/api/match', (req, res) => {
  const data = readData();
  data.match = req.body;
  saveData(data);
  res.json({ success: true, match: data.match });
});

// Create a booking
app.post('/api/bookings', (req, res) => {
  const data = readData();
  const newBooking = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  data.bookings.push(newBooking);
  saveData(data);
  res.json({ success: true, booking: newBooking });
});

// Export bookings as CSV (Excel compatible)
app.get('/api/export', (req, res) => {
  const data = readData();
  const bookings = data.bookings;
  
  if (bookings.length === 0) {
    return res.status(404).send('No bookings to export');
  }

  const headers = ['ID', 'Date', 'Name', 'Phone', 'Guests', 'Team', 'Match Date'];
  const rows = bookings.map((b: any) => [
    b.id,
    new Date(b.createdAt).toLocaleString(),
    b.name,
    b.phone,
    b.guests,
    b.team,
    b.date
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=ipl_bookings.csv');
  res.send(csvContent);
});

// --- Vite Integration ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
