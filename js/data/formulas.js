// Formulekaarten per onderwerp voor Niveau 2a en 2b
// Wordt getoond op de topics-pagina en als referentie tijdens het oefenen

export const formulas = {
  // === NIVEAU 2A ===
  eenheden: {
    title: 'Eenheden omrekenen',
    formulas: [
      { label: 'Gram naar milligram', formula: '1 g = 1000 mg', example: '2,5 g = 2500 mg' },
      { label: 'Milligram naar gram', formula: '1000 mg = 1 g', example: '500 mg = 0,5 g' },
      { label: 'Milligram naar microgram', formula: '1 mg = 1000 mcg', example: '0,5 mg = 500 mcg' },
      { label: 'Microgram naar milligram', formula: '1000 mcg = 1 mg', example: '2500 mcg = 2,5 mg' },
      { label: 'Liter naar milliliter', formula: '1 L = 1000 mL', example: '0,5 L = 500 mL' },
      { label: 'Milliliter naar liter', formula: '1000 mL = 1 L', example: '250 mL = 0,25 L' },
      { label: 'Kilogram naar gram', formula: '1 kg = 1000 g', example: '1,5 kg = 1500 g' },
    ],
    tip: 'Onthoud: kilo → eenheid → milli → micro. Elke stap is ×1000 of ÷1000.'
  },

  percentages: {
    title: 'Percentages & verhoudingen',
    formulas: [
      { label: 'Percentage van een geheel', formula: 'Deel = (percentage ÷ 100) × geheel', example: '20% van 500 mL = (20÷100) × 500 = 100 mL' },
      { label: 'Percentage oplossing', formula: 'Gram stof = (percentage ÷ 100) × volume', example: '0,9% van 1000 mL = 9 g NaCl' },
      { label: 'Verhouding', formula: 'Deel = (deel ÷ totaal delen) × volume', example: '2:3 van 500 mL → deel 1 = (2÷5) × 500 = 200 mL' },
      { label: 'Percentage berekenen', formula: 'Percentage = (deel ÷ geheel) × 100', example: '60 van 200 mL = (60÷200) × 100 = 30%' },
    ],
    tip: 'Percentage betekent letterlijk "per honderd". Dus 5% = 5 per 100.'
  },

  tabletten: {
    title: 'Tabletten berekenen',
    formulas: [
      { label: 'Tabletten per gift', formula: 'Aantal = voorgeschreven dosis ÷ sterkte per tablet', example: '500 mg voorgeschreven ÷ 250 mg/tablet = 2 tabletten' },
      { label: 'Tabletten per dag', formula: 'Per dag = (dosis ÷ sterkte) × frequentie', example: '(500÷250) × 3 dd = 6 tabletten/dag' },
      { label: 'Tabletten voor een kuur', formula: 'Totaal = tabletten per dag × aantal dagen', example: '6 per dag × 7 dagen = 42 tabletten' },
    ],
    tip: 'Krijg je 0,5 tablet uit? Dan is het een half tablet (als de tablet deelbaar is).'
  },

  vloeibaar: {
    title: 'Vloeibare medicatie',
    formulas: [
      { label: 'Volume drank berekenen', formula: 'mL = (dosis ÷ concentratie) × volume per eenheid', example: '250 mg nodig, drank = 125 mg/5 mL → (250÷125) × 5 = 10 mL' },
      { label: 'Dosis uit drank berekenen', formula: 'mg = (mL ingenomen ÷ mL per eenheid) × concentratie', example: '10 mL van 200 mg/5 mL → (10÷5) × 200 = 400 mg' },
      { label: 'Injectie berekenen', formula: 'mL = (dosis ÷ ampul mg) × ampul mL', example: '75 mg nodig, ampul = 100 mg/2 mL → (75÷100) × 2 = 1,5 mL' },
    ],
    tip: 'Lees altijd goed of de concentratie per 1 mL of per 5 mL is!'
  },

  voeding: {
    title: 'Voedingsberekeningen',
    formulas: [
      { label: 'Calorieën berekenen', formula: 'kcal = kcal per mL × volume', example: '1,5 kcal/mL × 500 mL = 750 kcal' },
      { label: 'Vochtbehoefte', formula: 'mL/dag = mL per kg per dag × gewicht', example: '30 mL/kg/dag × 70 kg = 2100 mL/dag' },
      { label: 'Sondevoeding per gift', formula: 'mL per gift = totaal per dag ÷ aantal giften', example: '1500 mL ÷ 5 giften = 300 mL per gift' },
      { label: 'Caloriebehoefte', formula: 'kcal/dag = kcal per kg per dag × gewicht', example: '25 kcal/kg/dag × 70 kg = 1750 kcal/dag' },
    ],
    tip: 'Vochtbehoefte verschilt per patiënt: 25-35 mL/kg/dag is gebruikelijk.'
  },

  vloeistofbalans: {
    title: 'Vloeistofbalans',
    formulas: [
      { label: 'Vloeistofbalans', formula: 'Balans = totale intake − totale output', example: 'Intake 2500 mL − Output 2100 mL = +400 mL' },
      { label: 'Intake bronnen', formula: 'Infuus + drinken + sondevoeding', example: '1000 + 800 + 500 = 2300 mL' },
      { label: 'Output bronnen', formula: 'Urine + drain + perspiratio insensibilis', example: '1200 + 200 + 500 = 1900 mL' },
      { label: 'Urine per uur', formula: 'mL/uur = totale urine ÷ aantal uren', example: '960 mL in 12 uur = 80 mL/uur' },
    ],
    tip: 'Perspiratio insensibilis (onmerkbaar vochtverlies) is standaard ±500 mL/dag. Positieve balans = meer intake dan output.'
  },

  // === NIVEAU 2B ===
  druppelsnelheid: {
    title: 'Druppelsnelheid',
    formulas: [
      { label: 'Druppels per minuut', formula: 'Druppels/min = (volume × druppelfactor) ÷ (uren × 60)', example: '500 mL in 4 uur, factor 20 → (500×20)÷(4×60) = 42 dr/min' },
      { label: 'Van mL/uur naar druppels/min', formula: 'Druppels/min = (mL/uur × druppelfactor) ÷ 60', example: '100 mL/uur, factor 20 → (100×20)÷60 = 33 dr/min' },
    ],
    tip: 'Standaard druppelfactor: 20 druppels/mL. Bij bloedtransfusie: 15 druppels/mL.'
  },

  infuus: {
    title: 'Infuusberekeningen',
    formulas: [
      { label: 'Looptijd berekenen', formula: 'Uren = volume ÷ mL per uur', example: '1000 mL ÷ 125 mL/uur = 8 uur' },
      { label: 'Snelheid berekenen', formula: 'mL/uur = volume ÷ aantal uren', example: '1000 mL ÷ 8 uur = 125 mL/uur' },
      { label: 'Resterend volume', formula: 'Rest = startvolume − (mL/uur × verstreken uren)', example: '1000 − (100 × 3) = 700 mL over' },
      { label: '24-uurs vochtbehoefte', formula: 'mL/uur = totaal mL ÷ 24', example: '2000 mL ÷ 24 = 83,3 mL/uur' },
    ],
    tip: 'Bij het omrekenen van uren naar uren en minuten: 0,5 uur = 30 min, 0,25 uur = 15 min.'
  },

  'dosering-gewicht': {
    title: 'Dosering op gewicht',
    formulas: [
      { label: 'Dosis op gewicht', formula: 'Dosis (mg) = mg/kg × gewicht', example: '10 mg/kg × 70 kg = 700 mg' },
      { label: 'Dosis per gift', formula: 'Per gift = (mg/kg/dag × gewicht) ÷ frequentie', example: '(15 mg/kg/dag × 80 kg) ÷ 3 = 400 mg per gift' },
      { label: 'Dosis in mL', formula: 'mL = (mg/kg × gewicht) ÷ concentratie', example: '(10×70) ÷ 50 mg/mL = 14 mL' },
      { label: 'Maximum dosis check', formula: 'Geef de LAAGSTE: berekende dosis of maximumdosis', example: 'Berekend 900 mg, max 800 mg → geef 800 mg' },
    ],
    tip: 'Controleer altijd of de berekende dosis de maximumdosis niet overschrijdt!'
  },

  verdunningen: {
    title: 'Verdunningen',
    formulas: [
      { label: 'Volume optrekken', formula: 'mL = gewenste dosis ÷ concentratie', example: '25 mg nodig, ampul = 50 mg/mL → 25÷50 = 0,5 mL' },
      { label: 'Nieuwe concentratie na verdunnen', formula: 'mg/mL = mg werkzame stof ÷ totaal volume', example: '100 mg in (2+48) mL = 100÷50 = 2 mg/mL' },
      { label: 'Dosis uit verdunde oplossing', formula: 'mL = gewenste mg ÷ nieuwe concentratie', example: '20 mg nodig, oplossing = 2 mg/mL → 20÷2 = 10 mL' },
    ],
    tip: 'Bij verdunnen: totaal volume = ampulvolume + oplosmiddel. De hoeveelheid werkzame stof blijft gelijk!'
  },

  zuurstof: {
    title: 'Zuurstofberekeningen',
    formulas: [
      { label: 'Duur zuurstofcilinder', formula: 'Minuten = inhoud (liter) ÷ flow (L/min)', example: '800 L ÷ 4 L/min = 200 minuten' },
      { label: 'Neusbril flow tabel', formula: '1 L/min ≈ 24% | 2 L/min ≈ 28% | 3 L/min ≈ 32%\n4 L/min ≈ 35% | 5 L/min ≈ 40%', example: 'Arts schrijft 28% voor → stel in op 2 L/min' },
    ],
    tip: 'Kamerlucht = 21% O₂. Elke liter/min via neusbril geeft ±3-4% extra zuurstof.'
  },

  perfusor: {
    title: 'Perfusor / Spuitpomp',
    formulas: [
      { label: 'mL/uur berekenen', formula: 'mL/uur = gewenste dosis (mg/uur) ÷ concentratie (mg/mL)', example: '5 mg/uur ÷ 2 mg/mL = 2,5 mL/uur' },
      { label: 'Dosis berekenen', formula: 'mg/uur = mL/uur × concentratie (mg/mL)', example: '3 mL/uur × 4 mg/mL = 12 mg/uur' },
      { label: 'Duur spuit', formula: 'Uren = volume spuit ÷ mL/uur', example: '50 mL ÷ 5 mL/uur = 10 uur' },
      { label: 'mcg/kg/min naar mL/uur', formula: '1) mcg/min = mcg/kg/min × gewicht\n2) mg/uur = (mcg/min × 60) ÷ 1000\n3) mL/uur = mg/uur ÷ concentratie (mg/mL)', example: '5 mcg/kg/min × 70 kg = 350 mcg/min\n→ (350×60)÷1000 = 21 mg/uur\n→ 21 ÷ 4 mg/mL = 5,25 mL/uur' },
    ],
    tip: 'Concentratie spuitpomp = totaal mg ÷ totaal mL van de spuit (meestal 50 mL).'
  }
};

export function getFormulas(topicId) {
  return formulas[topicId] || null;
}
