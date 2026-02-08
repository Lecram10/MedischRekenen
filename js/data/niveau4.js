// Niveau 4 - MBO Verpleegkundige
// Indeling volgens Meneer Megens: 9 onderdelen
// 1. Oplossen & Injecteren  2. Verdunnen  3. Zuurstof  4. Druppelsnelheden
// 5. Vochtbalans  6. Spuitpomp/Perfusor  7. Dagschema  8. BMI  9. Vaste Medicatie

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
  // ─── 1. OPLOSSEN & INJECTEREN ───
  {
    id: 'oplossen',
    name: 'Oplossen & Injecteren',
    description: 'V/A: hoeveel mL trek je op?',
    icon: '💉',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    questions: [
      {
        id: 'oplos-mg-ml',
        generate() {
          const voorschrift = pick([50, 75, 100, 150, 200, 250, 300, 500]);
          const aanwezig_per_ml = pick([5, 10, 20, 25, 50, 100]);
          const answer = round(voorschrift / aanwezig_per_ml, 1);
          return {
            question: `Voorschrift: ${voorschrift} mg. Aanwezig: ${aanwezig_per_ml} mg/mL. Hoeveel mL trek je op?`,
            answer,
            unit: 'mL',
            tolerance: 0.1,
            hints: [
              'Formule: V / A = aantal mL',
              `${voorschrift} ÷ ${aanwezig_per_ml} = ?`
            ],
            steps: [
              `Voorschrift (V): ${voorschrift} mg`,
              `Aanwezig (A): ${aanwezig_per_ml} mg per 1 mL`,
              `V / A = ${voorschrift} ÷ ${aanwezig_per_ml} = ${answer} mL`
            ]
          };
        }
      },
      {
        id: 'oplos-ampul',
        generate() {
          const voorschrift = pick([25, 50, 75, 100, 150, 200]);
          const ampul_mg = pick([100, 200, 250, 500]);
          const ampul_ml = pick([1, 2, 5, 10]);
          const mg_per_ml = ampul_mg / ampul_ml;
          const answer = round(voorschrift / mg_per_ml, 1);
          return {
            question: `Voorschrift: ${voorschrift} mg. Ampul: ${ampul_mg} mg/${ampul_ml} mL. Hoeveel mL trek je op?`,
            answer,
            unit: 'mL',
            tolerance: 0.1,
            hints: [
              `Eerst A per 1 mL: ${ampul_mg} ÷ ${ampul_ml} = ${mg_per_ml} mg/mL`,
              `Dan V / A: ${voorschrift} ÷ ${mg_per_ml}`
            ],
            steps: [
              `Aanwezig per 1 mL: ${ampul_mg} ÷ ${ampul_ml} = ${mg_per_ml} mg/mL`,
              `V / A = ${voorschrift} ÷ ${mg_per_ml} = ${answer} mL`
            ]
          };
        }
      },
      {
        id: 'oplos-procent',
        generate() {
          const voorschrift_mg = pick([50, 100, 200, 500, 1000]);
          const pct = pick([0.5, 1, 2, 5, 10]);
          const mg_per_ml = pct * 10;
          const answer = round(voorschrift_mg / mg_per_ml, 1);
          return {
            question: `Voorschrift: ${voorschrift_mg} mg. Aanwezig: een ${pct}% oplossing. Hoeveel mL trek je op?`,
            answer,
            unit: 'mL',
            tolerance: 0.1,
            hints: [
              `${pct}% = ${pct} g per 100 mL = ${mg_per_ml} mg per mL`,
              `V / A = ${voorschrift_mg} ÷ ${mg_per_ml}`
            ],
            steps: [
              `Omrekenen: ${pct}% = ${pct} g/100 mL = ${mg_per_ml} mg/mL`,
              `V / A = ${voorschrift_mg} ÷ ${mg_per_ml} = ${answer} mL`
            ]
          };
        }
      },
      {
        id: 'oplos-ie',
        generate() {
          const voorschrift_ie = pick([10, 12, 16, 20, 24, 28, 30, 36, 40]);
          const concentratie_ie = pick([40, 100]);
          const answer = round(voorschrift_ie / concentratie_ie, 2);
          return {
            question: `Voorschrift: ${voorschrift_ie} IE insuline. Aanwezig: ${concentratie_ie} IE/mL. Hoeveel mL trek je op?`,
            answer,
            unit: 'mL',
            tolerance: 0.01,
            hints: [
              'Formule: V / A = aantal mL',
              `${voorschrift_ie} ÷ ${concentratie_ie} = ?`
            ],
            steps: [
              `Voorschrift (V): ${voorschrift_ie} IE`,
              `Aanwezig (A): ${concentratie_ie} IE per mL`,
              `V / A = ${voorschrift_ie} ÷ ${concentratie_ie} = ${answer} mL`
            ]
          };
        }
      },
    ]
  },

  // ─── 2. VERDUNNEN ───
  {
    id: 'verdunnen',
    name: 'Verdunnen',
    description: 'Van sterk naar minder sterk',
    icon: '🧪',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    questions: [
      {
        id: 'verdun-procent',
        generate() {
          const voorschrift_pct = pick([0.5, 1, 2]);
          const aanwezig_pct = pick([5, 10, 20]);
          const gewenst_ml = pick([100, 200, 250, 500]);
          const ml_sterk = round((voorschrift_pct * gewenst_ml) / aanwezig_pct, 1);
          const ml_verdunner = round(gewenst_ml - ml_sterk, 1);
          return {
            question: `Maak ${gewenst_ml} mL van een ${voorschrift_pct}% oplossing. Aanwezig: ${aanwezig_pct}% oplossing. Hoeveel mL van de ${aanwezig_pct}% oplossing heb je nodig?`,
            answer: ml_sterk,
            unit: 'mL',
            tolerance: 0.5,
            hints: [
              `Formule: (V% × aantal mL) ÷ A%`,
              `(${voorschrift_pct} × ${gewenst_ml}) ÷ ${aanwezig_pct} = ?`
            ],
            steps: [
              `Formule: (V% × mL) ÷ A%`,
              `(${voorschrift_pct} × ${gewenst_ml}) ÷ ${aanwezig_pct} = ${ml_sterk} mL van de ${aanwezig_pct}%`,
              `Aanvullen met water: ${gewenst_ml} − ${ml_sterk} = ${ml_verdunner} mL water`
            ]
          };
        }
      },
      {
        id: 'verdun-water',
        generate() {
          const voorschrift_pct = pick([0.5, 1, 2, 3]);
          const aanwezig_pct = pick([5, 10, 20]);
          const gewenst_ml = pick([100, 200, 500, 1000]);
          const ml_sterk = round((voorschrift_pct * gewenst_ml) / aanwezig_pct, 1);
          const ml_water = round(gewenst_ml - ml_sterk, 1);
          return {
            question: `Maak ${gewenst_ml} mL van een ${voorschrift_pct}% oplossing uit een ${aanwezig_pct}% oplossing. Hoeveel mL water voeg je toe?`,
            answer: ml_water,
            unit: 'mL',
            tolerance: 0.5,
            hints: [
              `Eerst: hoeveel mL van de sterke oplossing?`,
              `Dan: ${gewenst_ml} − mL sterk = mL water`
            ],
            steps: [
              `mL sterk: (${voorschrift_pct} × ${gewenst_ml}) ÷ ${aanwezig_pct} = ${ml_sterk} mL`,
              `mL water: ${gewenst_ml} − ${ml_sterk} = ${ml_water} mL`
            ]
          };
        }
      },
      {
        id: 'verdun-ampul',
        generate() {
          const ampul_mg = pick([100, 200, 500]);
          const ampul_ml = pick([1, 2, 5]);
          const gewenst_mg = pick([10, 20, 25, 50]);
          const oplos_ml = pick([10, 20, 50]);
          const totaal_ml = ampul_ml + oplos_ml;
          const conc = round(ampul_mg / totaal_ml, 2);
          const answer = round(gewenst_mg / conc, 1);
          return {
            question: `Ampul: ${ampul_mg} mg/${ampul_ml} mL. Je verdunt met ${oplos_ml} mL NaCl 0,9%. Hoeveel mL geef je voor ${gewenst_mg} mg?`,
            answer,
            unit: 'mL',
            tolerance: 0.2,
            hints: [
              `Totaal volume: ${ampul_ml} + ${oplos_ml} = ${totaal_ml} mL`,
              `Nieuwe concentratie: ${ampul_mg} ÷ ${totaal_ml}`,
              `V / A = ${gewenst_mg} ÷ concentratie`
            ],
            steps: [
              `Totaal volume na verdunnen: ${ampul_ml} + ${oplos_ml} = ${totaal_ml} mL`,
              `Nieuwe concentratie: ${ampul_mg} ÷ ${totaal_ml} = ${conc} mg/mL`,
              `Op te trekken: ${gewenst_mg} ÷ ${conc} = ${answer} mL`
            ]
          };
        }
      },
    ]
  },

  // ─── 3. ZUURSTOF ───
  {
    id: 'zuurstof',
    name: 'Zuurstof',
    description: 'Zuurstofcilinder berekeningen',
    icon: '🫁',
    color: '#06B6D4',
    bgColor: '#CFFAFE',
    questions: [
      {
        id: 'o2-duur',
        generate() {
          const inhoud_liter = pick([2, 5, 10, 20, 40]);
          const druk_bar = pick([50, 80, 100, 120, 150, 200]);
          const flow = pick([1, 2, 3, 4, 5]);
          const voorraad = inhoud_liter * druk_bar;
          const answer = Math.round(voorraad / flow);
          return {
            question: `Een zuurstofcilinder heeft een inhoud van ${inhoud_liter} liter en de manometer wijst ${druk_bar} bar aan. De patiënt krijgt ${flow} liter/min. Hoelang kun je doen met deze cilinder?`,
            answer,
            unit: 'minuten',
            tolerance: 1,
            hints: [
              `Stap 1: voorraad = inhoud × druk`,
              `Stap 2: minuten = voorraad ÷ flow`,
              `${inhoud_liter} × ${druk_bar} = ${voorraad} liter, dan ÷ ${flow}`
            ],
            steps: [
              `Voorraad: ${inhoud_liter} × ${druk_bar} = ${voorraad} liter zuurstof`,
              `Duur: ${voorraad} ÷ ${flow} = ${answer} minuten`
            ]
          };
        }
      },
      {
        id: 'o2-genoeg',
        generate() {
          const inhoud_liter = pick([5, 10, 20]);
          const druk_bar = pick([60, 80, 100, 120]);
          const flow = pick([2, 3, 4, 5]);
          const transport_min = pick([30, 45, 60, 90, 120]);
          const voorraad = inhoud_liter * druk_bar;
          const duur = Math.round(voorraad / flow);
          const nodig = transport_min * flow;
          return {
            question: `Cilinder: ${inhoud_liter} liter, ${druk_bar} bar. Patiënt: ${flow} L/min. Het transport duurt ${transport_min} minuten. Hoeveel minuten kun je doen met de cilinder?`,
            answer: duur,
            unit: 'minuten',
            tolerance: 1,
            hints: [
              `Voorraad: ${inhoud_liter} × ${druk_bar}`,
              `Duur: voorraad ÷ ${flow}`
            ],
            steps: [
              `Voorraad: ${inhoud_liter} × ${druk_bar} = ${voorraad} liter`,
              `Duur: ${voorraad} ÷ ${flow} = ${duur} minuten`,
              duur >= transport_min
                ? `${duur} min ≥ ${transport_min} min → Voldoende voor het transport`
                : `${duur} min < ${transport_min} min → Niet voldoende!`
            ]
          };
        }
      },
      {
        id: 'o2-voorraad',
        generate() {
          const inhoud_liter = pick([10, 20, 40, 50]);
          const druk_bar = pick([50, 100, 150, 200]);
          const answer = inhoud_liter * druk_bar;
          return {
            question: `Een zuurstofcilinder heeft een inhoud van ${inhoud_liter} liter. De manometer wijst ${druk_bar} bar aan. Hoeveel liter zuurstof heb je op voorraad?`,
            answer,
            unit: 'liter',
            tolerance: 0,
            hints: [
              'Voorraad = inhoud cilinder × druk',
              `${inhoud_liter} × ${druk_bar} = ?`
            ],
            steps: [
              `Inhoud cilinder: ${inhoud_liter} liter`,
              `Druk: ${druk_bar} bar`,
              `Voorraad: ${inhoud_liter} × ${druk_bar} = ${answer} liter`
            ]
          };
        }
      },
    ]
  },

  // ─── 4. DRUPPELSNELHEDEN & VOEDINGSPOMP ───
  {
    id: 'druppelsnelheden',
    name: 'Druppelsnelheden',
    description: 'Druppels per minuut berekenen',
    icon: '💧',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    questions: [
      {
        id: 'drupp-standaard',
        generate() {
          const volume = pick([100, 250, 500, 1000]);
          const uren = pick([2, 3, 4, 6, 8, 12, 24]);
          const factor = 20;
          const answer = round((volume * factor) / (uren * 60), 0);
          return {
            question: `Een infuus van ${volume} mL moet in ${uren} uur inlopen. Druppelfactor: ${factor} druppels/mL. Hoeveel druppels per minuut?`,
            answer: Math.round(answer),
            unit: 'druppels/min',
            tolerance: 1,
            hints: [
              'Formule: (mL × druppels/mL) ÷ (uren × 60)',
              `(${volume} × ${factor}) ÷ (${uren} × 60) = ?`
            ],
            steps: [
              `Aantal druppels: ${volume} × ${factor} = ${volume * factor}`,
              `Aantal minuten: ${uren} × 60 = ${uren * 60}`,
              `Druppelsnelheid: ${volume * factor} ÷ ${uren * 60} = ${Math.round(answer)} druppels/min`
            ]
          };
        }
      },
      {
        id: 'drupp-bloed',
        generate() {
          const volume = pick([250, 300, 330]);
          const uren = pick([2, 3, 4]);
          const factor = 18;
          const answer = round((volume * factor) / (uren * 60), 0);
          return {
            question: `Een bloedtransfusie van ${volume} mL moet in ${uren} uur inlopen. Bij bloed: ${factor} druppels/mL. Hoeveel druppels per minuut?`,
            answer: Math.round(answer),
            unit: 'druppels/min',
            tolerance: 1,
            hints: [
              `Bij bloed: 1 mL = ${factor} druppels`,
              `(${volume} × ${factor}) ÷ (${uren} × 60)`
            ],
            steps: [
              `Druppels: ${volume} × ${factor} = ${volume * factor}`,
              `Minuten: ${uren} × 60 = ${uren * 60}`,
              `Druppelsnelheid: ${volume * factor} ÷ ${uren * 60} = ${Math.round(answer)} druppels/min`
            ]
          };
        }
      },
      {
        id: 'drupp-ml-uur',
        generate() {
          const ml_per_uur = pick([50, 75, 100, 125, 150, 200]);
          const factor = 20;
          const answer = round((ml_per_uur * factor) / 60, 0);
          return {
            question: `Het infuus staat op ${ml_per_uur} mL/uur. Druppelfactor: ${factor} druppels/mL. Hoeveel druppels per minuut is dit?`,
            answer: Math.round(answer),
            unit: 'druppels/min',
            tolerance: 1,
            hints: [
              '(mL/uur × druppels/mL) ÷ 60',
              `(${ml_per_uur} × ${factor}) ÷ 60`
            ],
            steps: [
              `Druppels per uur: ${ml_per_uur} × ${factor} = ${ml_per_uur * factor}`,
              `Druppels per minuut: ${ml_per_uur * factor} ÷ 60 = ${Math.round(answer)} druppels/min`
            ]
          };
        }
      },
      {
        id: 'drupp-voedingspomp',
        generate() {
          const volume = pick([500, 750, 1000, 1500]);
          const uren = pick([8, 10, 12, 16, 20, 24]);
          const answer = round(volume / uren, 0);
          return {
            question: `Een patiënt krijgt ${volume} mL sondevoeding in ${uren} uur via de voedingspomp. Op hoeveel mL/uur zet je de pomp?`,
            answer: Math.round(answer),
            unit: 'mL/uur',
            tolerance: 1,
            hints: [
              'mL/uur = totaal mL ÷ uren',
              `${volume} ÷ ${uren} = ?`
            ],
            steps: [
              `Volume: ${volume} mL`,
              `Tijd: ${uren} uur`,
              `Pompstand: ${volume} ÷ ${uren} = ${Math.round(answer)} mL/uur`
            ]
          };
        }
      },
    ]
  },

  // ─── 5. VOCHTBALANS ───
  {
    id: 'vochtbalans',
    name: 'Vochtbalans',
    description: 'Intake en output bijhouden',
    icon: '⚖️',
    color: '#10B981',
    bgColor: '#D1FAE5',
    questions: [
      {
        id: 'balans-berekenen',
        generate() {
          const infuus = pick([500, 1000, 1500, 2000]);
          const drinken = randomInt(200, 800);
          const urine = randomInt(800, 2000);
          const perspiratie = 500;
          const intake = infuus + drinken;
          const output = urine + perspiratie;
          const answer = intake - output;
          return {
            question: `Intake: infuus ${infuus} mL, drinken ${drinken} mL. Output: urine ${urine} mL, perspiratio insensibilis ${perspiratie} mL. Wat is de vochtbalans?`,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              'Balans = totale intake − totale output',
              `Intake: ${infuus} + ${drinken} = ${intake}`,
              `Output: ${urine} + ${perspiratie} = ${output}`
            ],
            steps: [
              `Intake: ${infuus} + ${drinken} = ${intake} mL`,
              `Output: ${urine} + ${perspiratie} = ${output} mL`,
              `Balans: ${intake} − ${output} = ${answer > 0 ? '+' : ''}${answer} mL`,
              answer >= 0 ? 'Positieve balans (meer opgenomen dan uitgescheiden)' : 'Negatieve balans (meer uitgescheiden dan opgenomen)'
            ]
          };
        }
      },
      {
        id: 'balans-uitgebreid',
        generate() {
          const infuus = pick([500, 1000, 1500]);
          const drinken = randomInt(300, 1000);
          const sonde = pick([0, 250, 500]);
          const urine = randomInt(800, 1800);
          const drain = pick([0, 100, 200, 300]);
          const perspiratie = 500;
          const intake = infuus + drinken + sonde;
          const output = urine + drain + perspiratie;
          const answer = intake - output;
          const ctx = `Intake:\n• Infuus: ${infuus} mL\n• Drinken: ${drinken} mL${sonde > 0 ? `\n• Sondevoeding: ${sonde} mL` : ''}\n\nOutput:\n• Urine: ${urine} mL${drain > 0 ? `\n• Drain: ${drain} mL` : ''}\n• Perspiratio insensibilis: ${perspiratie} mL`;
          return {
            question: 'Bereken de vochtbalans uit onderstaande gegevens.',
            context: ctx,
            answer,
            unit: 'mL',
            tolerance: 0,
            hints: [
              'Tel alle intake bij elkaar op',
              'Tel alle output bij elkaar op',
              'Balans = intake − output'
            ],
            steps: [
              `Intake: ${infuus} + ${drinken}${sonde > 0 ? ' + ' + sonde : ''} = ${intake} mL`,
              `Output: ${urine}${drain > 0 ? ' + ' + drain : ''} + ${perspiratie} = ${output} mL`,
              `Balans: ${intake} − ${output} = ${answer > 0 ? '+' : ''}${answer} mL`
            ]
          };
        }
      },
      {
        id: 'balans-urine-per-uur',
        generate() {
          const uren = pick([6, 8, 12, 24]);
          const totaal = randomInt(uren * 25, uren * 100);
          const answer = round(totaal / uren, 0);
          return {
            question: `Een patiënt produceerde ${totaal} mL urine in ${uren} uur. Hoeveel mL/uur is dat?`,
            answer: Math.round(answer),
            unit: 'mL/uur',
            tolerance: 1,
            hints: [
              'mL/uur = totaal ÷ uren',
              `${totaal} ÷ ${uren} = ?`
            ],
            steps: [
              `Totale urine: ${totaal} mL in ${uren} uur`,
              `Per uur: ${totaal} ÷ ${uren} = ${Math.round(answer)} mL/uur`
            ]
          };
        }
      },
    ]
  },

  // ─── 6. SPUITPOMP / PERFUSOR ───
  {
    id: 'perfusor',
    name: 'Spuitpomp / Perfusor',
    description: 'mL/uur en pompstand berekenen',
    icon: '⏱️',
    color: '#EC4899',
    bgColor: '#FCE7F3',
    questions: [
      {
        id: 'perfusor-ml-uur',
        generate() {
          const dosis_mg_uur = pick([2, 5, 10, 20, 50]);
          const totaal_mg = pick([100, 200, 500]);
          const spuit_ml = 50;
          const mg_per_ml = totaal_mg / spuit_ml;
          const answer = round(dosis_mg_uur / mg_per_ml, 1);
          return {
            question: `Voorschrift: ${dosis_mg_uur} mg/uur. De spuit (${spuit_ml} mL) bevat ${totaal_mg} mg. Op hoeveel mL/uur zet je de pomp?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.1,
            hints: [
              `Concentratie: ${totaal_mg} ÷ ${spuit_ml} = ${mg_per_ml} mg/mL`,
              `mL/uur = V / A = ${dosis_mg_uur} ÷ ${mg_per_ml}`
            ],
            steps: [
              `Concentratie: ${totaal_mg} ÷ ${spuit_ml} = ${mg_per_ml} mg/mL`,
              `Pompstand: ${dosis_mg_uur} ÷ ${mg_per_ml} = ${answer} mL/uur`
            ]
          };
        }
      },
      {
        id: 'perfusor-dosis',
        generate() {
          const ml_uur = pick([1, 2, 3, 4, 5]);
          const totaal_mg = pick([100, 200, 250, 500]);
          const spuit_ml = 50;
          const mg_per_ml = totaal_mg / spuit_ml;
          const answer = round(ml_uur * mg_per_ml, 1);
          return {
            question: `De pomp staat op ${ml_uur} mL/uur. De spuit (${spuit_ml} mL) bevat ${totaal_mg} mg. Hoeveel mg/uur krijgt de patiënt?`,
            answer,
            unit: 'mg/uur',
            tolerance: 0.1,
            hints: [
              `Concentratie: ${totaal_mg} ÷ ${spuit_ml} = ${mg_per_ml} mg/mL`,
              `mg/uur = mL/uur × concentratie`
            ],
            steps: [
              `Concentratie: ${totaal_mg} ÷ ${spuit_ml} = ${mg_per_ml} mg/mL`,
              `Dosis: ${ml_uur} × ${mg_per_ml} = ${answer} mg/uur`
            ]
          };
        }
      },
      {
        id: 'perfusor-duur',
        generate() {
          const spuit_ml = 50;
          const ml_uur = pick([1, 2, 2.5, 3, 4, 5, 10]);
          const answer = round(spuit_ml / ml_uur, 1);
          const uren = Math.floor(answer);
          const min = Math.round((answer - uren) * 60);
          return {
            question: `Een spuit van ${spuit_ml} mL staat op ${ml_uur} mL/uur. Na hoeveel uur is de spuit leeg?`,
            answer,
            unit: 'uur',
            tolerance: 0.1,
            hints: [
              `Duur = volume ÷ mL per uur`,
              `${spuit_ml} ÷ ${ml_uur} = ?`
            ],
            steps: [
              `Duur: ${spuit_ml} ÷ ${ml_uur} = ${answer} uur`,
              min > 0 ? `Dat is ${uren} uur en ${min} minuten` : `Dat is ${uren} uur`
            ]
          };
        }
      },
      {
        id: 'perfusor-ie',
        generate() {
          const ie_uur = pick([500, 750, 1000, 1250, 1500]);
          const totaal_ie = pick([10000, 12500, 25000]);
          const spuit_ml = 50;
          const ie_per_ml = totaal_ie / spuit_ml;
          const answer = round(ie_uur / ie_per_ml, 1);
          return {
            question: `Voorschrift: ${ie_uur} IE heparine/uur. De spuit (${spuit_ml} mL) bevat ${totaal_ie} IE. Op hoeveel mL/uur zet je de pomp?`,
            answer,
            unit: 'mL/uur',
            tolerance: 0.1,
            hints: [
              `Concentratie: ${totaal_ie} ÷ ${spuit_ml} = ${ie_per_ml} IE/mL`,
              `mL/uur = ${ie_uur} ÷ ${ie_per_ml}`
            ],
            steps: [
              `Concentratie: ${totaal_ie} ÷ ${spuit_ml} = ${ie_per_ml} IE/mL`,
              `Pompstand: ${ie_uur} ÷ ${ie_per_ml} = ${answer} mL/uur`
            ]
          };
        }
      },
    ]
  },

  // ─── 7. DAGSCHEMA ───
  {
    id: 'dagschema',
    name: 'Dagschema',
    description: 'Medicatie verdelen over de dag',
    icon: '📋',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    questions: [
      {
        id: 'dag-interval',
        generate() {
          const freq = pick([2, 3, 4, 6]);
          const interval = 24 / freq;
          const startUur = pick([6, 7, 8]);
          const tijden = [];
          for (let i = 0; i < freq; i++) {
            const u = (startUur + i * interval) % 24;
            tijden.push(`${String(Math.floor(u)).padStart(2,'0')}:00`);
          }
          return {
            question: `Een medicijn wordt ${freq}× daags gegeven met gelijke tussenpozen. Eerste gift: ${String(startUur).padStart(2,'0')}:00. Om de hoeveel uur geef je het?`,
            answer: interval,
            unit: 'uur',
            tolerance: 0,
            hints: [
              '24 uur ÷ aantal giften per dag',
              `24 ÷ ${freq} = ?`
            ],
            steps: [
              `Interval: 24 ÷ ${freq} = ${interval} uur`,
              `Toedientijden: ${tijden.join(', ')}`
            ]
          };
        }
      },
      {
        id: 'dag-eindtijd',
        generate() {
          const startUur = pick([6, 8, 10, 14, 20]);
          const volume = pick([250, 500, 1000]);
          const ml_uur = pick([50, 75, 100, 125, 150, 200]);
          const looptijd_min = Math.round((volume / ml_uur) * 60);
          const eindMin = startUur * 60 + looptijd_min;
          const eindU = Math.floor(eindMin / 60) % 24;
          const eindM = eindMin % 60;
          const start = `${String(startUur).padStart(2,'0')}:00`;
          const eind = `${String(eindU).padStart(2,'0')}:${String(eindM).padStart(2,'0')}`;
          const answer = round(eindU + eindM / 100, 2);
          return {
            question: `Een infuus van ${volume} mL start om ${start} met ${ml_uur} mL/uur. Hoe laat is het infuus klaar? (bijv. 14.30)`,
            answer,
            unit: 'uur',
            tolerance: 0.01,
            hints: [
              `Looptijd: ${volume} ÷ ${ml_uur} uur`,
              `Starttijd + looptijd = eindtijd`
            ],
            steps: [
              `Looptijd: ${volume} ÷ ${ml_uur} = ${round(volume / ml_uur, 2)} uur (= ${Math.floor(looptijd_min / 60)} uur en ${looptijd_min % 60} min)`,
              `Start: ${start}`,
              `Eind: ${eind}`
            ]
          };
        }
      },
      {
        id: 'dag-antibiotica',
        generate() {
          const freq = pick([3, 4]);
          const inlooptijd = pick([15, 20, 30]);
          const interval = 24 / freq;
          const startU = pick([6, 8]);
          const giften = [];
          for (let i = 0; i < freq; i++) {
            const sU = (startU + i * interval) % 24;
            const eMin = sU * 60 + inlooptijd;
            const eU = Math.floor(eMin / 60) % 24;
            const eM = eMin % 60;
            giften.push({
              start: `${String(Math.floor(sU)).padStart(2,'0')}:00`,
              eind: `${String(eU).padStart(2,'0')}:${String(eM).padStart(2,'0')}`
            });
          }
          const laatsteEind = giften[giften.length - 1].eind;
          const parts = laatsteEind.split(':');
          const answer = round(parseInt(parts[0]) + parseInt(parts[1]) / 100, 2);
          return {
            question: `Antibioticum ${freq}× dd IV, inlooptijd ${inlooptijd} min. Eerste gift om ${String(startU).padStart(2,'0')}:00. Hoe laat is de laatste gift klaar? (bijv. 14.30)`,
            answer,
            unit: 'uur',
            tolerance: 0.01,
            hints: [
              `Interval: 24 ÷ ${freq} = ${interval} uur`,
              `Laatste gift start om ${giften[giften.length - 1].start}`,
              `+ ${inlooptijd} minuten inlooptijd`
            ],
            steps: [
              `Interval: 24 ÷ ${freq} = ${interval} uur`,
              `Alle giften: ${giften.map(g => `${g.start}→${g.eind}`).join(', ')}`,
              `Laatste gift klaar: ${laatsteEind}`
            ]
          };
        }
      },
    ]
  },

  // ─── 8. BMI ───
  {
    id: 'bmi',
    name: 'BMI',
    description: 'Body Mass Index berekenen',
    icon: '📏',
    color: '#059669',
    bgColor: '#D1FAE5',
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
              'BMI = gewicht (kg) ÷ lengte (m)²',
              `Let op: ${lengte_cm} cm = ${lengte_m} m`
            ],
            steps: [
              `Lengte omrekenen: ${lengte_cm} cm = ${lengte_m} m`,
              `Lengte²: ${lengte_m} × ${lengte_m} = ${round(lengte_m * lengte_m, 2)}`,
              `BMI: ${gewicht} ÷ ${round(lengte_m * lengte_m, 2)} = ${bmi} kg/m²`,
              `Classificatie: ${bmi} → ${categorie}`
            ]
          };
        }
      },
      {
        id: 'bmi-gewicht',
        generate() {
          const lengte_cm = randomInt(160, 190);
          const lengte_m = lengte_cm / 100;
          const doel_bmi = pick([20, 22, 24, 25]);
          const answer = round(doel_bmi * lengte_m * lengte_m, 1);
          return {
            question: `Een patiënt is ${lengte_cm} cm. Hoeveel kg moet de patiënt wegen voor een BMI van ${doel_bmi}?`,
            answer,
            unit: 'kg',
            tolerance: 0.5,
            hints: [
              'Gewicht = BMI × lengte²',
              `${doel_bmi} × (${lengte_m})² = ?`
            ],
            steps: [
              `Lengte: ${lengte_cm} cm = ${lengte_m} m`,
              `Lengte²: ${round(lengte_m * lengte_m, 2)}`,
              `Gewicht: ${doel_bmi} × ${round(lengte_m * lengte_m, 2)} = ${answer} kg`
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
          return {
            question: `Patiënt: ${gewicht} kg, ${lengte_cm} cm. Bereken de BMI (1 decimaal).`,
            answer: bmi,
            unit: 'kg/m²',
            tolerance: 0.2,
            hints: [
              'BMI = gewicht ÷ lengte²',
              'Ondergewicht <18,5 | Normaal 18,5-24,9 | Overgewicht 25-29,9 | Obesitas ≥30'
            ],
            steps: [
              `${lengte_cm} cm = ${lengte_m} m`,
              `BMI: ${gewicht} ÷ (${lengte_m})² = ${bmi} kg/m²`
            ]
          };
        }
      },
    ]
  },

  // ─── 9. VASTE MEDICATIE ───
  {
    id: 'vaste-medicatie',
    name: 'Vaste Medicatie',
    description: 'Tabletten en pillen berekenen (V/A)',
    icon: '💊',
    color: '#EF4444',
    bgColor: '#FEE2E2',
    questions: [
      {
        id: 'vast-tab',
        generate() {
          const voorschrift = pick([250, 500, 750, 1000, 1500, 2000]);
          const tablet_mg = pick([250, 500]);
          const answer = voorschrift / tablet_mg;
          return {
            question: `Voorschrift: ${voorschrift} mg. Beschikbaar: tabletten van ${tablet_mg} mg. Hoeveel tabletten geef je per gift?`,
            answer,
            unit: 'tabletten',
            tolerance: 0,
            hints: [
              'V / A = aantal tabletten',
              `${voorschrift} ÷ ${tablet_mg} = ?`
            ],
            steps: [
              `Voorschrift (V): ${voorschrift} mg`,
              `Aanwezig (A): ${tablet_mg} mg per tablet`,
              `V / A = ${voorschrift} ÷ ${tablet_mg} = ${answer} tabletten`
            ]
          };
        }
      },
      {
        id: 'vast-halve',
        generate() {
          const tablet_mg = pick([5, 10, 25, 50, 100]);
          const factor = pick([0.5, 1.5, 2.5]);
          const voorschrift = tablet_mg * factor;
          return {
            question: `Voorschrift: ${voorschrift} mg. Beschikbaar: tabletten van ${tablet_mg} mg. Hoeveel tabletten geef je?`,
            answer: factor,
            unit: 'tabletten',
            tolerance: 0,
            hints: [
              'V / A = aantal tabletten',
              `${voorschrift} ÷ ${tablet_mg} = ?`
            ],
            steps: [
              `V / A = ${voorschrift} ÷ ${tablet_mg} = ${factor} tabletten`,
              factor % 1 !== 0 ? `Dat is ${Math.floor(factor)} hele en een halve tablet` : ''
            ].filter(Boolean)
          };
        }
      },
      {
        id: 'vast-per-dag',
        generate() {
          const tablet_mg = pick([250, 500]);
          const dosis_per_gift = pick([250, 500, 750, 1000]);
          const freq = pick([2, 3, 4]);
          const tab_per_gift = dosis_per_gift / tablet_mg;
          const answer = tab_per_gift * freq;
          return {
            question: `Voorschrift: ${dosis_per_gift} mg, ${freq}× daags. Tabletten van ${tablet_mg} mg. Hoeveel tabletten per dag?`,
            answer,
            unit: 'tabletten',
            tolerance: 0,
            hints: [
              `Per gift: ${dosis_per_gift} ÷ ${tablet_mg} tabletten`,
              `Per dag: tabletten per gift × ${freq}`
            ],
            steps: [
              `Per gift: ${dosis_per_gift} ÷ ${tablet_mg} = ${tab_per_gift} tabletten`,
              `Per dag: ${tab_per_gift} × ${freq} = ${answer} tabletten`
            ]
          };
        }
      },
      {
        id: 'vast-kuur',
        generate() {
          const tablet_mg = pick([250, 500]);
          const dosis = pick([500, 750, 1000]);
          const freq = pick([2, 3]);
          const dagen = pick([5, 7, 10, 14]);
          const tab_per_gift = dosis / tablet_mg;
          const tab_per_dag = tab_per_gift * freq;
          const answer = tab_per_dag * dagen;
          return {
            question: `Voorschrift: ${dosis} mg, ${freq}× dd, gedurende ${dagen} dagen. Tabletten: ${tablet_mg} mg. Hoeveel tabletten zijn nodig voor de hele kuur?`,
            answer,
            unit: 'tabletten',
            tolerance: 0,
            hints: [
              `Per gift: ${dosis} ÷ ${tablet_mg}`,
              `Per dag: × ${freq}, dan × ${dagen} dagen`
            ],
            steps: [
              `Per gift: ${dosis} ÷ ${tablet_mg} = ${tab_per_gift} tabletten`,
              `Per dag: ${tab_per_gift} × ${freq} = ${tab_per_dag} tabletten`,
              `Kuur: ${tab_per_dag} × ${dagen} = ${answer} tabletten`
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
    1: ['oplossen', 'oplossen', 'verdunnen', 'verdunnen',
        'zuurstof', 'druppelsnelheden', 'druppelsnelheden',
        'vochtbalans', 'vochtbalans',
        'perfusor', 'perfusor',
        'dagschema', 'dagschema',
        'bmi', 'vaste-medicatie'],
    2: ['vaste-medicatie', 'vaste-medicatie',
        'oplossen', 'oplossen',
        'verdunnen', 'verdunnen',
        'zuurstof', 'zuurstof',
        'druppelsnelheden', 'druppelsnelheden',
        'vochtbalans',
        'perfusor',
        'dagschema', 'dagschema',
        'bmi'],
    3: ['bmi', 'bmi',
        'vaste-medicatie', 'vaste-medicatie',
        'oplossen', 'oplossen',
        'verdunnen',
        'zuurstof', 'zuurstof',
        'druppelsnelheden',
        'vochtbalans', 'vochtbalans',
        'perfusor', 'perfusor',
        'dagschema'],
  };
  const topicList = examConfigs[examId] || examConfigs[3];
  return topicList.map((topicId, i) => {
    const q = generateQuestion(topicId);
    q.questionNumber = i + 1;
    return q;
  });
}
