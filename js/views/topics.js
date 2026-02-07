import { getTopicProgress } from '../store.js';
import { topics as topics2a } from '../data/niveau2a.js';
import { topics as topics2b } from '../data/niveau2b.js';

export function renderTopics(container, niveau) {
  const topics = niveau === '2a' ? topics2a : topics2b;
  const levelLabel = niveau === '2a' ? 'Basis' : 'Gevorderd';
  const levelColor = niveau === '2a' ? 'var(--primary)' : '#8B5CF6';

  const topicCards = topics.map((topic, i) => {
    const progress = getTopicProgress(niveau, topic.id);
    const stars = progress.stars || 0;
    const pct = progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0;
    const subtitle = progress.total > 0
      ? `${progress.correct}/${progress.total} goed (${pct}%)`
      : topic.description;

    return `
      <a href="#/practice/${niveau}/${topic.id}" class="card card-interactive topic-card animate-in" style="text-decoration:none; color:inherit; animation-delay:${i * 0.05}s">
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
      </a>
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
}
