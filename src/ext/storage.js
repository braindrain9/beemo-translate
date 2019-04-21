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
  }
};
