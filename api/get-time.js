const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const dataFilePath = path.resolve('data/timeEntries.json');
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const timeEntries = JSON.parse(fileData);
        res.status(200).json(timeEntries);
    } catch (err) {
        console.error('Fehler beim Laden der Datei:', err);
        res.status(500).json({ error: 'Fehler beim Laden der Daten' });
    }
};
