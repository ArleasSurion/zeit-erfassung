const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Stelle statische Dateien aus dem public-Ordner bereit
app.use(express.static(path.join(__dirname, 'public')));

// Route für die index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
