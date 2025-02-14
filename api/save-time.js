const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { date, startTime, endTime, breakDuration, totalHoursDecimal, totalHours, remainingMinutes } = req.body;

        // Lade die vorhandenen Daten aus der JSON-Datei
        const dataFilePath = path.resolve('data/timeEntries.json');
        let timeEntries = [];
        try {
            const fileData = fs.readFileSync(dataFilePath, 'utf8');
            timeEntries = JSON.parse(fileData);
        } catch (err) {
            console.error('Fehler beim Laden der Datei:', err);
        }

        // Füge den neuen Eintrag hinzu
        const newEntry = { date, startTime, endTime, breakDuration, totalHoursDecimal, totalHours, remainingMinutes };
        timeEntries.push(newEntry);

        // Speichere die Daten zurück in die JSON-Datei
        fs.writeFileSync(dataFilePath, JSON.stringify(timeEntries, null, 2));

        // Sende eine Erfolgsmeldung zurück
        res.status(200).json({ message: 'Zeiterfassungsdaten gespeichert' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
