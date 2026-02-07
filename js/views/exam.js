import { saveExamResult, getBestExamScore } from '../store.js';
import { generateExam as genExam2a } from '../data/niveau2a.js';
import { generateExam as genExam2b } from '../data/niveau2b.js';
import { generateExam as genExam4 } from '../data/niveau4.js';

const examGenerators = { '2a': genExam2a, '2b': genExam2b, '4': genExam4 };

let timerInterval = null;

export function cleanupExam() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function renderExamList(container) {
  const exams = [];
  for (const niveau of ['2a', '2b', '4']) {
    for (let i = 1; i <= 3; i++) {
      const best = getBestExamScore(niveau, i);
      exams.push({ niveau, id: i, best });
    }
  }

  container.innerHTML = `
    <p class="section-header">Niveau 2a - Basis</p>
    ${exams.filter(e => e.niveau === '2a').map((e, i) => examCard(e, i)).join('')}

    <p class="section-header">Niveau 2b - Gevorderd</p>
    ${exams.filter(e => e.niveau === '2b').map((e, i) => examCard(e, i)).join('')}

    <p class="section-header">Niveau 4 - MBO Verpleegkundige</p>
    ${exams.filter(e => e.niveau === '4').map((e, i) => examCard(e, i)).join('')}

    <div class="card animate-in mt-16" style="text-align:center; padding:20px">
      <p style="font-size:0.85rem; color:var(--gray-500)">
        Elke toets bevat 15 vragen en duurt maximaal 45 minuten.
        Er zijn geen hints beschikbaar tijdens de toets.
      </p>
    </div>
  `;
}

function examCard(exam, index) {
  const levelClasses = { '2a': 'level-2a', '2b': 'level-2b', '4': 'level-4' };
  const levelClass = levelClasses[exam.niveau] || 'level-2a';
  const badge = exam.best !== null
    ? `<span class="exam-badge best">${exam.best}%</span>`
    : `<span class="exam-badge new">Nieuw</span>`;

  return `
    <a href="#/exam/${exam.niveau}/${exam.id}" class="card card-interactive exam-card animate-in" style="text-decoration:none; color:inherit; animation-delay:${index * 0.05}s">
      <div class="exam-icon ${levelClass}">${exam.id}</div>
      <div class="exam-info">
        <h3>Oefentoets ${exam.id}</h3>
        <p>15 vragen · 45 minuten</p>
      </div>
      ${badge}
    </a>
  `;
}

