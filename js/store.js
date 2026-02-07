// Voortgang opslag in localStorage

const STORAGE_KEY = 'medisch-rekenen-data';

const defaultData = {
  topicProgress: {},
  examResults: [],
  streak: { count: 0, lastDate: null },
  settings: { installBannerDismissed: false }
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultData, ...JSON.parse(raw) } : { ...defaultData };
  } catch {
    return { ...defaultData };
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getTopicProgress(niveau, topicId) {
  const data = load();
  const key = `${niveau}-${topicId}`;
  return data.topicProgress[key] || { correct: 0, total: 0, stars: 0 };
}

export function updateTopicProgress(niveau, topicId, isCorrect) {
  const data = load();
  const key = `${niveau}-${topicId}`;
  const progress = data.topicProgress[key] || { correct: 0, total: 0, stars: 0 };

  progress.total++;
  if (isCorrect) progress.correct++;

  // Stars based on recent performance
  const pct = progress.total >= 5 ? (progress.correct / progress.total) * 100 : 0;
  if (pct >= 90 && progress.total >= 10) progress.stars = 3;
  else if (pct >= 70 && progress.total >= 7) progress.stars = 2;
  else if (pct >= 50 && progress.total >= 5) progress.stars = 1;

  data.topicProgress[key] = progress;
  save(data);
  return progress;
}

export function getAllTopicProgress(niveau) {
  const data = load();
  const result = {};
  for (const [key, val] of Object.entries(data.topicProgress)) {
    if (key.startsWith(niveau + '-')) {
      result[key.replace(niveau + '-', '')] = val;
    }
  }
  return result;
}

export function saveExamResult(niveau, examId, score, total, answers) {
  const data = load();
  data.examResults.push({
    niveau,
    examId,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString(),
    answers
  });
  save(data);
  updateStreak();
}

export function getExamResults(niveau) {
  const data = load();
  return data.examResults.filter(r => !niveau || r.niveau === niveau);
}

export function getBestExamScore(niveau, examId) {
  const data = load();
  const results = data.examResults.filter(r => r.niveau === niveau && r.examId === examId);
  if (results.length === 0) return null;
  return Math.max(...results.map(r => r.percentage));
}

function updateStreak() {
  const data = load();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (data.streak.lastDate === today) return;
  if (data.streak.lastDate === yesterday) {
    data.streak.count++;
  } else {
    data.streak.count = 1;
  }
  data.streak.lastDate = today;
  save(data);
}

export function getStreak() {
  const data = load();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (data.streak.lastDate === today || data.streak.lastDate === yesterday) {
    return data.streak.count;
  }
  return 0;
}

export function getTotalStats() {
  const data = load();
  let totalCorrect = 0;
  let totalQuestions = 0;
  let totalStars = 0;

  for (const p of Object.values(data.topicProgress)) {
    totalCorrect += p.correct;
    totalQuestions += p.total;
    totalStars += p.stars;
  }

  return {
    totalCorrect,
    totalQuestions,
    totalStars,
    maxStars: 54, // 18 topics * 3 stars
    examsCompleted: data.examResults.length,
    percentage: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
  };
}

export function isInstallBannerDismissed() {
  return load().settings.installBannerDismissed;
}

export function dismissInstallBanner() {
  const data = load();
  data.settings.installBannerDismissed = true;
  save(data);
}
