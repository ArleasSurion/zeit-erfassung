const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public'))); // Statische Dateien (HTML, CSS, JS)

app.use(express.json());

// Endpunkt zum Speichern der Zeiterfassungsdaten
app.post('/save-time', (req, res) => {
    const timeEntry = req.body;

    fs.readFile('timeEntries.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Fehler beim Laden der Datei');
        }

        let timeEntries = JSON.parse(data);
        timeEntries.push(timeEntry);

        fs.writeFile('timeEntries.json', JSON.stringify(timeEntries, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Fehler beim Speichern der Datei');
            }

            res.status(200).send('Zeiterfassungsdaten erfolgreich gespeichert');
        });
    });
});

// Endpunkt zum Abrufen der Zeiterfassungsdaten
app.get('/get-time', (req, res) => {
    fs.readFile('timeEntries.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Fehler beim Laden der Datei');
        }

        res.json(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
