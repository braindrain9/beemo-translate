console.log('background !');

chrome.storage.sync.get({
  newTab: 'false',
  languages: '[]'
}, (items) => {
  console.log(items, 'items');

  // Ad context menu
  chrome.contextMenus.create({
    id: 'menuId', // сюда
    title: 'Translate To English with Beemo!',
    contexts: ['selection']
  });

  chrome.contextMenus.onClicked.addListener(function({menuItemId, selectionText}, tab) {
    if (menuItemId === 'menuId') {
      onTranslation(selectionText);
    }
  });
});

function onTranslation(selectionText) {
  console.log(selectionText, 'selectionText');
}
