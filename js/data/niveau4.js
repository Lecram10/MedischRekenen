// Niveau 4 - MBO Verpleegkundige (niveau 4 / 3F)
// BMI, Internationale Eenheden, Dagschema, Oplaaddosis, Geavanceerde dosering, Oplosberekeningen

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function round(val, decimals = 1) {
  const f = Math.pow(10, decimals);
  return Math.round(val * f) / f;
}

export const topics = [
  {
    id: 'bmi',
    name: 'BMI berekeningen',
    description: 'Body Mass Index berekenen en beoordelen',
    icon: '📏',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    questions: [
      {
        id: 'bmi-berekenen',
        generate() {
          const gewicht = randomInt(50, 120);
          const lengte_cm = randomInt(155, 195);
          const lengte_m = lengte_cm / 100;
          const bmi = round(gewicht / (lengte_m * lengte_m), 1);
          let categorie;
          if (bmi < 18.5) categorie = 'ondergewicht';
          else if (bmi < 25) categorie = 'normaal gewicht';
          else if (bmi < 30) categorie = 'overgewicht';
          else categorie = 'obesitas';
          return {
            question: `Een patiënt weegt ${gewicht} kg en is ${lengte_cm} cm lang. Bereken de BMI (1 decimaal).`,
            answer: bmi,
            unit: 'kg/m²',
            tolerance: 0.2,
            hints: [
              'BMI = gewicht (kg) ÷ (lengte in m)²',
              `Lengte in meters: ${lengte_cm} cm = ${lengte_m} m`,
              `${gewicht} ÷ (${lengte_m} × ${lengte_m}) = ?`
            ],
            steps: [
              `Lengte omrekenen: ${lengte_cm} cm = ${lengte_m} m`,
              `Lengte kwadraat: ${lengte_m} × ${lengte_m} = ${round(lengte_m * lengte_m, 2)}`,
              `BMI: ${gewicht} ÷ ${round(lengte_m * lengte_m, 2)} = ${bmi} kg/m²`,
              `Classificatie: ${bmi} = ${categorie}`
            ]
          };
        }
      },
      {
        id: 'bmi-classificatie',
        generate() {
          const gewicht = randomInt(45, 130);
          const lengte_cm = randomInt(155, 195);
          const lengte_m = lengte_cm / 100;
          const bmi = round(gewicht / (lengte_m * lengte_m), 1);
          let categorie;
          if (bmi < 18.5) categorie = 'ondergewicht';
          else if (bmi < 25) categorie = 'normaal gewicht';
          else if (bmi < 30) categorie = 'overgewicht';
          else categorie = 'obesitas';
          return {
            question: `Een patiënt weegt ${gewicht} kg en is ${lengte_cm} cm. Bereken de BMI (1 decimaal).`,
            answer: bmi,
            unit: 'kg/m²',
            tolerance: 0.2,
            hints: [
              'BMI = gewicht ÷ lengte²',
              `Ondergewicht: <18,5 | Normaal: 18,5-24,9 | Overgewicht: 25-29,9 | Obesitas: ≥30`
            ],
            steps: [
              `Lengte: ${lengte_cm} cm = ${lengte_m} m`,
              `BMI: ${gewicht} ÷ (${lengte_m})² = ${gewicht} ÷ ${round(lengte_m * lengte_m, 2)} = ${bmi}`,
              `${bmi} kg/m² → ${categorie}`
            ]
          };
        }
      },
      {
        id: 'bmi-gewicht-berekenen',
        generate() {
          const lengte_cm = randomInt(160, 190);
          const lengte_m = lengte_cm / 100;
          const doel_bmi = pick([20, 22, 24, 25]);
          const answer = round(doel_bmi * lengte_m * lengte_m, 1);
          return {
            question: `Een patiënt is ${lengte_cm} cm lang. Hoeveel kg moet deze patiënt wegen voor een BMI van ${doel_bmi}? (1 decimaal)`,
            answer,
            unit: 'kg',
            tolerance: 0.5,
            hints: [
              'Gewicht = BMI × lengte²',
              `${doel_bmi} × (${lengte_m})² = ?`
            ],
            steps: [
              `Lengte: ${lengte_cm} cm = ${lengte_m} m`,
              `Lengte²: ${lengte_m} × ${lengte_m} = ${round(lengte_m * lengte_m, 2)}`,
              `Gewicht: ${doel_bmi} × ${round(lengte_m * lengte_m, 2)} = ${answer} kg`
            ]
          };
        }
      },
    ]
  },
  {
    id: 'internationale-eenheden',
    name: 'Internationale Eenheden',
    description: 'IE berekeningen (insuline, heparine)',
    icon: '💉',
    color: '#10B981',
    bgColor: '#D1FAE5',
    questions: [
      {
        id: 'insuline-eenheden',
        generate() {
          const ie = pick([10, 12, 16, 20, 24, 28, 30, 36]);
          // Insuline: 100 IE/mL standaard
          const concentratie = 100;
          const answer = round(ie / concentratie, 2);
          return {
            question: `Een patiënt moet ${ie} IE insuline krijgen. De insulineflacon bevat ${concentratie} IE/mL. Hoeveel mL trek je op?`,
            answer,
            unit: 'mL',
            tolerance: 0.01,
            hints: [
              'mL = gewenste IE ÷ concentratie (IE/mL)',
              `${ie} ÷ ${concentratie} = ?`
            ],
            steps: [
              `Voorgeschreven: ${ie} IE`,
              `Concentratie: ${concentratie} IE/mL`,
              `Volume: ${ie} ÷ ${concentratie} = ${answer} mL`
            ]
          };
        }
      },
      {
        id: 'heparine-ie',
        generate() {
          const ie_per_uur = pick([500, 750, 1000, 1250, 1500]);
          const ie_totaal = pick([10000, 12500, 25000]);
          const volume_ml = pick([50]);
          const ie_per_ml = ie_totaal / volume_ml;
          const answer = round(ie_per_uur / ie_per_ml, 1);
          return {
            question: `Voorschrift: ${ie_per_uur} IE heparine/uur. De spuit bevat ${ie_totaal} IE in ${volume_ml} mL. Op hoeveel mL/uur zet je de pomp?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.1,
            hints: [
              `Concentratie: ${ie_totaal} ÷ ${volume_ml} = ${ie_per_ml} IE/mL`,
              `mL/uur: ${ie_per_uur} ÷ ${ie_per_ml}`
            ],
            steps: [
              `Concentratie: ${ie_totaal} IE ÷ ${volume_ml} mL = ${ie_per_ml} IE/mL`,
              `Pompsnelheid: ${ie_per_uur} ÷ ${ie_per_ml} = ${answer} mL/uur`
            ]
          };
        }
      },
      {
        id: 'ie-per-uur-berekenen',
        generate() {
          const ml_per_uur = pick([1, 1.5, 2, 2.5, 3, 4]);
          const ie_totaal = pick([10000, 25000]);
          const volume_ml = 50;
          const ie_per_ml = ie_totaal / volume_ml;
          const answer = round(ml_per_uur * ie_per_ml, 0);
          return {
            question: `De heparinepomp staat op ${ml_per_uur} mL/uur. De spuit bevat ${ie_totaal} IE in ${volume_ml} mL. Hoeveel IE/uur krijgt de patiënt?`,
            answer: Math.round(answer),
            unit: 'IE/uur',
            tolerance: 1,
            hints: [
              `Concentratie: ${ie_totaal} ÷ ${volume_ml}`,
              `IE/uur: mL/uur × concentratie`
            ],
            steps: [
              `Concentratie: ${ie_totaal} ÷ ${volume_ml} = ${ie_per_ml} IE/mL`,
              `IE/uur: ${ml_per_uur} × ${ie_per_ml} = ${Math.round(answer)} IE/uur`
            ]
          };
        }
      },
      {
        id: 'insuline-schema',
        generate() {
          const glucose = pick([8, 10, 12, 14, 16, 18, 20]);
          // Sliding scale: glucose-10 (als >10), 1 IE per 2 mmol boven 10
          const ie = glucose > 10 ? Math.round((glucose - 10) / 2) : 0;
          const correctie = glucose > 10 ? glucose - 10 : 0;
          return {
            question: `Bloedglucose is ${glucose} mmol/L. Volgens het schema: corrigeren boven 10 mmol/L, 1 IE insuline per 2 mmol boven de 10. Hoeveel IE insuline geef je?`,
            answer: ie,
            unit: 'IE',
            tolerance: 0,
            hints: [
              `Hoeveel mmol boven de 10? ${glucose} − 10`,
              `Per 2 mmol boven de 10 geef je 1 IE`
            ],
            steps: [
              `Glucose: ${glucose} mmol/L`,
              glucose > 10
                ? `Boven de 10: ${glucose} − 10 = ${correctie} mmol`
                : 'Glucose ≤ 10, geen correctie nodig',
              glucose > 10
                ? `Aantal IE: ${correctie} ÷ 2 = ${ie} IE`
                : 'Geen insuline nodig'
            ]
          };
        }
      },
    ]
  },
  {
    id: 'dagschema',
    name: 'Dagschema medicatie',
    description: 'Medicatie inplannen over de dag',
    icon: '📋',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    questions: [
      {
        id: 'infuus-eindtijd',
        generate() {
          const startUur = pick([6, 8, 9, 10, 14, 20, 22]);
          const startMin = pick([0, 0, 0, 30]);
          const volume = pick([250, 500, 1000]);
          const ml_per_uur = pick([50, 75, 100, 125, 150]);
          const looptijd_uur = volume / ml_per_uur;
          const looptijd_min_totaal = Math.round(looptijd_uur * 60);
          const eindMin_totaal = startUur * 60 + startMin + looptijd_min_totaal;
          const eindUur = Math.floor(eindMin_totaal / 60) % 24;
          const eindMin = eindMin_totaal % 60;
          const answer = eindUur * 100 + eindMin; // bijv. 1430 = 14:30
          const startTijd = `${String(startUur).padStart(2,'0')}:${String(startMin).padStart(2,'0')}`;
          const eindTijd = `${String(eindUur).padStart(2,'0')}:${String(eindMin).padStart(2,'0')}`;
          return {
            question: `Een infuus van ${volume} mL start om ${startTijd} uur met ${ml_per_uur} mL/uur. Hoe laat is het infuus klaar? (Antwoord in uren, bijv. 14.30)`,
            answer: round(eindUur + eindMin / 100, 2),
            unit: 'uur',
            tolerance: 0.01,
            hints: [
              `Looptijd: ${volume} ÷ ${ml_per_uur} = ${round(looptijd_uur, 2)} uur`,
              `Starttijd + looptijd = eindtijd`
            ],
            steps: [
              `Looptijd: ${volume} ÷ ${ml_per_uur} = ${round(looptijd_uur, 2)} uur (= ${Math.floor(looptijd_uur)} uur en ${Math.round((looptijd_uur % 1) * 60)} min)`,
              `Start: ${startTijd}`,
              `Eind: ${startTijd} + ${Math.floor(looptijd_uur)} uur ${Math.round((looptijd_uur % 1) * 60)} min = ${eindTijd}`
            ]
          };
        }
      },
      {
        id: 'medicatie-interval',
        generate() {
          const freq = pick([2, 3, 4, 6]);
          const interval = 24 / freq;
          const startUur = pick([6, 7, 8]);
          const tijden = [];
          for (let i = 0; i < freq; i++) {
            const uur = (startUur + i * interval) % 24;
            tijden.push(`${String(Math.floor(uur)).padStart(2,'0')}:${String(Math.round((uur % 1) * 60)).padStart(2,'0')}`);
          }
          return {
            question: `Een medicijn moet ${freq}× daags gegeven worden met gelijke tussenpozen. De eerste gift is om ${String(startUur).padStart(2,'0')}:00 uur. Om de hoeveel uur geef je het medicijn?`,
            answer: interval,
            unit: 'uur',
            tolerance: 0,
            hints: [
              '24 uur ÷ aantal giften = interval',
              `24 ÷ ${freq} = ?`
            ],
            steps: [
              `Aantal giften per dag: ${freq}×`,
              `Interval: 24 ÷ ${freq} = ${interval} uur`,
              `Tijden: ${tijden.join(', ')}`
            ]
          };
        }
      },
      {
        id: 'dagschema-antibiotica',
        generate() {
          const freq = pick([3, 4]);
          const inlooptijd_min = pick([15, 20, 30]);
          const interval = 24 / freq;
          const startUur = pick([6, 8]);
          const giften = [];
          for (let i = 0; i < freq; i++) {
            const startH = startUur + i * interval;
            const eindMin = startH * 60 + inlooptijd_min;
            const eindH = Math.floor(eindMin / 60) % 24;
            const eindM = eindMin % 60;
            giften.push({
              start: `${String(startH % 24).padStart(2,'0')}:00`,
              eind: `${String(eindH).padStart(2,'0')}:${String(eindM).padStart(2,'0')}`
            });
          }
          // Vraag: wanneer is de laatste gift klaar?
          const laatsteEind = giften[giften.length - 1].eind;
          const laatsteEindParts = laatsteEind.split(':');
          const antwoord = parseInt(laatsteEindParts[0]) + parseInt(laatsteEindParts[1]) / 100;
          return {
            question: `Antibioticum: ${freq}× daags IV, inlooptijd ${inlooptijd_min} min per gift. Eerste gift om ${String(startUur).padStart(2,'0')}:00. Hoe laat is de laatste gift klaar? (bijv. 14.30)`,
            answer: round(antwoord, 2),
            unit: 'uur',
            tolerance: 0.01,
            hints: [
              `Interval: 24 ÷ ${freq} = ${interval} uur`,
              `Laatste gift start om ${giften[giften.length - 1].start}`,
              `Tel ${inlooptijd_min} minuten op bij de starttijd`
            ],
            steps: [
              `Interval: 24 ÷ ${freq} = ${interval} uur`,
              `Gift-tijden: ${giften.map(g => g.start).join(', ')}`,
              `Laatste gift: ${giften[giften.length - 1].start} + ${inlooptijd_min} min = ${laatsteEind}`
            ]
          };
        }
      },
    ]
  },
  {
    id: 'oplaaddosis',
    name: 'Oplaad- & onderhoudsdosis',
    description: 'Loading dose en onderhoudsdosering',
    icon: '⚡',
    color: '#EC4899',
    bgColor: '#FCE7F3',
    questions: [
      {
        id: 'oplaaddosis-gewicht',
        generate() {
          const gewicht = randomInt(55, 95);
          const oplaad_mg_kg = pick([10, 15, 20, 25]);
          const answer = gewicht * oplaad_mg_kg;
          return {
            question: `De oplaaddosis is ${oplaad_mg_kg} mg/kg. De patiënt weegt ${gewicht} kg. Hoeveel mg is de oplaaddosis?`,
            answer,
            unit: 'mg',
            tolerance: 0,
            hints: [
              'Oplaaddosis = mg/kg × gewicht',
              `${oplaad_mg_kg} × ${gewicht} = ?`
            ],
            steps: [
              `Oplaaddosis: ${oplaad_mg_kg} mg/kg`,
              `Gewicht: ${gewicht} kg`,
              `Dosis: ${oplaad_mg_kg} × ${gewicht} = ${answer} mg`
            ]
          };
        }
      },
      {
        id: 'onderhoud-na-oplaad',
        generate() {
          const gewicht = randomInt(60, 90);
          const oplaad = pick([15, 20]);
          const onderhoud = pick([5, 7.5, 10]);
          const freq = pick([2, 3]);
          const dagdosis = gewicht * onderhoud;
          const answer = round(dagdosis / freq, 1);
          return {
            question: `Na de oplaaddosis (${oplaad} mg/kg) volgt een onderhoudsdosis van ${onderhoud} mg/kg/dag, verdeeld over ${freq} giften. Patiënt: ${gewicht} kg. Hoeveel mg per gift?`,
            answer,
            unit: 'mg',
            tolerance: 1,
            hints: [
              `Dagdosis: ${onderhoud} × ${gewicht}`,
              `Per gift: dagdosis ÷ ${freq}`
            ],
            steps: [
              `Dagdosis: ${onderhoud} × ${gewicht} = ${dagdosis} mg`,
              `Per gift: ${dagdosis} ÷ ${freq} = ${answer} mg`
            ]
          };
        }
      },
      {
        id: 'oplaad-infuus',
        generate() {
          const gewicht = randomInt(60, 90);
          const mg_per_kg = pick([10, 15, 20]);
          const totaal_mg = gewicht * mg_per_kg;
          const concentratie = pick([10, 20, 50]); // mg/mL
          const answer = round(totaal_mg / concentratie, 1);
          return {
            question: `Oplaaddosis: ${mg_per_kg} mg/kg. Patiënt: ${gewicht} kg. Oplossing: ${concentratie} mg/mL. Hoeveel mL moet je klaarmaken?`,
            answer,
            unit: 'mL',
            tolerance: 0.5,
            hints: [
              `Eerst dosis: ${mg_per_kg} × ${gewicht}`,
              `Dan volume: dosis ÷ ${concentratie}`
            ],
            steps: [
              `Dosis: ${mg_per_kg} × ${gewicht} = ${totaal_mg} mg`,
              `Volume: ${totaal_mg} ÷ ${concentratie} = ${answer} mL`
            ]
          };
        }
      },
      {
        id: 'onderhoud-pomp',
        generate() {
          const dosis_mg_uur = pick([50, 75, 100, 150, 200]);
          const concentratie_mg = pick([500, 1000, 2000]);
          const volume_ml = pick([50, 100]);
          const mg_per_ml = concentratie_mg / volume_ml;
          const answer = round(dosis_mg_uur / mg_per_ml, 1);
          return {
            question: `Onderhoudsdosis: ${dosis_mg_uur} mg/uur continu. Infuuszak: ${concentratie_mg} mg in ${volume_ml} mL. Op hoeveel mL/uur zet je de pomp?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.2,
            hints: [
              `Concentratie: ${concentratie_mg} ÷ ${volume_ml} = ${mg_per_ml} mg/mL`,
              `mL/uur: ${dosis_mg_uur} ÷ ${mg_per_ml}`
            ],
            steps: [
              `Concentratie: ${concentratie_mg} ÷ ${volume_ml} = ${mg_per_ml} mg/mL`,
              `Pompsnelheid: ${dosis_mg_uur} ÷ ${mg_per_ml} = ${answer} mL/uur`
            ]
          };
        }
      },
    ]
  },
  {
    id: 'geavanceerde-dosering',
    name: 'Geavanceerde dosering',
    description: 'Complexe medicatieberekeningen',
    icon: '🧮',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    questions: [
      {
        id: 'dosis-per-m2',
        generate() {
          const gewicht = randomInt(55, 90);
          const lengte_cm = randomInt(160, 190);
          const lengte_m = lengte_cm / 100;
          // Mosteller formula: BSA = sqrt((gewicht × lengte_cm) / 3600)
          const bsa = round(Math.sqrt((gewicht * lengte_cm) / 3600), 2);
          const mg_per_m2 = pick([25, 50, 75, 100]);
          const answer = round(mg_per_m2 * bsa, 1);
          return {
            question: `Dosering: ${mg_per_m2} mg/m². Patiënt: ${gewicht} kg, ${lengte_cm} cm. BSA (Mosteller) = √((gewicht × lengte) ÷ 3600). Hoeveel mg geef je?`,
            answer,
            unit: 'mg',
            tolerance: 2,
            hints: [
              `BSA = √((${gewicht} × ${lengte_cm}) ÷ 3600)`,
              `Dosis = ${mg_per_m2} × BSA`
            ],
            steps: [
              `BSA: √((${gewicht} × ${lengte_cm}) ÷ 3600) = √(${round(gewicht * lengte_cm / 3600, 2)}) = ${bsa} m²`,
              `Dosis: ${mg_per_m2} × ${bsa} = ${answer} mg`
            ]
          };
        }
      },
      {
        id: 'dosis-aanpassen-nier',
        generate() {
          const normaal_dosis = pick([250, 500, 750, 1000]);
          const aanpassing_pct = pick([25, 50, 75]);
          const answer = round(normaal_dosis * (aanpassing_pct / 100), 0);
          return {
            question: `De normale dosis is ${normaal_dosis} mg. Bij verminderde nierfunctie moet ${aanpassing_pct}% van de normale dosis gegeven worden. Hoeveel mg geef je?`,
            answer: Math.round(answer),
            unit: 'mg',
            tolerance: 1,
            hints: [
              `${aanpassing_pct}% van ${normaal_dosis}`,
              `(${aanpassing_pct} ÷ 100) × ${normaal_dosis} = ?`
            ],
            steps: [
              `Normale dosis: ${normaal_dosis} mg`,
              `Aanpassing: ${aanpassing_pct}%`,
              `Aangepaste dosis: (${aanpassing_pct} ÷ 100) × ${normaal_dosis} = ${Math.round(answer)} mg`
            ]
          };
        }
      },
      {
        id: 'concentratie-na-toediening',
        generate() {
          const dosis_mg = pick([100, 200, 500, 1000]);
          const gewicht = randomInt(60, 90);
          const verdelingsvolume = pick([0.5, 0.7, 1]); // L/kg
          const totaal_volume_L = round(gewicht * verdelingsvolume, 1);
          const answer = round(dosis_mg / totaal_volume_L, 1);
          return {
            question: `Een patiënt (${gewicht} kg) krijgt ${dosis_mg} mg IV. Het verdelingsvolume is ${verdelingsvolume} L/kg. Wat is de verwachte plasmaconcentratie in mg/L?`,
            answer,
            unit: 'mg/L',
            tolerance: 0.5,
            hints: [
              `Totaal volume: ${verdelingsvolume} × ${gewicht}`,
              `Concentratie: ${dosis_mg} ÷ totaal volume`
            ],
            steps: [
              `Verdelingsvolume: ${verdelingsvolume} × ${gewicht} = ${totaal_volume_L} L`,
              `Plasmaconcentratie: ${dosis_mg} ÷ ${totaal_volume_L} = ${answer} mg/L`
            ]
          };
        }
      },
    ]
  },
  {
    id: 'oplosberekeningen',
    name: 'Oplosberekeningen',
    description: 'Oplossen, mengen en concentraties',
    icon: '🔬',
    color: '#06B6D4',
    bgColor: '#CFFAFE',
    questions: [
      {
        id: 'poeder-oplossen',
        generate() {
          const poeder_mg = pick([250, 500, 1000, 2000]);
          const oplos_ml = pick([5, 10, 20, 50]);
          const concentratie = round(poeder_mg / oplos_ml, 1);
          const gewenst_mg = pick([50, 100, 125, 200, 250]);
          const answer = round(gewenst_mg / concentratie, 1);
          return {
            question: `Een flacon bevat ${poeder_mg} mg poeder. Je lost dit op in ${oplos_ml} mL. Je moet ${gewenst_mg} mg toedienen. Hoeveel mL geef je?`,
            answer,
            unit: 'mL',
            tolerance: 0.2,
            hints: [
              `Concentratie: ${poeder_mg} ÷ ${oplos_ml} = ${concentratie} mg/mL`,
              `Volume: ${gewenst_mg} ÷ ${concentratie}`
            ],
            steps: [
              `Concentratie na oplossen: ${poeder_mg} ÷ ${oplos_ml} = ${concentratie} mg/mL`,
              `Benodigd volume: ${gewenst_mg} ÷ ${concentratie} = ${answer} mL`
            ]
          };
        }
      },
      {
        id: 'verdun-twee-stappen',
        generate() {
          const ampul_mg = pick([100, 200, 500]);
          const ampul_ml = pick([1, 2, 5]);
          const stap1_oplos = pick([10, 20]);
          const stap1_totaal = ampul_ml + stap1_oplos;
          const concentratie1 = round(ampul_mg / stap1_totaal, 2);
          const gewenst_mg = pick([5, 10, 20, 25]);
          const answer = round(gewenst_mg / concentratie1, 1);
          return {
            question: `Ampul: ${ampul_mg} mg/${ampul_ml} mL. Verdun in ${stap1_oplos} mL NaCl. Hoeveel mL van de verdunning geef je voor ${gewenst_mg} mg?`,
            answer,
            unit: 'mL',
            tolerance: 0.2,
            hints: [
              `Totaal na verdunnen: ${ampul_ml} + ${stap1_oplos} = ${stap1_totaal} mL`,
              `Nieuwe concentratie: ${ampul_mg} ÷ ${stap1_totaal}`,
              `Volume: ${gewenst_mg} ÷ concentratie`
            ],
            steps: [
              `Totaal volume: ${ampul_ml} + ${stap1_oplos} = ${stap1_totaal} mL`,
              `Concentratie: ${ampul_mg} ÷ ${stap1_totaal} = ${concentratie1} mg/mL`,
              `Volume: ${gewenst_mg} ÷ ${concentratie1} = ${answer} mL`
            ]
          };
        }
      },
      {
        id: 'infuus-concentratie',
        generate() {
          const mg_toevoegen = pick([200, 400, 500, 1000, 2000]);
          const zak_ml = pick([100, 250, 500, 1000]);
          const concentratie = round(mg_toevoegen / zak_ml, 2);
          const ml_per_uur = pick([25, 50, 75, 100]);
          const answer = round(ml_per_uur * concentratie, 1);
          return {
            question: `${mg_toevoegen} mg wordt opgelost in ${zak_ml} mL NaCl. Het infuus loopt met ${ml_per_uur} mL/uur. Hoeveel mg/uur krijgt de patiënt?`,
            answer,
            unit: 'mg/uur',
            tolerance: 0.5,
            hints: [
              `Concentratie: ${mg_toevoegen} ÷ ${zak_ml} mg/mL`,
              `mg/uur: mL/uur × concentratie`
            ],
            steps: [
              `Concentratie: ${mg_toevoegen} ÷ ${zak_ml} = ${concentratie} mg/mL`,
              `Dosis: ${ml_per_uur} × ${concentratie} = ${answer} mg/uur`
            ]
          };
        }
      },
      {
        id: 'pct-naar-mg-ml',
        generate() {
          const pct = pick([0.5, 1, 2, 5, 10]);
          const mg_per_ml = pct * 10;
          const volume = pick([5, 10, 20, 50]);
          const answer = round(mg_per_ml * volume, 0);
          return {
            question: `Een ${pct}% oplossing bevat hoeveel mg werkzame stof in ${volume} mL?`,
            answer: Math.round(answer),
            unit: 'mg',
            tolerance: 0,
            hints: [
              `${pct}% = ${pct} g per 100 mL = ${mg_per_ml} mg per mL`,
              `${mg_per_ml} × ${volume} = ?`
            ],
            steps: [
              `${pct}% = ${pct} g/100 mL = ${mg_per_ml} mg/mL`,
              `In ${volume} mL: ${mg_per_ml} × ${volume} = ${Math.round(answer)} mg`
            ]
          };
        }
      },
    ]
  }
];

