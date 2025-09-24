const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Load dataset once at startup
const itemsPath = path.join(__dirname, 'data', 'items.json');
let items = [];
try {
  const raw = fs.readFileSync(itemsPath, 'utf8');
  items = JSON.parse(raw);
} catch (err) {
  console.error('Failed to load items dataset:', err);
  process.exit(1);
}

// Basic helpers
function findItemById(id) {
  return items.find((item) => item.id.toLowerCase() === String(id).toLowerCase());
}

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// API routes (useful for future frontend enhancements)
app.get('/api/items', (req, res) => {
  // Expose a subset by default for list views
  const summarized = items.map(({ id, name, description, category, image, difficulty, location }) => ({
    id,
    name,
    description,
    category,
    image,
    difficulty,
    location,
  }));
  res.json(summarized);
});

app.get('/api/items/:id', (req, res) => {
  const item = findItemById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Detail HTML route (distinct endpoints for each item)
app.get('/bosses/:id', (req, res) => {
  const item = findItemById(req.params.id);
  if (!item) return res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.sendFile(path.join(__dirname, 'views', 'detail.html'));
});

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


