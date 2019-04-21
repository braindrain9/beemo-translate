const content = chrome.extension.getURL('js/content.js');
const script = document.createElement('script');

script.setAttribute('type', 'text/javascript');
script.setAttribute('src', content);
document.body.appendChild(script);

window.addEventListener('addToVocabulary', function(e) {
  chrome.runtime.sendMessage(chrome.runtime.id, {
    action: 'addToVocabulary',
    data: e.detail
  },
  function() {
    window.dispatchEvent(new CustomEvent('vocabularyIsSet', {detail: true}));
  });
}, false);
