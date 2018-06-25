var menuItem = {
  "id": "translateit",
  "title": "TranslateIt",
  "contexts": ["selection"]
};


chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create(menuItem);
});


function fixedEncodeURI (str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickedData) {
  
  if(clickedData.menuItemId == 'translateit' && clickedData.selectionText) {
    var translateUrl = "https://translate.google.co.in/#en/hi/"+ clickedData.selectionText;

    var createData = {
      "url": translateUrl,
      "type": "popup",
      "top": 5,
      "left": 5,
      "width": screen.availWidth/2,
      "height": screen.availHeight/2
    };

    chrome.windows.create(createData, function(newWindow) {
      //console.log(newWindow);
      chrome.tabs.executeScript(newWindow.tabs[0].id, {
        //code: 'document.write("hello world");'
      });
    });
  
  }
});