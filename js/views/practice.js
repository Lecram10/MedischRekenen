import { updateTopicProgress, getTopicProgress } from '../store.js';
import { getTopicById as getTopic2a, generateQuestion as genQ2a } from '../data/niveau2a.js';
import { getTopicById as getTopic2b, generateQuestion as genQ2b } from '../data/niveau2b.js';
import { getTopicById as getTopic4, generateQuestion as genQ4 } from '../data/niveau4.js';
import { getFormulas } from '../data/formulas.js';

const topicGetters = { '2a': getTopic2a, '2b': getTopic2b, '4': getTopic4 };
const questionGenerators = { '2a': genQ2a, '2b': genQ2b, '4': genQ4 };

export function renderPractice(container, niveau, topicId) {
  const getTopic = topicGetters[niveau] || getTopic2a;
  const generateQuestion = questionGenerators[niveau] || genQ2a;
  const topic = getTopic(topicId);

  if (!topic) {
    container.innerHTML = '<p>Onderwerp niet gevonden.</p>';
    return null;
  }

  let currentQuestion = null;
  let hintsRevealed = 0;
  let stepsRevealed = 0;
  let answered = false;
  let mode = 'practice'; // 'practice' or 'steps'
  let sessionCorrect = 0;
  let sessionTotal = 0;
  let formulasOpen = false;
  const formData = getFormulas(topicId);

  function loadQuestion() {
    currentQuestion = generateQuestion(topicId);
    hintsRevealed = 0;
    stepsRevealed = 0;
    answered = false;
    render();
  }

  function checkAnswer() {
    if (answered) return;
    const input = container.querySelector('#answer-input');
    const val = parseFloat(input.value.replace(',', '.'));
    if (isNaN(val)) {
      input.classList.add('incorrect');
      setTimeout(() => input.classList.remove('incorrect'), 500);
      return;
    }

    answered = true;
    sessionTotal++;
    const tolerance = currentQuestion.tolerance || 0;
    const isCorrect = Math.abs(val - currentQuestion.answer) <= tolerance;

    if (isCorrect) {
      sessionCorrect++;
      input.classList.add('correct');
      showFeedback(true);
      updateTopicProgress(niveau, topicId, true);
      window.showConfetti();
    } else {
      input.classList.add('incorrect');
      showFeedback(false);
      updateTopicProgress(niveau, topicId, false);
    }

    updateProgress();
    showActions(isCorrect);
  }

  function showFeedback(correct) {
    const fb = container.querySelector('#feedback');
    fb.className = `feedback show ${correct ? 'correct' : 'incorrect'}`;
    if (correct) {
      fb.textContent = 'Goed zo! 🎉';
    } else {
      fb.textContent = `Helaas, het juiste antwoord is: ${currentQuestion.answer} ${currentQuestion.unit}`;
    }
  }

  function showActions(correct) {
    const actions = container.querySelector('#post-actions');
    actions.innerHTML = `
      <button class="btn btn-primary btn-block" id="next-btn">
        ${correct ? 'Volgende vraag →' : 'Probeer een nieuwe vraag →'}
      </button>
      ${!correct ? `<button class="btn btn-outline btn-block mt-8" id="show-steps-btn">Bekijk de uitwerking</button>` : ''}
    `;
    actions.querySelector('#next-btn').addEventListener('click', loadQuestion);
    const stepsBtn = actions.querySelector('#show-steps-btn');
    if (stepsBtn) {
      stepsBtn.addEventListener('click', () => {
        revealAllSteps();
        stepsBtn.remove();
      });
    }
  }

  function revealHint() {
    if (!currentQuestion.hints || hintsRevealed >= currentQuestion.hints.length) return;
    hintsRevealed++;
    const hintContainer = container.querySelector('#hints');
    hintContainer.innerHTML = currentQuestion.hints
      .slice(0, hintsRevealed)
      .map((h, i) => `<div class="hint-box show">💡 Hint ${i + 1}: ${h}</div>`)
      .join('');

    const hintBtn = container.querySelector('#hint-btn');
    if (hintsRevealed >= currentQuestion.hints.length) {
      hintBtn.disabled = true;
      hintBtn.textContent = 'Geen hints meer';
    } else {
      hintBtn.textContent = `💡 Hint (${hintsRevealed}/${currentQuestion.hints.length})`;
    }
  }

  function revealNextStep() {
    if (!currentQuestion.steps || stepsRevealed >= currentQuestion.steps.length) return;
    stepsRevealed++;
    renderSteps();
  }

  function revealAllSteps() {
    if (!currentQuestion.steps) return;
    stepsRevealed = currentQuestion.steps.length;
    renderSteps();
  }

  function renderSteps() {
    const stepsEl = container.querySelector('#steps-container');
    if (!currentQuestion.steps) return;
    stepsEl.innerHTML = currentQuestion.steps
      .map((s, i) => `
        <div class="step ${i < stepsRevealed ? 'revealed' : 'hidden-step'}">
          <div class="step-number">${i + 1}</div>
          <div class="step-text">${s}</div>
        </div>
      `).join('');

    const stepBtn = container.querySelector('#step-btn');
    if (stepBtn) {
      if (stepsRevealed >= currentQuestion.steps.length) {
        stepBtn.disabled = true;
        stepBtn.textContent = 'Alle stappen getoond';
      } else {
        stepBtn.textContent = `Volgende stap (${stepsRevealed}/${currentQuestion.steps.length})`;
      }
    }
  }

  function updateProgress() {
    const pBar = container.querySelector('#session-progress');
    if (pBar) {
      const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
      pBar.querySelector('.progress-bar-fill').style.width = pct + '%';
      pBar.querySelector('.progress-text').textContent = `${sessionCorrect}/${sessionTotal} goed`;
    }
  }

  function render() {
    if (!currentQuestion) return;

    container.innerHTML = `
      <div class="card" style="margin-bottom:8px">
        <div id="session-progress" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <span style="font-size:0.8rem; color:var(--gray-500)">${topic.icon} ${topic.name}</span>
          <span class="progress-text" style="font-size:0.8rem; color:var(--gray-500)">${sessionCorrect}/${sessionTotal} goed</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill success" style="width:${sessionTotal > 0 ? Math.round((sessionCorrect/sessionTotal)*100) : 0}%"></div>
        </div>
      </div>

      <div class="mode-toggle">
        <button class="mode-btn ${mode === 'practice' ? 'active' : ''}" data-mode="practice">Oefenen</button>
        <button class="mode-btn ${mode === 'steps' ? 'active' : ''}" data-mode="steps">Stap voor stap</button>
      </div>

      ${formData ? `
      <button class="formula-toggle-btn" id="formula-toggle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
        Formules ${formData.title}
      </button>
      <div class="formula-card practice-formula ${formulasOpen ? '' : 'hidden'}" id="practice-formulas">
        <div class="formula-header">
          <span class="formula-title">Formules</span>
          <button class="formula-close" id="formula-close-btn" aria-label="Sluiten">&times;</button>
        </div>
        <div class="formula-list">
          ${formData.formulas.map(f => `
            <div class="formula-item">
              <div class="formula-label">${f.label}</div>
              <div class="formula-expression">${f.formula.replace(/\n/g, '<br>')}</div>
              <div class="formula-example">${f.example.replace(/\n/g, '<br>')}</div>
            </div>
          `).join('')}
        </div>
        ${formData.tip ? `<div class="formula-tip">${formData.tip}</div>` : ''}
      </div>
      ` : ''}

      <div class="card animate-in">
        <div class="question-container">
          <div class="question-text">${currentQuestion.question}</div>
          ${currentQuestion.context ? `<div class="question-context">${currentQuestion.context.replace(/\n/g, '<br>')}</div>` : ''}
        </div>

        ${mode === 'steps' ? `
          <div id="steps-container" class="steps-container"></div>
          <button class="btn btn-outline btn-block mt-12" id="step-btn">Volgende stap (0/${currentQuestion.steps?.length || 0})</button>
        ` : ''}

        <div class="input-group">
          <div class="input-unit">
            <input type="text" inputmode="decimal" class="input-answer" id="answer-input"
                   placeholder="Jouw antwoord" autocomplete="off">
            <span class="unit-label">${currentQuestion.unit}</span>
          </div>
        </div>

        <div id="feedback" class="feedback"></div>
        <div id="hints"></div>

        <div style="display:flex; gap:8px; margin-top:8px">
          <button class="btn btn-primary" style="flex:1" id="check-btn">Controleer</button>
          <button class="hint-btn" id="hint-btn">💡 Hint (0/${currentQuestion.hints?.length || 0})</button>
        </div>

        <div id="post-actions" class="mt-12"></div>
      </div>
    `;

    // Event listeners
    container.querySelector('#check-btn').addEventListener('click', checkAnswer);
    container.querySelector('#hint-btn').addEventListener('click', revealHint);

    const input = container.querySelector('#answer-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkAnswer();
    });

    // Mode toggle
    container.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        mode = btn.dataset.mode;
        loadQuestion();
      });
    });

    // Step button
    const stepBtn = container.querySelector('#step-btn');
    if (stepBtn) {
      stepBtn.addEventListener('click', revealNextStep);
    }

    // Formula toggle
    const formulaToggle = container.querySelector('#formula-toggle');
    const formulaPanel = container.querySelector('#practice-formulas');
    const formulaCloseBtn = container.querySelector('#formula-close-btn');
    if (formulaToggle && formulaPanel) {
      formulaToggle.addEventListener('click', () => {
        formulasOpen = !formulasOpen;
        formulaPanel.classList.toggle('hidden', !formulasOpen);
      });
    }
    if (formulaCloseBtn) {
      formulaCloseBtn.addEventListener('click', () => {
        formulasOpen = false;
        formulaPanel.classList.add('hidden');
      });
    }

    // Auto-focus input
    setTimeout(() => input.focus(), 100);
  }

  loadQuestion();

  // Return cleanup function
  return () => {};
}
