import { isInstallBannerDismissed, dismissInstallBanner } from './store.js';
import { renderHome } from './views/home.js';
import { renderTopics } from './views/topics.js';
import { renderPractice } from './views/practice.js';
import { renderExam, cleanupExam, renderExamList } from './views/exam.js';
import { renderResults } from './views/results.js';

const mainContent = document.getElementById('main-content');
const headerTitle = document.getElementById('header-title');
const backBtn = document.getElementById('back-btn');
const tabItems = document.querySelectorAll('.tab-item');

let currentCleanup = null;

// Router
function navigate() {
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  const hash = window.location.hash || '#/';
  const parts = hash.slice(2).split('/');
  const route = parts[0] || '';

  // Update tab bar
  tabItems.forEach(tab => {
    const tabRoute = tab.getAttribute('href').slice(2).split('/')[0] || '';
    tab.classList.toggle('active', tabRoute === route || (tabRoute === '' && route === ''));
  });

  // Route matching
  if (route === '' || route === 'topics' && !parts[1]) {
    showBack(false);
    headerTitle.textContent = 'Medisch Rekenen';
    renderHome(mainContent);
  } else if (route === 'topics' && parts[1]) {
    showBack(true, '#/');
    const niveau = parts[1];
    headerTitle.textContent = `Niveau ${niveau.toUpperCase()}`;
    renderTopics(mainContent, niveau);
  } else if (route === 'practice' && parts[1] && parts[2]) {
    showBack(true, `#/topics/${parts[1]}`);
    const niveau = parts[1];
    const topicId = parts[2];
    headerTitle.textContent = 'Oefenen';
    currentCleanup = renderPractice(mainContent, niveau, topicId);
  } else if (route === 'exams') {
    showBack(false);
    headerTitle.textContent = 'Oefentoetsen';
    renderExamList(mainContent);
  } else if (route === 'exam' && parts[1] && parts[2]) {
    showBack(true, '#/exams');
    headerTitle.textContent = 'Oefentoets';
    document.getElementById('tab-bar').classList.add('hidden');
    currentCleanup = renderExam(mainContent, parts[1], parseInt(parts[2]));
  } else if (route === 'exam-result') {
    showBack(true, '#/exams');
    headerTitle.textContent = 'Resultaat';
    document.getElementById('tab-bar').classList.remove('hidden');
    // Result is rendered by exam view
  } else if (route === 'results') {
    showBack(false);
    headerTitle.textContent = 'Voortgang';
    renderResults(mainContent);
  } else {
    headerTitle.textContent = 'Medisch Rekenen';
    renderHome(mainContent);
  }

  // Show tab bar (except during exam)
  if (route !== 'exam') {
    document.getElementById('tab-bar').classList.remove('hidden');
  }

  mainContent.classList.add('animate-in');
  setTimeout(() => mainContent.classList.remove('animate-in'), 300);
}

function showBack(show, href) {
  if (show) {
    backBtn.classList.remove('hidden');
    backBtn.onclick = () => { window.location.hash = href; };
  } else {
    backBtn.classList.add('hidden');
    backBtn.onclick = null;
  }
}

// Init
window.addEventListener('hashchange', navigate);

// PWA install banner
function checkInstallBanner() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS && !isStandalone && !isInstallBannerDismissed()) {
    setTimeout(() => {
      document.getElementById('install-banner').classList.remove('hidden');
    }, 3000);
  }

  document.getElementById('install-dismiss').addEventListener('click', () => {
    document.getElementById('install-banner').classList.add('hidden');
    dismissInstallBanner();
  });
}

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Confetti helper
window.showConfetti = function() {
  const container = document.getElementById('confetti-container');
  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (1 + Math.random()) + 's';
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 2500);
};

checkInstallBanner();
navigate();
