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
          window.dispatchEvent(new CustomEvent('addToVocabulary', {detail: selection}));
        });
      }
    };

    ChromeRequest.addToVocabulary().then(() => {
      console.log('ended');
    });
  },
  getFlagEmoji(lang) {
    // slice to pass only 2-digit code
    return flag(codeToFlag[lang] || lang.slice(0, 2));
  }
};
