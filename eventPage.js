var menuItem = {
  "id": "translateit",
  "title": "TranslateIt",
  "contexts": ["selection"]
};


chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create(menuItem);
});


function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function (clickedData) {

  if (clickedData.menuItemId == 'translateit' && clickedData.selectionText) {

    let firstPref = "en";
    let secondPref = "hi";

    chrome.storage.sync.get('translatePrefs', function (getEvent) {
      if (getEvent.translatePrefs && getEvent.translatePrefs.length) {
        firstPref = getEvent.translatePrefs[0].toLowerCase();
        secondPref = getEvent.translatePrefs[1].toLowerCase();
        var translateUrl = `https://translate.google.co.in/#${firstPref}/${secondPref}/${clickedData.selectionText}`
        var createData = {
          "url": translateUrl,
          "type": "popup",
          "top": 5,
          "left": 5,
          "width": screen.availWidth / 2,
          "height": screen.availHeight / 2
        };

        chrome.windows.create(createData, function (newWindow) {
          chrome.tabs.executeScript(newWindow.tabs[0].id, {
          });
        });
      }
      else{
        firstPref = "EN";
        secondPref = "HI";
        chrome.storage.sync.set({'translatePrefs': [firstPref,secondPref]});
        var translateUrl = `https://translate.google.co.in/#${firstPref}/${secondPref}/${clickedData.selectionText}`
        var createData = {
          "url": translateUrl,
          "type": "popup",
          "top": 5,
          "left": 5,
          "width": screen.availWidth / 2,
          "height": screen.availHeight / 2
        };

        chrome.windows.create(createData, function (newWindow) {
          chrome.tabs.executeScript(newWindow.tabs[0].id, {
          });
        });
      }
    })
  }
});