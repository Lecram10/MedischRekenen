// Niveau 2a - Basisonderwerpen medisch rekenen
// Elke vraag is een template met generate() die steeds nieuwe getallen maakt

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const topics = [
  {
    id: 'eenheden',
    name: 'Eenheden omrekenen',
    description: 'mg, mcg, g, L, mL, kg',
    icon: '⚖️',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    questions: [
      {
        id: 'mg-mcg',
        generate() {
          const mg = randomInt(1, 100);
          return {
            question: `Reken om: ${mg} mg = ? mcg`,
            answer: mg * 1000,
            unit: 'mcg',
            tolerance: 0,
            hints: [
              '1 mg = 1000 mcg (micro is 1000× kleiner dan milli)',
              `${mg} × 1000 = ?`
            ],
            steps: [
              'We weten: 1 mg = 1000 mcg',
              `We moeten ${mg} mg omrekenen naar mcg`,
              `${mg} × 1000 = ${mg * 1000} mcg`,
            ]
          };
        }
      },
      {
        id: 'mcg-mg',
        generate() {
          const mcg = randomInt(1, 50) * 1000;
          const answer = mcg / 1000;
          return {
            question: `Reken om: ${mcg} mcg = ? mg`,
            answer,
            unit: 'mg',
            tolerance: 0,
            hints: [
              '1000 mcg = 1 mg',
              `${mcg} ÷ 1000 = ?`
            ],
            steps: [
              'We weten: 1000 mcg = 1 mg',
              `We moeten ${mcg} mcg omrekenen naar mg`,
              `${mcg} ÷ 1000 = ${answer} mg`,
            ]
          };
        }
      },
      {
        id: 'g-mg',
        generate() {
          const g = randomInt(1, 20);
          const decimal = pick([0, 0.25, 0.5, 0.75]);
          const val = g + decimal;
          const answer = val * 1000;
          return {
            question: `Reken om: ${val} g = ? mg`,
            answer,
            unit: 'mg',
            tolerance: 0,
            hints: [
              '1 g = 1000 mg',
              `${val} × 1000 = ?`
            ],
            steps: [
              'We weten: 1 g = 1000 mg',
              `${val} × 1000 = ${answer} mg`,
            ]
          };
        }
      },
      {
        id: 'mg-g',
        generate() {
          const mg = randomInt(1, 20) * 500;
          const answer = mg / 1000;
          return {
            question: `Reken om: ${mg} mg = ? g`,
            answer,
            unit: 'g',
            tolerance: 0,
            hints: [
              '1000 mg = 1 g',
              `${mg} ÷ 1000 = ?`
            ],
            steps: [
              'We weten: 1000 mg = 1 g',
              `${mg} ÷ 1000 = ${answer} g`,
            ]
          };
        }
      },
      {
        id: 'l-ml',
        generate() {
          const l = pick([0.25, 0.5, 0.75, 1, 1.5, 2, 2.5]);
          const answer = l * 1000;
          return {
            question: `Reken om: ${l} L = ? mL`,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              '1 L = 1000 mL',
              `${l} × 1000 = ?`
            ],
            steps: [
              'We weten: 1 L = 1000 mL',
              `${l} × 1000 = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'ml-l',
        generate() {
          const ml = randomInt(1, 25) * 100;
          const answer = ml / 1000;
          return {
            question: `Reken om: ${ml} mL = ? L`,
            answer,
            unit: 'L',
            tolerance: 0.001,
            hints: [
              '1000 mL = 1 L',
              `${ml} ÷ 1000 = ?`
            ],
            steps: [
              'We weten: 1000 mL = 1 L',
              `${ml} ÷ 1000 = ${answer} L`,
            ]
          };
        }
      },
      {
        id: 'kg-g',
        generate() {
          const kg = pick([0.5, 1, 1.5, 2, 2.5, 3, 5]);
          const answer = kg * 1000;
          return {
            question: `Reken om: ${kg} kg = ? g`,
            answer,
            unit: 'g',
            tolerance: 0,
            hints: [
              '1 kg = 1000 g',
              `${kg} × 1000 = ?`
            ],
            steps: [
              'We weten: 1 kg = 1000 g',
              `${kg} × 1000 = ${answer} g`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'percentages',
    name: 'Percentages & verhoudingen',
    description: 'Basisberekeningen met procenten',
    icon: '%',
    color: '#10B981',
    bgColor: '#D1FAE5',
    questions: [
      {
        id: 'perc-van-geheel',
        generate() {
          const pct = pick([5, 10, 15, 20, 25, 30, 50, 75]);
          const geheel = pick([100, 200, 250, 400, 500, 1000]);
          const answer = (pct / 100) * geheel;
          return {
            question: `Hoeveel is ${pct}% van ${geheel} mL?`,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              `${pct}% betekent ${pct} per 100`,
              `(${pct} ÷ 100) × ${geheel} = ?`
            ],
            steps: [
              `${pct}% = ${pct} ÷ 100 = ${pct / 100}`,
              `${pct / 100} × ${geheel} = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'perc-oplossing',
        generate() {
          const pct = pick([0.9, 1, 2, 5, 10]);
          const ml = pick([100, 250, 500, 1000]);
          const answer = (pct / 100) * ml;
          return {
            question: `Hoeveel gram werkzame stof zit er in ${ml} mL van een ${pct}% oplossing?`,
            answer,
            unit: 'g',
            tolerance: 0.01,
            hints: [
              `${pct}% betekent ${pct} gram per 100 mL`,
              `(${pct} ÷ 100) × ${ml} = ?`
            ],
            steps: [
              `${pct}% oplossing = ${pct} g per 100 mL`,
              `In ${ml} mL: (${pct} ÷ 100) × ${ml} = ${answer} g`,
            ]
          };
        }
      },
      {
        id: 'verhouding',
        generate() {
          const deel = randomInt(1, 5);
          const geheel = deel + randomInt(1, 5);
          const volume = pick([100, 200, 500, 1000]);
          const answer = Math.round((deel / geheel) * volume * 100) / 100;
          return {
            question: `Een mengsel heeft de verhouding ${deel}:${geheel - deel}. Hoeveel mL van het eerste deel heb je nodig voor ${volume} mL totaal?`,
            answer,
            unit: 'mL',
            tolerance: 0.5,
            hints: [
              `Totaal aantal delen: ${deel} + ${geheel - deel} = ${geheel}`,
              `Deel 1: ${deel}/${geheel} × ${volume} = ?`
            ],
            steps: [
              `Verhouding ${deel}:${geheel - deel} = totaal ${geheel} delen`,
              `Deel 1 = ${deel}/${geheel} van het geheel`,
              `${deel}/${geheel} × ${volume} = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'perc-berekenen',
        generate() {
          const deel = randomInt(5, 80);
          const geheel = randomInt(deel + 10, 200);
          const answer = Math.round((deel / geheel) * 10000) / 100;
          return {
            question: `Een patiënt drinkt ${deel} mL van een glas van ${geheel} mL. Hoeveel procent is dat?`,
            answer,
            unit: '%',
            tolerance: 0.5,
            hints: [
              'Percentage = (deel ÷ geheel) × 100',
              `(${deel} ÷ ${geheel}) × 100 = ?`
            ],
            steps: [
              'Formule: percentage = (deel ÷ geheel) × 100',
              `(${deel} ÷ ${geheel}) × 100 = ${answer}%`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'tabletten',
    name: 'Tabletten berekenen',
    description: 'Aantal tabletten per gift en per dag',
    icon: '💊',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    questions: [
      {
        id: 'tab-per-gift',
        generate() {
          const dosis = pick([250, 500, 750, 1000]);
          const sterkte = pick([125, 250, 500]);
          const answer = dosis / sterkte;
          return {
            question: `Een arts schrijft ${dosis} mg voor. De tabletten bevatten ${sterkte} mg per stuk. Hoeveel tabletten geef je per keer?`,
            answer,
            unit: 'tablet(ten)',
            tolerance: 0,
            hints: [
              'Aantal tabletten = voorgeschreven dosis ÷ sterkte per tablet',
              `${dosis} ÷ ${sterkte} = ?`
            ],
            steps: [
              'Formule: aantal tabletten = voorgeschreven dosis ÷ sterkte per tablet',
              `Voorgeschreven: ${dosis} mg`,
              `Per tablet: ${sterkte} mg`,
              `${dosis} ÷ ${sterkte} = ${answer} tablet(ten)`,
            ]
          };
        }
      },
      {
        id: 'tab-per-dag',
        generate() {
          const dosis = pick([250, 500, 1000]);
          const sterkte = pick([250, 500]);
          const freq = pick([2, 3, 4]);
          const perKeer = dosis / sterkte;
          const answer = perKeer * freq;
          return {
            question: `Voorschrift: ${dosis} mg, ${freq}× daags. Tabletten bevatten ${sterkte} mg. Hoeveel tabletten per dag?`,
            answer,
            unit: 'tablet(ten)',
            tolerance: 0,
            hints: [
              `Eerst: hoeveel tabletten per keer? ${dosis} ÷ ${sterkte}`,
              `Dan: per keer × aantal keer per dag`
            ],
            steps: [
              `Per keer: ${dosis} ÷ ${sterkte} = ${perKeer} tablet(ten)`,
              `Per dag: ${perKeer} × ${freq} = ${answer} tablet(ten)`,
            ]
          };
        }
      },
      {
        id: 'tab-kuur',
        generate() {
          const tabPerDag = pick([2, 3, 4, 6]);
          const dagen = pick([5, 7, 10, 14]);
          const answer = tabPerDag * dagen;
          return {
            question: `Een patiënt krijgt ${tabPerDag} tabletten per dag gedurende ${dagen} dagen. Hoeveel tabletten zijn er in totaal nodig voor de hele kuur?`,
            answer,
            unit: 'tablet(ten)',
            tolerance: 0,
            hints: [
              'Totaal = tabletten per dag × aantal dagen',
              `${tabPerDag} × ${dagen} = ?`
            ],
            steps: [
              `Per dag: ${tabPerDag} tabletten`,
              `Aantal dagen: ${dagen}`,
              `Totaal: ${tabPerDag} × ${dagen} = ${answer} tabletten`,
            ]
          };
        }
      },
      {
        id: 'tab-halve',
        generate() {
          const dosis = pick([125, 250, 375]);
          const sterkte = pick([250, 500]);
          const answer = dosis / sterkte;
          return {
            question: `Een arts schrijft ${dosis} mg voor. Je hebt tabletten van ${sterkte} mg (deelbaar). Hoeveel tablet(ten) geef je?`,
            answer,
            unit: 'tablet(ten)',
            tolerance: 0,
            hints: [
              `${dosis} ÷ ${sterkte} = ?`,
              'Het antwoord kan een half tablet zijn!'
            ],
            steps: [
              `Voorgeschreven: ${dosis} mg`,
              `Per tablet: ${sterkte} mg`,
              `${dosis} ÷ ${sterkte} = ${answer} tablet(ten)`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'vloeibaar',
    name: 'Vloeibare medicatie',
    description: 'Dosis berekenen uit dranken en oplossingen',
    icon: '🧪',
    color: '#EC4899',
    bgColor: '#FCE7F3',
    questions: [
      {
        id: 'drank-ml',
        generate() {
          const dosis = pick([125, 200, 250, 400, 500]);
          const concentratie = pick([50, 100, 125, 200, 250]);
          const per_ml = pick([5, 10]);
          const answer = (dosis / concentratie) * per_ml;
          return {
            question: `Voorschrift: ${dosis} mg. De drank bevat ${concentratie} mg per ${per_ml} mL. Hoeveel mL geef je?`,
            answer,
            unit: 'mL',
            tolerance: 0.1,
            hints: [
              `Hoeveel keer de concentratie past in de dosis: ${dosis} ÷ ${concentratie}`,
              `Vermenigvuldig met ${per_ml} mL`
            ],
            steps: [
              `Voorgeschreven dosis: ${dosis} mg`,
              `De drank bevat: ${concentratie} mg per ${per_ml} mL`,
              `Berekening: (${dosis} ÷ ${concentratie}) × ${per_ml} = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'drank-dosis',
        generate() {
          const ml = pick([5, 10, 15, 20]);
          const concentratie = pick([100, 125, 200, 250]);
          const per_ml = 5;
          const answer = (ml / per_ml) * concentratie;
          return {
            question: `Een patiënt neemt ${ml} mL van een drank (${concentratie} mg/${per_ml} mL). Hoeveel mg krijgt de patiënt?`,
            answer,
            unit: 'mg',
            tolerance: 0,
            hints: [
              `Hoeveel keer ${per_ml} mL past in ${ml} mL?`,
              `Vermenigvuldig met ${concentratie} mg`
            ],
            steps: [
              `De patiënt neemt ${ml} mL`,
              `De drank bevat ${concentratie} mg per ${per_ml} mL`,
              `(${ml} ÷ ${per_ml}) × ${concentratie} = ${answer} mg`,
            ]
          };
        }
      },
      {
        id: 'injectie-ml',
        generate() {
          const dosis = pick([25, 50, 75, 100, 150, 200]);
          const ampul_mg = pick([50, 100, 200]);
          const ampul_ml = pick([1, 2, 5]);
          const answer = Math.round((dosis / ampul_mg) * ampul_ml * 100) / 100;
          return {
            question: `Voorschrift: ${dosis} mg. De ampul bevat ${ampul_mg} mg/${ampul_ml} mL. Hoeveel mL injecteer je?`,
            answer,
            unit: 'mL',
            tolerance: 0.05,
            hints: [
              `Hoeveel van de ampul heb je nodig? ${dosis} ÷ ${ampul_mg}`,
              `Vermenigvuldig met ${ampul_ml} mL`
            ],
            steps: [
              `Voorgeschreven: ${dosis} mg`,
              `Ampul: ${ampul_mg} mg in ${ampul_ml} mL`,
              `(${dosis} ÷ ${ampul_mg}) × ${ampul_ml} = ${answer} mL`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'voeding',
    name: 'Voedingsberekeningen',
    description: 'Calorieën en vochtbehoefte',
    icon: '🍎',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    questions: [
      {
        id: 'calorieen-berekenen',
        generate() {
          const kcal_per_ml = pick([1, 1.5, 2]);
          const ml = pick([200, 250, 300, 500]);
          const answer = kcal_per_ml * ml;
          return {
            question: `Een sondevoeding bevat ${kcal_per_ml} kcal/mL. Een patiënt krijgt ${ml} mL. Hoeveel kcal is dat?`,
            answer,
            unit: 'kcal',
            tolerance: 0,
            hints: [
              'kcal = kcal per mL × aantal mL',
              `${kcal_per_ml} × ${ml} = ?`
            ],
            steps: [
              `Energiewaarde: ${kcal_per_ml} kcal/mL`,
              `Volume: ${ml} mL`,
              `${kcal_per_ml} × ${ml} = ${answer} kcal`,
            ]
          };
        }
      },
      {
        id: 'vochtbehoefte',
        generate() {
          const gewicht = randomInt(50, 90);
          const ml_per_kg = pick([25, 30, 35]);
          const answer = gewicht * ml_per_kg;
          return {
            question: `De vochtbehoefte is ${ml_per_kg} mL/kg/dag. De patiënt weegt ${gewicht} kg. Hoeveel mL vocht per dag?`,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              'Vochtbehoefte = mL per kg × gewicht',
              `${ml_per_kg} × ${gewicht} = ?`
            ],
            steps: [
              `Vochtbehoefte: ${ml_per_kg} mL per kg per dag`,
              `Gewicht: ${gewicht} kg`,
              `${ml_per_kg} × ${gewicht} = ${answer} mL per dag`,
            ]
          };
        }
      },
      {
        id: 'sonde-per-gift',
        generate() {
          const totaal = pick([1000, 1200, 1500, 1800]);
          const freq = pick([3, 4, 5, 6]);
          const answer = Math.round(totaal / freq);
          return {
            question: `Een patiënt moet ${totaal} mL sondevoeding per dag krijgen, verdeeld over ${freq} giften. Hoeveel mL per gift?`,
            answer,
            unit: 'mL',
            tolerance: 1,
            hints: [
              'Per gift = totaal ÷ aantal giften',
              `${totaal} ÷ ${freq} = ?`
            ],
            steps: [
              `Totaal per dag: ${totaal} mL`,
              `Aantal giften: ${freq}`,
              `${totaal} ÷ ${freq} = ${answer} mL per gift`,
            ]
          };
        }
      },
      {
        id: 'kcal-behoefte',
        generate() {
          const gewicht = randomInt(55, 85);
          const kcal_per_kg = pick([25, 30, 35]);
          const answer = gewicht * kcal_per_kg;
          return {
            question: `De caloriebehoefte is ${kcal_per_kg} kcal/kg/dag. De patiënt weegt ${gewicht} kg. Hoeveel kcal per dag?`,
            answer,
            unit: 'kcal',
            tolerance: 0,
            hints: [
              'Caloriebehoefte = kcal per kg × gewicht',
              `${kcal_per_kg} × ${gewicht} = ?`
            ],
            steps: [
              `Caloriebehoefte: ${kcal_per_kg} kcal/kg/dag`,
              `Gewicht: ${gewicht} kg`,
              `${kcal_per_kg} × ${gewicht} = ${answer} kcal per dag`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'vloeistofbalans',
    name: 'Vloeistofbalans',
    description: 'Intake versus output berekenen',
    icon: '💧',
    color: '#06B6D4',
    bgColor: '#CFFAFE',
    questions: [
      {
        id: 'balans-basis',
        generate() {
          const intake = [
            { naam: 'Infuus', ml: pick([500, 1000, 1500]) },
            { naam: 'Drinken', ml: randomInt(200, 800) },
            { naam: 'Sondevoeding', ml: pick([0, 250, 500]) },
          ].filter(i => i.ml > 0);
          const output = [
            { naam: 'Urine', ml: randomInt(500, 1500) },
            { naam: 'Drain', ml: pick([0, 100, 200, 350]) },
          ].filter(i => i.ml > 0);
          const totaalIn = intake.reduce((s, i) => s + i.ml, 0);
          const totaalUit = output.reduce((s, i) => s + i.ml, 0);
          const answer = totaalIn - totaalUit;
          const intakeText = intake.map(i => `${i.naam}: ${i.ml} mL`).join(', ');
          const outputText = output.map(i => `${i.naam}: ${i.ml} mL`).join(', ');
          return {
            question: `Bereken de vloeistofbalans.`,
            context: `Intake: ${intakeText}\nOutput: ${outputText}`,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              'Vloeistofbalans = totale intake − totale output',
              `Totale intake: ${intake.map(i => i.ml).join(' + ')} = ${totaalIn} mL`,
              `Totale output: ${output.map(i => i.ml).join(' + ')} = ${totaalUit} mL`,
            ],
            steps: [
              `Intake: ${intake.map(i => `${i.naam} ${i.ml} mL`).join(' + ')} = ${totaalIn} mL`,
              `Output: ${output.map(i => `${i.naam} ${i.ml} mL`).join(' + ')} = ${totaalUit} mL`,
              `Balans: ${totaalIn} − ${totaalUit} = ${answer} mL`,
              answer >= 0 ? `De balans is positief (+${answer} mL)` : `De balans is negatief (${answer} mL)`,
            ]
          };
        }
      },
      {
        id: 'balans-24uur',
        generate() {
          const drinken = randomInt(300, 900);
          const infuus = pick([500, 1000, 1500]);
          const urine = randomInt(600, 1400);
          const perspiratio = 500; // standaard onmerkbaar vochtverlies
          const totaalIn = drinken + infuus;
          const totaalUit = urine + perspiratio;
          const answer = totaalIn - totaalUit;
          return {
            question: `Bereken de 24-uurs vloeistofbalans.`,
            context: `Intake: Drinken ${drinken} mL, Infuus ${infuus} mL\nOutput: Urine ${urine} mL, Perspiratio insensibilis ${perspiratio} mL`,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              'Tel alle intake bij elkaar op',
              'Tel alle output bij elkaar op',
              'Balans = intake − output'
            ],
            steps: [
              `Totale intake: ${drinken} + ${infuus} = ${totaalIn} mL`,
              `Totale output: ${urine} + ${perspiratio} = ${totaalUit} mL`,
              `Balans: ${totaalIn} − ${totaalUit} = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'urine-per-uur',
        generate() {
          const totaal = randomInt(600, 1800);
          const uren = pick([8, 12, 24]);
          const answer = Math.round((totaal / uren) * 10) / 10;
          return {
            question: `Een patiënt produceerde ${totaal} mL urine in ${uren} uur. Hoeveel mL urine per uur is dat?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.5,
            hints: [
              'Urine per uur = totaal volume ÷ aantal uren',
              `${totaal} ÷ ${uren} = ?`
            ],
            steps: [
              `Totale urine: ${totaal} mL in ${uren} uur`,
              `Per uur: ${totaal} ÷ ${uren} = ${answer} mL/uur`,
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
  // Exam 1: focus op eenheden + percentages + tabletten
  // Exam 2: focus op vloeibaar + voeding + vloeistofbalans
  // Exam 3: mix van alles
  const examConfigs = {
    1: ['eenheden', 'eenheden', 'eenheden', 'percentages', 'percentages', 'percentages',
        'tabletten', 'tabletten', 'tabletten', 'vloeibaar', 'vloeibaar',
        'voeding', 'voeding', 'vloeistofbalans', 'vloeistofbalans'],
    2: ['vloeibaar', 'vloeibaar', 'vloeibaar', 'voeding', 'voeding', 'voeding',
        'vloeistofbalans', 'vloeistofbalans', 'vloeistofbalans',
        'eenheden', 'eenheden', 'percentages', 'percentages', 'tabletten', 'tabletten'],
    3: ['eenheden', 'eenheden', 'percentages', 'percentages', 'tabletten', 'tabletten',
        'vloeibaar', 'vloeibaar', 'vloeibaar', 'voeding', 'voeding', 'voeding',
        'vloeistofbalans', 'vloeistofbalans', 'vloeistofbalans'],
  };
  const topicList = examConfigs[examId] || examConfigs[3];
  return topicList.map((topicId, i) => {
    const q = generateQuestion(topicId);
    q.questionNumber = i + 1;
    return q;
  });
}
