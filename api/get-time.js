const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const data = fs.readFileSync(path.join(__dirname, '../timeEntries.json'), 'utf8');
            res.status(200).json(JSON.parse(data));
        } catch (error) {
            res.status(500).send('Fehler beim Laden der Datei');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
