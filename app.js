
import { initTheme, toggleTheme, updateThemeBtn } from './js/theme.js?v=1.0.5';
import { renderLayout, renderTopBar, initTabs, toggleTranslation, toggleFact, toggleSettings, observeFadeIns } from './js/layout.js?v=1.0.5';
import { renderStory, setStoryView } from './js/story.js?v=1.0.5';
import { renderFacts } from './js/facts.js?v=1.0.5';
import { renderGrammar, toggleGrammarCard } from './js/grammar.js?v=1.0.5';
import { initCards, resetCards, flipCard, rateCard, setAnkiDeck } from './js/cards.js?v=1.0.5';
import { QuizEngine } from './js/quiz.js?v=1.0.5';
import { speak, getSpeakerBtn, injectSpeakerIcons } from './js/tts.js?v=1.0.5';
import { setSpeechRate } from './js/state.js?v=1.0.5';
import { escHtml, escAttr } from './js/utils.js?v=1.0.5';

// Expose global functions to window for HTML event handlers
window.toggleTheme = toggleTheme;
window.setStoryView = setStoryView;
window.toggleTranslation = toggleTranslation;
window.toggleFact = toggleFact;
window.toggleSettings = toggleSettings;
window.resetCards = resetCards;
window.initCards = initCards;
window.flipCard = flipCard;
window.rateCard = rateCard;
window.setSpeechRate = setSpeechRate;
window.toggleGrammarCard = toggleGrammarCard;
window.speak = speak; // Helper often used in inline onclicks

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme(); // was IIFE

  const appData = window.APP_DATA || {};

  if (appData.isHome) {
    // Render only top bar for home page
    const topBarHtml = renderTopBar(true);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = topBarHtml;
    const topBarEl = tempDiv.firstElementChild;
    if (topBarEl) document.body.prepend(topBarEl);
    updateThemeBtn();
    return;
  }

  if (appData.isGlobalCards) {
    const topBarHtml = renderTopBar(false);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = topBarHtml;
    const topBarEl = tempDiv.firstElementChild;
    if (topBarEl) document.body.prepend(topBarEl);
    updateThemeBtn();

    if (appData.ankiDeck) {
      setAnkiDeck(appData.ankiDeck);
    }
    initCards();
    return;
  }

  renderLayout();
  updateThemeBtn();
  initTabs();

  // Load data into modules
  if (appData.ankiDeck) {
    setAnkiDeck(appData.ankiDeck);
  }

  renderStory();
  renderFacts();
  renderGrammar();
  initCards(); // Renders cards if deck is present

  // Init Quizzes
  const qPool = appData.quizPool || {};
  if (qPool.choice) {
    const mainQuiz = new QuizEngine({
      containerId: 'quiz-area',
      pool: qPool,
      quizType: 'main'
    });
    mainQuiz.init();
  }

  const gPool = appData.grammarQuizPool || {};
  if (gPool.choice) {
    const grammarQuiz = new QuizEngine({
      containerId: 'grammar-quiz-area',
      pool: gPool,
      quizType: 'grammar'
    });
    grammarQuiz.init();
  }
});

