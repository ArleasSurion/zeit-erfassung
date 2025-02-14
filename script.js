document.getElementById("submit-btn").addEventListener("click", function() {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const breakDuration = document.getElementById("break-duration").value;

    if (startTime && endTime) {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        
        let totalMinutes = (end - start) / 60000 - breakDuration;

        if (totalMinutes < 0) {
            alert("Endzeit kann nicht vor der Startzeit liegen.");
        } else {
            let totalHours = totalMinutes / 60;
            document.getElementById("total-time").textContent = totalHours.toFixed(2) + " Stunden";
        }
    } else {
        alert("Bitte Start- und Endzeit eingeben.");
    }
});