export function renderExam(container, niveau, examId) {
  const generateExam = examGenerators[niveau] || genExam2a;
  const questions = generateExam(examId);
  let currentIndex = 0;
  let answers = new Array(questions.length).fill(null);
  let timeLeft = 45 * 60; // 45 minutes in seconds
  let finished = false;

  function startTimer() {
    cleanupExam();
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        finishExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerEl = container.querySelector('#exam-timer');
    if (!timerEl) return;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerEl.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    if (timeLeft <= 300) timerEl.classList.add('warning');
  }

  function renderQuestion() {
    if (finished) return;
    const q = questions[currentIndex];
    const savedAnswer = answers[currentIndex];

    container.innerHTML = `
      <div class="exam-header">
        <span class="exam-progress-text">Vraag ${currentIndex + 1}/${questions.length}</span>
        <span class="exam-timer" id="exam-timer">45:00</span>
      </div>

      <div class="exam-dots">
        ${questions.map((_, i) => {
          let cls = 'exam-dot';
          if (i === currentIndex) cls += ' current';
          else if (answers[i] !== null) cls += ' answered';
          return `<div class="${cls}"></div>`;
        }).join('')}
      </div>

      <div class="card animate-in">
        <div class="question-container">
          <div class="question-number">Vraag ${currentIndex + 1}</div>
          <div class="question-text">${q.question}</div>
          ${q.context ? `<div class="question-context">${q.context.replace(/\n/g, '<br>')}</div>` : ''}
        </div>

        <div class="input-group">
          <div class="input-unit">
            <input type="text" inputmode="decimal" class="input-answer" id="exam-input"
                   placeholder="Jouw antwoord" value="${savedAnswer !== null ? savedAnswer : ''}" autocomplete="off">
            <span class="unit-label">${q.unit}</span>
          </div>
        </div>

        <div style="display:flex; gap:8px; margin-top:16px">
          <button class="btn btn-outline" id="prev-btn" ${currentIndex === 0 ? 'disabled' : ''} style="flex:1">
            ← Vorige
          </button>
          ${currentIndex < questions.length - 1
            ? `<button class="btn btn-primary" id="next-btn" style="flex:1">Volgende →</button>`
            : `<button class="btn btn-success" id="finish-btn" style="flex:1">Inleveren</button>`
          }
        </div>
      </div>

      <div style="text-align:center; margin-top:12px">
        <button class="btn-small" style="background:var(--danger)" id="stop-btn">Toets stoppen</button>
      </div>
    `;

    updateTimerDisplay();

    // Event listeners
    const input = container.querySelector('#exam-input');
    input.addEventListener('input', () => {
      const val = input.value.trim();
      answers[currentIndex] = val || null;
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        answers[currentIndex] = input.value.trim() || null;
        if (currentIndex < questions.length - 1) {
          currentIndex++;
          renderQuestion();
        }
      }
    });

    const prevBtn = container.querySelector('#prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      answers[currentIndex] = input.value.trim() || null;
      if (currentIndex > 0) { currentIndex--; renderQuestion(); }
    });

    const nextBtn = container.querySelector('#next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      answers[currentIndex] = input.value.trim() || null;
      currentIndex++;
      renderQuestion();
    });

    const finishBtn = container.querySelector('#finish-btn');
    if (finishBtn) finishBtn.addEventListener('click', () => {
      answers[currentIndex] = input.value.trim() || null;
      const unanswered = answers.filter(a => a === null).length;
      if (unanswered > 0) {
        if (!confirm(`Je hebt nog ${unanswered} onbeantwoorde ${unanswered === 1 ? 'vraag' : 'vragen'}. Weet je zeker dat je wilt inleveren?`)) return;
      }
      finishExam();
    });

    const stopBtn = container.querySelector('#stop-btn');
    stopBtn.addEventListener('click', () => {
      if (confirm('Weet je zeker dat je de toets wilt stoppen? Je voortgang gaat verloren.')) {
        cleanupExam();
        window.location.hash = '#/exams';
      }
    });

    setTimeout(() => input.focus(), 100);
  }

  function finishExam() {
    cleanupExam();
    finished = true;

    // Grade the exam
    let score = 0;
    const results = questions.map((q, i) => {
      const given = answers[i];
      const parsedAnswer = given !== null ? parseFloat(String(given).replace(',', '.')) : null;
      const tolerance = q.tolerance || 0;
      const isCorrect = parsedAnswer !== null && Math.abs(parsedAnswer - q.answer) <= tolerance;
      if (isCorrect) score++;
      return {
        question: q.question,
        context: q.context,
        givenAnswer: given,
        correctAnswer: q.answer,
        unit: q.unit,
        isCorrect,
        steps: q.steps
      };
    });

    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 55;

    saveExamResult(niveau, examId, score, questions.length, results);

    // Show tab bar again
    document.getElementById('tab-bar').classList.remove('hidden');

    container.innerHTML = `
      <div class="card animate-in text-center" style="padding:24px">
        <h2 style="margin-bottom:8px">Oefentoets ${examId} - Niveau ${niveau.toUpperCase()}</h2>
        <div class="score-circle ${passed ? 'pass' : 'fail'}">
          <span class="score-number">${percentage}%</span>
          <span class="score-label">${score}/${questions.length}</span>
        </div>
        <p style="font-size:1.1rem; font-weight:600; color:${passed ? 'var(--success)' : 'var(--danger)'}">
          ${passed ? 'Gehaald! 🎉' : 'Helaas, niet gehaald'}
        </p>
        <p style="font-size:0.85rem; color:var(--gray-500); margin-top:4px">
          ${passed ? 'Goed gedaan, je beheerst deze stof!' : 'Oefen verder en probeer het opnieuw.'}
        </p>
      </div>

      <p class="section-header">Nakijken</p>

      <div class="card">
        ${results.map((r, i) => `
          <div class="result-item">
            <div class="result-icon ${r.isCorrect ? 'correct' : 'incorrect'}">
              ${r.isCorrect ? '✓' : '✗'}
            </div>
            <div style="flex:1">
              <div class="result-question"><strong>${i + 1}.</strong> ${r.question}</div>
              ${r.context ? `<div style="font-size:0.75rem; color:var(--gray-400); margin-top:2px">${r.context.replace(/\n/g, ' · ')}</div>` : ''}
              <div class="result-answer">
                Jouw antwoord: <strong>${r.givenAnswer !== null ? r.givenAnswer + ' ' + r.unit : '(niet ingevuld)'}</strong>
                ${!r.isCorrect ? `<br>Juiste antwoord: <strong style="color:var(--success)">${r.correctAnswer} ${r.unit}</strong>` : ''}
              </div>
              ${!r.isCorrect && r.steps ? `
                <details style="margin-top:6px">
                  <summary style="font-size:0.8rem; color:var(--primary); cursor:pointer">Bekijk uitwerking</summary>
                  <div class="steps-container" style="margin-top:4px">
                    ${r.steps.map((s, j) => `
                      <div class="step">
                        <div class="step-number">${j + 1}</div>
                        <div class="step-text">${s}</div>
                      </div>
                    `).join('')}
                  </div>
                </details>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display:flex; gap:8px; margin-top:16px">
        <a href="#/exams" class="btn btn-outline btn-block" style="text-decoration:none">Terug naar toetsen</a>
        <a href="#/exam/${niveau}/${examId}" class="btn btn-primary btn-block" style="text-decoration:none">Opnieuw</a>
      </div>
    `;

    if (passed) window.showConfetti();
  }

  startTimer();
  renderQuestion();

  return cleanupExam;
}
