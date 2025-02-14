const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const timeEntry = req.body;

        try {
            const data = fs.readFileSync(path.join(__dirname, '../timeEntries.json'), 'utf8');
            let timeEntries = JSON.parse(data);
            timeEntries.push(timeEntry);

            fs.writeFileSync(path.join(__dirname, '../timeEntries.json'), JSON.stringify(timeEntries, null, 2));
            res.status(200).send('Zeiterfassungsdaten erfolgreich gespeichert');
        } catch (error) {
            res.status(500).send('Fehler beim Speichern der Datei');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
