console.log('background !');

chrome.storage.sync.get({
  vocabulary: []
}, (items) => {
  console.log(items, 'items');

  // Ad context menu
  chrome.contextMenus.create({
    id: 'menuId',
    title: 'Translate To English with Beemo!',
    contexts: ['selection']
  });

  chrome.contextMenus.onClicked.addListener(function({menuItemId, selectionText}, tab) {
    if (menuItemId === 'menuId') {
      onTranslation(selectionText);
    }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request, 'hello my friend');

  if (request && request.action === 'addToVocabulary' && request.data) {
    chrome.storage.sync.get(['vocabulary'], function(data) {
      console.log(data, 'data');
      chrome.storage.sync.set({vocabulary: [...data.vocabulary, request.data]}, function() {
        sendResponse();
      });
    });
  }
});

function onTranslation(selectionText) {
  console.log(selectionText, 'selectionText');
}
