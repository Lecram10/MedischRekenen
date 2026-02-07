// Niveau 2b - Gevorderde onderwerpen medisch rekenen
// Druppelsnelheid, infuus, dosering op gewicht, verdunningen, zuurstof, perfusor

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
    id: 'druppelsnelheid',
    name: 'Druppelsnelheid',
    description: 'Druppels per minuut berekenen',
    icon: '💉',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    questions: [
      {
        id: 'druppels-per-min',
        generate() {
          const volume = pick([250, 500, 1000]);
          const uren = pick([2, 4, 6, 8, 12, 24]);
          const druppelfactor = 20; // standaard: 20 druppels = 1 mL
          const ml_per_uur = volume / uren;
          const answer = round((volume * druppelfactor) / (uren * 60), 0);
          return {
            question: `${volume} mL NaCl 0,9% moet in ${uren} uur inlopen. Druppelfactor: ${druppelfactor} druppels/mL. Hoeveel druppels per minuut?`,
            answer: Math.round(answer),
            unit: 'druppels/min',
            tolerance: 1,
            hints: [
              `Totaal druppels: ${volume} × ${druppelfactor}`,
              `Totaal minuten: ${uren} × 60`,
              'Druppels/min = totaal druppels ÷ totaal minuten'
            ],
            steps: [
              `Totaal aantal druppels: ${volume} × ${druppelfactor} = ${volume * druppelfactor}`,
              `Totaal aantal minuten: ${uren} × 60 = ${uren * 60}`,
              `Druppels per minuut: ${volume * druppelfactor} ÷ ${uren * 60} = ${Math.round(answer)} druppels/min`,
            ]
          };
        }
      },
      {
        id: 'druppels-bloed',
        generate() {
          const volume = pick([250, 300, 330]);
          const uren = pick([2, 3, 4]);
          const druppelfactor = 15; // bloedtransfusie: 15 druppels = 1 mL
          const answer = Math.round((volume * druppelfactor) / (uren * 60));
          return {
            question: `Een eenheid bloed van ${volume} mL moet in ${uren} uur inlopen. Druppelfactor bloed: ${druppelfactor} druppels/mL. Hoeveel druppels per minuut?`,
            answer,
            unit: 'druppels/min',
            tolerance: 1,
            hints: [
              `Bij bloedtransfusie is de druppelfactor ${druppelfactor} druppels/mL`,
              `Totaal druppels: ${volume} × ${druppelfactor}`,
              `Totaal minuten: ${uren} × 60`
            ],
            steps: [
              `Totaal druppels: ${volume} × ${druppelfactor} = ${volume * druppelfactor}`,
              `Totaal minuten: ${uren} × 60 = ${uren * 60}`,
              `Druppels/min: ${volume * druppelfactor} ÷ ${uren * 60} = ${answer} druppels/min`,
            ]
          };
        }
      },
      {
        id: 'ml-per-uur-naar-druppels',
        generate() {
          const ml_per_uur = pick([50, 75, 100, 125, 150]);
          const druppelfactor = 20;
          const answer = Math.round((ml_per_uur * druppelfactor) / 60);
          return {
            question: `Het infuus loopt met ${ml_per_uur} mL/uur. Druppelfactor: ${druppelfactor} druppels/mL. Hoeveel druppels per minuut?`,
            answer,
            unit: 'druppels/min',
            tolerance: 1,
            hints: [
              `Druppels per uur: ${ml_per_uur} × ${druppelfactor}`,
              `Delen door 60 voor druppels per minuut`
            ],
            steps: [
              `Druppels per uur: ${ml_per_uur} × ${druppelfactor} = ${ml_per_uur * druppelfactor}`,
              `Druppels per minuut: ${ml_per_uur * druppelfactor} ÷ 60 = ${answer} druppels/min`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'infuus',
    name: 'Infuusberekeningen',
    description: 'Looptijd, volume en snelheid',
    icon: '🩺',
    color: '#10B981',
    bgColor: '#D1FAE5',
    questions: [
      {
        id: 'looptijd',
        generate() {
          const volume = pick([250, 500, 1000, 1500]);
          const ml_per_uur = pick([50, 75, 100, 125, 150, 200]);
          const uren = round(volume / ml_per_uur, 1);
          const hele_uren = Math.floor(uren);
          const minuten = Math.round((uren - hele_uren) * 60);
          return {
            question: `${volume} mL infuus loopt met ${ml_per_uur} mL/uur. Hoe lang duurt het in uren? (Rond af op 1 decimaal)`,
            answer: uren,
            unit: 'uur',
            tolerance: 0.1,
            hints: [
              'Looptijd = volume ÷ snelheid',
              `${volume} ÷ ${ml_per_uur} = ?`
            ],
            steps: [
              `Volume: ${volume} mL`,
              `Snelheid: ${ml_per_uur} mL/uur`,
              `Looptijd: ${volume} ÷ ${ml_per_uur} = ${uren} uur`,
              minuten > 0 ? `Dat is ${hele_uren} uur en ${minuten} minuten` : '',
            ].filter(s => s)
          };
        }
      },
      {
        id: 'ml-per-uur',
        generate() {
          const volume = pick([500, 1000, 1500]);
          const uren = pick([4, 6, 8, 12, 24]);
          const answer = round(volume / uren, 1);
          return {
            question: `${volume} mL NaCl moet in ${uren} uur inlopen. Hoeveel mL per uur stel je de pomp in?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.5,
            hints: [
              'mL/uur = totaal volume ÷ aantal uren',
              `${volume} ÷ ${uren} = ?`
            ],
            steps: [
              `Volume: ${volume} mL`,
              `Tijd: ${uren} uur`,
              `Snelheid: ${volume} ÷ ${uren} = ${answer} mL/uur`,
            ]
          };
        }
      },
      {
        id: 'resterend-volume',
        generate() {
          const startVolume = pick([500, 1000]);
          const ml_per_uur = pick([50, 75, 100, 125]);
          const uren_gelopen = pick([2, 3, 4, 5]);
          const gelopen = ml_per_uur * uren_gelopen;
          const answer = startVolume - gelopen;
          return {
            question: `Een infuus van ${startVolume} mL loopt al ${uren_gelopen} uur met ${ml_per_uur} mL/uur. Hoeveel mL zit er nog in de zak?`,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              `Al ingelopen: ${ml_per_uur} × ${uren_gelopen} uur`,
              `Resterend: ${startVolume} − ingelopen`
            ],
            steps: [
              `Ingelopen volume: ${ml_per_uur} × ${uren_gelopen} = ${gelopen} mL`,
              `Resterend: ${startVolume} − ${gelopen} = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'infuus-24uur',
        generate() {
          const behoefte = pick([1500, 2000, 2500, 3000]);
          const answer = round(behoefte / 24, 1);
          return {
            question: `Een patiënt heeft ${behoefte} mL vocht per 24 uur nodig via het infuus. Op hoeveel mL/uur zet je de pomp?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.5,
            hints: [
              'mL/uur = totaal volume ÷ 24 uur',
              `${behoefte} ÷ 24 = ?`
            ],
            steps: [
              `Vochtbehoefte: ${behoefte} mL per 24 uur`,
              `Pompsnelheid: ${behoefte} ÷ 24 = ${answer} mL/uur`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'dosering-gewicht',
    name: 'Dosering op gewicht',
    description: 'mg/kg berekeningen',
    icon: '⚖️',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    questions: [
      {
        id: 'dosis-per-kg',
        generate() {
          const gewicht = randomInt(50, 95);
          const mg_per_kg = pick([2, 5, 10, 15, 20]);
          const answer = gewicht * mg_per_kg;
          return {
            question: `Dosering: ${mg_per_kg} mg/kg. De patiënt weegt ${gewicht} kg. Hoeveel mg moet de patiënt krijgen?`,
            answer,
            unit: 'mg',
            tolerance: 0,
            hints: [
              'Dosis = mg/kg × gewicht',
              `${mg_per_kg} × ${gewicht} = ?`
            ],
            steps: [
              `Dosering: ${mg_per_kg} mg per kg lichaamsgewicht`,
              `Gewicht patiënt: ${gewicht} kg`,
              `Dosis: ${mg_per_kg} × ${gewicht} = ${answer} mg`,
            ]
          };
        }
      },
      {
        id: 'dosis-per-kg-dag',
        generate() {
          const gewicht = randomInt(55, 90);
          const mg_per_kg = pick([5, 10, 15, 20, 30]);
          const freq = pick([2, 3, 4]);
          const dagdosis = gewicht * mg_per_kg;
          const answer = round(dagdosis / freq, 1);
          return {
            question: `Dosering: ${mg_per_kg} mg/kg/dag, verdeeld over ${freq} giften. Patiënt weegt ${gewicht} kg. Hoeveel mg per gift?`,
            answer,
            unit: 'mg',
            tolerance: 1,
            hints: [
              `Eerst dagdosis: ${mg_per_kg} × ${gewicht}`,
              `Dan verdelen over ${freq} giften`
            ],
            steps: [
              `Dagdosis: ${mg_per_kg} × ${gewicht} = ${dagdosis} mg`,
              `Per gift: ${dagdosis} ÷ ${freq} = ${answer} mg`,
            ]
          };
        }
      },
      {
        id: 'dosis-ml',
        generate() {
          const gewicht = randomInt(55, 85);
          const mg_per_kg = pick([5, 10, 15]);
          const concentratie = pick([10, 20, 50, 100]); // mg/mL
          const dosis_mg = gewicht * mg_per_kg;
          const answer = round(dosis_mg / concentratie, 1);
          return {
            question: `Dosering: ${mg_per_kg} mg/kg. Patiënt weegt ${gewicht} kg. Oplossing: ${concentratie} mg/mL. Hoeveel mL geef je?`,
            answer,
            unit: 'mL',
            tolerance: 0.2,
            hints: [
              `Eerst de dosis in mg: ${mg_per_kg} × ${gewicht}`,
              `Dan omrekenen naar mL: dosis ÷ ${concentratie}`
            ],
            steps: [
              `Dosis: ${mg_per_kg} × ${gewicht} = ${dosis_mg} mg`,
              `Volume: ${dosis_mg} ÷ ${concentratie} = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'max-dosis-check',
        generate() {
          const gewicht = randomInt(60, 95);
          const mg_per_kg = pick([10, 15, 20]);
          const max_dag = mg_per_kg * 80; // max gebaseerd op 80 kg
          const berekend = gewicht * mg_per_kg;
          const answer = Math.min(berekend, max_dag);
          return {
            question: `Dosering: ${mg_per_kg} mg/kg/dag. Maximum dagdosis: ${max_dag} mg. Patiënt weegt ${gewicht} kg. Wat is de toe te dienen dagdosis?`,
            answer,
            unit: 'mg',
            tolerance: 0,
            hints: [
              `Bereken eerst: ${mg_per_kg} × ${gewicht}`,
              `Vergelijk met maximum: ${max_dag} mg`,
              'Geef de laagste van de twee'
            ],
            steps: [
              `Berekende dosis: ${mg_per_kg} × ${gewicht} = ${berekend} mg`,
              `Maximum dagdosis: ${max_dag} mg`,
              berekend > max_dag
                ? `${berekend} mg > ${max_dag} mg, dus geef het maximum: ${max_dag} mg`
                : `${berekend} mg ≤ ${max_dag} mg, dus geef de berekende dosis: ${berekend} mg`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'verdunningen',
    name: 'Verdunningen',
    description: 'Oplossingen verdunnen en mengen',
    icon: '🔬',
    color: '#EC4899',
    bgColor: '#FCE7F3',
    questions: [
      {
        id: 'verdun-basis',
        generate() {
          const concentratie = pick([10, 20, 50, 100]); // mg/mL
          const dosis = pick([5, 10, 25, 50]);
          const answer = round(dosis / concentratie, 2);
          return {
            question: `Een ampul bevat ${concentratie} mg/mL. Je hebt ${dosis} mg nodig. Hoeveel mL trek je op?`,
            answer,
            unit: 'mL',
            tolerance: 0.05,
            hints: [
              'Volume = gewenste dosis ÷ concentratie',
              `${dosis} ÷ ${concentratie} = ?`
            ],
            steps: [
              `Gewenste dosis: ${dosis} mg`,
              `Concentratie: ${concentratie} mg/mL`,
              `Volume: ${dosis} ÷ ${concentratie} = ${answer} mL`,
            ]
          };
        }
      },
      {
        id: 'verdun-nacl',
        generate() {
          const ampul_mg = pick([40, 80, 100, 200]);
          const ampul_ml = pick([1, 2, 4, 5]);
          const oplos_ml = pick([10, 20, 50, 100]);
          const totaal_ml = ampul_ml + oplos_ml;
          const answer = round(ampul_mg / totaal_ml, 2);
          return {
            question: `Je lost ${ampul_mg} mg (${ampul_ml} mL) op in ${oplos_ml} mL NaCl. Wat is de concentratie van de nieuwe oplossing in mg/mL?`,
            answer,
            unit: 'mg/mL',
            tolerance: 0.05,
            hints: [
              `Totaal volume: ${ampul_ml} + ${oplos_ml} mL`,
              `Concentratie = ${ampul_mg} mg ÷ totaal volume`
            ],
            steps: [
              `Hoeveelheid werkzame stof: ${ampul_mg} mg`,
              `Totaal volume: ${ampul_ml} + ${oplos_ml} = ${totaal_ml} mL`,
              `Nieuwe concentratie: ${ampul_mg} ÷ ${totaal_ml} = ${answer} mg/mL`,
            ]
          };
        }
      },
      {
        id: 'verdun-dosis-uit-oplossing',
        generate() {
          const ampul_mg = pick([100, 200, 500]);
          const oplos_ml = pick([50, 100, 250]);
          const concentratie = round(ampul_mg / oplos_ml, 2);
          const gewenst_mg = pick([10, 20, 25, 50]);
          const answer = round(gewenst_mg / concentratie, 1);
          return {
            question: `${ampul_mg} mg is opgelost in ${oplos_ml} mL. Je moet ${gewenst_mg} mg toedienen. Hoeveel mL geef je?`,
            answer,
            unit: 'mL',
            tolerance: 0.2,
            hints: [
              `Concentratie: ${ampul_mg} ÷ ${oplos_ml} = ${concentratie} mg/mL`,
              `Volume: ${gewenst_mg} ÷ ${concentratie}`
            ],
            steps: [
              `Concentratie: ${ampul_mg} ÷ ${oplos_ml} = ${concentratie} mg/mL`,
              `Gewenste dosis: ${gewenst_mg} mg`,
              `Volume: ${gewenst_mg} ÷ ${concentratie} = ${answer} mL`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'zuurstof',
    name: 'Zuurstofberekeningen',
    description: 'Cilinderduur en flow berekenen',
    icon: '🫁',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    questions: [
      {
        id: 'cilinder-duur',
        generate() {
          const inhoud = pick([200, 400, 800, 2000]); // liter
          const flow = pick([2, 3, 4, 5, 6, 8, 10]); // liter/min
          const minuten = Math.floor(inhoud / flow);
          const uren = Math.floor(minuten / 60);
          const rest_min = minuten % 60;
          return {
            question: `Een zuurstofcilinder bevat ${inhoud} liter. De flow is ${flow} liter/minuut. Hoe lang gaat de cilinder mee in minuten?`,
            answer: minuten,
            unit: 'minuten',
            tolerance: 1,
            hints: [
              'Duur = inhoud ÷ flow',
              `${inhoud} ÷ ${flow} = ?`
            ],
            steps: [
              `Inhoud cilinder: ${inhoud} liter`,
              `Flow: ${flow} liter/minuut`,
              `Duur: ${inhoud} ÷ ${flow} = ${minuten} minuten`,
              uren > 0 ? `Dat is ${uren} uur en ${rest_min} minuten` : '',
            ].filter(s => s)
          };
        }
      },
      {
        id: 'cilinder-genoeg',
        generate() {
          const inhoud = pick([400, 800, 2000]);
          const flow = pick([3, 4, 5, 6]);
          const transport_min = pick([30, 45, 60, 90, 120]);
          const beschikbaar = Math.floor(inhoud / flow);
          const genoeg = beschikbaar >= transport_min;
          // We ask how many minutes the cylinder lasts, student checks if enough
          return {
            question: `Zuurstofcilinder: ${inhoud} liter, flow: ${flow} L/min. Het transport duurt ${transport_min} minuten. Hoeveel minuten gaat de cilinder mee?`,
            answer: beschikbaar,
            unit: 'minuten',
            tolerance: 1,
            hints: [
              `Duur: ${inhoud} ÷ ${flow}`,
              genoeg ? 'Vergelijk met de transporttijd' : 'Is dit genoeg?'
            ],
            steps: [
              `Duur cilinder: ${inhoud} ÷ ${flow} = ${beschikbaar} minuten`,
              `Transporttijd: ${transport_min} minuten`,
              genoeg
                ? `${beschikbaar} min ≥ ${transport_min} min → De cilinder is toereikend`
                : `${beschikbaar} min < ${transport_min} min → De cilinder is NIET toereikend!`,
            ]
          };
        }
      },
      {
        id: 'liter-per-min',
        generate() {
          const procent = pick([24, 28, 32, 35, 40]);
          // Simplified flow table for O2
          const flowTable = { 24: 1, 28: 2, 32: 3, 35: 4, 40: 5 };
          const answer = flowTable[procent];
          return {
            question: `De arts schrijft ${procent}% zuurstof voor via een neusbril. Hoeveel liter per minuut stel je in?`,
            answer,
            unit: 'L/min',
            tolerance: 0,
            hints: [
              'Neusbril: elke liter/min geeft ongeveer 4% extra O₂',
              'Kamerlucht = 21%, dus bij 1 L/min ≈ 24%'
            ],
            steps: [
              'Kamerlucht bevat 21% zuurstof',
              `Neusbril: elke L/min verhoogt O₂ met ≈ 3-4%`,
              `Voor ${procent}%: stel in op ${answer} L/min`,
            ]
          };
        }
      },
    ]
  },
  {
    id: 'perfusor',
    name: 'Perfusor / Spuitpomp',
    description: 'mL/uur en dosis/uur berekeningen',
    icon: '🏥',
    color: '#06B6D4',
    bgColor: '#CFFAFE',
    questions: [
      {
        id: 'perfusor-ml-uur',
        generate() {
          const dosis_uur = pick([2, 3, 5, 10, 15]); // mg/uur gewenst
          const concentratie_mg = pick([50, 100, 200]);
          const concentratie_ml = pick([50]);
          const mg_per_ml = concentratie_mg / concentratie_ml;
          const answer = round(dosis_uur / mg_per_ml, 1);
          return {
            question: `Voorschrift: ${dosis_uur} mg/uur. De spuit bevat ${concentratie_mg} mg in ${concentratie_ml} mL. Op hoeveel mL/uur zet je de spuitpomp?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.1,
            hints: [
              `Concentratie: ${concentratie_mg} ÷ ${concentratie_ml} = ${mg_per_ml} mg/mL`,
              `mL/uur: ${dosis_uur} ÷ ${mg_per_ml}`
            ],
            steps: [
              `Concentratie: ${concentratie_mg} mg in ${concentratie_ml} mL = ${mg_per_ml} mg/mL`,
              `Gewenste dosis: ${dosis_uur} mg/uur`,
              `Pompsnelheid: ${dosis_uur} ÷ ${mg_per_ml} = ${answer} mL/uur`,
            ]
          };
        }
      },
      {
        id: 'perfusor-dosis',
        generate() {
          const ml_uur = pick([1, 2, 3, 4, 5]);
          const concentratie_mg = pick([50, 100, 200, 250]);
          const concentratie_ml = 50;
          const mg_per_ml = concentratie_mg / concentratie_ml;
          const answer = round(ml_uur * mg_per_ml, 1);
          return {
            question: `De spuitpomp staat op ${ml_uur} mL/uur. De spuit bevat ${concentratie_mg} mg/${concentratie_ml} mL. Hoeveel mg/uur krijgt de patiënt?`,
            answer,
            unit: 'mg/uur',
            tolerance: 0.1,
            hints: [
              `Concentratie: ${concentratie_mg} ÷ ${concentratie_ml} mg/mL`,
              `Dosis: mL/uur × concentratie`
            ],
            steps: [
              `Concentratie: ${concentratie_mg} ÷ ${concentratie_ml} = ${mg_per_ml} mg/mL`,
              `Pompsnelheid: ${ml_uur} mL/uur`,
              `Dosis: ${ml_uur} × ${mg_per_ml} = ${answer} mg/uur`,
            ]
          };
        }
      },
      {
        id: 'perfusor-duur',
        generate() {
          const spuit_ml = pick([20, 50]);
          const ml_uur = pick([1, 2, 3, 4, 5]);
          const answer = round(spuit_ml / ml_uur, 1);
          const hele_uren = Math.floor(answer);
          const minuten = Math.round((answer - hele_uren) * 60);
          return {
            question: `Een spuit van ${spuit_ml} mL staat op ${ml_uur} mL/uur. Na hoeveel uur is de spuit leeg?`,
            answer,
            unit: 'uur',
            tolerance: 0.1,
            hints: [
              'Duur = volume ÷ snelheid',
              `${spuit_ml} ÷ ${ml_uur} = ?`
            ],
            steps: [
              `Volume spuit: ${spuit_ml} mL`,
              `Snelheid: ${ml_uur} mL/uur`,
              `Duur: ${spuit_ml} ÷ ${ml_uur} = ${answer} uur`,
              minuten > 0 ? `Dat is ${hele_uren} uur en ${minuten} minuten` : '',
            ].filter(s => s)
          };
        }
      },
      {
        id: 'perfusor-mcg-kg-min',
        generate() {
          const gewicht = randomInt(55, 90);
          const mcg_kg_min = pick([2, 3, 5, 8, 10]);
          const concentratie_mg = pick([200, 250, 400]);
          const concentratie_ml = 50;
          const mg_per_ml = concentratie_mg / concentratie_ml;
          const mcg_per_min = mcg_kg_min * gewicht;
          const mg_per_uur = round((mcg_per_min * 60) / 1000, 2);
          const answer = round(mg_per_uur / mg_per_ml, 1);
          return {
            question: `Dosering: ${mcg_kg_min} mcg/kg/min. Patiënt: ${gewicht} kg. Spuit: ${concentratie_mg} mg/${concentratie_ml} mL. Hoeveel mL/uur?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.2,
            hints: [
              `Stap 1: mcg/min = ${mcg_kg_min} × ${gewicht}`,
              `Stap 2: Reken om naar mg/uur`,
              `Stap 3: Deel door concentratie in mg/mL`
            ],
            steps: [
              `mcg/min: ${mcg_kg_min} × ${gewicht} = ${mcg_per_min} mcg/min`,
              `mg/uur: (${mcg_per_min} × 60) ÷ 1000 = ${mg_per_uur} mg/uur`,
              `Concentratie: ${concentratie_mg} ÷ ${concentratie_ml} = ${mg_per_ml} mg/mL`,
              `mL/uur: ${mg_per_uur} ÷ ${mg_per_ml} = ${answer} mL/uur`,
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

function pick2(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateQuestion(topicId) {
  const topic = getTopicById(topicId);
  if (!topic) return null;
  const template = pick2(topic.questions);
  return { ...template.generate(), topicId, templateId: template.id };
}

export function generateExam(examId) {
  const examConfigs = {
    1: ['druppelsnelheid', 'druppelsnelheid', 'druppelsnelheid',
        'infuus', 'infuus', 'infuus',
        'dosering-gewicht', 'dosering-gewicht', 'dosering-gewicht',
        'verdunningen', 'verdunningen',
        'zuurstof', 'zuurstof',
        'perfusor', 'perfusor'],
    2: ['perfusor', 'perfusor', 'perfusor',
        'verdunningen', 'verdunningen', 'verdunningen',
        'zuurstof', 'zuurstof', 'zuurstof',
        'druppelsnelheid', 'druppelsnelheid',
        'infuus', 'infuus',
        'dosering-gewicht', 'dosering-gewicht'],
    3: ['druppelsnelheid', 'druppelsnelheid', 'druppelsnelheid',
        'infuus', 'infuus',
        'dosering-gewicht', 'dosering-gewicht', 'dosering-gewicht',
        'verdunningen', 'verdunningen', 'verdunningen',
        'zuurstof', 'zuurstof',
        'perfusor', 'perfusor'],
  };
  const topicList = examConfigs[examId] || examConfigs[3];
  return topicList.map((topicId, i) => {
    const q = generateQuestion(topicId);
    q.questionNumber = i + 1;
    return q;
  });
}
