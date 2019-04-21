const content = chrome.extension.getURL('js/content.js');
const script = document.createElement('script');

script.setAttribute('type', 'text/javascript');
script.setAttribute('src', content);
document.body.appendChild(script);

window.addEventListener('addToVocabulary', function(e) {
  const editorExtensionId = 'dblflpobokcakofelfapckkolbahfbgo'; // TODO edit then

  chrome.runtime.sendMessage(editorExtensionId, {
    action: 'addToVocabulary',
    data: e.detail
  },
  function() {
    window.dispatchEvent(new CustomEvent('vocabularyIsSet', {detail: true}));
  });
}, false);
