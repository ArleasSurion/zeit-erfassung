document.getElementById('arbeitszeit-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const startzeit = document.getElementById('startzeit').value;
    const endzeit = document.getElementById('endzeit').value;
  
    // Erstelle ein Arbeitszeit-Objekt
    const arbeitszeit = { startzeit, endzeit };
  
    // Lade die bestehenden Arbeitszeiten aus LocalStorage
    let arbeitszeiten = JSON.parse(localStorage.getItem('arbeitszeiten')) || [];
  
    // Füge die neue Arbeitszeit hinzu
    arbeitszeiten.push(arbeitszeit);
  
    // Speichere die aktualisierte Liste im LocalStorage
    localStorage.setItem('arbeitszeiten', JSON.stringify(arbeitszeiten));
  
    // Zeige die gespeicherten Arbeitszeiten an
    zeigeArbeitszeiten();
  });
  
  function berechneArbeitszeit(startzeit, endzeit) {
    const start = startzeit.split(':').map(num => parseInt(num, 10));
    const end = endzeit.split(':').map(num => parseInt(num, 10));
  
    const startMinutes = start[0] * 60 + start[1];
    const endMinutes = end[0] * 60 + end[1];
  
    const diffMinutes = endMinutes - startMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
  
    return `${hours} Stunden und ${minutes} Minuten`;
  }
  
  function zeigeArbeitszeiten() {
    const arbeitszeiten = JSON.parse(localStorage.getItem('arbeitszeiten')) || [];
    const liste = document.getElementById('arbeitszeiten-liste');
    liste.innerHTML = ''; // Lösche die aktuelle Liste
  
    arbeitszeiten.forEach((zeit, index) => {
      const li = document.createElement('li');
      const arbeitszeitInMinuten = berechneArbeitszeit(zeit.startzeit, zeit.endzeit);
      li.textContent = `Arbeitszeit ${index + 1}: von ${zeit.startzeit} bis ${zeit.endzeit} (${arbeitszeitInMinuten})`;
      liste.appendChild(li);
    });
  }
  
  // Initialisiere die Anzeige beim Laden der Seite
  window.onload = zeigeArbeitszeiten;
  