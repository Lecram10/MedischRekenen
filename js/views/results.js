import { getTotalStats, getAllTopicProgress, getExamResults, getStreak } from '../store.js';
import { topics as topics2a } from '../data/niveau2a.js';
import { topics as topics2b } from '../data/niveau2b.js';

export function renderResults(container) {
  const stats = getTotalStats();
  const streak = getStreak();
  const examResults = getExamResults();

  const prog2a = getAllTopicProgress('2a');
  const prog2b = getAllTopicProgress('2b');

  container.innerHTML = `
    <div class="stats-grid animate-in">
      <div class="stat-card">
        <div class="stat-value">${stats.totalStars}/${stats.maxStars}</div>
        <div class="stat-label">Sterren verdiend</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.percentage}%</div>
        <div class="stat-label">Gemiddeld goed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.totalQuestions}</div>
        <div class="stat-label">Vragen gemaakt</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${streak > 0 ? streak + ' 🔥' : '0'}</div>
        <div class="stat-label">Dagen streak</div>
      </div>
    </div>

    <p class="section-header">Niveau 2a - Per onderwerp</p>
    <div class="card animate-in">
      ${renderTopicTable(topics2a, prog2a)}
    </div>

    <p class="section-header">Niveau 2b - Per onderwerp</p>
    <div class="card animate-in">
      ${renderTopicTable(topics2b, prog2b)}
    </div>

    <p class="section-header">Toetsresultaten</p>
    ${examResults.length > 0 ? `
      <div class="card animate-in">
        ${examResults
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
          .map(r => {
            const date = new Date(r.date);
            const dateStr = date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
            const passed = r.percentage >= 55;
            return `
              <div class="history-item">
                <div>
                  <div class="history-info">Toets ${r.examId} - Niveau ${r.niveau.toUpperCase()}</div>
                  <div class="history-date">${dateStr}</div>
                </div>
                <div class="history-score ${passed ? 'pass' : 'fail'}">${r.percentage}%</div>
              </div>
            `;
          }).join('')}
      </div>
    ` : `
      <div class="card empty-state animate-in">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <p>Je hebt nog geen toetsen gemaakt.<br>Ga naar het tabblad "Toetsen" om te beginnen!</p>
      </div>
    `}

    <div style="text-align:center; margin-top:24px; padding-bottom:20px">
      <button class="btn-small" style="background:var(--danger)" id="reset-btn">Alle voortgang wissen</button>
    </div>
  `;

  container.querySelector('#reset-btn').addEventListener('click', () => {
    if (confirm('Weet je zeker dat je alle voortgang wilt wissen? Dit kan niet ongedaan worden.')) {
      localStorage.removeItem('medisch-rekenen-data');
      renderResults(container);
    }
  });
}

function renderTopicTable(topics, progress) {
  if (topics.length === 0) return '<p class="text-muted">Geen onderwerpen</p>';

  return topics.map(topic => {
    const p = progress[topic.id] || { correct: 0, total: 0, stars: 0 };
    const pct = p.total > 0 ? Math.round((p.correct / p.total) * 100) : 0;

    return `
      <div style="display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--gray-100)">
        <span style="font-size:1.1rem; width:28px; text-align:center">${topic.icon}</span>
        <div style="flex:1; min-width:0">
          <div style="font-size:0.85rem; font-weight:500">${topic.name}</div>
          <div style="font-size:0.75rem; color:var(--gray-400)">
            ${p.total > 0 ? `${p.correct}/${p.total} goed (${pct}%)` : 'Nog niet geoefend'}
          </div>
        </div>
        <div class="topic-stars">
          ${[1,2,3].map(s => `<span class="star ${s <= p.stars ? 'filled' : ''}">★</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}
