import flag from 'country-code-emoji';

const codeToFlag = {
  'uk': 'ua',
  'en': 'us'
};

export default {
  set (selection) {
    const ChromeRequest = {
      addToVocabulary() {
        return new Promise(function () {
          // send event to inject.js which has listener to pass it to background.js
          window.dispatchEvent(new CustomEvent('addToVocabulary', {detail: selection}));
        });
      }
    };

    ChromeRequest.addToVocabulary();
  },
  getFlagEmoji(lang) {
    // slice to pass only 2-digit code according to ISO-3166-1 alpha-2 format
    return flag(codeToFlag[lang] || lang.slice(0, 2));
  }
};