export function getTopicById(id) {
  return topics.find(t => t.id === id);
}

export function generateQuestion(topicId) {
  const topic = getTopicById(topicId);
  if (!topic) return null;
  const template = pick(topic.questions);
  return { ...template.generate(), topicId, templateId: template.id };
}

export function generateExam(examId) {
  const examConfigs = {
    1: ['bmi', 'bmi', 'internationale-eenheden', 'internationale-eenheden', 'internationale-eenheden',
        'dagschema', 'dagschema', 'dagschema',
        'oplaaddosis', 'oplaaddosis', 'oplaaddosis',
        'geavanceerde-dosering', 'geavanceerde-dosering',
        'oplosberekeningen', 'oplosberekeningen'],
    2: ['oplosberekeningen', 'oplosberekeningen', 'oplosberekeningen',
        'geavanceerde-dosering', 'geavanceerde-dosering', 'geavanceerde-dosering',
        'bmi', 'bmi', 'bmi',
        'internationale-eenheden', 'internationale-eenheden',
        'dagschema', 'dagschema',
        'oplaaddosis', 'oplaaddosis'],
    3: ['bmi', 'bmi',
        'internationale-eenheden', 'internationale-eenheden', 'internationale-eenheden',
        'dagschema', 'dagschema',
        'oplaaddosis', 'oplaaddosis', 'oplaaddosis',
        'geavanceerde-dosering', 'geavanceerde-dosering',
        'oplosberekeningen', 'oplosberekeningen', 'oplosberekeningen'],
  };
  const topicList = examConfigs[examId] || examConfigs[3];
  return topicList.map((topicId, i) => {
    const q = generateQuestion(topicId);
    q.questionNumber = i + 1;
    return q;
  });
}
