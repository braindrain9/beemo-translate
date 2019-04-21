console.log('background !');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request, 'hello my friend');

  if (request && request.action === 'addToVocabulary' && request.data) {
    console.log(request, 'request');
    chrome.storage.sync.get(['vocabulary'], function(data) {
      console.log(data, 'data');

      chrome.storage.sync.set({vocabulary: [...(data.vocabulary || []), request.data]}, function() {
        sendResponse();
      });
    });
  }
});
