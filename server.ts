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
  logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png',
  hero: {
    title: 'WATCH IPL LIVE ON',
    highlight: 'GIANT SCREEN',
    subtitle: 'Book your table now for tonight’s big match, enjoy exciting food combos, live crowd energy, and exclusive match-day offers.',
    whatsappNumber: '919999999999',
    backgroundImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000'
  },
  match: {
    team1: { name: 'CSK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png' },
    team2: { name: 'MI', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png' },
    date: '2026-04-05',
    time: '07:30 PM',
    venue: 'Wankhede Stadium, Mumbai',
    offer: '🔥 OFFER: Free fries on every six hit by your favorite team!'
  },
  features: [
    { id: '1', icon: 'Tv', title: '120" LED Screen', description: 'Crystal clear 4K resolution for the ultimate stadium feel.' },
    { id: '2', icon: 'Volume2', title: 'Surround Sound', description: 'High-fidelity audio that makes you feel every cheer and wicket.' },
    { id: '3', icon: 'Utensils', title: 'IPL Combos', description: 'Specially curated match-day food and drink platters.' },
    { id: '4', icon: 'Zap', title: 'Live DJ', description: 'Music and energy that keeps the vibe high throughout the match.' }
  ],
  combos: [
    { id: '1', name: 'Powerplay Platter', price: '₹499', description: 'Loaded Nachos + 2 Mocktails + Peri Peri Fries', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800', tag: 'Best Seller' },
    { id: '2', name: 'Boundary Bucket', price: '₹799', description: '12 Chicken Wings + Large Pizza + Coke Pitcher', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800', tag: 'Group Deal' },
    { id: '3', name: 'Super Over Snack', price: '₹299', description: 'Cheese Sliders + Masala Wedges', image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=800', tag: 'Quick Bite' },
    { id: '4', name: 'Century Combo', price: '₹999', description: 'Full Tandoori Platter + 4 Beverages', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', tag: 'Premium' }
  ],
  testimonials: [
    { id: '1', name: 'Rahul Sharma', rating: 5, comment: 'The energy here is insane! Felt like I was sitting in the stadium.', avatar: 'https://i.pravatar.cc/150?u=rahul' },
    { id: '2', name: 'Priya Patel', rating: 5, comment: 'Amazing food combos and the giant screen is just perfect.', avatar: 'https://i.pravatar.cc/150?u=priya' }
  ],
  location: {
    address: 'Shop 4-5, Premium Plaza, Sindhu Bhavan Road, Ahmedabad, Gujarat 380054',
    phone: '+91 99999 88888',
    email: 'hello@iplcafe.com',
    landmark: 'Near Metro Pillar 42',
    parking: 'Valet Parking Available',
    mapUrl: 'https://picsum.photos/seed/map/800/600'
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

// Admin Login (Simple password check)
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Default password
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'admin-session-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Update any part of the website data (Admin only)
app.post('/api/admin/update', (req, res) => {
  const { token, ...newData } = req.body;
  // In a real app, verify the token here
  if (token !== 'admin-session-token') {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  const data = readData();
  
  // Merge new data into existing data
  const updatedData = {
    ...data,
    ...newData
  };

  saveData(updatedData);
  res.json({ success: true, data: updatedData });
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
