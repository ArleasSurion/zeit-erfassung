document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit-btn").addEventListener("click", function() {
        const date = document.getElementById("date").value;
        const startTime = document.getElementById("start-time").value;
        const endTime = document.getElementById("end-time").value;
        const breakDuration = document.getElementById("break-duration").value;
    
        if (startTime && endTime && date) {
            const start = new Date(`1970-01-01T${startTime}:00`);
            const end = new Date(`1970-01-01T${endTime}:00`);
            
            let totalMinutes = (end - start) / 60000 - breakDuration;
    
            if (totalMinutes < 0) {
                alert("Endzeit kann nicht vor der Startzeit liegen.");
            } else {
                // Berechnung der Gesamtarbeitszeit in Stunden (Dezimalzahl)
                let totalHoursDecimal = totalMinutes / 60;
                document.getElementById("total-time").textContent = totalHoursDecimal.toFixed(2) + " Stunden";
                
                // Umrechnung der Minuten in Stunden und Minuten
                let totalHours = Math.floor(totalMinutes / 60);
                let remainingMinutes = totalMinutes % 60;
                document.getElementById("total-time-formatted").textContent = totalHours + " Stunden und " + remainingMinutes + " Minuten";
                
                // Speichern der Zeiterfassung in JSON-Datei über den Server
                saveTimeEntry(date, startTime, endTime, breakDuration, totalHoursDecimal, totalHours, remainingMinutes);
            }
        } else {
            alert("Bitte Datum, Start- und Endzeit eingeben.");
        }       
        
    });

    function saveTimeEntry(date, startTime, endTime, breakDuration, totalHoursDecimal, totalHours, remainingMinutes) {
        const timeEntry = {
            date: date,
            startTime: startTime,
            endTime: endTime,
            breakDuration: breakDuration,
            totalHoursDecimal: totalHoursDecimal.toFixed(2),
            totalHours: totalHours,
            remainingMinutes: remainingMinutes
        };
    
        fetch('/save-time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(timeEntry)
        })
        .then(response => {
            // Überprüfen, ob die Antwort OK ist
            if (!response.ok) {
                throw new Error('Fehler beim Speichern der Zeiterfassungsdaten: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Zeiterfassungsdaten gespeichert:', data);
        })
        .catch(error => {
            console.error('Fehler beim Speichern:', error);
            // Hier könntest du eine Fehlermeldung im UI anzeigen
        });
    }
    
    
    function displayTimeEntries() {
        fetch('/get-time')
            .then(response => {
                // Überprüfe, ob die Antwort erfolgreich war
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Daten: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const timeEntriesList = document.getElementById("time-entries-list");
                let html = "<ul>";
                data.forEach(entry => {
                    html += `<li>${entry.date} - ${entry.totalHours} Stunden und ${entry.remainingMinutes} Minuten</li>`;
                });
                html += "</ul>";
                timeEntriesList.innerHTML = html;
            })
            .catch(error => {
                console.error('Fehler beim Laden der Daten:', error);
                // Hier könntest du eine Fehlermeldung im UI anzeigen
            });
    }

    
})

