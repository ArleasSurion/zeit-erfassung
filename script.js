document.getElementById('arbeitszeit-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const datum = document.getElementById('datum').value;
    const startzeit = document.getElementById('startzeit').value;
    const endzeit = document.getElementById('endzeit').value;
    const pause = parseInt(document.getElementById('pause').value) || 0;
  
    // Erstelle ein Arbeitszeit-Objekt
    const arbeitszeit = { datum, startzeit, endzeit, pause };
  
    // Lade die bestehenden Arbeitszeiten aus LocalStorage
    let arbeitszeiten = JSON.parse(localStorage.getItem('arbeitszeiten')) || [];
  
    // Füge die neue Arbeitszeit hinzu
    arbeitszeiten.push(arbeitszeit);
  
    // Speichere die aktualisierte Liste im LocalStorage
    localStorage.setItem('arbeitszeiten', JSON.stringify(arbeitszeiten));
  
    // Zeige die gespeicherten Arbeitszeiten an
    zeigeArbeitszeiten();
  });
  
  function berechneArbeitszeit(startzeit, endzeit, pause) {
    const start = startzeit.split(':').map(num => parseInt(num, 10));
    const end = endzeit.split(':').map(num => parseInt(num, 10));
  
    const startMinutes = start[0] * 60 + start[1];
    const endMinutes = end[0] * 60 + end[1];
  
    const diffMinutes = endMinutes - startMinutes - pause;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
  
    return { hours, minutes, totalMinutes: diffMinutes };
  }
  
  function zeigeArbeitszeiten() {
    const monat = document.getElementById('monat').value;
    const arbeitszeiten = JSON.parse(localStorage.getItem('arbeitszeiten')) || [];
    const filteredTimes = arbeitszeiten.filter(zeit => zeit.datum.startsWith(new Date().getFullYear() + '-' + monat));
  
    const liste = document.getElementById('arbeitszeiten-liste');
    const summe = { hours: 0, minutes: 0, totalMinutes: 0 };
  
    liste.innerHTML = ''; // Lösche die aktuelle Liste
  
    filteredTimes.forEach((zeit, index) => {
      const { hours, minutes, totalMinutes } = berechneArbeitszeit(zeit.startzeit, zeit.endzeit, zeit.pause);
      const li = document.createElement('li');
      li.textContent = `Arbeitszeit ${index + 1}: ${zeit.datum} von ${zeit.startzeit} bis ${zeit.endzeit} (${hours} Stunden, ${minutes} Minuten)`;
      liste.appendChild(li);
  
      summe.totalMinutes += totalMinutes;
    });
  
    summe.hours = Math.floor(summe.totalMinutes / 60);
    summe.minutes = summe.totalMinutes % 60;
  
    document.getElementById('arbeitszeit-summe').textContent = `Gesamtarbeitszeit: ${summe.hours} Stunden und ${summe.minutes} Minuten (${(summe.totalMinutes / 60).toFixed(2)} Stunden)`;
  }
  
  // Initialisiere die Anzeige beim Laden der Seite
  window.onload = zeigeArbeitszeiten;
  