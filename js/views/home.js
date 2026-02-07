import { getAllTopicProgress, getStreak } from '../store.js';
import { topics as topics2a } from '../data/niveau2a.js';
import { topics as topics2b } from '../data/niveau2b.js';

function calcLevelProgress(niveau, topics) {
  const progress = getAllTopicProgress(niveau);
  let totalStars = 0;
  const maxStars = topics.length * 3;
  for (const topic of topics) {
    const p = progress[topic.id];
    if (p) totalStars += p.stars;
  }
  return { totalStars, maxStars, percentage: maxStars > 0 ? Math.round((totalStars / maxStars) * 100) : 0 };
}

export function renderHome(container) {
  const streak = getStreak();
  const prog2a = calcLevelProgress('2a', topics2a);
  const prog2b = calcLevelProgress('2b', topics2b);

  container.innerHTML = `
    ${streak > 1 ? `
      <div class="streak-banner animate-in">
        🔥 ${streak} dagen achter elkaar geoefend!
      </div>
    ` : ''}

    <p class="section-header">Kies je niveau</p>

    <a href="#/topics/2a" class="card card-interactive level-card animate-in" style="text-decoration:none; color:inherit">
      <div class="level-icon level-2a">2a</div>
      <div class="level-info">
        <h2>Niveau 2a</h2>
        <p>Basis medisch rekenen</p>
        <div class="level-progress mt-8">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--gray-500); margin-bottom:4px">
            <span>${prog2a.totalStars}/${prog2a.maxStars} sterren</span>
            <span>${prog2a.percentage}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${prog2a.percentage}%"></div>
          </div>
        </div>
      </div>
    </a>

    <a href="#/topics/2b" class="card card-interactive level-card animate-in" style="text-decoration:none; color:inherit; animation-delay:0.1s">
      <div class="level-icon level-2b">2b</div>
      <div class="level-info">
        <h2>Niveau 2b</h2>
        <p>Gevorderd medisch rekenen</p>
        <div class="level-progress mt-8">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--gray-500); margin-bottom:4px">
            <span>${prog2b.totalStars}/${prog2b.maxStars} sterren</span>
            <span>${prog2b.percentage}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${prog2b.percentage}%"></div>
          </div>
        </div>
      </div>
    </a>

    <div class="card animate-in" style="animation-delay:0.2s; text-align:center; padding:20px">
      <p style="font-size:0.85rem; color:var(--gray-500); margin-bottom:8px">Welkom bij Medisch Rekenen!</p>
      <p style="font-size:0.85rem; color:var(--gray-600)">
        Kies een niveau om te oefenen. Niveau 2a bevat basisberekeningen, niveau 2b de gevorderde sommen.
        Verdien sterren door vragen goed te beantwoorden!
      </p>
    </div>
  `;
}
