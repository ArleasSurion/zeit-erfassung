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
        }
    } else {
        alert("Bitte Datum, Start- und Endzeit eingeben.");
    }
});
