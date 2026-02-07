import { getTopicProgress } from '../store.js';
import { topics as topics2a } from '../data/niveau2a.js';
import { topics as topics2b } from '../data/niveau2b.js';
import { topics as topics4 } from '../data/niveau4.js';
import { getFormulas } from '../data/formulas.js';

const levelConfig = {
  '2a': { topics: topics2a, label: 'Basis', color: 'var(--primary)' },
  '2b': { topics: topics2b, label: 'Gevorderd', color: '#8B5CF6' },
  '4':  { topics: topics4, label: 'MBO Verpleegkundige', color: '#059669' }
};

export function renderTopics(container, niveau) {
  const config = levelConfig[niveau] || levelConfig['2a'];
  const topics = config.topics;
  const levelLabel = config.label;
  const levelColor = config.color;

  const topicCards = topics.map((topic, i) => {
    const progress = getTopicProgress(niveau, topic.id);
    const stars = progress.stars || 0;
    const pct = progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0;
    const subtitle = progress.total > 0
      ? `${progress.correct}/${progress.total} goed (${pct}%)`
      : topic.description;

    const formData = getFormulas(topic.id);
    const formulaCard = formData ? `
      <div class="formula-card hidden" id="formulas-${topic.id}">
        <div class="formula-header">
          <span class="formula-title">Formules: ${formData.title}</span>
          <button class="formula-close" data-topic="${topic.id}" aria-label="Sluiten">&times;</button>
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
        <a href="#/practice/${niveau}/${topic.id}" class="btn btn-primary btn-block mt-12">Start met oefenen</a>
      </div>
    ` : '';

    return `
      <div class="topic-wrapper animate-in" style="animation-delay:${i * 0.05}s">
        <div class="card card-interactive topic-card" data-topic="${topic.id}" style="cursor:pointer">
          <div class="topic-icon" style="background:${topic.bgColor}; color:${topic.color}">
            ${topic.icon}
          </div>
          <div class="topic-info">
            <h3>${topic.name}</h3>
            <p>${subtitle}</p>
          </div>
          <div class="topic-stars">
            ${[1,2,3].map(s => `<span class="star ${s <= stars ? 'filled' : ''}">★</span>`).join('')}
          </div>
          <div class="topic-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
        ${formulaCard}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px">
      <span style="background:${levelColor}; color:white; padding:4px 10px; border-radius:12px; font-size:0.75rem; font-weight:600">
        ${levelLabel}
      </span>
      <span style="font-size:0.85rem; color:var(--gray-500)">${topics.length} onderwerpen</span>
    </div>
    ${topicCards}
  `;

  // Toggle formula cards on topic click
  container.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const topicId = card.dataset.topic;
      const formulaEl = container.querySelector(`#formulas-${topicId}`);
      if (formulaEl) {
        const isHidden = formulaEl.classList.contains('hidden');
        // Close all other formula cards
        container.querySelectorAll('.formula-card').forEach(fc => fc.classList.add('hidden'));
        if (isHidden) {
          formulaEl.classList.remove('hidden');
          formulaEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });

  // Close buttons
  container.querySelectorAll('.formula-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const topicId = btn.dataset.topic;
      container.querySelector(`#formulas-${topicId}`).classList.add('hidden');
    });
  });
}
