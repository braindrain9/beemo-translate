console.log('background script is running!');

// Add listener to get data from content-script (inject.js)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.action === 'addToVocabulary' && request.data) {

    // get old vocabulary data in order do not rewrite it
    chrome.storage.sync.get(['vocabulary'], function(data) {
      chrome.storage.sync.set({vocabulary: [...(data.vocabulary || []), request.data]}, function() {
        sendResponse();
      });
    });
  }
});
