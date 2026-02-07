# Medisch Rekenen - PWA

## Projectoverzicht
Interactieve Progressive Web App (PWA) voor het oefenen van medisch rekenen, gericht op studenten van de IG-opleiding (niveau 3). Gebouwd met vanilla HTML/CSS/JavaScript, geen frameworks of build-stap nodig.

## Technische stack
- **HTML/CSS/JS** - Vanilla, geen dependencies
- **ES Modules** - `type="module"` imports
- **PWA** - Service Worker + manifest.json voor offline gebruik en iPhone installatie
- **LocalStorage** - Voortgang opslag

## Bestandsstructuur
```
├── index.html              # App shell, PWA meta tags
├── manifest.json           # PWA manifest (naam, iconen, display)
├── sw.js                   # Service Worker (cache-first offline)
├── css/style.css           # Alle styling, mobile-first, CSS custom properties
├── js/
│   ├── app.js              # Router (hash-based), confetti, install banner
│   ├── store.js            # LocalStorage wrapper voor voortgang
│   ├── views/
│   │   ├── home.js         # Startscherm met niveau-keuze
│   │   ├── topics.js       # Onderwerpen per niveau met sterren
│   │   ├── practice.js     # Oefenmodus + stap-voor-stap modus
│   │   ├── exam.js         # Oefentoetsen (timer, scoring, nakijken)
│   │   └── results.js      # Voortgang dashboard
│   └── data/
│       ├── niveau2a.js     # Vraag-templates basis (6 topics, ~25 templates)
│       └── niveau2b.js     # Vraag-templates gevorderd (6 topics, ~21 templates)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Architectuur

### Routing
Hash-based: `#/`, `#/topics/2a`, `#/practice/2a/eenheden`, `#/exam/2b/1`, `#/results`

### Parametrische vragen
Vragen worden **dynamisch gegenereerd** met `generate()` functies die random waarden produceren. Elke keer andere getallen, zodat studenten de methode leren in plaats van antwoorden te onthouden.

### Niveaus
- **Niveau 2a** (basis): eenheden, percentages, tabletten, vloeibare medicatie, voeding, vloeistofbalans
- **Niveau 2b** (gevorderd): druppelsnelheid, infuus, dosering op gewicht, verdunningen, zuurstof, perfusor

### Oefentoetsen
3 per niveau (6 totaal), elk 15 vragen, 45 minuten timer, score ≥55% = gehaald.

## Lokaal draaien
```bash
cd "Medisch Rekenen"
python3 -m http.server 8080
# Open http://localhost:8080
```

## Deployment (GitHub Pages)
1. Push alle bestanden naar de `main` branch
2. Ga naar repo Settings > Pages > Source: "Deploy from a branch" > Branch: `main`, folder: `/ (root)`
3. De app is beschikbaar op `https://<gebruikersnaam>.github.io/MedischRekenen/`

**Let op bij GitHub Pages:** De Service Worker registratie en manifest paths moeten relatief zijn als de app niet op root gehost wordt.

## Aanpassen van vragen
Nieuwe vragen toevoegen in `js/data/niveau2a.js` of `js/data/niveau2b.js`:
```javascript
{
  id: 'uniek-id',
  generate() {
    const waarde = randomInt(1, 50);
    return {
      question: `Vraag tekst met ${waarde}`,
      answer: waarde * 1000,      // numeriek antwoord
      unit: 'mg',                  // eenheid achter invoerveld
      tolerance: 0,                // toegestane afwijking
      hints: ['Hint 1', 'Hint 2'],
      steps: ['Stap 1', 'Stap 2', 'Antwoord']
    };
  }
}
```

## Design tokens
- Primair: `#2563EB` (blauw) | Succes: `#10B981` (groen) | Waarschuwing: `#F59E0B` (goud) | Fout: `#EF4444` (rood)
- Mobile-first, touch-targets ≥44px, input font ≥16px (voorkomt iOS zoom)
