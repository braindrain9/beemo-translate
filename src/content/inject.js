const content = chrome.extension.getURL('js/content.js');
const script = document.createElement('script');

script.setAttribute('type', 'text/javascript');
script.setAttribute('src', content);

// inject script to document in order to create popup on selection
document.body.appendChild(script);

window.addEventListener('addToVocabulary', function(e) {
  // send message to background.js script which has access to chrome.storage and could save vocabulary
  chrome.runtime.sendMessage(chrome.runtime.id, {
    action: 'addToVocabulary',
    data: e.detail
  },
  function() {
    // sent event to popup to show success message about set vocabulary
    window.dispatchEvent(new CustomEvent('vocabularyIsSet', {detail: true}));
  });
}, false);
